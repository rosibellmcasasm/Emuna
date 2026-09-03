/**
 * Isotipo oficial de Emuná — cruz de tablón (puntas redondeadas) en dorado
 * con un corazón cálido en el centro y 2 destellos dorados alrededor.
 * Geometría exacta tomada de `public/brand/isotipo-cruz-corazon.svg`.
 *
 * `Mark` es la versión ESTÁTICA (favicon, header, botones "volver al inicio").
 * `AnimatedMark` (en este mismo archivo) reusa la misma geometría y agrega el
 * latido del corazón + titileo de los destellos vía CSS — usar solo en momentos
 * de espera/celebración (loading del onboarding, insignia del Caso 01).
 */

type MarkProps = {
  size?: number;
  className?: string;
  /** Texto accesible. Vacío por defecto porque casi siempre va junto al wordmark "Emuná". */
  title?: string;
};

function MarkGeometry({ animated, uid }: { animated: boolean; uid: string }) {
  const heartId = `${uid}-heart`;
  const spark1Id = `${uid}-spark-1`;
  const spark2Id = `${uid}-spark-2`;

  return (
    <>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF3E1" />
          <stop offset="100%" stopColor="var(--surface-base)" />
        </linearGradient>
        <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DDA24F" />
          <stop offset="100%" stopColor="var(--brand-primary)" />
        </linearGradient>
        <linearGradient id={`${uid}-heart`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E85B4E" />
          <stop offset="100%" stopColor="var(--brand-detail)" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <rect x="0" y="0" width="512" height="512" rx="114" ry="114" />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="512" height="512" fill={`url(#${uid}-bg)`} clipPath={`url(#${uid}-clip)`} />

      {/* cruz: tablón de puntas redondeadas */}
      <rect x="230" y="150" width="52" height="230" rx="20" fill={`url(#${uid}-gold)`} />
      <rect x="166" y="222" width="180" height="52" rx="20" fill={`url(#${uid}-gold)`} />

      {/* corazón en el cruce */}
      <path
        id={heartId}
        d="M256,268 C256,250 232,236 214,250 C198,262 198,284 214,300 L256,338 L298,300 C314,284 314,262 298,250 C280,236 256,250 256,268 Z"
        fill={`url(#${uid}-heart)`}
      />

      {/* destellos */}
      <path
        id={spark1Id}
        d="M356,150 L361,163 L374,168 L361,173 L356,186 L351,173 L338,168 L351,163 Z"
        fill="var(--brand-primary)"
      />
      <path
        id={spark2Id}
        d="M170,150 L173,159 L182,162 L173,165 L170,174 L167,165 L158,162 L167,159 Z"
        fill="var(--brand-primary)"
      />

      {animated && (
        <style>{`
          #${heartId}{ transform-origin:256px 294px; animation: ch-beat 1.8s ease-in-out infinite; }
          #${spark1Id}{ transform-origin:356px 168px; animation: ch-twinkle 1.6s ease-in-out infinite; }
          #${spark2Id}{ transform-origin:170px 162px; animation: ch-twinkle 1.6s ease-in-out infinite .5s; }
          @keyframes ch-beat{
            0%,100%{ transform:scale(1); }
            25%{ transform:scale(1.12); }
            40%{ transform:scale(0.97); }
            55%{ transform:scale(1.06); }
          }
          @keyframes ch-twinkle{
            0%,100%{ transform:scale(0.6) rotate(0deg); opacity:.35; }
            50%{ transform:scale(1.15) rotate(15deg); opacity:1; }
          }
          @media (prefers-reduced-motion: reduce){
            #${heartId}, #${spark1Id}, #${spark2Id}{ animation:none; }
          }
        `}</style>
      )}
    </>
  );
}

/** Versión quieta del isotipo — favicon, header, marca en botones de navegación. */
export function Mark({ size = 32, className, title = "" }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      {title ? <title>{title}</title> : null}
      <MarkGeometry animated={false} uid="mark" />
    </svg>
  );
}

/** Versión animada del isotipo — latido del corazón + titileo de destellos (respeta prefers-reduced-motion). */
export function AnimatedMark({ size = 96, className, title = "" }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      {title ? <title>{title}</title> : null}
      <MarkGeometry animated uid="animated-mark" />
    </svg>
  );
}
