// Recibe el enlace mágico que Supabase manda por correo (ver
// `app/onboarding/registro/page.tsx`, que dispara `signInWithOtp`).
//
// Las respuestas del onboarding (edad/tiempo/Caso 01) viajan en los parámetros
// del propio link — no en localStorage — para que la migración funcione aunque
// el usuario abra el correo en otro dispositivo. Una vez hay sesión, se
// escriben en el perfil real. RLS permite que cada usuario actualice/inserte
// SOLO sus propias filas (`perfiles_update_propio`, `progreso_insert_propio`),
// así que no hace falta el cliente admin acá.
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/app";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const edad = searchParams.get("edad");
      const tiempo = searchParams.get("tiempo");
      const caso01 = searchParams.get("caso01") === "1";
      const insignia = searchParams.get("insignia");

      const patchPerfil: Record<string, string> = {};
      if (edad) patchPerfil.edad_hijo = edad;
      if (tiempo) patchPerfil.tiempo_semanal = tiempo;

      if (caso01) {
        // El Caso 01 ya se resolvió sin cuenta — se migra al perfil real.
        // `ignoreDuplicates` hace esto seguro si el usuario abre el enlace dos veces.
        await supabase.from("progreso_casos").upsert(
          { perfil_id: data.user.id, caso_id: 1, insignia: insignia || "Investigador Jr." },
          { onConflict: "perfil_id,caso_id", ignoreDuplicates: true }
        );
        patchPerfil.racha = "1";
        patchPerfil.ultima_fecha_resuelto = new Date().toISOString().slice(0, 10);
      }

      if (Object.keys(patchPerfil).length > 0) {
        await supabase.from("perfiles").update(patchPerfil).eq("id", data.user.id);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // El enlace no era válido o ya expiró (los de Supabase duran 1 hora por defecto).
  return NextResponse.redirect(`${origin}/onboarding/registro?error=enlace_invalido`);
}
