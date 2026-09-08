"use client";

// Estado de la app — mitad localStorage, mitad Supabase real (Sesión 6):
//
// - Las respuestas del onboarding (edad/reto/tiempo) y el Caso 01 se responden
//   ANTES de tener cuenta, así que siguen viviendo en localStorage hasta el
//   momento del registro — ahí se migran al perfil real (ver
//   `app/auth/callback/route.ts`, que las recibe como parámetros del propio
//   link del correo, no del localStorage, para que funcione aunque el usuario
//   abra el enlace en otro dispositivo).
// - La cuenta, el progreso de Casos y si pagó ($29 por Hotmart) viven en
//   Supabase de verdad (`perfiles` y `progreso_casos`, con RLS: cada usuario
//   solo puede leer/escribir SUS propias filas). Por eso esas funciones ahora
//   son `async`.

import { createClient } from "@/lib/supabase/client";

export type EdadHijo = "8-9" | "10-11" | "12";
export type Reto =
  | "quedarme-en-blanco"
  | "clase-obligatoria"
  | "escuela-redes"
  | "cualquier-pregunta";
export type TiempoSemanal = "10" | "15" | "mas-15";

export type OnboardingState = {
  edad: EdadHijo | null;
  reto: Reto | null;
  tiempo: TiempoSemanal | null;
  caso01Completado: boolean;
  racha: number;
  insignia: string | null;
};

// "camino" ya no es un flag que el cliente se auto-otorga (así era el modelo
// simulado) — ahora es 100% derivado de `perfiles.pagado`, que solo el webhook
// de Hotmart (con la service_role key) puede poner en true.
export type AuthState = {
  registrado: boolean;
  email: string | null;
  pagado: boolean;
};

export type ProgresoState = {
  casosResueltos: number[]; // ids de Casos con conclusión correcta
  insignias: Record<number, string>; // id de Caso -> nombre de insignia ganada
  racha: number;
  ultimaFechaResuelto: string | null; // ISO date (solo día), para calcular racha
};

const ONBOARDING_KEY = "emuna:onboarding";
const PROGRESO_LOCAL_KEY = "emuna:progreso"; // solo para el Caso 01 pre-cuenta

const DEFAULT_STATE: OnboardingState = {
  edad: null,
  reto: null,
  tiempo: null,
  caso01Completado: false,
  racha: 0,
  insignia: null,
};

const DEFAULT_AUTH: AuthState = {
  registrado: false,
  email: null,
  pagado: false,
};

const DEFAULT_PROGRESO: ProgresoState = {
  casosResueltos: [],
  insignias: {},
  racha: 0,
  ultimaFechaResuelto: null,
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// Onboarding (pre-cuenta) — localStorage, sin cambios de comportamiento.
// ---------------------------------------------------------------------------

export function getOnboardingState(): OnboardingState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  return safeParse(window.localStorage.getItem(ONBOARDING_KEY), DEFAULT_STATE);
}

export function setOnboardingState(patch: Partial<OnboardingState>) {
  if (typeof window === "undefined") return;
  const next = { ...getOnboardingState(), ...patch };
  window.localStorage.setItem(ONBOARDING_KEY, JSON.stringify(next));
  return next;
}

export const EDAD_LABEL: Record<EdadHijo, string> = {
  "8-9": "8-9 años",
  "10-11": "10-11 años",
  "12": "12 años",
};

export const TIEMPO_LABEL: Record<TiempoSemanal, string> = {
  "10": "10 minutos",
  "15": "15 minutos",
  "mas-15": "más de 15 minutos",
};

// ---------------------------------------------------------------------------
// Auth real (Supabase) — magic link por correo.
// ---------------------------------------------------------------------------

/** Estado de auth real: ¿hay sesión?, ¿qué email?, ¿ya pagó (perfiles.pagado)? */
export async function getAuthState(): Promise<AuthState> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return DEFAULT_AUTH;

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("pagado")
    .eq("id", user.id)
    .maybeSingle();

  return {
    registrado: true,
    email: user.email ?? null,
    pagado: perfil?.pagado ?? false,
  };
}

/**
 * ¿Hay alguna señal de que el usuario puede entrar a `/app`? El Caso 01 resuelto
 * (sin cuenta todavía, guardado local) YA cuenta como acceso — así el usuario no
 * pierde su avance si entra a `/app` antes de registrarse.
 */
export async function tieneAccesoApp(): Promise<boolean> {
  if (getOnboardingState().caso01Completado) return true;
  const auth = await getAuthState();
  return auth.registrado;
}

// ---------------------------------------------------------------------------
// Progreso de Casos (Supabase: `progreso_casos` + `perfiles.racha`).
// ---------------------------------------------------------------------------

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function esAyer(fechaISO: string): boolean {
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);
  return fechaISO === ayer.toISOString().slice(0, 10);
}

/**
 * Lee el progreso real desde Supabase. Si el usuario resolvió el Caso 01 antes
 * de registrarse (guardado local) y por algún motivo todavía no llegó a
 * `progreso_casos` (por ejemplo, siguió el camino gratis sin pasar por el
 * callback de auth con los parámetros de migración), lo reconcilia aquí una
 * vez — mismo espíritu que la reconciliación que existía en la versión
 * simulada, ahora escribiendo a la base de datos real.
 */
export async function getProgresoState(): Promise<ProgresoState> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return DEFAULT_PROGRESO;

  const [{ data: filas }, { data: perfil }] = await Promise.all([
    supabase
      .from("progreso_casos")
      .select("caso_id, insignia")
      .eq("perfil_id", user.id),
    supabase
      .from("perfiles")
      .select("racha, ultima_fecha_resuelto")
      .eq("id", user.id)
      .maybeSingle(),
  ]);

  const casosResueltos = (filas ?? []).map((f) => f.caso_id).sort((a, b) => a - b);
  const insignias: Record<number, string> = {};
  (filas ?? []).forEach((f) => {
    insignias[f.caso_id] = f.insignia;
  });

  let progreso: ProgresoState = {
    casosResueltos,
    insignias,
    racha: perfil?.racha ?? 0,
    ultimaFechaResuelto: perfil?.ultima_fecha_resuelto ?? null,
  };

  const onboarding = getOnboardingState();
  if (onboarding.caso01Completado && !progreso.casosResueltos.includes(1)) {
    const insignia = onboarding.insignia ?? "Investigador Jr.";
    await supabase
      .from("progreso_casos")
      .upsert(
        { perfil_id: user.id, caso_id: 1, insignia },
        { onConflict: "perfil_id,caso_id", ignoreDuplicates: true }
      );
    const racha = progreso.racha || onboarding.racha || 1;
    const ultimaFechaResuelto = progreso.ultimaFechaResuelto ?? hoyISO();
    await supabase
      .from("perfiles")
      .update({ racha, ultima_fecha_resuelto: ultimaFechaResuelto })
      .eq("id", user.id);
    progreso = {
      casosResueltos: [1, ...progreso.casosResueltos].sort((a, b) => a - b),
      insignias: { ...progreso.insignias, 1: insignia },
      racha,
      ultimaFechaResuelto,
    };
  }

  return progreso;
}

/**
 * Repaso espaciado (estilo Duolingo): cada día se sugiere UN Caso ya resuelto
 * para repasar. Versión pura y sincrónica — recibe el progreso ya cargado
 * (evita otra ida y vuelta a Supabase en cada render).
 */
function semillaDelDia(): number {
  const d = new Date();
  return d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate();
}

export function getRepasoDelDiaSync(progreso: ProgresoState): number | null {
  const resueltos = progreso.casosResueltos;
  if (resueltos.length === 0) return null;
  const ultimo = resueltos[resueltos.length - 1];
  const candidatos = resueltos.length > 1 ? resueltos.filter((id) => id !== ultimo) : resueltos;
  return candidatos[semillaDelDia() % candidatos.length];
}

/** Conveniencia: carga el progreso y calcula el repaso del día en una llamada. */
export async function getRepasoDelDia(): Promise<number | null> {
  const progreso = await getProgresoState();
  return getRepasoDelDiaSync(progreso);
}

/** Marca un Caso como resuelto, guarda su insignia y actualiza la racha (día consecutivo). */
export async function marcarCasoResuelto(casoId: number, insignia: string): Promise<ProgresoState> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return DEFAULT_PROGRESO;

  const actual = await getProgresoState();
  const yaResuelto = actual.casosResueltos.includes(casoId);
  const hoy = hoyISO();

  let racha = actual.racha;
  if (!yaResuelto) {
    if (!actual.ultimaFechaResuelto) racha = 1;
    else if (actual.ultimaFechaResuelto === hoy) racha = actual.racha || 1;
    else if (esAyer(actual.ultimaFechaResuelto)) racha = actual.racha + 1;
    else racha = 1;
  }

  if (!yaResuelto) {
    await supabase.from("progreso_casos").insert({ perfil_id: user.id, caso_id: casoId, insignia });
  }
  await supabase.from("perfiles").update({ racha, ultima_fecha_resuelto: hoy }).eq("id", user.id);

  return {
    casosResueltos: yaResuelto ? actual.casosResueltos : [...actual.casosResueltos, casoId].sort((a, b) => a - b),
    insignias: { ...actual.insignias, [casoId]: insignia },
    racha,
    ultimaFechaResuelto: hoy,
  };
}

/**
 * Borra el progreso real (filas de `progreso_casos` + racha en `perfiles`) y
 * cierra la sesión — "empezar de cero" ahora también borra la cuenta activa
 * de este dispositivo, no solo una copia local.
 */
export async function reiniciarProgreso() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.from("progreso_casos").delete().eq("perfil_id", user.id);
    await supabase.from("perfiles").update({ racha: 0, ultima_fecha_resuelto: null }).eq("id", user.id);
    await supabase.auth.signOut();
  }

  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PROGRESO_LOCAL_KEY);
  window.localStorage.removeItem(ONBOARDING_KEY);
}

/**
 * Un caso está desbloqueado si (a) está dentro de lo que el usuario tiene
 * acceso — el Módulo 1 gratis (1-4), o todos si pagó — Y (b) ya resolvió el
 * Caso anterior. El Caso 01 siempre está disponible como punto de entrada.
 * Versión pura y sincrónica: recibe el progreso y si pagó ya cargados, para
 * poder llamarse 52 veces en un grid sin 52 idas y vueltas a Supabase.
 */
export function casoDesbloqueadoSync(casoId: number, progreso: ProgresoState, pagado: boolean): boolean {
  if (casoId === 1) return true;
  const dentroDelAcceso = casoId <= 4 || pagado;
  if (!dentroDelAcceso) return false;
  return progreso.casosResueltos.includes(casoId - 1);
}

/** Conveniencia: versión async para páginas que solo necesitan UN Caso. */
export async function casoDesbloqueado(casoId: number): Promise<boolean> {
  const [progreso, auth] = await Promise.all([getProgresoState(), getAuthState()]);
  return casoDesbloqueadoSync(casoId, progreso, auth.pagado);
}
