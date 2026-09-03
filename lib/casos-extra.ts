// El "cierre" de cada Caso, inspirado en la estructura del libro original del usuario:
// un versículo que respalda lo investigado, una reflexión que lo conecta con la vida
// diaria, y una actividad práctica para hacer en familia esa semana.
import type { Versiculo } from "./casos";

export type CasoExtra = {
  versiculo: Versiculo;
  reflexion: string;
  actividad: string;
};

export const CASOS_EXTRA: Record<number, CasoExtra> = {
  1: {
    versiculo: { texto: "En el principio creó Dios los cielos y la tierra.", cita: "Génesis 1:1" },
    reflexion:
      "La Biblia no da una clase de física, pero desde su primera línea afirma que el universo tuvo un comienzo con Dios detrás — mucho antes de que la ciencia confirmara el Big Bang.",
    actividad:
      "Esta noche, miren juntos las estrellas (o una foto del espacio) y digan en voz alta una cosa que les recuerda que el universo tuvo un comienzo.",
  },
  2: {
    versiculo: {
      texto: "Me pareció también a mí bueno... escribírtelas por orden, para que conozcas bien la verdad.",
      cita: "Lucas 1:3-4",
    },
    reflexion:
      "Lucas, uno de los que escribió sobre Jesús, aclaró que investigó como un verdadero reportero antes de escribir — no inventó nada al azar.",
    actividad:
      "Jueguen a ser 'reporteros': pídanle a un familiar que cuente un recuerdo real de su vida, y anoten los detalles como si fueran investigadores.",
  },
  3: {
    versiculo: {
      texto: "La hierba se seca, la flor se marchita, pero la palabra de nuestro Dios permanece para siempre.",
      cita: "Isaías 40:8",
    },
    reflexion:
      "Este versículo habla de algo que dura para siempre, y conecta directo con lo que descubrieron: el texto de la Biblia se conservó con muchísimo cuidado durante miles de años.",
    actividad:
      "Comparen una foto vieja de la familia con una copia o escaneo de ella — hablen de por qué es importante conservar bien las cosas importantes, como se conservó la Biblia.",
  },
  4: {
    versiculo: {
      texto: "En este mundo afrontarán aflicciones, pero ¡anímense! Yo he vencido al mundo.",
      cita: "Juan 16:33",
    },
    reflexion:
      "Jesús no prometió una vida sin dolor — prometió no dejarnos solos en él, y que el dolor no tiene la última palabra.",
    actividad:
      "Piensen en alguien que esté pasando un momento difícil y hagan juntos un gesto concreto de apoyo esta semana: una llamada, un dibujo, una nota.",
  },
  5: {
    versiculo: {
      texto: "Los cielos cuentan la gloria de Dios; el firmamento proclama la obra de sus manos.",
      cita: "Salmos 19:1",
    },
    reflexion:
      "Mirar el cielo, para el salmista, ya era una forma de 'escuchar' hablar a Dios sobre lo bien diseñado que está todo.",
    actividad:
      "Salgan a mirar el cielo de noche (o un video del espacio) y cada uno diga una cosa que le parece 'demasiado perfecta para ser casualidad'.",
  },
  6: {
    versiculo: {
      texto: "Si Cristo no resucitó, vana es entonces nuestra predicación, vana también su fe.",
      cita: "1 Corintios 15:14",
    },
    reflexion:
      "Hasta los primeros cristianos sabían que todo dependía de si la resurrección era real o no — no la daban por sentada sin evidencia.",
    actividad:
      "Dibujen juntos una línea de tiempo simple de la Semana Santa (viernes a domingo) y marquen el momento de la tumba vacía.",
  },
  7: {
    versiculo: { texto: "¡Creo! Ayúdame en mi poca fe.", cita: "Marcos 9:24" },
    reflexion:
      "Hasta en la Biblia hay personas que piden ayuda para creer algo que no pueden comprobar del todo — está bien tener preguntas y aun así seguir buscando.",
    actividad:
      "Compartan en familia una historia (propia o de alguien conocido) de algo que pasó y no tuvo una explicación fácil.",
  },
  8: {
    versiculo: { texto: "Ama a tu prójimo como a ti mismo.", cita: "Marcos 12:31" },
    reflexion:
      "El amor al prójimo no depende de que piense exactamente igual que nosotros — se puede amar y respetar sin fingir que todo da lo mismo.",
    actividad:
      "Esta semana, hagan algo amable por alguien de una creencia distinta a la suya: un vecino, un compañero de clase.",
  },
  9: {
    versiculo: {
      texto: "Si ustedes, aun siendo malos, saben dar cosas buenas a sus hijos, ¡cuánto más su Padre celestial dará cosas buenas a los que le pidan!",
      cita: "Mateo 7:11",
    },
    reflexion:
      "Este versículo compara a Dios con un buen padre que sabe cuándo decir 'todavía no' — y eso no significa que no esté escuchando.",
    actividad:
      "Escriban juntos una oración por algo que esperan, y también agradezcan por una oración pasada que sí se respondió.",
  },
  10: {
    versiculo: {
      texto: "Yo soy la resurrección y la vida... el que cree en mí, aunque muera, vivirá.",
      cita: "Juan 11:25",
    },
    reflexion: "Esta es una de las promesas centrales de la fe cristiana sobre lo que pasa después de morir.",
    actividad:
      "Si perdieron a alguien querido (persona o mascota), enciendan una vela o hagan un pequeño recuerdo compartiendo una memoria feliz.",
  },
  11: {
    versiculo: { texto: "¡Ay de los que a lo malo llaman bueno, y a lo bueno malo!", cita: "Isaías 5:20" },
    reflexion: "La Biblia toma muy en serio que el bien y el mal son reales — no solo opiniones que cambian según cada quien.",
    actividad: "Piensen juntos en una regla de la casa y hablen de POR QUÉ existe — qué bien real está protegiendo.",
  },
  12: {
    versiculo: {
      texto: "Cosas que hemos oído y conocido, y que nuestros padres nos han contado... para que las conozca la generación venidera.",
      cita: "Salmos 78:3-4",
    },
    reflexion: "La Biblia misma valora dejar evidencia y memoria clara para las próximas generaciones — igual que hace la arqueología.",
    actividad:
      "Busquen juntos en internet una foto de un descubrimiento arqueológico bíblico (como la Piscina de Siloé) y coméntenla.",
  },
  13: {
    versiculo: {
      texto: "Si alguno está en Cristo, es una nueva creación. ¡Lo viejo ha pasado, ha llegado ya lo nuevo!",
      cita: "2 Corintios 5:17",
    },
    reflexion: "Este versículo describe exactamente el tipo de cambio profundo que investigaron en este Caso.",
    actividad: "Cada uno comparte algo pequeño en lo que le gustaría 'renovarse' esta semana, y se animan mutuamente a lograrlo.",
  },
  14: {
    versiculo: { texto: "Grandes son las obras del Señor, estudiadas por los que en ellas se deleitan.", cita: "Salmos 111:2" },
    reflexion: "Estudiar la creación con curiosidad científica puede ser, para un creyente, una forma de apreciar más a Dios.",
    actividad:
      "Elijan un tema de ciencia que le guste a su hijo/a y busquen juntos quién lo descubrió — vean si esa persona tenía fe.",
  },
  15: {
    versiculo: {
      texto: "Sean bondadosos y compasivos unos con otros, y perdónense mutuamente, así como Dios los perdonó a ustedes.",
      cita: "Colosenses 3:13",
    },
    reflexion: "Perdonar así se practica poco a poco — no es un interruptor que se enciende de golpe.",
    actividad: "Si hay algún conflicto pendiente en casa, esta semana den un paso pequeño hacia el perdón: una conversación, una disculpa.",
  },
  16: {
    versiculo: { texto: "Vimos su estrella en el oriente, y hemos venido a adorarlo.", cita: "Mateo 2:2" },
    reflexion: "Los sabios siguieron una señal en el cielo con paciencia y disposición para investigar — como buenos detectives.",
    actividad: "Si tienen un pesebre en casa, acerquen la figura de la estrella o los magos, como recordatorio de ese viaje de investigación.",
  },
  17: {
    versiculo: { texto: "La palabra de Dios no está presa.", cita: "2 Timoteo 2:9" },
    reflexion: "Aunque intentaron destruirla muchas veces a lo largo de la historia, la Biblia sigue viva y disponible hoy.",
    actividad: "Busquen juntos cuántos idiomas tiene traducida la Biblia — el número los va a sorprender.",
  },
  18: {
    versiculo: {
      texto: "Muestran que llevan escrito en el corazón lo que la ley exige, y así lo confirman los dictados de su conciencia.",
      cita: "Romanos 2:15",
    },
    reflexion: "Este versículo describe exactamente esa 'voz interior' que investigaron en este Caso.",
    actividad: "Practiquen decir la verdad en una situación pequeña esta semana, aunque sea incómodo, y hablen después de cómo se sintió.",
  },
  19: {
    versiculo: { texto: "Yo anuncio el fin desde el principio.", cita: "Isaías 46:10" },
    reflexion: "La Biblia afirma que Dios conoce el futuro, y respalda esa afirmación con profecías documentadas y fechadas.",
    actividad: "Busquen juntos (con ayuda de un adulto) una profecía del Antiguo Testamento sobre Jesús y compárenla con el Nuevo Testamento.",
  },
  20: {
    versiculo: { texto: "Me buscarán y me encontrarán, cuando me busquen de todo corazón.", cita: "Jeremías 29:13" },
    reflexion: "Dios invita a la búsqueda sincera, con el corazón — no a una evidencia forzada que quite la libertad de elegir.",
    actividad: "Dediquen 5 minutos de silencio en familia esta semana para 'buscar' a Dios en calma, sin pantallas ni ruido.",
  },
  21: {
    versiculo: { texto: "En todo tiempo ama el amigo.", cita: "Proverbios 17:17" },
    reflexion: "La Biblia valora mucho la amistad leal — no es un tema aparte de la fe, es parte central de ella.",
    actividad: "Escriban juntos una nota de agradecimiento para un buen amigo/a y entréguenla esta semana.",
  },
  22: {
    versiculo: {
      texto: "Cuando contemplo tus cielos... ¿qué es el hombre, para que en él pienses?",
      cita: "Salmos 8:3-4",
    },
    reflexion: "El ajuste preciso del universo lleva al salmista a sentir asombro por su propio lugar en él.",
    actividad: "Hagan juntos una lista de 3 cosas del universo que les parezcan 'demasiado exactas para ser casualidad'.",
  },
  23: {
    versiculo: { texto: "Conocerán la verdad, y la verdad los hará libres.", cita: "Juan 8:32" },
    reflexion: "Buscar la verdad con cuidado, y no creer todo lo que circula, es parte de la libertad que enseña la fe.",
    actividad: "La próxima vez que vean algo dudoso en internet, practiquen juntos buscar 2 fuentes distintas antes de creerlo.",
  },
  24: {
    versiculo: {
      texto: "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo.",
      cita: "Salmos 23:4",
    },
    reflexion: "Uno de los versículos más consoladores de toda la Biblia frente al miedo a la muerte.",
    actividad: "Aprendan juntos de memoria esta frase corta, para recordarla en los momentos de miedo.",
  },
  25: {
    versiculo: { texto: "Nosotros no podemos dejar de decir lo que hemos visto y oído.", cita: "Hechos 4:20" },
    reflexion: "Los apóstoles hablaban como testigos de algo que vivieron, no como inventores de una historia.",
    actividad: "Practiquen contar un evento real que vivieron juntos 'como testigos', con todos los detalles precisos.",
  },
  26: {
    versiculo: { texto: "No te alteres por causa de los malignos... porque como hierba serán pronto cortados.", cita: "Salmos 37:1-2" },
    reflexion: "Hasta los salmistas se frustraban con la injusticia del mundo — no eres el único/a en sentir eso.",
    actividad: "Hagan una acción concreta de justicia esta semana: defender a alguien, repartir algo de forma equitativa.",
  },
  27: {
    versiculo: {
      texto: "Ninguna palabra corrompida salga de vuestra boca, sino la que sea buena para la necesaria edificación.",
      cita: "Efesios 4:29",
    },
    reflexion: "Este consejo, escrito hace 2.000 años, aplica directo a cómo comportarnos e informarnos hoy en redes sociales.",
    actividad: "Revisen juntos una cuenta o página que sigan y evalúen si comparte información confiable.",
  },
  28: {
    versiculo: { texto: "Y José también subió... a la ciudad de David, que se llama Belén.", cita: "Lucas 2:4" },
    reflexion: "Los evangelios ubican los hechos en lugares geográficos reales y verificables, no en un 'érase una vez' impreciso.",
    actividad: "Marquen en un mapa (físico o digital) los lugares de la Biblia que ya investigaron en Casos anteriores.",
  },
  29: {
    versiculo: { texto: "Manteniendo la fe y buena conciencia.", cita: "1 Timoteo 1:19" },
    reflexion: "Cuidar la conciencia es parte activa de la fe cristiana, no algo pasivo que simplemente 'sucede'.",
    actividad: "Antes de dormir esta semana, pregúntense juntos: '¿hoy escuché a mi conciencia?'",
  },
  30: {
    versiculo: {
      texto: "En la casa de mi Padre muchas moradas hay... voy, pues, a preparar lugar para vosotros.",
      cita: "Juan 14:2-3",
    },
    reflexion: "El énfasis central de este versículo es la promesa de estar con Dios, no el miedo.",
    actividad: "Dibujen juntos cómo imaginan un lugar de paz total, y hablen de por qué la cercanía con Dios lo haría especial.",
  },
  31: {
    versiculo: { texto: "Gloria de Dios es encubrir un asunto; pero honra del rey es escudriñarlo.", cita: "Proverbios 25:2" },
    reflexion: "Investigar y descubrir cómo funciona el mundo puede ser, para muchos científicos con fe, una forma de honrar a Dios.",
    actividad: "Elijan un científico con fe y busquen juntos un dato curioso de su vida y su trabajo.",
  },
  32: {
    versiculo: {
      texto: "No te digo hasta siete, sino aun hasta setenta veces siete.",
      cita: "Mateo 18:22",
    },
    reflexion: "Este es exactamente el versículo que investigaron en este Caso — el corazón detrás del número.",
    actividad: "Practiquen un gesto de perdón concreto esta semana con alguien de la familia.",
  },
  33: {
    versiculo: {
      texto: "Tú formaste mis entrañas; me hiciste en el vientre de mi madre... estoy asombrosamente hecho.",
      cita: "Salmos 139:13-14",
    },
    reflexion: "La Biblia afirma el valor de cada persona desde el inicio mismo de su formación.",
    actividad: "Miren juntos fotos de bebé de su hijo/a y hablen de lo especial que fue desde el principio.",
  },
  34: {
    versiculo: {
      texto: "Y él negó otra vez... y comenzó a maldecir y a jurar: No conozco a ese hombre.",
      cita: "Marcos 14:70-71",
    },
    reflexion: "Los evangelios no esconden ni siquiera los peores momentos de sus líderes más cercanos.",
    actividad: "Practiquen contar un error propio con honestidad esta semana, sin buscar excusas.",
  },
  35: {
    versiculo: {
      texto: "No seas incrédulo, sino creyente.",
      cita: "Juan 20:27",
    },
    reflexion: "Jesús se acercó a la duda de Tomás con paciencia y evidencia, no con rechazo.",
    actividad: "Anoten juntos una duda actual en un 'cuaderno de investigación' familiar, para seguir explorándola sin miedo.",
  },
  36: {
    versiculo: {
      texto: "El que no ama a su hermano a quien ha visto, ¿cómo puede amar a Dios a quien no ha visto?",
      cita: "1 Juan 4:20",
    },
    reflexion: "El amor se demuestra en acciones visibles, aunque su origen sea invisible.",
    actividad: "Hagan 3 acciones concretas de amor hoy sin decir 'te amo' en palabras — solo con hechos.",
  },
  37: {
    versiculo: { texto: "Para siempre, oh Jehová, permanece tu palabra en los cielos.", cita: "Salmos 119:89" },
    reflexion: "Este versículo, escrito miles de años antes del hallazgo, terminó confirmado por los propios Rollos del Mar Muerto.",
    actividad: "Busquen una foto de los Rollos del Mar Muerto en internet y coméntenla juntos.",
  },
  38: {
    versiculo: {
      texto: "Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá más muerte, ni habrá más llanto.",
      cita: "Apocalipsis 21:4",
    },
    reflexion: "La esperanza final de la fe cristiana es la restauración completa de todo lo que hoy se siente injusto.",
    actividad: "Escriban una carta a 'el futuro' describiendo un mundo más justo que les gustaría ayudar a construir.",
  },
  39: {
    versiculo: { texto: "Vuestro cuerpo es templo del Espíritu Santo.", cita: "1 Corintios 6:19" },
    reflexion: "Cuidar el cuerpo tiene un sentido especial cuando se entiende como algo diseñado con propósito.",
    actividad: "Elijan juntos un hábito sano nuevo para practicar esta semana: dormir mejor, tomar más agua, moverse más.",
  },
  40: {
    versiculo: { texto: "Por cuanto todos pecaron, y están destituidos de la gloria de Dios.", cita: "Romanos 3:23" },
    reflexion: "La Biblia es honesta en que nadie es perfecto — ni siquiera los líderes de fe.",
    actividad: "Hablen de una vez que alguien los decepcionó, y cómo pudieron seguir confiando en lo importante de todas formas.",
  },
  41: {
    versiculo: {
      texto: "Porque yo sé los pensamientos que tengo acerca de vosotros... pensamientos de paz, y no de mal.",
      cita: "Jeremías 29:11",
    },
    reflexion: "Uno de los versículos más citados sobre el propósito — y con buena razón: es una promesa directa.",
    actividad: "Hagan juntos una lista de 3 cosas que su hijo/a hace muy bien: dones que pueden ser parte de su propósito.",
  },
  42: {
    versiculo: {
      texto: "¿No son todos espíritus ministradores, enviados para servicio a favor de los que serán herederos de la salvación?",
      cita: "Hebreos 1:14",
    },
    reflexion: "La Biblia habla de los ángeles como mensajeros y ayudantes, muy distinto a como los muestran las películas de terror.",
    actividad: "Dibujen juntos cómo imaginan un ángel 'mensajero', distinto al de las películas.",
  },
  43: {
    versiculo: { texto: "Yo soy el camino, y la verdad, y la vida.", cita: "Juan 14:6" },
    reflexion: "La fe cristiana afirma que existe una verdad real, no solo versiones distintas según cada quien.",
    actividad: "Practiquen distinguir 'esto es un hecho' de 'esto es una opinión' con 3 frases que digan juntos.",
  },
  44: {
    versiculo: {
      texto: "Por gracia sois salvos por medio de la fe... no por obras, para que nadie se gloríe.",
      cita: "Efesios 2:8-9",
    },
    reflexion: "Este es el versículo central sobre la gracia como regalo — no como premio que hay que ganarse.",
    actividad: "Denle a su hijo/a un pequeño regalo esta semana 'sin ninguna razón', solo para vivir la idea de un regalo inmerecido.",
  },
  45: {
    versiculo: { texto: "A los que aman a Dios, todas las cosas les ayudan a bien.", cita: "Romanos 8:28" },
    reflexion: "Muchas personas de fe ven en este versículo una explicación a esas coincidencias que se sienten especiales.",
    actividad: "Compartan en familia una 'coincidencia' que recuerden y agradézcanla juntos.",
  },
  46: {
    versiculo: {
      texto: "No hará nada Jehová el Señor, sin que revele su secreto a sus siervos los profetas.",
      cita: "Amós 3:7",
    },
    reflexion: "Los profetas cumplían el papel de anticipar y advertir con valentía, aunque nadie quisiera escucharlos.",
    actividad: "Investiguen juntos el nombre de 3 profetas del Antiguo Testamento y qué anunciaron.",
  },
  47: {
    versiculo: { texto: "Somos hechura suya, creados en Cristo Jesús para buenas obras.", cita: "Efesios 2:10" },
    reflexion: "La identidad más firme viene de haber sido 'hechura' de Dios, no de la opinión cambiante de los demás.",
    actividad: "Hagan juntos una lista de palabras que describen quién es su hijo/a 'por dentro', más allá de notas o redes.",
  },
  48: {
    versiculo: { texto: "Angosta es la puerta, y estrecho el camino que lleva a la vida.", cita: "Mateo 7:13-14" },
    reflexion: "Este es el versículo exacto detrás del tema que investigaron en este Caso.",
    actividad: "Reconozcan en voz alta la última vez que su hijo/a eligió 'el camino angosto', y celébrenlo juntos.",
  },
  49: {
    versiculo: {
      texto: "El Dios de esperanza os llene de todo gozo y paz en el creer, para que abundéis en esperanza.",
      cita: "Romanos 15:13",
    },
    reflexion: "Una bendición centrada por completo en la esperanza, no en la certeza de que nada malo pasará.",
    actividad: "Escriban juntos 3 cosas del futuro que esperan con ilusión, no con miedo.",
  },
  50: {
    versiculo: {
      texto: "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados.",
      cita: "1 Juan 1:9",
    },
    reflexion: "Una promesa directa y sin condiciones ocultas sobre el perdón de Dios.",
    actividad: "Si hay algo que su hijo/a carga con culpa, guíenlo en una oración simple de perdón esta semana.",
  },
  51: {
    versiculo: {
      texto: "No dejando de congregarnos, como algunos tienen por costumbre, sino exhortándonos unos a otros.",
      cita: "Hebreos 10:25",
    },
    reflexion: "El versículo clásico sobre por qué la fe se sostiene mejor en comunidad, no en soledad.",
    actividad: "Planeen juntos asistir o conectar con su comunidad de fe esta semana, si todavía no lo hacen.",
  },
  52: {
    versiculo: {
      texto: "Estad siempre preparados para presentar defensa... ante todo el que os demande razón de la esperanza que hay en vosotros.",
      cita: "1 Pedro 3:15",
    },
    reflexion:
      "Este versículo resume el propósito de todo el Expediente: estar listos para explicar la fe propia con razones, no solo repetirla de memoria.",
    actividad:
      "Celebren en familia: hagan una pequeña ceremonia de 'graduación' del primer año de Expedientes, y hablen de qué Caso los marcó más.",
  },
};
