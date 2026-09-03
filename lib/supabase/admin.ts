// ⚠️ Cliente ADMIN de Supabase — usa la SUPABASE_SERVICE_ROLE_KEY, que se salta
// TODAS las políticas de RLS. SOLO se importa desde código de servidor que nunca
// llega al navegador (route handlers como app/api/hotmart/route.ts). JAMÁS
// importar este archivo desde un componente "use client" ni desde nada que
// termine en el bundle del cliente — eso filtraría la clave secreta a cualquiera
// que abra las herramientas de desarrollador del navegador.
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Falta SUPABASE_SERVICE_ROLE_KEY en las variables de entorno — el usuario " +
        "todavía no la completó en .env.local (ver ESTADO.md). El webhook de " +
        "Hotmart no puede operar sin ella."
    );
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
