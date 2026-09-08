# ESTADO — Emuná
Última actualización: 2026-09-08 | Sesión actual: 6 (Supabase/Hotmart conectados, auditoría 7.5/10)

## Auditoría exhaustiva (2026-09-08) — hallazgo crítico CORREGIDO
Se corrió una auditoría de 6 dimensiones (producto, diseño, UX, backend, seguridad, IA). Puntaje: 7.5/10.
- **CRÍTICO (ya arreglado):** el progreso del Caso 01 resuelto sin cuenta no se reflejaba en `/app`
  si el usuario entraba antes de confirmar el enlace mágico — `getProgresoState()` devolvía ceros
  ignorando el estado local. Fix en `lib/onboarding-store.ts` (deriva el progreso de
  `getOnboardingState()` cuando no hay sesión) + guard en `app/app/caso/[id]/page.tsx` (Casos 2+
  ahora exigen cuenta real antes de dejar jugar — evita la "celebración falsa" que no se guardaba).
  Verificado con Playwright: dashboard pasó de 🔥0·0/52 a 🔥1·1/52 con el Caso 1 marcado; intentar
  el Caso 02 sin cuenta redirige a `/onboarding/registro?camino=gratis` en vez de dejarlo jugar.
- Pendientes de la auditoría (no críticos, sin ejecutar todavía): rate limiting en `signInWithOtp`,
  versionar el esquema de Supabase como migración en el repo (`supabase db diff`), documentar que
  `compras_pendientes`/`webhook_log` son RLS-sin-políticas a propósito (solo `service_role`), pasar
  las pantallas por el subagente `revisor-visual` real (esta auditoría se autoevaluó).
- Pendientes del usuario (datos legales, sin bloquear nada): nombre legal del negocio, correo de
  soporte real, país fiscal — pendientes de que el usuario los confirme para completar
  `/privacidad`, `/terminos`, `/reembolsos`, `/contacto`.

⏸️ CHECKPOINT — Última acción completada: Sesión 4 — onboarding real (8 pantallas) + paywall +
registro/confirmación construidos sobre Next.js App Router + Tailwind v4, reemplazando el
placeholder anterior de `/onboarding`. Flujo completo: Bienvenida → Edad → Reto (eco textual de
Dolores #2/#3/#4 de FICHA-AVATAR.md) → Reconocimiento (dolor emocional #6, desculpabilizado) →
Tiempo semanal (eco del deseo #5) → Loading "Armando tu primer Expediente…" (anillo animado +
checklist secuencial, ~3.1s) → Caso 01 interactivo real (pistas tocables, selección de conclusión
con feedback correcto/incorrecto sin skip, insignia "Investigador Jr." con celebración spring) →
Resumen personalizado (usa edad/tiempo elegidos + racha 🔥1 + insignia) → Paywall → Registro
(simulado) → Confirmación. Paywall responde las 7 preguntas de `02B`: headline de resultado con
datos del onboarding, value stack de 3 beneficios (mismos que landing), precio $29 pago único sin
ancla mensual (no aplica a este modelo), línea de diferenciador #1 (objeción de suscripciones,
textual de FICHA-AVATAR.md), Garantía del Primer Caso Resuelto, y salida limpia real "Seguir
gratis con el Módulo 1" (no un simple "ahora no" — lleva a registro gratis funcional). Registro
distingue camino "pago" (confirma cuenta creada y avisa honestamente que Hotmart se conecta en
Sesión 6, sin simular un cobro falso) vs "gratis" (confirma acceso a Casos 1-4). Estado 100%
simulado en localStorage (`lib/onboarding-store.ts`) — cero backend.
Componentes nuevos: `components/onboarding/OnboardingShell.tsx` (barra de progreso animada +
atrás + logo, regla de marca de 50), `components/onboarding/ChipOption.tsx` (chip de selección
única con auto-avance 300ms). El Caso 01 del onboarding es una generalización interactiva real de
`components/app/Caso01Mockup.tsx` (mismo contenido: "El Enigma del Origen del Universo", mismas
pistas de Ciencia/Lógica, misma conclusión correcta), no solo el mockup de la landing.
Verificado: `tsc --noEmit` limpio, `next build` genera 19 rutas estáticas sin errores, dev server
sin errores de consola (0 errores en toda la sesión de Playwright). Flujo recorrido end-to-end con
`mcp__playwright__*` a 375px: las 8 pantallas del onboarding, el Caso 01 completo (incluida
respuesta incorrecta con reintento y luego correcta), paywall, y AMBOS caminos de registro
(pago y gratis) hasta confirmación. Confirmado por búsqueda de texto: cero menciones de
"suscripción"/"/mes"/"trial de días" como oferta en ningún archivo de `app/onboarding` —
las únicas coincidencias son el copy que NIEGA la suscripción (diferenciador #1).
NOTA: el veredicto visual fue AUTOEVALUADO por el propio agente constructor (no se invocó el
subagente `revisor-visual` independiente) — pendiente pasar por el revisor real (rúbricas /40
usabilidad y /20 craft) antes de declarar estas pantallas 100% cerradas según Regla de Oro 7,
igual que la landing de la Sesión 3.
Siguiente acción exacta: Sesión 5 — app interna con los 52 Casos reales (crear `lib/casos.ts`
dato-driven, usar los 13 libros del usuario como inspiración temática, construir las pantallas de
racha/insignias/biblioteca de Casos que hoy solo se mencionan en el resumen del onboarding).

## Qué es esta app (3 líneas máximo)
App interactiva de aventuras y enigmas lógicos en español que enseña a niños de 8-12 años a entender, razonar y defender su fe cristiana frente al escepticismo. Formato: "Casos" semanales tipo detective (52 en total) resueltos en pareja padre-hijo, 10 minutos a la semana. Monetización: pago único de $29 (acceso de por vida), con Módulo 1 (primeros Casos) gratis.

## Promesa central / Big Idea (ya validada por el usuario en su propia investigación)
"El entrenamiento de 10 minutos a la semana en formato detective que transforma la fe de tu hijo de una memoria infantil a un escudo lógico e inquebrantable contra el escepticismo del mundo."

## Reporte de validación
- Veredicto: Excelente oportunidad — el propio usuario trae investigación de mercado + avatar + ángulo de venta ya trabajados (ver FICHA-AVATAR.md)
- Competencia que el avatar ya probó y odia: YouVersion para Niños (muy infantil, pasivo) · devocionales PDF (requieren preparación del padre) · Escuela Dominical (1h/semana, no aborda ciencia/lógica)
- Brecha confirmada: nada en el mercado combina formato detective/gamificado + apologética real para 8-12 años + pago único sin suscripción

## Fuentes aportadas por el usuario (no re-derivar, ya es evidencia de primera mano)
- `1. Investigación.docx` — perfil de Carolina Herrera, 10 dolores, 10 deseos, 4 objeciones, voice of customer, ángulo de venta — volcado completo en FICHA-AVATAR.md
- Serie propia de 13 libros ilustrados "Descubriendo el Por Qué de la Fe" (13 × 4 semanas = 52 semanas, coincide con los 52 Casos) — INSPIRACIÓN de contenido (no copiar texto literal) e INSPIRACIÓN visual (no copiar los assets originales, algunos interiores son stock/Freepik)
- Temas confirmados por los títulos de portada: Libro 1 "¿Quién es Dios? Descubriendo al Creador de todo" · Libro 5 "¿Por qué las cosas salen mal? Entendiendo el pecado" (quedan 11 más por revisar cuando se escriba el contenido de cada módulo)

## Dirección de Arte (APROBADA — paleta/tipografía/isotipo)
- Referencia del usuario: SÍ — portadas de los 13 libros (niños exploradores con ropa de expedición, ilustración pintada cálida, escenarios de aventura/arqueología al atardecer, dorado + verde salvia + crema envejecido, motivo de lupa ya presente en el Libro 1)
- Tratamiento: se ADAPTA el espíritu (paleta, personalidad "explorador/aventurero"), NUNCA se clonan los assets originales — se construye una identidad propia de UI inspirada en esa paleta y personalidad
- Paleta y tipografía APROBADAS (FICHA-ARTE.md, 2026-09-02): crema `#F3EAD6`, dorado `#C9922E`, verde salvia `#4E6B49`, óxido `#B5502E`, tipografía Baloo 2, personalidad "cuaderno de campo de explorador" (no "app juguetona" genérica) — implementadas en `app/globals.css` vía `@theme inline` de Tailwind v4
- Isotipo: DEFINITIVO (2026-09-02) — cruz de tablón (puntas redondeadas) en dorado con un
  corazón cálido en el centro y 2 destellos dorados alrededor. Geometría de referencia:
  `public/brand/isotipo-cruz-corazon.svg`. Reemplazó el placeholder "E" en TODO el proyecto.
  Implementado como componente reutilizable `components/brand/Mark.tsx`, que exporta:
  - `Mark` (versión estática, sin animación) — usado en `components/app/SiteHeader.tsx` (landing),
    `components/onboarding/OnboardingShell.tsx` (cascarón de las 8 pantallas de pregunta),
    `app/onboarding/page.tsx` (bienvenida), `app/onboarding/paywall/page.tsx`,
    `app/onboarding/registro/page.tsx`.
  - `AnimatedMark` (mismo SVG + `@keyframes ch-beat`/`ch-twinkle` inline, respeta
    `prefers-reduced-motion`) — usado en `app/onboarding/generando/page.tsx` (reemplazó el anillo
    de progreso SVG por el isotipo animado, con el % debajo), `app/onboarding/caso-01/page.tsx`
    (celebración "Caso resuelto" — reemplazó el ícono `Award` genérico; la insignia "Investigador
    Jr." se mantiene intacta), y `components/app/Caso01Mockup.tsx` (paso final "La insignia" del
    mockup interactivo de la landing).
  - Favicon: `app/favicon.ico` (placeholder por defecto de Next) fue ELIMINADO; `app/icon.svg`
    (versión estática) es ahora la única fuente — Next lo sirve automático como
    `<link rel="icon" type="image/svg+xml">`.
  Verificado con Playwright a 375px: header de landing, loading del onboarding (animación
  `ch-beat`/`ch-twinkle` confirmada corriendo vía `getComputedStyle` — transform matrix con scale
  intermedio, no estático) y celebración del Caso 01 (screenshot con la insignia "Investigador
  Jr." + isotipo animado). `tsc --noEmit` y `next build` limpios, 0 errores de consola.
  Pendiente menor: la versión antigua lupa+cruz (`public/brand/isotipo-emuna-v5.svg`, ya
  rechazada) sigue en el repo sin referenciar — se puede borrar en limpieza futura.

## Estrategia de monetización (CONFIRMADA — coincide con la decisión ya tomada antes del reinicio)
- Modelo: onboarding-first anónimo, PAGO ÚNICO de $29 (acceso de por vida), sin mensualidades
- Trial: Módulo 1 (primeros Casos) gratis, sin cuenta ni tarjeta
- Justificación: el propio documento de investigación del usuario confirma la objeción #1 real ("ya me han estafado con suscripciones... me siguen cobrando sin que nadie la use") y que "lo que SÍ quiere escuchar" es pago único de por vida

## Decisiones técnicas
- Framework: Next.js App Router (16.3.4) + Tailwind v4 (CSS-first, `@theme` en `app/globals.css`) + TypeScript + ESLint — scaffold de `51-STACK-PINEADO.md`, `--no-src-dir`, `app/` en la raíz
- Librerías instaladas: `motion` (animación), `lucide-react` (íconos), `@phosphor-icons/react` (íconos duotone, aún no usado en la landing — disponible para onboarding/app interna)
- Mecanismo bautizado: "el Expediente de la Semana" (usado en la sección 4 SOLUCIÓN de la landing) — el nombre "Caso" se usa como unidad de contenido (Caso 01, Caso 02...) y convive con el mecanismo bautizado sin colisionar
- Componentes reutilizables creados en `components/app/`: `IconChip`, `GradientBorderCard`, `Reveal` (RevealGroup/RevealItem, stagger con Motion), `CountUp` (aún sin usar en la landing — sin número héroe que contar; queda disponible para Sesión 5, métricas de racha/insignias), `FaqAccordion`, `Caso01Mockup` (mockup honesto e interactivo del mecanismo, sección 5), `StickyCta`, `SiteHeader`, `LegalPage`
- Arquitectura de Casos (dato-driven, `lib/casos.ts`) todavía NO creada — se construye en la Sesión 5 (app interna)
- Auth/datos reales: Supabase + Hotmart, todavía NO conectados (Sesión 6)

## Próximas sesiones 📋
- Sesión 5: app interna (52 Casos) — usar los 13 libros como inspiración temática para ir escribiendo más Casos completos; crear `lib/casos.ts`
- Sesión 6: Supabase + Hotmart reales (incluye configurar el plazo de reembolso de Hotmart en 7 días para que coincida con la Garantía del Primer Caso Resuelto ya publicada en la landing, y conectar el checkout real detrás del botón "Desbloquear los 52 Casos" del paywall)

## Pendientes del usuario
- [ ] Revisar el borrador de las páginas legales (`/privacidad`, `/terminos`, `/reembolsos`, `/contacto`) — tienen placeholders ⚠️ marcados para: nombre legal del negocio, correo de soporte real, país de residencia fiscal, proveedores de datos (confirmar Supabase/Hotmart/Resend cuando se conecten en Sesión 6)
- [ ] Más adelante: cuentas de Supabase, Vercel, Hotmart (Sesión 6)

## Pendientes técnicos abiertos de la landing (Sesión 3)
- [ ] La sección 5 "La app por dentro" usa el mockup interactivo `Caso01Mockup` (HTML/Motion, honesto sobre no ser captura real) en vez del carrusel de 3-5 screenshots reales que pide `19-PAGINA-DE-VENTAS.md` — normal y esperado porque la app interna todavía no existe (Sesión 5). Cuando exista, reemplazar por el carrusel real con las specs de `55-DISENO-DE-LANDING.md` §5.
- [ ] No hay prueba social (testimonios/contadores) — correcto según la jerarquía de prueba social en frío del día 1 (garantía + demo en vivo), no inventar nada hasta tener datos reales.
- [ ] El veredicto visual de esta sesión fue AUTOEVALUADO por el agente constructor (screenshots con Playwright a 375px, sin errores de consola) — falta pasar por el subagente `revisor-visual` independiente con las rúbricas /40 y /20 antes de dar la landing por 100% cerrada (Regla de Oro 7).
- [ ] Revisar si conviene reforzar el nombre "Expediente de la Semana" vs. simplemente "Caso" en más lugares de la app interna (Sesión 5).

## Pendientes técnicos abiertos del onboarding/paywall (Sesión 4)
- [ ] Registro y auth son 100% simulados en `localStorage` (`lib/onboarding-store.ts`) — sin Supabase real hasta la Sesión 6. El botón "Continuar con Google" no dispara OAuth real, solo simula el estado.
- [ ] El botón "Desbloquear los 52 Casos" del paywall lleva a `/onboarding/registro?camino=pago`, que crea la cuenta simulada y AVISA honestamente al usuario que el checkout de Hotmart aún no está conectado — no hay ningún cobro real ni falso simulado (evita el anti-patrón de checkout falso de `50-DISENO-ONBOARDING-PAYWALL.md` C3ter).
- [ ] El camino "Seguir gratis con el Módulo 1" del paywall SÍ otorga acceso real simulado a los Casos 2-4 (vía `AuthState.camino === "gratis"`) — falta construir en Sesión 5 la pantalla que efectivamente lea ese estado para mostrar/ocultar Casos 5-52 según `camino` y si hubo pago.
- [ ] El veredicto visual de esta sesión fue AUTOEVALUADO por el agente constructor — falta pasar por el subagente `revisor-visual` independiente (rúbricas /40 y /20, más los criterios propios de onboarding/paywall de `50-DISENO-ONBOARDING-PAYWALL.md` sección D) antes de declarar estas pantallas 100% cerradas (Regla de Oro 7).
- [ ] La pregunta de "reto" (pantalla 3) y "tiempo" (pantalla 5) tienen botón "Saltar" por instrucción explícita del usuario — revisar si conviene quitarlo si en el futuro se decide que son preguntas de personalización core (hoy son solo 2 de 5 preguntas del onboarding corto, no un quiz largo tipo Noom).

## Notas para la próxima sesión
- NO copiar ni usar directamente ninguna imagen de los PDFs de los 13 libros en la app — son referencia de estilo/contenido, no assets finales (posible contenido de stock de terceros en interiores, y el usuario pidió explícitamente "no plagiar, inspirarte").
- Los archivos originales del usuario viven en `C:\Users\casas\OneDrive\Escritorio\MECLUB\Emun+a\` — fuera del proyecto, no mover ni copiar esos PDFs al repo.
- El archivo `public/brand/isotipo-emuna-v5.svg` (lupa+cruz, rechazado) sigue existiendo en el repo pero NO está referenciado en ningún lado del código — es historial, no un asset activo.
