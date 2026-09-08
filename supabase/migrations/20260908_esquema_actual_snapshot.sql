-- Snapshot del esquema real del proyecto Supabase "emuna" (project_id
-- gqqvwiddnhxintdqtuwl), capturado el 2026-09-08 por auditoría (ver ESTADO.md).
--
-- Por qué existe este archivo: hasta hoy el esquema completo solo vivía en el
-- proyecto remoto de Supabase — si se perdía el acceso o hacía falta
-- reproducirlo en otro entorno (staging, otra cuenta), no había forma de
-- reconstruirlo. Este archivo es la fuente de verdad versionada a partir de
-- ahora. Escrito con `create table if not exists` / `create or replace` para
-- que sea seguro de correr sobre una base ya migrada (no rompe si ya existen).
--
-- Migraciones aplicadas al proyecto remoto hasta la fecha (para referencia,
-- no se vuelven a aplicar desde acá): esquema_inicial_emuna,
-- aislar_handle_new_user, aislar_handle_new_user_v2, webhook_log_hotmart,
-- perfiles_hotmart_status, documentar_rls_solo_admin.

-- ============================================================================
-- perfiles — el padre/madre con cuenta. 1 fila por usuario de auth.users.
-- ============================================================================
create table if not exists public.perfiles (
  id uuid primary key references auth.users (id),
  email text not null,
  edad_hijo text,
  tiempo_semanal text,
  racha integer not null default 0,
  ultima_fecha_resuelto date,
  pagado boolean not null default false,
  hotmart_transaction_id text,
  hotmart_status text, -- último evento conocido de Hotmart: APPROVED/COMPLETE/REFUNDED/CHARGEBACK
  creado_en timestamptz not null default now()
);

alter table public.perfiles enable row level security;

drop policy if exists perfiles_select_propio on public.perfiles;
create policy perfiles_select_propio on public.perfiles
  for select using ((select auth.uid()) = id);

drop policy if exists perfiles_update_propio on public.perfiles;
create policy perfiles_update_propio on public.perfiles
  for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Sin policy de insert: las filas de perfiles se crean SOLO vía el trigger
-- handle_new_user (abajo), que corre con SECURITY DEFINER — el usuario nunca
-- inserta su propia fila directamente.

-- ============================================================================
-- progreso_casos — qué Casos resolvió cada perfil y con qué insignia.
-- ============================================================================
create table if not exists public.progreso_casos (
  perfil_id uuid not null references public.perfiles (id),
  caso_id integer not null,
  insignia text not null,
  resuelto_en timestamptz not null default now(),
  primary key (perfil_id, caso_id)
);

alter table public.progreso_casos enable row level security;

drop policy if exists progreso_select_propio on public.progreso_casos;
create policy progreso_select_propio on public.progreso_casos
  for select using ((select auth.uid()) = perfil_id);

drop policy if exists progreso_insert_propio on public.progreso_casos;
create policy progreso_insert_propio on public.progreso_casos
  for insert with check ((select auth.uid()) = perfil_id);

-- Sin policy de update/delete: un Caso resuelto no se puede "des-resolver" ni
-- editar desde el cliente — es intencional, no un olvido.

-- ============================================================================
-- compras_pendientes — reserva de compra cuando Hotmart aprueba el pago ANTES
-- de que el comprador cree su cuenta en la app. El trigger handle_new_user la
-- reconcilia automáticamente al registrarse.
-- ============================================================================
create table if not exists public.compras_pendientes (
  email text primary key,
  hotmart_transaction_id text not null,
  creado_en timestamptz not null default now()
);

alter table public.compras_pendientes enable row level security;
-- Sin políticas a propósito — ver comment on table más abajo.

-- ============================================================================
-- webhook_log — auditoría de cada intento del webhook de Hotmart (éxito y
-- fallo), para poder detectar "Hotmart dejó de mandar avisos" o ataques.
-- ============================================================================
create table if not exists public.webhook_log (
  id bigserial primary key,
  event_id text,
  type text,
  result text not null check (result in ('applied', 'duplicate', 'ignored', 'unauthorized', 'error')),
  received_at timestamptz not null default now()
);

create index if not exists webhook_log_received_idx on public.webhook_log (received_at desc);

alter table public.webhook_log enable row level security;
-- Sin políticas a propósito — ver comment on table más abajo.

comment on table public.compras_pendientes is
  'Sin políticas RLS a propósito: solo el cliente admin (service_role, que salta RLS) la lee/escribe, desde el webhook de Hotmart y el trigger handle_new_user. Ningún usuario autenticado debe poder leer compras de otros por email — de ahí que sea deny-by-default, no un RLS olvidado.';

comment on table public.webhook_log is
  'Sin políticas RLS a propósito: solo el cliente admin (service_role) escribe acá, desde app/api/hotmart/route.ts. Es un log de auditoría interno, no hay ninguna razón para que un usuario autenticado lo lea directamente.';

-- ============================================================================
-- handle_new_user — al crear la cuenta de auth, crea el perfil real y
-- reconcilia si ya había una compra pendiente de Hotmart con ese email.
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  pendiente record;
begin
  select * into pendiente from public.compras_pendientes where email = new.email limit 1;

  insert into public.perfiles (id, email, pagado, hotmart_transaction_id)
  values (
    new.id,
    new.email,
    pendiente.email is not null,
    pendiente.hotmart_transaction_id
  );

  if pendiente.email is not null then
    delete from public.compras_pendientes where email = pendiente.email;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
