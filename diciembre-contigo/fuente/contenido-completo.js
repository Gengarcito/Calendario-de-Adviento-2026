/* ============================================================
   DICIEMBRE CONTIGO — CONTENIDO
   ------------------------------------------------------------
   Aquí se reemplazan TODOS los textos, fotos, canciones y audios.
   Los textos entre [corchetes] son espacios pendientes de completar
   con contenido real. No se han inventado recuerdos ni detalles
   personales.

   Las rutas de imágenes/audios apuntan a la carpeta assets/.
   Si el archivo aún no existe, se muestra un marco elegante
   indicando que la imagen o el audio está pendiente.
   ============================================================ */

window.DICIEMBRE_CONTIGO = {

  configuracion: {
    /* Solo para probar las 24 puertas sin esperar a diciembre.
       IMPORTANTE: dejar en false antes de publicar. */
    modoDemo: false,

    /* Ruta de la canción ambiental (déjala vacía si aún no la eliges). */
    musicaAmbiental: "assets/audio/musica-ambiental.mp3",
    volumenInicial: 0.5,

    dedicatoria: "Para Hillary. Este diciembre lo construí día a día, pensando en ti. Ábrelo cuando quieras sonreír.",

    /* La fecha y hora se completan cuando la reserva esté confirmada. */
    reserva: {
      fecha: "[Fecha de la reserva]",
      hora: "[Hora de la reserva]",
      lugar: "Sheraton Lima",
      nota: "[Dedicatoria personal para la invitación]"
    }
  },

  dias: [
    {
      dia: 1, titulo: "Bienvenida a diciembre", subtitulo: "El comienzo de algo bonito",
      forma: "sobre", tipo: "carta",
      datos: {
        parrafos: [
          "Bienvenida a este pequeño rincón que preparé para ti.",
          "Durante 24 días irás descubriendo una sorpresa distinta. Algunas son palabras, otras son fotos, canciones, audios o detalles que quise guardar para ti.",
          "No hay prisa ni orden obligatorio: abre cada día cuando llegue su momento y deja que esto se sienta como un regalo, no como una tarea."
        ],
        firma: "[Tu nombre]"
      }
    },
    {
      dia: 2, titulo: "Algo que quiero recordarte", subtitulo: "Porque mereces escucharlo",
      forma: "adorno", tipo: "mensaje",
      datos: {
        parrafos: [
          "[Escribe aquí lo que quieres recordarle de sí misma: una cualidad, una frase que le dijiste alguna vez, o ese detalle que te hizo sonreír por primera vez.]"
        ],
        firma: "[Tu nombre]"
      }
    },
    {
      dia: 3, titulo: "Un recuerdo que guardo", subtitulo: "El primer día en su habitación",
      forma: "paquete", tipo: "foto",
      datos: {
        imagen: "assets/fotos/dia-03-primer-dia.jpg",
        pie: "[Primer día en su habitación: conversamos y terminamos abrazándonos.]",
        dedicatoria: "[Escribe aquí la dedicatoria sobre ese recuerdo.]"
      }
    },
    {
      dia: 4, titulo: "Una canción para ti", subtitulo: "La elegí pensando en tus ojos",
      forma: "caja", tipo: "cancion",
      datos: {
        titulo: "[Nombre de la canción]",
        artista: "[Artista]",
        portada: "assets/fotos/portada-cancion-04.jpg",
        archivo: "assets/audio/cancion-dia-04.mp3",
        porque: "[Explica por qué elegiste esta canción para ella.]"
      }
    },
    {
      dia: 5, titulo: "Uno de nuestros momentos divertidos", subtitulo: "De los que se quedan guardados",
      forma: "ventana", tipo: "anecdota",
      datos: {
        parrafos: [
          "[Cuéntala anécdota graciosa o la broma que ambos recuerdan. Sin inventar nada: escribe tal como pasó.]"
        ]
      }
    },
    {
      dia: 6, titulo: "Una carta sin motivo", subtitulo: "Solo porque sí",
      forma: "sobre", tipo: "carta",
      datos: {
        parrafos: [
          "[Escribe aquí una carta romántica y personal. Puede empezar con: 'Hoy no hay una razón especial para escribirte, aparte de que te pensé...' ]",
          "[Agrega los párrafos que quieras. La carta se muestra con una animación de escritura.]"
        ],
        firma: "[Tu nombre]"
      }
    },
    {
      dia: 7, titulo: "Tu vocecita", subtitulo: "Grabado para ti",
      forma: "paquete", tipo: "audio",
      datos: {
        titulo: "[Título del audio]",
        archivo: "assets/audio/voz-dia-07.mp3",
        parrafos: [
          "[Una nota corta antes de reproducirlo: por qué grabaste este audio y qué quieres que sienta al escucharlo.]"
        ]
      }
    },
    {
      dia: 8, titulo: "Algo que admiro de ti", subtitulo: "Todo lo que veo cuando te miro",
      forma: "adorno", tipo: "cualidades",
      datos: {
        items: [
          "[Cualidad 1 — explica por qué te admira]",
          "[Cualidad 2 — explica por qué te admira]",
          "[Cualidad 3 — explica por qué te admira]",
          "[Cualidad 4 — explica por qué te admira]",
          "[Cualidad 5 — explica por qué te admira]"
        ]
      }
    },
    {
      dia: 9, titulo: "Un momento bonito", subtitulo: "Una foto y su historia",
      forma: "paquete", tipo: "foto",
      datos: {
        imagen: "assets/fotos/dia-09-momento-bonito.jpg",
        pie: "[Pie de la fotografía: cuándo y dónde fue.]",
        dedicatoria: "[Escribe aquí la historia o el recuerdo especial que acompaña a esta foto.]"
      }
    },
    {
      dia: 10, titulo: "Cosas que me recuerdan a ti", subtitulo: "Apareces en todas partes",
      forma: "caja", tipo: "detalles",
      datos: {
        items: [
          { icono: "♫", titulo: "[Canción]", texto: "[Por qué te recuerda a ella]" },
          { icono: "☕", titulo: "[Objeto o lugar]", texto: "[Por qué te recuerda a ella]" },
          { icono: "✦", titulo: "[Situación]", texto: "[Por qué te recuerda a ella]" },
          { icono: "❧", titulo: "[Detalle pequeño]", texto: "[Por qué te recuerda a ella]" }
        ]
      }
    },
    {
      dia: 11, titulo: "Mis pequeñas cosas favoritas de ti", subtitulo: "Los detalles que más me gustan",
      forma: "ventana", tipo: "tarjetas",
      datos: {
        items: [
          { simbolo: "✦", titulo: "[Detalle 1]", texto: "[Descripción corta]" },
          { simbolo: "❧", titulo: "[Detalle 2]", texto: "[Descripción corta]" },
          { simbolo: "♡", titulo: "[Detalle 3]", texto: "[Descripción corta]" },
          { simbolo: "✧", titulo: "[Detalle 4]", texto: "[Descripción corta]" },
          { simbolo: "☾", titulo: "[Detalle 5]", texto: "[Descripción corta]" },
          { simbolo: "✿", titulo: "[Detalle 6]", texto: "[Descripción corta]" }
        ]
      }
    },
    {
      dia: 12, titulo: "Un regalo virtual", subtitulo: "Ábrelo con cuidado",
      forma: "caja", tipo: "regalo",
      datos: {
        texto: "[Describe aquí el regalo digital y escribe la dedicatoria que lo acompaña.]",
        imagen: "assets/fotos/regalo-dia-12.jpg"
      }
    },
    {
      dia: 13, titulo: "Otra canción para ti", subtitulo: "También me suena a ti",
      forma: "caja", tipo: "cancion",
      datos: {
        titulo: "[Nombre de la segunda canción]",
        artista: "[Artista]",
        portada: "assets/fotos/portada-cancion-13.jpg",
        archivo: "assets/audio/cancion-dia-13.mp3",
        porque: "[Explica por qué elegiste esta segunda canción.]"
      }
    },
    {
      dia: 14, titulo: "Si pudiera repetir un momento", subtitulo: "Volvería a vivirlo contigo",
      forma: "adorno", tipo: "mensaje",
      datos: {
        parrafos: [
          "[Escribe el recuerdo que te gustaría volver a vivir y la razón por la que lo elegirías.]"
        ],
        firma: "[Tu nombre]"
      }
    },
    {
      dia: 15, titulo: "Unas palabras para ti", subtitulo: "Un poema",
      forma: "sobre", tipo: "poema",
      datos: {
        versos: [
          "Si el diciembre se viste de silencio,",
          "yo me visto de ti.",
          "Y en cada copo que cae sin hacer ruido,",
          "te vuelves a quedar un instante en la mente.",
          "[Personaliza estos versos con detalles de ella.]"
        ],
        firma: "[Tu nombre]"
      }
    },
    {
      dia: 16, titulo: "Hoy quiero sacarte una sonrisa", subtitulo: "Es todo lo que pido",
      forma: "ventana", tipo: "diversion",
      datos: {
        parrafos: [
          "[Escribe aquí la nota divertida, el chiste, o el detalle gracioso que la hará sonreír.]"
        ],
        imagen: "assets/fotos/dia-16-sonrisa.jpg"
      }
    },
    {
      dia: 17, titulo: "Nuestra pequeña galería", subtitulo: "Algunas fotos que guardo con cariño",
      forma: "paquete", tipo: "galeria",
      datos: {
        imagenes: [
          { imagen: "assets/fotos/galeria-01.jpg", pie: "[Descripción de la foto 1]" },
          { imagen: "assets/fotos/galeria-02.jpg", pie: "[Descripción de la foto 2]" },
          { imagen: "assets/fotos/galeria-03.jpg", pie: "[Descripción de la foto 3]" },
          { imagen: "assets/fotos/galeria-04.jpg", pie: "[Descripción de la foto 4]" }
        ]
      }
    },
    {
      dia: 18, titulo: "Cosas que me gustaría vivir contigo", subtitulo: "Lo que viene",
      forma: "caja", tipo: "planes",
      datos: {
        parrafos: [ "[Escribe aquí un mensaje sobre el futuro que imaginas con ella.]" ],
        items: [
          "[Experiencia 1 que te gustaría compartir]",
          "[Experiencia 2 que te gustaría compartir]",
          "[Experiencia 3 que te gustaría compartir]",
          "[Experiencia 4 que te gustaría compartir]"
        ]
      }
    },
    {
      dia: 19, titulo: "Algo que quiero agradecerte", subtitulo: "Gracias, simplemente gracias",
      forma: "sobre", tipo: "carta",
      datos: {
        parrafos: [
          "[Escribe una carta de agradecimiento por los momentos compartidos y los detalles que más valoras.]",
          "[Puedes mencionar cómo te ha cambiado los días el hecho de conocerla.]"
        ],
        firma: "[Tu nombre]"
      }
    },
    {
      dia: 20, titulo: "Pequeñas cosas que quisiera compartir contigo", subtitulo: "Lo sencillo también es todo",
      forma: "ventana", tipo: "planes",
      datos: {
        parrafos: [ "[Escribe aquí por qué los planes sencillos son tus favoritos cuando están con ella.]" ],
        items: [
          "[Plan sencillo 1: caminar sin rumbo]",
          "[Plan sencillo 2: cocinar juntos]",
          "[Plan sencillo 3: ver películas en casa]",
          "[Plan sencillo 4: despertar sin prisa]"
        ]
      }
    },
    {
      dia: 21, titulo: "Un secreto entre nosotros", subtitulo: "Solo para ti",
      forma: "sobre", tipo: "secreto",
      datos: {
        texto: "[Escribe aquí el mensaje secreto: algo que nunca le hayas dicho y quieras guardar entre los dos.]",
        firma: "[Tu nombre]"
      }
    },
    {
      dia: 22, titulo: "Tengo algo preparado", subtitulo: "Una pista para ti",
      forma: "paquete", tipo: "pista",
      datos: {
        imagen: "assets/fotos/dia-22-pista.jpg",
        texto: "[Escribe la pista visual y el mensaje que anticipen la sorpresa del día 24.]"
      }
    },
    {
      dia: 23, titulo: "Mañana descubrirás algo", subtitulo: "La última noche de espera",
      forma: "adorno", tipo: "cuenta",
      datos: {
        texto: "[Escribe una nota especial para la víspera. Mañana se revela la invitación.]",
        fechaObjetivo: "2026-12-24T00:00:00-05:00"
      }
    },
    {
      dia: 24, titulo: "Una invitación especial", subtitulo: "El gran cierre",
      forma: "caja", tipo: "invitacion",
      datos: {
        imagen: "assets/fotos/sheraton-lima.jpg",
        fecha: "[Fecha de la reserva]",
        hora: "[Hora de la reserva]",
        lugar: "Sheraton Lima",
        dedicatoria: "[Dedicatoria personal: por qué elegiste este lugar y qué significa para ti esta invitación.]",
        detalles: [
          "[Código de vestimenta, si aplica]",
          "[Punto de encuentro, si aplica]",
          "[Cualquier detalle adicional de la reserva]"
        ]
      }
    }
  ]
};
