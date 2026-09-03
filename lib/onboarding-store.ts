"use client";

// Estado del onboarding — simulado en localStorage (sin backend hasta la Sesión 6: Supabase).
// Guarda las respuestas del usuario para personalizar el loading, el resumen, el paywall
// y el registro, tal como pide 50-DISENO-ONBOARDING-PAYWALL.md (el eco de respuestas es lo
// que convierte el dato en compromiso).

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

export type AuthState = {
  registrado: boolean;
  email: string | null;
  camino: "pago" | "gratis" | null;
};

// Progreso de la app interna (Sesión 5) — qué Casos resolvió y sus insignias.
// Vive separado del onboarding porque sigue creciendo después de la Sesión 4.
export type ProgresoState = {
  casosResueltos: number[]; // ids de Casos con conclusión correcta
  insignias: Record<number, string>; // id de Caso -> nombre de insignia ganada
  racha: number;
  ultimaFechaResuelto: string | null; // ISO date (solo día), para calcular racha
};

const ONBOARDING_KEY = "emuna:onboarding";
const AUTH_KEY = "emuna:auth";
const PROGRESO_KEY = "emuna:progreso";

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
  camino: null,
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

export function getAuthState(): AuthState {
  if (typeof window === "undefined") return DEFAULT_AUTH;
  return safeParse(window.localStorage.getItem(AUTH_KEY), DEFAULT_AUTH);
}

export function setAuthState(patch: Partial<AuthState>) {
  if (typeof window === "undefined") return;
  const next = { ...getAuthState(), ...patch };
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(next));
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

export function getProgresoState(): ProgresoState {
  if (typeof window === "undefined") return DEFAULT_PROGRESO;
  const progreso = safeParse(window.localStorage.getItem(PROGRESO_KEY), DEFAULT_PROGRESO);

  // El Caso 01 se resuelve dentro del onboarding (`caso01Completado`), que vive en un
  // storage aparte — si todavía no se reflejó aquí, lo reconciliamos una sola vez para
  // que el mapa de Casos, la racha y el desbloqueo secuencial cuenten con información real.
  const onboarding = getOnboardingState();
  if (onboarding.caso01Completado && !progreso.casosResueltos.includes(1)) {
    const reconciliado: ProgresoState = {
      casosResueltos: [1, ...progreso.casosResueltos].sort((a, b) => a - b),
      insignias: { ...progreso.insignias, 1: onboarding.insignia ?? "Investigador Jr." },
      racha: progreso.racha || onboarding.racha || 1,
      ultimaFechaResuelto: progreso.ultimaFechaResuelto ?? hoyISO(),
    };
    window.localStorage.setItem(PROGRESO_KEY, JSON.stringify(reconciliado));
    return reconciliado;
  }

  return progreso;
}

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function esAyer(fechaISO: string): boolean {
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);
  return fechaISO === ayer.toISOString().slice(0, 10);
}

/**
 * Repaso espaciado (estilo Duolingo): en vez de bloquear el avance con un
 * candado de tiempo, cada día se sugiere UN Caso ya resuelto para repasar
 * (su versículo + reflexión) — así lo aprendido no se queda solo en el día
 * que se resolvió. Excluye el último Caso resuelto (repasarlo de inmediato
 * no suma nada) y elige de forma determinística por fecha, para que se vea
 * el mismo repaso todo el día en vez de cambiar en cada render.
 */
function semillaDelDia(): number {
  const d = new Date();
  return d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate();
}

export function getRepasoDelDia(): number | null {
  if (typeof window === "undefined") return null;
  const progreso = getProgresoState();
  const resueltos = progreso.casosResueltos;
  if (resueltos.length === 0) return null;
  const ultimo = resueltos[resueltos.length - 1];
  const candidatos = resueltos.length > 1 ? resueltos.filter((id) => id !== ultimo) : resueltos;
  return candidatos[semillaDelDia() % candidatos.length];
}

/** Marca un Caso como resuelto, guarda su insignia y actualiza la racha (día consecutivo). */
export function marcarCasoResuelto(casoId: number, insignia: string): ProgresoState {
  if (typeof window === "undefined") return DEFAULT_PROGRESO;
  const actual = getProgresoState();
  const yaResuelto = actual.casosResueltos.includes(casoId);
  const hoy = hoyISO();

  let racha = actual.racha;
  if (!yaResuelto) {
    if (!actual.ultimaFechaResuelto) racha = 1;
    else if (actual.ultimaFechaResuelto === hoy) racha = actual.racha || 1;
    else if (esAyer(actual.ultimaFechaResuelto)) racha = actual.racha + 1;
    else racha = 1;
  }

  const next: ProgresoState = {
    casosResueltos: yaResuelto ? actual.casosResueltos : [...actual.casosResueltos, casoId].sort((a, b) => a - b),
    insignias: { ...actual.insignias, [casoId]: insignia },
    racha,
    ultimaFechaResuelto: hoy,
  };
  window.localStorage.setItem(PROGRESO_KEY, JSON.stringify(next));
  return next;
}

export function reiniciarProgreso() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PROGRESO_KEY);
  window.localStorage.removeItem(ONBOARDING_KEY);
  window.localStorage.removeItem(AUTH_KEY);
}

/** ¿Hay alguna señal de que el usuario ya pasó por el onboarding? Usado para proteger `/app`. */
export function tieneAccesoApp(): boolean {
  if (typeof window === "undefined") return false;
  const onboarding = getOnboardingState();
  const auth = getAuthState();
  return onboarding.caso01Completado || auth.registrado;
}

/**
 * Un caso está desbloqueado si (a) está dentro de lo que el usuario tiene acceso —
 * el Módulo 1 gratis (1-4), o todos si pagó — Y (b) ya resolvió el Caso anterior.
 * El Caso 01 siempre está disponible como punto de entrada. Los Casos se van
 * abriendo en orden: no se puede saltar al 8 sin haber cerrado el 7.
 */
export function casoDesbloqueado(casoId: number): boolean {
  if (casoId === 1) return true;

  const auth = getAuthState();
  const dentroDelAcceso = casoId <= 4 || auth.camino === "pago";
  if (!dentroDelAcceso) return false;

  const progreso = getProgresoState();
  return progreso.casosResueltos.includes(casoId - 1);
}
