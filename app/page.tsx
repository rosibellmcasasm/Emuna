import Link from "next/link";
import {
  Brain,
  MessageCircleQuestion,
  Frown,
  Tv,
  PiggyBank,
  Search,
  Check,
  ShieldCheck,
  Lock,
  Compass,
} from "lucide-react";
import { SiteHeader } from "@/components/app/SiteHeader";
import { StickyCta } from "@/components/app/StickyCta";
import { RevealGroup, RevealItem } from "@/components/app/Reveal";
import { IconChip } from "@/components/app/IconChip";
import { GradientBorderCard } from "@/components/app/GradientBorderCard";
import { Caso01Mockup } from "@/components/app/Caso01Mockup";
import { FaqAccordion } from "@/components/app/FaqAccordion";

const DOLORES = [
  {
    icon: Brain,
    pregunta:
      "¿Tienes miedo de que cuando tu hijo entre a la secundaria o la universidad, abandone la fe y se vuelva agnóstico o ateo?",
  },
  {
    icon: MessageCircleQuestion,
    pregunta:
      "¿Tu hijo te hace una pregunta difícil sobre la Biblia o la ciencia y te quedas en blanco sin saber qué responder?",
  },
  {
    icon: Frown,
    pregunta:
      "¿Le hablas de Dios y te pone cara de aburrimiento, como si fuera una clase obligatoria más?",
  },
  {
    icon: Tv,
    pregunta:
      "¿Sientes que la cultura, el colegio y TikTok le están enseñando a tu hijo más que tú en tu propia casa?",
  },
  {
    icon: PiggyBank,
    pregunta:
      "¿Gastaste en libros y devocionales que terminaron tirados en el estante agarrando polvo a la semana?",
  },
];

const PASOS_MECANISMO = [
  {
    numero: "01",
    titulo: "Se abre el expediente",
    texto: "Cada semana, un Caso nuevo llega con una pregunta real que tu hijo ya se hace.",
  },
  {
    numero: "02",
    titulo: "Investigan juntos",
    texto: "Pistas de ciencia, historia y lógica — en lenguaje de padre, sin preparar nada.",
  },
  {
    numero: "03",
    titulo: "Se cierra el Caso",
    texto: "Una conclusión clara + una insignia. 10 minutos, y el escudo lógico creció un poco más.",
  },
];

const STACK_VALOR = [
  {
    titulo: "Los 52 Casos del año (acceso de por vida)",
    detalle: "1 Caso nuevo por semana, todo el año — sin que se te acabe el contenido",
    valor: "$120",
  },
  {
    titulo: "Guía de Respuestas Rápidas (Modo Guía)",
    detalle: "La explicación lista en lenguaje de padre para cuando la pregunta te agarra desprevenida",
    valor: "$27",
  },
  {
    titulo: "Rachas e insignias de investigador",
    detalle: "Para que tu hijo sea quien pida hacer el Caso de la semana",
    valor: "$19",
  },
];

const totalStack = 120 + 27 + 19;

const FAQ = [
  {
    question:
      "Ya me han estafado con suscripciones que mi hijo usa dos días y me siguen cobrando. ¿Emuná es igual?",
    answer:
      "No. Emuná es pago único de $29: pagas una vez y el acceso a los 52 Casos es de por vida. Sin mensualidades, sin que te sigan cobrando aunque no la abras.",
  },
  {
    question: "En la iglesia me dan material gratis, ¿por qué pagaría por esto?",
    answer:
      "Ese material es estático: tú tienes que leerlo y prepararlo antes de cada clase. Emuná es una experiencia interactiva que tu hijo pide hacer solo, sin que tú prepares nada.",
  },
  {
    question: "Mis hijos se aburren con teología a los 5 minutos, como con los libros. ¿Esto es distinto?",
    answer:
      "Es formato detective, no lectura: tu hijo investiga pistas y resuelve un enigma. La primera victoria jugable llega en menos de 5 minutos — pruébala gratis con el Caso 01.",
  },
  {
    question: "No soy teóloga ni pastora. ¿Me voy a enredar explicándosela a mi hijo?",
    answer:
      "El Modo Guía te da la explicación lista en lenguaje de padre, sin preparación previa. Solo lees junto a tu hijo y avanzan juntos.",
  },
  {
    question: "¿El contenido encaja con mi iglesia?",
    answer:
      "Emuná trabaja el cristianismo mero: la existencia de Dios, la historicidad de Jesús, la fiabilidad de la Biblia y el problema del sufrimiento — sin postura interdenominacional, para que encaje con cualquier tradición cristiana.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* 1. HERO */}
        <section className="bg-surface-base">
          <div className="mx-auto max-w-[1200px] px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 md:grid md:grid-cols-2 md:items-center md:gap-12 md:pb-28 md:pt-20">
            <div>
              <h1
                className="text-[42px] font-extrabold leading-[1.06] tracking-tight text-txt-primary sm:text-[52px] md:text-[64px]"
                style={{ textWrap: "balance" }}
              >
                El <span className="text-brand-primary">Caso</span> de 10 minutos
                que hace a tu hijo defender su fe con lógica
              </h1>
              <p className="mt-5 max-w-[420px] text-[17px] leading-relaxed text-txt-secondary sm:text-lg">
                Casos semanales tipo detective que resuelven juntos, padre e hijo —
                con evidencia real de ciencia, historia y lógica.
              </p>

              <div id="hero-cta" className="mt-7">
                <Link
                  href="/onboarding"
                  className="flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[17px] font-semibold text-txt-inverse shadow-[0_8px_30px_color-mix(in_oklab,var(--brand-primary)_20%,transparent)] transition active:scale-[0.97] sm:w-auto sm:px-10"
                >
                  Resolver el Caso 01 gratis
                </Link>
                <p className="mt-3 flex items-center gap-1.5 text-[13px] text-txt-secondary">
                  <ShieldCheck size={15} className="text-brand-secondary" aria-hidden="true" />
                  Módulo 1 gratis, sin tarjeta ni cuenta — pago único, nunca suscripción
                </p>
              </div>
            </div>

            <div className="mt-10 md:mt-0">
              <div className="mx-auto flex max-w-[320px] justify-center rounded-[28px] border border-border-default bg-surface-primary p-6 shadow-[0_8px_30px_color-mix(in_oklab,var(--brand-primary)_15%,transparent)]">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <IconChip tone="gold">
                      <Search size={22} color="var(--brand-primary)" aria-hidden="true" />
                    </IconChip>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-brand-primary">
                        Caso 01
                      </p>
                      <p className="text-sm font-semibold text-txt-primary">
                        El Enigma del Origen del Universo
                      </p>
                    </div>
                  </div>
                  <p className="rounded-[var(--radius-md)] bg-surface-secondary p-4 text-[14px] leading-relaxed text-txt-secondary">
                    &ldquo;Mamá, un amigo en el colegio dijo que la ciencia probó que
                    Dios no existe, ¿es verdad?&rdquo;
                  </p>
                  <p className="text-center text-[12px] text-txt-tertiary">
                    Así empieza cada expediente de la semana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROBLEMA + 3. AGITACIÓN — mismo bloque elevado */}
        <section className="bg-surface-secondary">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
            <RevealGroup className="mx-auto max-w-[640px]">
              <RevealItem>
                <h2 className="text-center text-[28px] font-bold text-txt-primary sm:text-4xl">
                  ¿Te suena?
                </h2>
              </RevealItem>
              <div className="mt-9 flex flex-col gap-5">
                {DOLORES.map(({ icon: Icon, pregunta }) => (
                  <RevealItem key={pregunta} className="flex items-start gap-4">
                    <IconChip tone="rust" size={40}>
                      <Icon size={20} color="var(--brand-detail)" aria-hidden="true" />
                    </IconChip>
                    <p className="text-[17px] font-medium leading-snug text-txt-primary">
                      {pregunta}
                    </p>
                  </RevealItem>
                ))}
              </div>

              <RevealItem className="mt-12 border-t border-border-default pt-10">
                <p className="text-[16px] leading-relaxed text-txt-secondary">
                  Cada semana que pasa sin una herramienta, tu hijo sigue absorbiendo el
                  escepticismo del entorno sin ningún contrapeso en casa. Y no es un
                  drama lejano: en{" "}
                  <span className="font-bold text-txt-primary">1 o 2 años</span>, ese
                  vacío puede ser justo lo que lo aleje de la fe en la secundaria o la
                  universidad.
                </p>
                <p className="mt-4 text-[16px] leading-relaxed text-txt-secondary">
                  La escuela dominical le da 1 hora a la semana y no toca ciencia ni
                  lógica. Los devocionales se quedan en el estante. Nada de eso resuelve
                  la pregunta que tu hijo hace un martes a las 5 de la tarde.
                </p>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {/* 4. SOLUCIÓN */}
        <section className="bg-surface-base">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
            <RevealGroup className="mx-auto max-w-[720px] text-center">
              <RevealItem>
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-brand-primary">
                  El mecanismo
                </p>
                <h2 className="mt-2 text-[28px] font-bold text-txt-primary sm:text-4xl">
                  Conoce el Expediente de la Semana
                </h2>
                <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-relaxed text-txt-secondary">
                  No es falta de fe — es que nadie le mostró la evidencia. El Expediente
                  de la Semana convierte cada duda en un Caso que se investiga y se
                  resuelve, en 10 minutos, sin que tú prepares nada.
                </p>
              </RevealItem>

              <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
                {PASOS_MECANISMO.map((paso) => (
                  <RevealItem key={paso.numero} className="flex flex-col items-start gap-3">
                    <div className="flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-brand-primary-soft">
                      <span className="text-base font-bold tabular-nums text-brand-primary">
                        {paso.numero}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-txt-primary">
                      {paso.titulo}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-txt-secondary">
                      {paso.texto}
                    </p>
                  </RevealItem>
                ))}
              </div>
            </RevealGroup>
          </div>
        </section>

        {/* 5. LA APP POR DENTRO — mockup honesto del mecanismo */}
        <section className="bg-surface-secondary">
          <div className="mx-auto max-w-[1200px] px-4 py-16 text-center sm:px-6 sm:py-24">
            <RevealGroup>
              <RevealItem>
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-brand-primary">
                  Así se ve por dentro
                </p>
                <h2 className="mt-2 text-[28px] font-bold text-txt-primary sm:text-4xl">
                  El Caso 01, resuélvelo aquí mismo
                </h2>
                <p className="mx-auto mt-4 max-w-[480px] text-[17px] leading-relaxed text-txt-secondary">
                  Toca &ldquo;Siguiente pista&rdquo; y recorre el expediente completo —
                  es exactamente lo que tu hijo va a vivir.
                </p>
              </RevealItem>

              <RevealItem className="mt-12">
                <Caso01Mockup />
              </RevealItem>

              <RevealItem className="mt-12">
                <Link
                  href="/onboarding"
                  className="inline-flex h-14 items-center justify-center rounded-[var(--radius-md)] bg-brand-primary px-10 text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97]"
                >
                  Resolver el Caso 01 gratis
                </Link>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {/* 6. OFERTA — pago único */}
        <section id="oferta" className="bg-surface-base">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24">
            <RevealGroup className="mx-auto max-w-[560px] text-center">
              <RevealItem>
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-brand-primary">
                  La oferta
                </p>
                <h2 className="mt-2 text-[28px] font-bold text-txt-primary sm:text-4xl">
                  Un solo pago. Acceso de por vida.
                </h2>
              </RevealItem>
            </RevealGroup>

            <div className="mx-auto mt-10 max-w-[440px]">
              <GradientBorderCard thickness={2} className="bg-surface-primary p-7 shadow-[0_12px_40px_color-mix(in_oklab,var(--brand-primary)_18%,transparent)] sm:p-9">
                <span className="inline-block rounded-full bg-brand-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-primary">
                  Pago único · sin mensualidades
                </span>

                <ul className="mt-6 flex flex-col gap-3">
                  {STACK_VALOR.map((item) => (
                    <li key={item.titulo} className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-secondary-soft">
                        <Check size={14} strokeWidth={2.5} color="var(--brand-secondary)" aria-hidden="true" />
                      </div>
                      <div className="flex flex-1 items-baseline justify-between gap-2">
                        <div>
                          <p className="text-[14.5px] font-semibold text-txt-primary">
                            {item.titulo}
                          </p>
                          <p className="text-[13px] text-txt-secondary">{item.detalle}</p>
                        </div>
                        <span className="shrink-0 text-[13px] tabular-nums text-txt-tertiary line-through">
                          {item.valor}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-border-default pt-6 text-center">
                  <p className="text-[13px] text-txt-tertiary">
                    Valor total{" "}
                    <span className="line-through">${totalStack}</span>
                  </p>
                  <p className="mt-1 text-[40px] font-extrabold tabular-nums text-txt-primary">
                    $29
                  </p>
                  <p className="text-[13px] text-txt-secondary">
                    pago único · acceso de por vida a los 52 Casos
                  </p>
                </div>

                <Link
                  href="/onboarding"
                  className="mt-7 flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97]"
                >
                  Desbloquear los 52 Casos
                </Link>
                <p className="mt-3 text-center text-[12.5px] text-txt-tertiary">
                  Empiezas gratis con el Módulo 1 — pagas solo si decides seguir
                </p>
              </GradientBorderCard>
            </div>
          </div>
        </section>

        {/* 7. GARANTÍA */}
        <section className="bg-surface-secondary">
          <div className="mx-auto max-w-[640px] px-4 py-12 text-center sm:px-6 sm:py-16">
            <IconChip tone="sage" size={60} shape="circle">
              <ShieldCheck size={30} color="var(--brand-secondary)" aria-hidden="true" />
            </IconChip>
            <h3 className="mt-4 text-xl font-bold text-txt-primary sm:text-2xl">
              La Garantía del Primer Caso Resuelto
            </h3>
            <p className="mx-auto mt-3 max-w-[440px] text-[15.5px] leading-relaxed text-txt-secondary">
              Si en tus primeros 7 días tu hijo y tú no sienten que resolvieron su
              primer Caso de verdad, escríbenos y te devolvemos todo. Un correo, sin
              preguntas, sin formulario.
            </p>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[13px] text-txt-tertiary">
              <Lock size={14} aria-hidden="true" />
              Respaldada por la garantía Hotmart de 7 días
            </p>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="bg-surface-base">
          <div className="mx-auto max-w-[680px] px-4 py-16 sm:px-6 sm:py-24">
            <h2 className="text-center text-[28px] font-bold text-txt-primary sm:text-4xl">
              Preguntas antes de empezar
            </h2>
            <div className="mt-10">
              <FaqAccordion items={FAQ} />
            </div>
          </div>
        </section>

        {/* 9. CTA FINAL EMOCIONAL */}
        <section id="cta-final" className="bg-surface-inverse">
          <div className="mx-auto max-w-[640px] px-4 py-20 text-center sm:px-6 sm:py-28">
            <IconChip tone="gold" size={52} shape="circle">
              <Compass size={26} color="var(--brand-primary)" aria-hidden="true" />
            </IconChip>
            <h2 className="mt-6 text-[30px] font-bold leading-tight text-txt-inverse sm:text-[40px]">
              Imagina la próxima pregunta difícil de tu hijo
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#D8C9A3]">
              Esta vez no te congelas: abren el expediente juntos, investigan la
              evidencia, y tu hijo llega a su propia conclusión — con argumentos que
              son suyos.
            </p>
            <Link
              href="/onboarding"
              className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] bg-brand-primary px-10 text-[16px] font-semibold text-txt-inverse transition active:scale-[0.97] sm:w-auto"
            >
              Resolver el Caso 01 gratis
            </Link>
            <p className="mt-3 text-[13px] text-[#B9A87C]">
              Garantía del Primer Caso Resuelto · pago único de $29, nunca suscripción
            </p>
            <p className="mx-auto mt-8 max-w-[440px] border-l-2 border-brand-primary/50 pl-4 text-left text-[14px] italic leading-relaxed text-[#C9BB9A]">
              PD: Emuná convierte la fe de tu hijo de una memoria infantil en un
              escudo lógico, con 10 minutos a la semana en formato detective. Hoy
              entras gratis con el Caso 01; si decides seguir, son $29 de pago único
              por los 52 Casos, respaldado por la Garantía del Primer Caso Resuelto.
            </p>
          </div>
        </section>

        {/* 10. FOOTER LEGAL */}
        <footer className="bg-surface-base">
          <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-txt-secondary">
              <Link href="/privacidad" className="min-h-11 py-2.5 hover:text-txt-primary">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="min-h-11 py-2.5 hover:text-txt-primary">
                Términos y Condiciones
              </Link>
              <Link href="/reembolsos" className="min-h-11 py-2.5 hover:text-txt-primary">
                Política de Reembolso
              </Link>
              <Link href="/contacto" className="min-h-11 py-2.5 hover:text-txt-primary">
                Contacto y soporte
              </Link>
            </div>
            <p className="mt-4 text-[13px] text-txt-tertiary">
              © 2026 Emuná · soporte@emuna.app
            </p>
          </div>
        </footer>
      </main>
      <StickyCta />
    </>
  );
}
