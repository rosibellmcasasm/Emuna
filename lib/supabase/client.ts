// Cliente de Supabase para el navegador ("use client"). Usa la URL y la llave
// publicable — ambas seguras de exponer, por eso viven en NEXT_PUBLIC_*. Todo
// acceso desde aquí pasa por RLS (Row Level Security): el usuario solo puede
// leer/escribir SUS propias filas (perfiles/progreso_casos), nunca las de otros.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
