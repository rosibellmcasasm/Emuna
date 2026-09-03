// Datos de los 52 Casos — dato-driven, generaliza el mecanismo real de
// `app/onboarding/caso-01/page.tsx` para cualquier Caso.
// Los 52 Casos tienen contenido COMPLETO. Casos 1-4 (Módulo 1) son gratis;
// Casos 5-52 se desbloquean con el pago único de $29.

export type TipoPista = "ciencia" | "logica" | "historia" | "evidencia" | "identidad";

export type Pista = {
  tipo: TipoPista;
  titulo: string;
  texto: string;
};

export type OpcionConclusion = {
  id: string;
  texto: string;
  correcta: boolean;
};

export type Versiculo = {
  texto: string;
  cita: string;
};

export type CasoCompleto = {
  id: number;
  titulo: string;
  kicker: string;
  pregunta: string; // la pregunta real que dispara el Caso (voz del hijo)
  fuente: string; // quién hace la pregunta / contexto del expediente
  pistas: Pista[];
  preguntaConclusion: string;
  opciones: OpcionConclusion[];
  explicacion: string; // feedback al acertar
  insignia: string;
  guia: string; // Modo Guía — cómo explicárselo al hijo en palabras de padre (2-3 líneas)
  versiculo: Versiculo; // el versículo de la semana que respalda el Caso
  reflexion: string; // reflexión corta que conecta el Caso con la vida diaria
  actividad: string; // actividad práctica para hacer en familia esta semana
};

export type CasoStub = {
  id: number;
  titulo: string;
  kicker: string;
};

export const TONO_PISTA: Record<TipoPista, { label: string }> = {
  ciencia: { label: "Pista de Ciencia" },
  logica: { label: "Pista de Lógica" },
  historia: { label: "Pista de Historia" },
  evidencia: { label: "Pista de Evidencia" },
  identidad: { label: "Pista del Corazón" },
};

import { CASOS_EXTRA } from "./casos-extra";

const CASOS_BASE: Omit<CasoCompleto, "versiculo" | "reflexion" | "actividad">[] = [
  {
    id: 1,
    titulo: "El Enigma del Origen del Universo",
    kicker: "Caso 01",
    pregunta: "Mamá, un amigo en el colegio dijo que la ciencia probó que Dios no existe, ¿es verdad?",
    fuente: "Un amigo del colegio",
    pistas: [
      {
        tipo: "ciencia",
        titulo: "Pista de Ciencia",
        texto:
          "Todo lo que empieza a existir tiene una causa. Es una regla que vemos siempre: nada aparece de la nada.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "El universo tuvo un comienzo — lo llamamos el Big Bang. Si tuvo un comienzo, entonces también tuvo que tener una causa.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar?",
    opciones: [
      { id: "azar", texto: "Que apareció solo, sin ninguna razón", correcta: false },
      { id: "causa", texto: "Que tuvo una causa — y a esa causa muchos la llaman Dios", correcta: true },
      { id: "nadie-sabe", texto: "Que nadie puede saberlo nunca", correcta: false },
    ],
    explicacion:
      "Todo lo que empieza a existir tiene una causa, y el universo empezó a existir — así que tuvo una causa. A esa causa muchos la llaman Dios.",
    insignia: "Investigador Jr.",
    guia:
      "Explícale que el universo tuvo un comienzo real (el Big Bang), y todo lo que empieza necesita algo que lo haya causado. No es una fe ciega — es la misma lógica que usamos para todo lo demás.",
  },
  {
    id: 2,
    titulo: "El Expediente de la Historia Real",
    kicker: "Caso 02",
    pregunta: "¿Jesús existió de verdad, o es como un personaje de cuento?",
    fuente: "Una duda propia, viendo una serie",
    pistas: [
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "Historiadores que NO eran cristianos, como Flavio Josefo y Tácito, escribieron sobre Jesús como una persona real — no inventada.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Sus amigos más cercanos estaban dispuestos a morir defendiendo que lo vieron vivo después de muerto. La gente no muere por algo que sabe que es mentira.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar?",
    opciones: [
      { id: "inventado", texto: "Es un personaje inventado, como un superhéroe", correcta: false },
      { id: "nadie-sabe", texto: "Nadie puede saberlo realmente", correcta: false },
      { id: "real", texto: "Fue una persona real cuya historia dejó huella", correcta: true },
    ],
    explicacion:
      "No hace falta ser cristiano para aceptar que Jesús existió — hasta los historiadores que no creían en él lo registraron como una persona real.",
    insignia: "Investigador de Hechos",
    guia:
      "Recuérdale que incluso historiadores que no eran cristianos escribieron sobre Jesús como alguien real. Y sus propios amigos prefirieron morir antes que decir que todo fue mentira — eso no se inventa.",
  },
  {
    id: 3,
    titulo: "El Expediente del Libro que Sobrevivió",
    kicker: "Caso 03",
    pregunta: "¿Cómo sabemos que la Biblia no fue cambiada con el tiempo, como el 'teléfono descompuesto'?",
    fuente: "Una pregunta en la clase de religión",
    pistas: [
      {
        tipo: "evidencia",
        titulo: "Pista de Evidencia",
        texto:
          "Tenemos miles de copias antiguas de la Biblia — muchas más que de cualquier otro libro de esa época — y los expertos las comparan letra por letra.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Cuando comparan esas miles de copias entre sí, casi todas dicen exactamente lo mismo. Eso muestra que se copió con muchísimo cuidado, no como un chisme que va cambiando.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar?",
    opciones: [
      { id: "cuidado", texto: "Llegó hasta hoy con muchísimo cuidado y respaldo", correcta: true },
      { id: "cambio", texto: "Seguro cambió mucho con los años", correcta: false },
      { id: "imposible", texto: "Es imposible comparar copias tan viejas", correcta: false },
    ],
    explicacion:
      "Cuantas más copias antiguas hay y más se parecen entre sí, más confianza da que el texto se mantuvo cuidado — y de la Biblia hay miles.",
    insignia: "Guardián del Texto",
    guia:
      "Compárale las miles de copias antiguas de la Biblia con hacer una fotocopia de una fotocopia: entre más copias tengas para comparar, más fácil es confirmar que el original no cambió. Y de la Biblia hay muchísimas.",
  },
  {
    id: 4,
    titulo: "El Expediente del Dolor en el Mundo",
    kicker: "Caso 04",
    pregunta: "Si Dios es bueno, ¿por qué existe el sufrimiento en el mundo?",
    fuente: "Una noticia triste que vio en casa",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Para que el amor sea real, tiene que ser una elección — y poder elegir también significa que se puede elegir mal.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Muchas personas que más han sufrido dicen que fue justo ahí, y no en los momentos fáciles, donde sintieron a Dios más cerca.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar?",
    opciones: [
      { id: "no-existe", texto: "Que Dios no existe porque hay sufrimiento", correcta: false },
      {
        id: "libertad",
        texto: "Que Dios no se queda lejos del dolor, y el amor real necesita libertad",
        correcta: true,
      },
      { id: "sin-explicacion", texto: "Que no tiene ninguna explicación posible", correcta: false },
    ],
    explicacion:
      "No es una respuesta fácil, pero tiene lógica: el amor de verdad necesita libertad, y la libertad trae el riesgo de que se use mal. Dios no está lejos del dolor — según la fe cristiana, él mismo lo vivió.",
    insignia: "Corazón Valiente",
    guia:
      "No busques cerrar el tema con una frase perfecta — dile que es una pregunta que hasta los adultos siguen pensando. Lo que sí puedes decirle: el amor real necesita libertad, y Dios no se queda lejos del dolor, lo vivió también.",
  },
  {
    id: 5,
    titulo: "El Expediente del Diseño Perfecto",
    kicker: "Caso 05",
    pregunta: "¿Es verdad que si la Tierra estuviera un poquito más cerca del sol, nadie podría vivir aquí?",
    fuente: "Un video de ciencia que vio en el recreo",
    pistas: [
      {
        tipo: "ciencia",
        titulo: "Pista de Ciencia",
        texto:
          "Las leyes de la física tienen números exactísimos — como la fuerza de gravedad o la distancia al sol — y si cualquiera cambiara un poquito, no podría existir vida en ningún lado.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Cuando algo tiene tantos detalles ajustados exactamente para que funcione, lo normal es pensar que alguien lo ajustó — no que fue pura suerte repetida miles de veces.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre que el universo tenga las condiciones exactas para la vida?",
    opciones: [
      { id: "casualidad", texto: "Que fue pura casualidad, aunque sea muy poco probable", correcta: false },
      { id: "sin-explicacion", texto: "Que no tiene ninguna explicación", correcta: false },
      { id: "diseno", texto: "Que alguien lo ajustó a propósito", correcta: true },
    ],
    explicacion:
      "Cuando algo necesita tantas condiciones exactas al mismo tiempo para funcionar, pensar en un diseño es más razonable que pensar en una casualidad gigante.",
    insignia: "Detective del Diseño",
    guia:
      "Compáralo con encontrar una casa perfectamente amueblada para ti: podrías pensar que fue casualidad, pero lo lógico es pensar que alguien la preparó. Así de exactas son las condiciones del universo.",
  },
  {
    id: 6,
    titulo: "El Expediente de la Piedra Movida",
    kicker: "Caso 06",
    pregunta: "¿Cómo saben que Jesús resucitó de verdad y no que solo escondieron su cuerpo?",
    fuente: "Una duda en la clase de religión, cerca de Pascua",
    pistas: [
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "La tumba estaba vigilada por soldados romanos entrenados — y aun así, apareció vacía tres días después.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si sus propios seguidores hubieran escondido el cuerpo, sabrían que todo era mentira. Pero casi todos ellos prefirieron morir antes que decir que no era verdad.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre la tumba vacía?",
    opciones: [
      { id: "real", texto: "Que de verdad pasó algo que nadie pudo explicar de otra forma", correcta: true },
      { id: "robo", texto: "Que sus amigos robaron el cuerpo y mintieron toda su vida", correcta: false },
      { id: "invento", texto: "Que la historia se la inventaron mucho después", correcta: false },
    ],
    explicacion:
      "La gente no suele morir defendiendo algo que sabe que inventó. Eso hace que la explicación más razonable sea que ellos de verdad creyeron haberlo visto vivo.",
    insignia: "Guardián de la Tumba",
    guia:
      "Dile que hasta historiadores que no son cristianos aceptan que la tumba apareció vacía — el debate real es por qué. Y que la gente no suele arriesgar la vida por algo que sabe que es mentira.",
  },
  {
    id: 7,
    titulo: "El Expediente de los Milagros",
    kicker: "Caso 07",
    pregunta: "Si Dios hace milagros, ¿por qué la ciencia no los puede comprobar?",
    fuente: "Una conversación familiar sobre un familiar que sanó",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "La ciencia explica cómo funcionan las cosas normalmente — pero un milagro, por definición, rompe lo normal, así que no se puede repetir en un laboratorio como una fórmula.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Muchas familias, de distintas creencias, cuentan historias de cosas que no tienen explicación médica — y no todas se pueden explicar como coincidencia.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre los milagros?",
    opciones: [
      { id: "descartar", texto: "Que si la ciencia no lo explica, entonces no pasó", correcta: false },
      { id: "fuera-de-lo-normal", texto: "Que la ciencia explica lo normal, pero no puede descartar lo que está fuera de lo normal", correcta: true },
      { id: "invento", texto: "Que todos los milagros son inventados", correcta: false },
    ],
    explicacion:
      "La ciencia es una herramienta increíble para estudiar patrones repetibles — pero no fue diseñada para juzgar eventos únicos que solo pasaron una vez.",
    insignia: "Testigo Curioso",
    guia:
      "Explícale que la ciencia no dice 'esto es imposible', dice 'esto no lo puedo repetir en un laboratorio' — son cosas distintas. No creer en milagros no es 'más científico', es una elección aparte.",
  },
  {
    id: 8,
    titulo: "El Expediente de las Otras Religiones",
    kicker: "Caso 08",
    pregunta: "Mi amigo cree algo distinto y también parece feliz. ¿Eso significa que da igual en qué creer?",
    fuente: "Una amistad con un compañero de otra religión",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Distintas religiones dicen cosas que se contradicen entre sí — y dos ideas que se contradicen no pueden ser verdad al mismo tiempo.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Que alguien sea buena persona no depende de tener la razón en todo — puedes respetar y querer a alguien y aun así pensar distinto sobre algo importante.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar cuando dos creencias se contradicen?",
    opciones: [
      { id: "da-igual", texto: "Que como todos son felices, ninguna importa", correcta: false },
      { id: "romper", texto: "Que hay que dejar de ser amigos si creen distinto", correcta: false },
      { id: "respeto-y-verdad", texto: "Que se puede respetar a alguien y aun así buscar cuál explicación tiene mejor evidencia", correcta: true },
    ],
    explicacion:
      "Respetar a alguien y buscar la verdad no son cosas contrarias — puedes hacer las dos al mismo tiempo, con cariño y sin pelear.",
    insignia: "Amigo con Criterio",
    guia:
      "Enséñale a separar dos cosas: querer y respetar a alguien SIEMPRE es correcto; pero eso no significa fingir que todas las ideas son igual de ciertas. Se puede ser buen amigo y seguir pensando con cabeza propia.",
  },
  {
    id: 9,
    titulo: "El Expediente de la Oración sin Respuesta",
    kicker: "Caso 09",
    pregunta: "Recé por algo importante y no pasó. ¿Dios no me escuchó?",
    fuente: "Una decepción personal reciente",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Un papá que ama a su hijo a veces dice 'no' o 'todavía no' a cosas que el hijo pide, aunque lo escuchó perfecto — decir que no también es una forma de responder.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Muchas personas, mirando hacia atrás años después, entienden por qué algo que pidieron no pasó como querían — en el momento no se ve, pero después a veces sí.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar cuando una oración no se responde como esperabas?",
    opciones: [
      { id: "escuchada", texto: "Que fue escuchada, aunque la respuesta no fue la que esperaba", correcta: true },
      { id: "no-existe", texto: "Que Dios no existe porque no le dio la razón", correcta: false },
      { id: "inutil", texto: "Que orar no sirve para nada", correcta: false },
    ],
    explicacion:
      "Ser escuchado y recibir exactamente lo que pediste no son la misma cosa — como con un papá que ama, a veces la respuesta es 'espera' o 'no', no silencio.",
    insignia: "Corazón Paciente",
    guia:
      "No le prometas que 'la próxima vez sí' — eso genera más dudas si vuelve a pasar. Mejor ayúdalo a entender que ser escuchado no siempre significa recibir un sí, igual que en casa.",
  },
  {
    id: 10,
    titulo: "El Expediente de lo que Pasa Después",
    kicker: "Caso 10",
    pregunta: "¿Qué pasa cuando alguien se muere? ¿De verdad hay algo después?",
    fuente: "La pérdida de una mascota o un familiar",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Casi todas las culturas de la historia, en todos los continentes, han creído en algún tipo de vida después de la muerte — es raro que tantas personas distintas hayan pensado lo mismo por separado.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Jesús mismo, según cuentan sus seguidores, volvió a aparecer con vida después de morir — es la razón central por la que los cristianos creen que la muerte no es el final.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre lo que pasa después de morir?",
    opciones: [
      { id: "ninguna-razon", texto: "Que nadie puede tener ninguna razón para pensar eso", correcta: false },
      { id: "esperanza", texto: "Que hay buenas razones para creer que la muerte no es el final", correcta: true },
      { id: "no-pensar", texto: "Que es mejor no pensarlo nunca", correcta: false },
    ],
    explicacion:
      "No es solo un deseo bonito — es una creencia que se apoya en la propia historia de Jesús y en lo que millones de personas, en todas las épocas, han encontrado razonable.",
    insignia: "Explorador de lo Eterno",
    guia:
      "Este tema puede dar miedo — no lo apures. Dile que la fe cristiana no promete respuestas a cada detalle, pero sí una esperanza real basada en que Jesús volvió a la vida.",
  },
  {
    id: 11,
    titulo: "El Expediente del Bien y el Mal",
    kicker: "Caso 11",
    pregunta: "¿Quién decidió que mentir está mal? ¿No es solo una opinión?",
    fuente: "Una discusión sobre reglas en el colegio",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si el bien y el mal fueran solo opinión, nadie podría decir que hacerle daño a otra persona 'de verdad' está mal — solo que 'a mí no me gusta'. Pero casi todos sentimos que hay cosas que SÍ están mal.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Esa sensación de que 'algo no está bien' que sentimos todos, incluso sin que nadie nos lo enseñe, apunta a que existe un bien real — no inventado por cada persona.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre el bien y el mal?",
    opciones: [
      { id: "cada-quien", texto: "Que cada quien decide lo que está bien para sí mismo", correcta: false },
      { id: "no-existen", texto: "Que el bien y el mal no existen", correcta: false },
      { id: "real", texto: "Que existen de verdad, no son solo opiniones distintas", correcta: true },
    ],
    explicacion:
      "Si el bien y el mal fueran pura opinión, no podríamos decir que la injusticia está realmente mal — solo que no nos gusta. Pero sí podemos decirlo, y eso apunta a algo real detrás.",
    insignia: "Juez Justo",
    guia:
      "Pregúntale: '¿Está mal que alguien lastime a otro solo porque sí?' Va a decir que sí, de verdad mal. Eso ya es un paso para entender que el bien y el mal no son solo gustos personales.",
  },
  {
    id: 12,
    titulo: "El Expediente de las Ruinas Antiguas",
    kicker: "Caso 12",
    pregunta: "¿La Biblia habla de lugares y personas que sí existieron, o son solo cuentos?",
    fuente: "Un documental sobre excavaciones",
    pistas: [
      {
        tipo: "evidencia",
        titulo: "Pista de Evidencia",
        texto:
          "Arqueólogos han encontrado ciudades, monedas y nombres de reyes mencionados en la Biblia que antes se creían inventados — hasta que los excavaron de verdad.",
      },
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "Cada vez que se descubre algo nuevo bajo tierra, en vez de contradecir a la Biblia, casi siempre termina confirmando que los lugares y personas sí existieron.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre los lugares que menciona la Biblia?",
    opciones: [
      { id: "existieron", texto: "Que muchos de esos lugares y personas sí existieron de verdad", correcta: true },
      { id: "invento", texto: "Que todo lo que dice la Biblia es literatura inventada", correcta: false },
      { id: "sin-relacion", texto: "Que la arqueología no tiene nada que ver con esto", correcta: false },
    ],
    explicacion:
      "No todo se ha podido comprobar, pero la tendencia es clara: mientras más se excava, más confirmaciones aparecen, no menos.",
    insignia: "Arqueólogo de la Verdad",
    guia:
      "Cuéntale algún ejemplo concreto que te resulte fácil de recordar (como el descubrimiento de la piscina de Siloé) — los detalles reales ayudan más que decir 'es verdad' sin más.",
  },
  {
    id: 13,
    titulo: "El Expediente del Corazón Cambiado",
    kicker: "Caso 13",
    pregunta: "¿De verdad la fe puede cambiar a una persona, o eso es solo en las películas?",
    fuente: "La historia de alguien conocido que cambió",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Hay historias reales y documentadas de personas — desde criminales hasta personas muy tristes o enojadas — que después de tener fe cambiaron profundamente cómo trataban a los demás.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Un cambio así no se puede fingir para siempre: si alguien deja el rencor o la violencia de forma duradera, algo real tuvo que pasar por dentro.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre esas historias de cambio?",
    opciones: [
      { id: "fingir", texto: "Que la gente solo finge cambiar por un tiempo", correcta: false },
      { id: "real", texto: "Que la fe puede producir cambios reales y duraderos en las personas", correcta: true },
      { id: "exageradas", texto: "Que esas historias siempre son exageradas", correcta: false },
    ],
    explicacion:
      "Un cambio que dura años, con hechos y no solo palabras, es difícil de fingir — es una de las pruebas más convincentes de que la fe puede transformar de verdad.",
    insignia: "Testigo del Cambio",
    guia:
      "Si conoces una historia real de alguien cercano que cambió, cuéntasela — los ejemplos concretos convencen mucho más que la teoría.",
  },
  {
    id: 14,
    titulo: "El Expediente de la Ciencia y la Fe",
    kicker: "Caso 14",
    pregunta: "¿Un científico de verdad puede creer en Dios, o la ciencia y la fe son enemigas?",
    fuente: "Una clase de ciencias en el colegio",
    pistas: [
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "Muchos de los científicos que fundaron la ciencia moderna — como Newton, Kepler o Pascal — creían en Dios y pensaban que estudiar el universo era estudiar su obra.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "La ciencia responde 'cómo funcionan las cosas' — la fe responde 'por qué existen las cosas y para qué'. Son preguntas distintas, no tienen por qué pelear.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre la ciencia y la fe?",
    opciones: [
      { id: "imposible", texto: "Que un científico de verdad nunca podría creer en Dios", correcta: false },
      { id: "siempre-peleadas", texto: "Que la fe y la ciencia siempre están peleadas", correcta: false },
      { id: "conviven", texto: "Que pueden convivir, porque responden preguntas distintas", correcta: true },
    ],
    explicacion:
      "Muchísimos científicos, de ayer y de hoy, tienen fe — porque estudiar cómo funciona algo no responde la pregunta de por qué existe.",
    insignia: "Mente Científica",
    guia:
      "Dale el ejemplo de un científico famoso con fe (Newton es fácil de recordar) — ayuda a romper la idea de que 'ser inteligente' y 'creer en Dios' son cosas opuestas.",
  },
  {
    id: 15,
    titulo: "El Expediente del Perdón Imposible",
    kicker: "Caso 15",
    pregunta: "¿Por qué tengo que perdonar a alguien que me hizo algo realmente feo?",
    fuente: "Un conflicto con un compañero o hermano",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Perdonar no significa decir 'lo que hiciste estuvo bien' — significa soltar el rencor para que no te siga haciendo daño a ti.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Cargar rencor es como tomar veneno esperando que le haga daño al otro — el que más sufre cargando el enojo eres tú mismo.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre el perdón?",
    opciones: [
      { id: "libera", texto: "Que perdonar libera a quien perdona, no justifica lo que pasó", correcta: true },
      { id: "no-importo", texto: "Que perdonar significa que no importó lo que te hicieron", correcta: false },
      { id: "guardar", texto: "Que es mejor guardar el enojo para siempre", correcta: false },
    ],
    explicacion:
      "Perdonar es para tu propio corazón, no un favor para el otro — y no significa que lo que pasó estuvo bien.",
    insignia: "Corazón Liviano",
    guia:
      "Aclárale la diferencia entre perdonar y confiar de nuevo: se puede perdonar a alguien y aun así poner límites, o no volver a confiar igual. Son cosas distintas.",
  },
  {
    id: 16,
    titulo: "El Expediente de la Estrella de Belén",
    kicker: "Caso 16",
    pregunta: "¿La estrella que guio a los Reyes Magos fue de verdad, o solo un cuento de Navidad?",
    fuente: "Preparando el pesebre en casa",
    pistas: [
      {
        tipo: "ciencia",
        titulo: "Pista de Ciencia",
        texto:
          "Astrónomos han estudiado que en esa época hubo alineaciones raras de planetas y estrellas que se habrían visto como una luz muy brillante y especial en el cielo.",
      },
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "Personas de esa época que estudiaban las estrellas (como los magos) sí seguían fenómenos así para buscar el nacimiento de reyes importantes.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre la estrella de Belén?",
    opciones: [
      { id: "invencion", texto: "Que es pura invención sin ninguna base", correcta: false },
      { id: "real", texto: "Que probablemente fue un fenómeno real en el cielo que la gente de esa época supo interpretar", correcta: true },
      { id: "imposible-saber", texto: "Que es imposible saber nada al respecto", correcta: false },
    ],
    explicacion:
      "No sabemos el detalle exacto, pero hay varias explicaciones astronómicas serias que encajan con lo que describe la historia — no es solo fantasía.",
    insignia: "Observador del Cielo",
    guia:
      "No necesitas resolver el misterio exacto — basta con mostrarle que astrónomos de verdad han investigado el tema en serio, no es solo un cuento sin base.",
  },
  {
    id: 17,
    titulo: "El Expediente del Libro Prohibido",
    kicker: "Caso 17",
    pregunta: "¿Por qué en la historia algunas personas quisieron quemar o prohibir la Biblia?",
    fuente: "Una clase de historia",
    pistas: [
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "A lo largo de la historia, gobiernos que querían controlar todo lo que la gente pensaba prohibieron la Biblia — porque enseñaba que cada persona vale y tiene dignidad.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Cuando alguien quiere prohibir un libro con tanta fuerza, generalmente es porque ese libro tiene ideas poderosas — no porque no importe nada.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre que hayan querido prohibir la Biblia?",
    opciones: [
      { id: "sin-valor", texto: "Que la prohibieron porque no valía nada", correcta: false },
      { id: "nunca-paso", texto: "Que eso nunca pasó de verdad", correcta: false },
      { id: "poderosas", texto: "Que sus ideas eran tan poderosas que algunos gobiernos les tuvieron miedo", correcta: true },
    ],
    explicacion:
      "Los libros que la gente intenta destruir con más fuerza casi siempre son los que más incomodan al poder — y eso es una señal de su importancia.",
    insignia: "Defensor del Libro",
    guia:
      "Cuéntale que a pesar de siglos de intentos por destruirla, la Biblia sigue siendo el libro más traducido y publicado del mundo — eso solo no la hace verdadera, pero sí muestra su enorme impacto.",
  },
  {
    id: 18,
    titulo: "El Expediente de la Voz Interior",
    kicker: "Caso 18",
    pregunta: "Nadie me vio hacer trampa en el examen, pero me sentí muy mal por dentro. ¿Por qué pasa eso?",
    fuente: "Una situación personal de honestidad",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Esa sensación de 'esto está mal' que sentimos incluso cuando nadie nos ve se llama conciencia — y aparece en personas de todas las culturas y edades.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si el bien y el mal solo dependieran de que alguien nos mire, no sentiríamos culpa estando solos — pero la sentimos, y eso apunta a algo más grande que las reglas de los demás.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre esa voz interior?",
    opciones: [
      { id: "bien-real", texto: "Que apunta a que existe un bien real, no solo reglas inventadas", correcta: true },
      { id: "habito", texto: "Que es solo un hábito que nos enseñaron sin ninguna razón", correcta: false },
      { id: "ignorarla", texto: "Que hay que aprender a ignorarla", correcta: false },
    ],
    explicacion:
      "La culpa que sentimos estando solos es una de las señales más fuertes de que el bien y el mal no dependen de que alguien nos vea.",
    insignia: "Voz de la Verdad",
    guia:
      "No lo regañes por el error — usa el momento para mostrarle que esa sensación incómoda es buena señal: significa que su conciencia funciona bien.",
  },
  {
    id: 19,
    titulo: "El Expediente de las Profecías Cumplidas",
    kicker: "Caso 19",
    pregunta: "¿Es verdad que la Biblia predijo cosas cientos de años antes de que pasaran?",
    fuente: "Un video sobre profecías",
    pistas: [
      {
        tipo: "evidencia",
        titulo: "Pista de Evidencia",
        texto:
          "Hay textos escritos cientos de años antes de Jesús que describen detalles muy específicos de su vida — y luego, según los relatos, se cumplieron.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Que tantos detalles tan específicos coincidan tanto tiempo después es muy difícil de explicar como pura casualidad.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre esas profecías cumplidas?",
    opciones: [
      { id: "despues", texto: "Que fueron escritas después de que pasaran los hechos, sin ninguna prueba", correcta: false },
      { id: "evidencia-fuerte", texto: "Que son una evidencia fuerte a favor de que la Biblia tiene algo especial", correcta: true },
      { id: "casualidad", texto: "Que son puras casualidades sin importancia", correcta: false },
    ],
    explicacion:
      "Los textos que contienen esas profecías existen y se pueden fechar antes de Jesús — eso hace que la casualidad sea una explicación difícil de sostener.",
    insignia: "Lector del Tiempo",
    guia:
      "El ejemplo más fácil de recordar: el libro de Isaías, escrito unos 700 años antes, describe detalles muy específicos de la vida de Jesús. Puedes buscarlo juntos si quiere profundizar.",
  },
  {
    id: 20,
    titulo: "El Expediente del Dios Escondido",
    kicker: "Caso 20",
    pregunta: "Si Dios existe, ¿por qué no aparece y lo demuestra de una vez, para que todos le crean?",
    fuente: "Una duda propia, pensando en la noche",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si Dios se mostrara de forma tan obvia que nadie pudiera dudar, la gente lo obedecería por miedo o presión, no porque de verdad eligió confiar — y el amor real necesita libertad.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Muchas personas dicen haber sentido a Dios de formas más suaves: en la naturaleza, en un momento de paz, en la bondad de alguien — no como un show, sino como algo íntimo.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre por qué Dios no 'se muestra' de forma obvia?",
    opciones: [
      { id: "no-existe", texto: "Que eso prueba que no existe", correcta: false },
      { id: "no-importa", texto: "Que a Dios no le importa si la gente cree o no", correcta: false },
      { id: "libre-eleccion", texto: "Que deja espacio para que la fe sea una elección libre, no una obligación", correcta: true },
    ],
    explicacion:
      "Un amor forzado no es amor real — y muchas personas creen que Dios prefiere ser buscado con el corazón, no impuesto con un espectáculo.",
    insignia: "Buscador Sincero",
    guia:
      "Esta es de las preguntas más profundas — no la resuelvas con una frase rápida. Dile que muchos adultos, incluidos grandes pensadores de la fe, se han hecho la misma pregunta toda su vida.",
  },
  {
    id: 21,
    titulo: "El Expediente de la Amistad Verdadera",
    kicker: "Caso 21",
    pregunta: "¿Qué tiene que ver mi fe con la forma en que trato a mis amigos?",
    fuente: "Un conflicto de amistad",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Jesús enseñó que amar a los demás 'como a ti mismo' es de las reglas más importantes de todas — y eso incluye ser buen amigo, perdonar y ser leal.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Las mejores amistades se sostienen en cosas que la fe cristiana enseña: honestidad, lealtad, paciencia y perdón — no es casualidad que se parezcan tanto.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre la fe y la amistad?",
    opciones: [
      { id: "razones", texto: "Que la fe da buenas razones concretas para ser un mejor amigo", correcta: true },
      { id: "nada-que-ver", texto: "Que la fe no tiene nada que ver con las amistades", correcta: false },
      { id: "no-importan", texto: "Que los amigos no importan si tienes fe", correcta: false },
    ],
    explicacion:
      "Amar al prójimo no es una frase bonita sin uso — es prácticamente un manual para tratar bien a tus amigos todos los días.",
    insignia: "Amigo Fiel",
    guia:
      "Conecta el tema con algo concreto de su vida: la próxima vez que tenga un conflicto de amistad, puedes recordarle este Caso como ejemplo práctico.",
  },
  {
    id: 22,
    titulo: "El Expediente del Universo Ajustado",
    kicker: "Caso 22",
    pregunta: "¿Es verdad que si la fuerza de gravedad fuera un poquitito distinta, no existiría nada?",
    fuente: "Un dato que escuchó en un video de curiosidades",
    pistas: [
      {
        tipo: "ciencia",
        titulo: "Pista de Ciencia",
        texto:
          "Los científicos han calculado que fuerzas como la gravedad están ajustadas con una precisión enorme — un cambio mínimo y ni las estrellas ni la vida podrían formarse.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Cuando algo necesita tantos números exactos al mismo tiempo para funcionar, pensar que fue diseñado con propósito es al menos tan razonable como pensar que fue pura casualidad.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre este ajuste tan preciso?",
    opciones: [
      { id: "nada-especial", texto: "Que no significa nada especial", correcta: false },
      { id: "intencion", texto: "Que apunta a que hay una intención detrás, no solo azar", correcta: true },
      { id: "error", texto: "Que los científicos se equivocan en esto", correcta: false },
    ],
    explicacion:
      "Muchos científicos, crean o no en Dios, reconocen que este 'ajuste fino' del universo es uno de los datos más sorprendentes que conocemos.",
    insignia: "Calculador del Cosmos",
    guia:
      "Este Caso se parece al del Diseño Perfecto, pero más técnico — no necesitas los números exactos, con la idea general de 'ajuste demasiado preciso para ser casualidad' alcanza.",
  },
  {
    id: 23,
    titulo: "El Expediente de las Religiones Copiadas",
    kicker: "Caso 23",
    pregunta: "Un video decía que la historia de Jesús se copió de otras religiones antiguas, ¿es cierto?",
    fuente: "Un video en redes sociales",
    pistas: [
      {
        tipo: "evidencia",
        titulo: "Pista de Evidencia",
        texto:
          "Muchas de las comparaciones que circulan en internet usan datos falsos o exagerados — al revisarlos con historiadores serios, casi ninguna resiste un análisis cuidadoso.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Que dos historias antiguas compartan algún elemento parecido no prueba que una copió a la otra — muchas culturas comparten temas humanos comunes sin copiarse.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre esas comparaciones?",
    opciones: [
      { id: "creer-video", texto: "Que como lo dice un video, debe ser cierto", correcta: false },
      { id: "no-investigar", texto: "Que ya no vale la pena investigar el tema", correcta: false },
      { id: "verificar", texto: "Que hay que revisar la fuente antes de creer todo lo que dice un video", correcta: true },
    ],
    explicacion:
      "Muchas de esas afirmaciones circulan mucho en redes pero no se sostienen cuando un historiador serio las revisa con cuidado.",
    insignia: "Verificador de Datos",
    guia:
      "Este es un buen momento para enseñarle una habilidad clave: antes de creer algo impactante en un video, preguntar '¿quién lo dice, y tiene buenas fuentes?' Le sirve para la fe y para la vida en general.",
  },
  {
    id: 24,
    titulo: "El Expediente del Miedo a la Muerte",
    kicker: "Caso 24",
    pregunta: "Tengo miedo de morirme algún día. ¿Por qué la gente con fe le tiene menos miedo?",
    fuente: "Un pensamiento nocturno, quizás tras una pérdida",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Muchas personas con fe dicen que su miedo no desaparece del todo, pero cambia — porque creen que la muerte no es el final, sino un paso hacia algo más.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si de verdad existe algo después de esta vida, entonces la muerte deja de ser el punto final absoluto que parece.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre el miedo a la muerte y la fe?",
    opciones: [
      { id: "mas-liviano", texto: "Que tener esperanza real puede hacer el miedo más liviano, no que desaparezca mágicamente", correcta: true },
      { id: "cero-miedo", texto: "Que si tienes fe nunca más sientes miedo", correcta: false },
      { id: "sin-solucion", texto: "Que el miedo a morir no tiene solución", correcta: false },
    ],
    explicacion:
      "La fe no promete cero miedo — promete que no estás solo ni es el final, y eso alivia mucho la carga.",
    insignia: "Corazón Valiente II",
    guia:
      "No le digas que 'no debería tener miedo' — hasta personas de mucha fe sienten miedo a veces. Mejor acompáñalo con la idea de esperanza, no con exigirle que no sienta nada.",
  },
  {
    id: 25,
    titulo: "El Expediente de la Mentira que Nadie Sostiene",
    kicker: "Caso 25",
    pregunta: "Si todo sobre Jesús fue inventado, ¿por qué nadie de los que lo conocieron dijo la verdad para salvarse?",
    fuente: "Repaso del Caso 02, profundizando",
    pistas: [
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "Varios de los seguidores más cercanos de Jesús fueron perseguidos, encarcelados o ejecutados por seguir contando lo que decían haber visto — y ninguno se retractó para salvarse.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Es común que la gente mienta para conseguir dinero o fama. Es rarísimo que alguien sostenga una mentira hasta la muerte sin ganar absolutamente nada a cambio.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre por qué nadie se retractó?",
    opciones: [
      { id: "todos-mintieron", texto: "Que todos decidieron mentir juntos sin ninguna razón", correcta: false },
      { id: "creian", texto: "Que de verdad creían haber visto lo que contaban, no que mentían", correcta: true },
      { id: "nadie-sabe", texto: "Que nadie sabe realmente qué pasó", correcta: false },
    ],
    explicacion:
      "La gente miente por beneficio propio — pero morir defendiendo algo sin ganar nada es una de las señales más fuertes de sinceridad que existen.",
    insignia: "Detector de Mentiras",
    guia:
      "Este Caso conecta directo con el Caso 02 — puedes repasarlo juntos. La idea central: nadie muere voluntariamente por algo que sabe que inventó.",
  },
  {
    id: 26,
    titulo: "El Expediente del Trato Injusto",
    kicker: "Caso 26",
    pregunta: "¿Por qué a veces le pasan cosas malas a la gente buena, y a gente mala le va bien?",
    fuente: "Una injusticia que vio o vivió",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Este mundo todavía no es como debería ser — la fe cristiana no dice que la vida sea justa ahora mismo, dice que la injusticia no es la última palabra.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Muchas personas que sufrieron injusticias muy grandes encontraron fuerza en la fe, no para aceptar la injusticia, sino para seguir luchando por lo correcto sin perder la esperanza.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre la injusticia en el mundo?",
    opciones: [
      { id: "no-existe-dios", texto: "Que como hay injusticia, Dios no puede existir", correcta: false },
      { id: "no-luchar", texto: "Que no vale la pena luchar contra las injusticias", correcta: false },
      { id: "no-gana", texto: "Que la fe no promete que todo sea justo ya, pero sí que la injusticia no gana al final", correcta: true },
    ],
    explicacion:
      "Reconocer que algo 'no es justo' ya asume que existe la justicia real — y eso conecta con lo que vimos sobre el bien y el mal.",
    insignia: "Luchador por la Justicia",
    guia:
      "No minimices su enojo por la injusticia — esa indignación es sana. Ayúdalo a canalizarla hacia hacer el bien, en vez de hacia perder la esperanza.",
  },
  {
    id: 27,
    titulo: "El Expediente de las Redes Sociales",
    kicker: "Caso 27",
    pregunta: "En redes todos opinan cosas distintas sobre Dios. ¿Cómo sé qué creer en medio de tanto ruido?",
    fuente: "Scroll en redes sociales",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Que algo tenga muchos 'likes' o esté de moda no lo hace verdadero — la popularidad y la verdad son cosas distintas.",
      },
      {
        tipo: "evidencia",
        titulo: "Pista de Evidencia",
        texto:
          "Antes de creer algo impactante que viste en un video corto, siempre puedes preguntarte: '¿de dónde sacó esta información? ¿lo puedo comprobar en otro lado?'",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar cuando ves opiniones contradictorias en redes?",
    opciones: [
      { id: "revisar-fuente", texto: "Que hay que revisar la fuente antes de cambiar de opinión", correcta: true },
      { id: "mas-visto", texto: "Que hay que creer lo que diga el video más visto", correcta: false },
      { id: "no-pensar", texto: "Que ya no vale la pena pensar en estos temas", correcta: false },
    ],
    explicacion:
      "Las redes premian lo que llama la atención, no necesariamente lo que es cierto — aprender a revisar fuentes es una herramienta para toda la vida.",
    insignia: "Navegante Digital",
    guia:
      "Practica con él revisar una fuente juntos la próxima vez que vea algo dudoso — es una habilidad que le va a servir mucho más allá de este tema.",
  },
  {
    id: 28,
    titulo: "El Expediente del Mapa Antiguo",
    kicker: "Caso 28",
    pregunta: "¿Los lugares que menciona la Biblia, como Jerusalén o Egipto, existen de verdad hoy?",
    fuente: "Mirando un mapa o planeando un viaje",
    pistas: [
      {
        tipo: "evidencia",
        titulo: "Pista de Evidencia",
        texto:
          "Ciudades como Jerusalén, Belén, Nazaret y Cafarnaún existen hasta el día de hoy, y se pueden visitar — no son lugares inventados de un cuento.",
      },
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "Arqueólogos han excavado ruinas exactas de sinagogas, casas y caminos que coinciden con los relatos de los evangelios.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre los lugares de la Biblia?",
    opciones: [
      { id: "inventados", texto: "Que todos son inventados", correcta: false },
      { id: "reales", texto: "Que son lugares reales que existen y se pueden visitar hoy", correcta: true },
      { id: "nada-queda", texto: "Que ya no queda nada de esos lugares", correcta: false },
    ],
    explicacion:
      "Puedes literalmente buscar estos lugares en un mapa hoy — eso no prueba cada milagro, pero sí confirma que la historia tiene bases geográficas reales.",
    insignia: "Cartógrafo Bíblico",
    guia:
      "Actividad simple: busquen juntos Jerusalén o Nazaret en un mapa o en internet — verlo con sus propios ojos ayuda más que solo escucharlo.",
  },
  {
    id: 29,
    titulo: "El Expediente de la Conciencia",
    kicker: "Caso 29",
    pregunta: "¿De dónde viene esa vocecita que me dice 'eso no está bien', si nadie me la enseñó exactamente así?",
    fuente: "Reflexión personal, tal vez tras el Caso 18",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si solo fuéramos animales evolucionados sin ningún propósito, tendría más sentido que solo actuáramos por sobrevivir — no que sintamos que hay cosas 'objetivamente malas' incluso cuando nos convienen.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Esa conciencia moral aparece en personas de todas las culturas del mundo, incluso en lugares que nunca tuvieron contacto entre sí.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre el origen de la conciencia?",
    opciones: [
      { id: "truco", texto: "Que es solo un truco de la evolución sin ningún significado", correcta: false },
      { id: "sin-explicacion", texto: "Que no tiene ninguna explicación posible", correcta: false },
      { id: "sentido-real", texto: "Que apunta a que fuimos hechos con un sentido moral real, no solo programados para sobrevivir", correcta: true },
    ],
    explicacion:
      "La fe cristiana explica la conciencia diciendo que fuimos hechos a imagen de un Dios que ama la justicia — por eso la llevamos escrita por dentro.",
    insignia: "Filósofo en Entrenamiento",
    guia:
      "Este es de los Casos más abstractos — está bien si no lo entiende del todo a la primera. La idea central que puede quedarse: sentir que algo 'de verdad' está mal es una pista importante.",
  },
  {
    id: 30,
    titulo: "El Expediente del Cielo y el Infierno",
    kicker: "Caso 30",
    pregunta: "¿Qué enseña realmente la Biblia sobre el cielo y el infierno? Mis amigos dicen cosas distintas.",
    fuente: "Conversación con amigos de distintas iglesias",
    pistas: [
      {
        tipo: "evidencia",
        titulo: "Pista de Evidencia",
        texto:
          "La Biblia habla del cielo como estar con Dios para siempre, en un lugar de paz y alegría completas — y del infierno como la ausencia completa de esa cercanía con Dios.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Muchas de las imágenes más extremas que la gente imagina son parte de un debate real entre estudiosos serios sobre cómo interpretar el lenguaje simbólico de la Biblia.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar frente a este tema tan debatido?",
    opciones: [
      { id: "estudiar-con-calma", texto: "Que hay que estudiarlo con calma y sin miedo, sabiendo que hasta los expertos debaten los detalles", correcta: true },
      { id: "mas-miedo", texto: "Que hay que creer lo que dé más miedo, para estar seguros", correcta: false },
      { id: "no-estudiar", texto: "Que no vale la pena estudiarlo", correcta: false },
    ],
    explicacion:
      "Lo central en lo que casi todos los cristianos coinciden es esto: Dios quiere estar cerca de cada persona para siempre — el resto son detalles que se siguen estudiando con respeto.",
    insignia: "Estudiante Sereno",
    guia:
      "Este tema puede asustar a los niños si se explica mal — evita usarlo para generar miedo. Enfatiza que Dios busca estar cerca de las personas, ese es el corazón del mensaje.",
  },
  {
    id: 31,
    titulo: "El Expediente de la Fe de los Científicos",
    kicker: "Caso 31",
    pregunta: "¿Hay científicos de verdad, de los que hacen descubrimientos importantes, que también crean en Dios?",
    fuente: "Curiosidad tras el Caso 14",
    pistas: [
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "Científicos como Isaac Newton, Gregor Mendel (padre de la genética) o Francis Collins (que dirigió el mapeo del genoma humano) tenían o tienen fe en Dios.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si la ciencia y la fe fueran completamente incompatibles, sería imposible que mentes tan brillantes y rigurosas sostuvieran las dos cosas a la vez — pero muchas lo hacen.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre científicos que también tienen fe?",
    opciones: [
      { id: "no-serios", texto: "Que esos científicos no eran tan serios", correcta: false },
      { id: "no-contradictorias", texto: "Que ser muy inteligente y tener fe no son cosas contradictorias", correcta: true },
      { id: "fingian", texto: "Que fingían tener fe", correcta: false },
    ],
    explicacion:
      "La lista de científicos importantes con fe es larga y sigue creciendo hoy — la ciencia no exige dejar de creer en Dios.",
    insignia: "Colega de Newton",
    guia:
      "Si tu hijo/a quiere ser científico/a algún día, este Caso es especialmente valioso: muéstrale que puede soñar con eso sin sentir que tiene que elegir entre la ciencia y su fe.",
  },
  {
    id: 32,
    titulo: "El Expediente del Perdón que Cuesta",
    kicker: "Caso 32",
    pregunta: "¿Por qué Jesús dijo que hay que perdonar 'hasta setenta veces siete'? ¿Eso no es exagerado?",
    fuente: "Una lectura bíblica en familia",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "'Setenta veces siete' no es un número exacto para contar — es una forma de decir 'no lleves la cuenta, perdona todas las veces que haga falta'.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Perdonar una y otra vez no significa dejar que te sigan lastimando sin límites — significa no cargar odio en el corazón, aunque también pongas límites sanos.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre este consejo de Jesús?",
    opciones: [
      { id: "sin-decir-nada", texto: "Que hay que dejar que te hagan daño sin decir nada", correcta: false },
      { id: "numero-literal", texto: "Que es un número literal que hay que contar", correcta: false },
      { id: "no-rencor", texto: "Que invita a no cargar rencor, no a aceptar todo sin límites", correcta: true },
    ],
    explicacion:
      "El perdón que enseñó Jesús es sobre liberar el corazón del rencor, no sobre permitir que sigan haciéndote daño sin poner límites.",
    insignia: "Contador Infinito",
    guia:
      "Aclara la diferencia clave: perdonar (soltar el rencor) no es lo mismo que confiar de nuevo sin límites. Se pueden hacer las dos cosas por separado.",
  },
  {
    id: 33,
    titulo: "El Expediente de la Vida que Empieza",
    kicker: "Caso 33",
    pregunta: "¿Por qué dicen que cada persona vale tanto, sin importar su edad o lo que pueda hacer?",
    fuente: "Una conversación familiar sobre el valor de las personas",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "La fe cristiana enseña que cada persona, sin importar su edad, tamaño o capacidad, fue creada a imagen de Dios — y por eso tiene un valor que no depende de lo que pueda hacer.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si el valor de una persona dependiera de lo que puede hacer, entonces un bebé, un anciano o alguien enfermo valdrían menos — y eso no encaja con lo que sentimos que es justo.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre el valor de cada persona?",
    opciones: [
      { id: "no-depende", texto: "Que el valor de una persona no depende de su tamaño ni de lo que puede hacer", correcta: true },
      { id: "solo-utiles", texto: "Que solo valen las personas que pueden hacer más cosas", correcta: false },
      { id: "opinion", texto: "Que el valor de las personas es solo opinión de cada quien", correcta: false },
    ],
    explicacion:
      "Creer que 'todos valemos igual' solo tiene sentido firme si ese valor viene de algo más grande que nosotros — y para la fe cristiana, viene de haber sido creados por Dios.",
    insignia: "Defensor de la Dignidad",
    guia:
      "Este tema puede tocar asuntos delicados según tu familia — mantenlo simple: la idea central para un niño es que CADA persona, sin excepción, tiene un valor enorme.",
  },
  {
    id: 34,
    titulo: "El Expediente del Testimonio Incómodo",
    kicker: "Caso 34",
    pregunta: "En los evangelios, hasta los héroes como los apóstoles quedan mal a veces. ¿Por qué no lo escondieron?",
    fuente: "Leyendo sobre Pedro negando a Jesús",
    pistas: [
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "Los evangelios cuentan sin disimular que los apóstoles se equivocaron, tuvieron miedo, dudaron e incluso negaron conocer a Jesús — cosas vergonzosas para ellos.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si alguien quiere inventar una historia para quedar bien, normalmente esconde sus propios errores — que los evangelios los muestren sin filtro es señal de que están contando lo que de verdad pasó.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre que los evangelios no escondan los errores de sus héroes?",
    opciones: [
      { id: "error-autores", texto: "Que fue un error de los que escribieron", correcta: false },
      { id: "creible", texto: "Que eso hace más creíble que están contando la verdad, no una historia inventada", correcta: true },
      { id: "sin-importancia", texto: "Que no tiene ninguna importancia", correcta: false },
    ],
    explicacion:
      "Contar tus propios errores sin necesidad no es lo que hace alguien que está inventando una historia para impresionar — es lo que hace alguien que está siendo honesto.",
    insignia: "Lector Honesto",
    guia:
      "Buen ejemplo para hablar de la propia honestidad: los héroes de la Biblia no son perfectos, y eso los hace más reales, no menos.",
  },
  {
    id: 35,
    titulo: "El Expediente de la Duda",
    kicker: "Caso 35",
    pregunta: "A veces dudo si todo esto es verdad. ¿Está mal dudar si soy cristiano/a?",
    fuente: "Un momento de inseguridad personal",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "En la Biblia misma hay personajes que dudaron, incluso uno de los apóstoles más cercanos a Jesús, a quien hoy conocemos como 'Tomás el que dudaba' — y Jesús no lo rechazó por eso.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Dudar no es lo contrario de la fe — lo contrario de la fe es dejar de buscar. Dudar y seguir investigando es señal de una fe que piensa, no de una fe débil.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre tener dudas?",
    opciones: [
      { id: "ya-no-cristiano", texto: "Que dudar significa que ya no eres cristiano", correcta: false },
      { id: "fingir", texto: "Que hay que fingir no tener dudas nunca", correcta: false },
      { id: "sano", texto: "Que dudar y seguir buscando respuestas es parte normal y sana de la fe", correcta: true },
    ],
    explicacion:
      "Toda esta colección de Casos existe justamente para eso: para investigar las dudas con calma, no para esconderlas.",
    insignia: "Investigador Honesto",
    guia:
      "Este puede ser el Caso más importante de todos para tranquilizarlo/a: dile que está BIEN dudar, y que ustedes van a seguir investigando las respuestas juntos, siempre.",
  },
  {
    id: 36,
    titulo: "El Expediente del Amor que No se Ve",
    kicker: "Caso 36",
    pregunta: "¿Cómo sé que el amor de Dios es real si no lo puedo ver ni tocar?",
    fuente: "Comparando con el amor de sus papás",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "El amor de tus papás tampoco se puede ver ni tocar directamente — lo que ves son las acciones que lo demuestran. Con Dios pasa algo parecido: se reconoce por lo que hace.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Muchas personas describen sentir la presencia de Dios en momentos de paz profunda, o en la bondad inesperada de otra persona — como señales de algo real, aunque invisible.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre algo real que no se puede tocar?",
    opciones: [
      { id: "muchas-cosas-reales", texto: "Que muchas cosas reales e importantes (como el amor) no se pueden tocar directamente", correcta: true },
      { id: "no-real", texto: "Que si no se puede tocar, no puede ser real", correcta: false },
      { id: "solo-ojos", texto: "Que solo lo que se ve con los ojos existe", correcta: false },
    ],
    explicacion:
      "Nadie ha visto el amor directamente, y aun así todos sabemos que es real — con la fe pasa algo parecido.",
    insignia: "Sentidor de lo Invisible",
    guia:
      "Usa el ejemplo de su propia familia: pregúntale si puede 'ver' tu amor por él directamente, o si lo reconoce por tus acciones. Ese puente ayuda mucho a explicar la fe.",
  },
  {
    id: 37,
    titulo: "El Expediente de los Manuscritos del Mar Muerto",
    kicker: "Caso 37",
    pregunta: "¿Es verdad que encontraron copias súper antiguas de la Biblia escondidas en cuevas?",
    fuente: "Un documental o clase de historia",
    pistas: [
      {
        tipo: "evidencia",
        titulo: "Pista de Evidencia",
        texto:
          "En 1947, un pastor encontró por accidente unos rollos escondidos en cuevas cerca del Mar Muerto, con más de 2.000 años de antigüedad — entre ellos, partes de libros de la Biblia.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Al comparar esos rollos tan antiguos con las copias de la Biblia que se usan hoy, los expertos encontraron que el texto se mantuvo casi exactamente igual durante todo ese tiempo.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre este descubrimiento?",
    opciones: [
      { id: "sin-relacion", texto: "Que no tiene ninguna relación con la Biblia actual", correcta: false },
      { id: "confirma", texto: "Que confirma que el texto bíblico se conservó con muchísimo cuidado por miles de años", correcta: true },
      { id: "moderno", texto: "Que fue un invento moderno", correcta: false },
    ],
    explicacion:
      "Este es uno de los descubrimientos arqueológicos más importantes de la historia — y respalda directamente lo que vimos en el Caso del 'Libro que Sobrevivió'.",
    insignia: "Explorador de Cuevas",
    guia:
      "Este Caso conecta perfecto con el Caso 03 — puedes repasarlos juntos como 'segunda parte' de la misma investigación.",
  },
  {
    id: 38,
    titulo: "El Expediente de la Justicia Final",
    kicker: "Caso 38",
    pregunta: "¿Por qué a veces los que hacen cosas malas 'se salen con la suya' y no les pasa nada?",
    fuente: "Una noticia o situación injusta que vio",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Que alguien no reciba consecuencias AHORA no significa que nunca las reciba — la fe cristiana enseña que existe una justicia final, aunque no la veamos completa en esta vida.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Esta esperanza de que 'al final, la justicia gana' ha dado fuerzas a muchas personas para seguir haciendo el bien, incluso cuando el mundo parece injusto ahora mismo.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar cuando la injusticia parece ganar por ahora?",
    opciones: [
      { id: "no-importa", texto: "Que como no hay consecuencias inmediatas, no importa hacer el bien", correcta: false },
      { id: "nunca-llega", texto: "Que la justicia nunca llega para nadie", correcta: false },
      { id: "no-final", texto: "Que esta vida no es el capítulo final de la historia", correcta: true },
    ],
    explicacion:
      "Creer en una justicia final no es una excusa para no actuar ahora — es una razón para seguir haciendo el bien sin desesperarse.",
    insignia: "Testigo de la Esperanza",
    guia:
      "Valida su indignación (¡tiene razón en sentirse mal por la injusticia!), y luego ofrécele esta esperanza como algo que sostiene, no como excusa para no hacer nada.",
  },
  {
    id: 39,
    titulo: "El Expediente del Diseño del Cuerpo",
    kicker: "Caso 39",
    pregunta: "¿Es verdad que nuestro cuerpo es súper complicado, como para haber pasado 'de casualidad'?",
    fuente: "Una clase de ciencias naturales",
    pistas: [
      {
        tipo: "ciencia",
        titulo: "Pista de Ciencia",
        texto:
          "El cuerpo humano tiene sistemas increíblemente complejos trabajando juntos todo el tiempo — como el ojo, que procesa luz y color en fracciones de segundo, o el cerebro, más complejo que cualquier computadora conocida.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Cuantas más partes complejas necesitan funcionar juntas al mismo tiempo para que algo funcione, más difícil es explicarlo solo con casualidad paso a paso.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre lo complejo que es el cuerpo humano?",
    opciones: [
      { id: "diseno-fuerte", texto: "Que su complejidad es una razón fuerte para pensar en un diseño", correcta: true },
      { id: "nada-especial", texto: "Que no dice nada especial sobre su origen", correcta: false },
      { id: "no-estudiable", texto: "Que es imposible estudiarlo científicamente", correcta: false },
    ],
    explicacion:
      "Este es otro Caso de la familia del 'Diseño' — cuanto más se estudia el cuerpo humano, más asombro genera en quienes lo investigan, creyentes o no.",
    insignia: "Ingeniero del Cuerpo",
    guia:
      "Este Caso conecta con el del 'Diseño Perfecto' y el 'Universo Ajustado' — juntos forman una familia de tres razonamientos parecidos que puedes repasar en conjunto.",
  },
  {
    id: 40,
    titulo: "El Expediente de la Iglesia Imperfecta",
    kicker: "Caso 40",
    pregunta: "Si Dios es tan bueno, ¿por qué hay cristianos que se portan mal o hacen cosas feas?",
    fuente: "Una decepción con alguien de la iglesia o la comunidad",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Ser cristiano no significa ser perfecto — significa reconocer que necesitas ayuda para ser mejor. Que alguien falle no invalida lo que dice creer, igual que un mal estudiante no invalida que las matemáticas sean verdad.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "La propia Biblia es honesta sobre esto: sus héroes también fallaron muchas veces — la fe nunca prometió gente perfecta, prometió gente en proceso de cambio.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar cuando un cristiano se porta mal?",
    opciones: [
      { id: "todo-falso", texto: "Que si un cristiano falla, entonces todo el cristianismo es falso", correcta: false },
      { id: "no-cambia", texto: "Que su error no cambia si la fe en sí es verdadera o no", correcta: true },
      { id: "dejar-de-creer", texto: "Que hay que dejar de creer por culpa de otras personas", correcta: false },
    ],
    explicacion:
      "Juzgar una idea por el peor comportamiento de alguien que la sigue no es justo — hay que evaluar la idea por sus propios méritos, como hicimos en cada Caso anterior.",
    insignia: "Pensador Justo",
    guia:
      "Es un tema delicado si tu hijo/a vivió una decepción real — escúchalo primero, valida el dolor, y luego ayúdalo a separar 'la persona que falló' de 'si la fe en sí es verdadera'.",
  },
  {
    id: 41,
    titulo: "El Expediente del Propósito",
    kicker: "Caso 41",
    pregunta: "¿Para qué estoy realmente aquí? ¿Tengo un propósito, o solo pasó porque sí?",
    fuente: "Una pregunta existencial propia de la edad",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si solo fuéramos el resultado de puro azar sin ningún plan, sería raro que sintamos tan fuerte la necesidad de encontrarle sentido a la vida — esa búsqueda misma es una pista.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "La fe cristiana enseña que cada persona fue creada a propósito, con dones únicos y una historia que importa — no eres un accidente.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre tener un propósito?",
    opciones: [
      { id: "sin-sentido", texto: "Que buscar un propósito no tiene ningún sentido", correcta: false },
      { id: "inventado", texto: "Que el propósito de cada quien es completamente inventado", correcta: false },
      { id: "si-importa", texto: "Que la fe ofrece una razón sólida para creer que sí importas y tienes un propósito", correcta: true },
    ],
    explicacion:
      "No estás aquí por casualidad — fuiste pensado, con dones únicos, para una historia que solo tú puedes vivir.",
    insignia: "Buscador de Sentido",
    guia:
      "Este Caso es una oportunidad hermosa: pregúntale qué cree que se le da bien o le gusta hacer, y conéctalo con la idea de que esos dones no son casualidad.",
  },
  {
    id: 42,
    titulo: "El Expediente de los Ángeles y Demonios",
    kicker: "Caso 42",
    pregunta: "¿Los ángeles y demonios son reales, o solo cosas de películas?",
    fuente: "Una película o serie de terror/fantasía",
    pistas: [
      {
        tipo: "evidencia",
        titulo: "Pista de Evidencia",
        texto:
          "La Biblia sí habla de seres espirituales — ángeles como mensajeros de Dios, y fuerzas del mal — pero de forma muy distinta a como los muestran las películas de terror, que suelen exagerar para asustar.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Separar lo que dice un texto antiguo y serio de lo que inventa Hollywood para entretener es un buen hábito, igual que hicimos con otros temas de este Expediente.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre este tema?",
    opciones: [
      { id: "distinguir", texto: "Que hay que distinguir entre lo que enseña la Biblia y lo que exagera el cine", correcta: true },
      { id: "todo-literal", texto: "Que todo lo que muestran las películas de terror es literalmente cierto", correcta: false },
      { id: "no-pensar", texto: "Que como dan miedo, mejor no pensar en el tema", correcta: false },
    ],
    explicacion:
      "Este tema no es para asustar — es para entender con calma la diferencia entre lo que cuenta un texto serio y lo que inventa una película para entretener.",
    insignia: "Separador de Realidad y Ficción",
    guia:
      "Si tu hijo/a es sensible al miedo, maneja este Caso con mucha calma y sin dramatismo — el objetivo es dar tranquilidad, no generar más miedo.",
  },
  {
    id: 43,
    titulo: "El Expediente de la Verdad Absoluta",
    kicker: "Caso 43",
    pregunta: "¿Puede algo ser verdad para TODOS, siempre, o cada quien tiene 'su propia verdad'?",
    fuente: "Un debate en clase sobre opiniones",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Decir 'no existe la verdad absoluta, todo es relativo' es, en sí mismo, una afirmación que se presenta como absolutamente verdadera — lo cual se contradice a sí misma.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Hay cosas que sentimos que son verdad para todos, en cualquier lugar (como que torturar a alguien por diversión está mal) — no solo 'según cada quien'.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre si existe una verdad para todos?",
    opciones: [
      { id: "todo-opinion", texto: "Que absolutamente todo es solo opinión personal", correcta: false },
      { id: "si-existe", texto: "Que sí existen verdades que aplican a todas las personas, en todo lugar", correcta: true },
      { id: "no-importa", texto: "Que la verdad no importa", correcta: false },
    ],
    explicacion:
      "Decir que 'todo es relativo' termina contradiciéndose a sí mismo — y eso es una pista de que sí existen verdades reales, más allá de la opinión de cada quien.",
    insignia: "Filósofo de la Verdad",
    guia:
      "Este Caso es abstracto pero poderoso — el ejemplo de 'torturar por diversión está mal, para todos, siempre' suele ser el más fácil de entender para conectar la idea.",
  },
  {
    id: 44,
    titulo: "El Expediente del Regalo que No se Gana",
    kicker: "Caso 44",
    pregunta: "¿Por qué dicen que el amor de Dios no se gana portándose bien, si eso no tiene sentido?",
    fuente: "Comparando con ganarse premios o notas",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "A diferencia de una nota en el colegio, que se gana con esfuerzo, la fe cristiana enseña que el amor de Dios es un regalo — no algo que puedas 'ganar' comportándote perfecto.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si el amor de Dios dependiera de portarse perfecto, nadie podría estar tranquilo nunca, porque nadie es perfecto todo el tiempo — un regalo, en cambio, no depende de merecerlo.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre esta idea de 'regalo' en vez de 'premio ganado'?",
    opciones: [
      { id: "no-importa-esfuerzo", texto: "Que entonces no importa esforzarse en nada", correcta: false },
      { id: "sin-logica", texto: "Que es una idea sin ninguna lógica", correcta: false },
      { id: "quita-presion", texto: "Que quita la presión de tener que ser perfecto para ser amado", correcta: true },
    ],
    explicacion:
      "Un regalo de verdad no se gana — y eso es, según la fe cristiana, lo que hace tan especial el amor de Dios: no depende de que seas perfecto.",
    insignia: "Receptor del Regalo",
    guia:
      "Este es un buen antídoto contra la culpa excesiva — recuérdale que esforzarse en portarse bien sigue siendo importante, pero no es la condición para ser amado.",
  },
  {
    id: 45,
    titulo: "El Expediente de las Coincidencias",
    kicker: "Caso 45",
    pregunta: "A veces pasan cosas que parecen 'demasiado perfectas' para ser casualidad. ¿Eso significa algo?",
    fuente: "Una experiencia personal curiosa",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Muchas personas cuentan momentos donde algo pasó justo en el momento exacto que lo necesitaban — y sienten que fue más que suerte.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Una coincidencia aislada puede ser solo eso — pero un patrón repetido de 'ayuda justo a tiempo' en la vida de alguien vale la pena mirarlo con atención, no descartarlo automáticamente.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre esas coincidencias que se sienten especiales?",
    opciones: [
      { id: "prestar-atencion", texto: "Que vale la pena prestarles atención, sin exagerar cada casualidad pequeña", correcta: true },
      { id: "todo-señal", texto: "Que absolutamente todo lo que pasa es una señal de Dios", correcta: false },
      { id: "nada-significa", texto: "Que ninguna coincidencia significa nada, nunca", correcta: false },
    ],
    explicacion:
      "El equilibrio sano es este: ni ver 'una señal' en cada cosita, ni descartar todo como pura casualidad sin pensar.",
    insignia: "Observador Atento",
    guia:
      "Pregúntale si alguna vez sintió algo así — escuchar su experiencia sin corregirla de más ni exagerarla es la mejor forma de acompañarlo en este tema.",
  },
  {
    id: 46,
    titulo: "El Expediente de la Voz de los Profetas",
    kicker: "Caso 46",
    pregunta: "¿Quiénes eran los profetas de la Biblia y por qué eran importantes?",
    fuente: "Una lectura o clase sobre el Antiguo Testamento",
    pistas: [
      {
        tipo: "historia",
        titulo: "Pista de Historia",
        texto:
          "Los profetas eran personas que, según la Biblia, recibían mensajes de Dios para advertir a la gente antes de que algo importante pasara — muchas veces mensajes incómodos que nadie quería escuchar.",
      },
      {
        tipo: "evidencia",
        titulo: "Pista de Evidencia",
        texto:
          "Varias de esas advertencias, escritas cientos de años antes, coincidieron después con hechos históricos reales, como vimos en el Caso de las Profecías Cumplidas.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre el papel de los profetas?",
    opciones: [
      { id: "invento", texto: "Que eran solo personas inventando historias", correcta: false },
      { id: "mensajeros", texto: "Que fueron mensajeros que se atrevieron a decir verdades difíciles, y varias de sus palabras se cumplieron", correcta: true },
      { id: "sin-importancia", texto: "Que no tiene importancia estudiarlos", correcta: false },
    ],
    explicacion:
      "Ser profeta no era un trabajo cómodo — muchos fueron rechazados por decir la verdad. Eso hace más interesante que se les tomara en serio con el tiempo.",
    insignia: "Mensajero Valiente",
    guia:
      "Conecta este Caso con el 19 (Profecías Cumplidas) para reforzar la idea: los profetas no adivinaban al azar, dejaron un registro que se puede estudiar.",
  },
  {
    id: 47,
    titulo: "El Expediente de la Identidad",
    kicker: "Caso 47",
    pregunta: "¿Quién decide quién soy yo de verdad: lo que otros dicen de mí, o algo más?",
    fuente: "Una situación de comparación o presión social",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "La fe cristiana enseña que tu identidad más profunda no la deciden tus notas, tus likes o lo que digan tus compañeros — viene de haber sido creado con un valor único por Dios.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Si tu valor dependiera solo de la opinión de los demás, cambiaría todo el tiempo según quién te mire — necesitas algo más estable que eso para saber quién eres de verdad.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre dónde viene tu verdadera identidad?",
    opciones: [
      { id: "depende-otros", texto: "Que tu identidad depende completamente de lo que otros piensen de ti", correcta: false },
      { id: "sin-control", texto: "Que no tienes ningún control sobre quién eres", correcta: false },
      { id: "algo-estable", texto: "Que viene de algo más profundo y estable que la opinión de los demás", correcta: true },
    ],
    explicacion:
      "Basar tu identidad en algo que no cambia (como ser creado y amado por Dios) es mucho más firme que basarla en opiniones que cambian todo el tiempo.",
    insignia: "Dueño de su Historia",
    guia:
      "Este Caso es especialmente valioso en la preadolescencia, cuando la presión social empieza a pesar más — repítelo si hace falta a lo largo de los años.",
  },
  {
    id: 48,
    titulo: "El Expediente del Camino Angosto",
    kicker: "Caso 48",
    pregunta: "¿Por qué a veces seguir lo que está bien es más difícil que seguir a la mayoría?",
    fuente: "Una situación donde eligió lo correcto y fue difícil",
    pistas: [
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Jesús mismo dijo que el camino de hacer lo correcto a veces es 'angosto' — es decir, menos transitado, porque no siempre es el camino popular.",
      },
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Elegir lo correcto cuando es difícil no te hace raro — te hace valiente. Casi todas las personas que admiramos por su carácter eligieron el camino difícil más de una vez.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar cuando hacer lo correcto se siente difícil?",
    opciones: [
      { id: "vale-la-pena", texto: "Que ser valiente por hacer lo correcto vale la pena, aunque sea el camino menos popular", correcta: true },
      { id: "seguir-mayoria", texto: "Que si es difícil, mejor seguir a la mayoría siempre", correcta: false },
      { id: "deberia-ser-facil", texto: "Que hacer lo correcto debería ser siempre fácil", correcta: false },
    ],
    explicacion:
      "Nadie dijo que el camino correcto sería el más fácil — pero eso no lo hace menos correcto, ni a ti menos valiente por elegirlo.",
    insignia: "Caminante Valiente",
    guia:
      "La próxima vez que tu hijo/a elija lo correcto aunque sea difícil, nómbraselo explícitamente: 'eso fue el camino angosto, y lo elegiste' — el reconocimiento refuerza el hábito.",
  },
  {
    id: 49,
    titulo: "El Expediente de la Esperanza",
    kicker: "Caso 49",
    pregunta: "¿Por qué los cristianos dicen que no hay que temerle al futuro, si nadie sabe qué va a pasar?",
    fuente: "Una preocupación sobre el futuro",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "La esperanza cristiana no es 'todo va a salir perfecto' — es la confianza de que, pase lo que pase, no estás solo/a y hay un final bueno más grande que cualquier problema de ahora.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Preocuparse sin límite por lo que todavía no pasa no cambia el futuro — pero tener una esperanza firme sí puede cambiar cómo enfrentas cada día mientras tanto.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre el miedo al futuro?",
    opciones: [
      { id: "preocuparse-todo", texto: "Que hay que preocuparse todo lo posible para estar preparado", correcta: false },
      { id: "da-fuerza", texto: "Que la esperanza no elimina la incertidumbre, pero sí te da fuerza para enfrentarla", correcta: true },
      { id: "sin-sentido", texto: "Que el futuro no tiene ningún sentido pensarlo", correcta: false },
    ],
    explicacion:
      "Tener esperanza no es fingir que no hay problemas — es confiar en que no los enfrentas solo/a, pase lo que pase.",
    insignia: "Portador de Esperanza",
    guia:
      "Si tu hijo/a está ansioso por algo específico (un examen, un cambio de colegio), usa este Caso como puente directo a esa preocupación real.",
  },
  {
    id: 50,
    titulo: "El Expediente del Perdón de Dios",
    kicker: "Caso 50",
    pregunta: "¿Hay algo que hice tan mal que ni Dios podría perdonarlo?",
    fuente: "Un momento de culpa fuerte",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "La fe cristiana enseña que no existe un error 'demasiado grande' para el perdón de Dios — solo la elección de no querer recibirlo.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Un amor que solo perdona los errores pequeños no sería un amor muy grande — el punto central de la fe cristiana es que el perdón alcanza incluso lo más difícil.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre los límites del perdón de Dios?",
    opciones: [
      { id: "hay-limites", texto: "Que hay errores que ni Dios puede perdonar", correcta: false },
      { id: "hay-que-ganarselo", texto: "Que el perdón de Dios hay que ganárselo con años de buen comportamiento", correcta: false },
      { id: "sin-limite", texto: "Que según la fe cristiana, ese perdón no tiene límite para quien lo busca de verdad", correcta: true },
    ],
    explicacion:
      "Este es de los mensajes centrales de la fe cristiana: no importa qué tan grande sea el error, el perdón sigue disponible para quien lo busca con sinceridad.",
    insignia: "Receptor de Gracia",
    guia:
      "Si tu hijo/a está cargando culpa por algo específico, este Caso puede ser un momento importante de conversación real — escucha primero, sin minimizar lo que siente.",
  },
  {
    id: 51,
    titulo: "El Expediente de la Familia de la Fe",
    kicker: "Caso 51",
    pregunta: "¿Por qué ir a la iglesia o reunirse con otros si puedo creer en Dios solo, en mi casa?",
    fuente: "Una pregunta sobre asistir a reuniones",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Desde el inicio, la fe cristiana se vivió en comunidad — apoyándose, celebrando y aprendiendo juntos, no en soledad.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Igual que es más fácil mantener un hábito cuando lo haces acompañado, la fe también se sostiene mejor con el apoyo de otras personas que caminan lo mismo.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre vivir la fe en comunidad?",
    opciones: [
      { id: "ayuda-a-sostener", texto: "Que reunirse con otros ayuda a sostener y hacer crecer la fe, no es solo un extra opcional", correcta: true },
      { id: "sin-utilidad", texto: "Que la comunidad no tiene ninguna utilidad real", correcta: false },
      { id: "sin-proposito", texto: "Que ir a reuniones religiosas no tiene ningún propósito", correcta: false },
    ],
    explicacion:
      "La fe en comunidad no reemplaza la fe personal — la fortalece, igual que un equipo fortalece a cada jugador.",
    insignia: "Miembro del Equipo",
    guia:
      "Buen momento para hablar de la propia comunidad de fe de la familia (si la tienen) y por qué es valiosa, más allá de la obligación.",
  },
  {
    id: 52,
    titulo: "El Expediente Final: Tu Propio Caso",
    kicker: "Caso 52",
    pregunta: "Después de investigar tanto... ¿qué es lo que TÚ de verdad crees?",
    fuente: "El cierre de todo el año de expedientes",
    pistas: [
      {
        tipo: "identidad",
        titulo: "Pista del Corazón",
        texto:
          "Después de 51 Casos investigando evidencia, lógica e historia, ya tienes tus propias razones — no las de otra persona repetidas de memoria.",
      },
      {
        tipo: "logica",
        titulo: "Pista de Lógica",
        texto:
          "Una fe investigada, con preguntas hechas y respuestas buscadas de verdad, es mucho más firme que una fe que solo se repite sin pensar.",
      },
    ],
    preguntaConclusion: "¿Qué es lo más razonable pensar sobre tu propia fe después de todo este viaje?",
    opciones: [
      { id: "no-sirvio", texto: "Que investigar tanto no sirvió de nada", correcta: false },
      { id: "propias-palabras", texto: "Que ahora la puedes explicar con tus propias palabras y razones", correcta: true },
      { id: "dejar-preguntas", texto: "Que hay que dejar de hacerse preguntas para siempre", correcta: false },
    ],
    explicacion:
      "Este es el punto de todo el Expediente: no que memorices respuestas, sino que construyas una fe que es tuya, pensada y sostenida por ti mismo/a.",
    insignia: "Investigador de la Verdad — Caso Cerrado",
    guia:
      "Celebra este momento en grande — pregúntale cuál Caso le gustó más y por qué. Este es el verdadero objetivo de Emuná: que la fe de tu hijo/a sea suya, no prestada.",
  },
];

export const CASOS_COMPLETOS: CasoCompleto[] = CASOS_BASE.map((caso) => ({
  ...caso,
  ...CASOS_EXTRA[caso.id],
}));

// Todos los 52 Casos ya tienen contenido completo — no quedan stubs pendientes.
export const CASOS_STUB: CasoStub[] = [];

export const TOTAL_CASOS = 52;
export const MODULO_1_HASTA = 4;

export function getCasoCompleto(id: number): CasoCompleto | undefined {
  return CASOS_COMPLETOS.find((c) => c.id === id);
}

export function getCasoStub(id: number): CasoStub | undefined {
  return CASOS_STUB.find((c) => c.id === id);
}

export function getCasoTitulo(id: number): string {
  return getCasoCompleto(id)?.titulo ?? getCasoStub(id)?.titulo ?? `Caso ${id}`;
}

export function getCasoKicker(id: number): string {
  return getCasoCompleto(id)?.kicker ?? getCasoStub(id)?.kicker ?? `Caso ${String(id).padStart(2, "0")}`;
}
