# Assets (archivos a reemplazar)

Coloca aquí los archivos reales con estos nombres. La página ya apunta a estas rutas.
Si un archivo falta, se muestra un marco elegante con «[Imagen pendiente]» en su lugar.

## Fotos — `assets/fotos/`

| Archivo | Día / uso |
|---|---|
| `dia-03-primer-dia.jpg` | Día 3 — primer día en su habitación |
| `portada-cancion-04.jpg` | Día 4 — portada de la primera canción |
| `dia-09-momento-bonito.jpg` | Día 9 — momento bonito |
| `regalo-dia-12.jpg` | Día 12 — regalo virtual |
| `portada-cancion-13.jpg` | Día 13 — portada de la segunda canción |
| `dia-16-sonrisa.jpg` | Día 16 — detalle para sacarle una sonrisa |
| `galeria-01.jpg` … `galeria-04.jpg` | Día 17 — galería |
| `dia-22-pista.jpg` | Día 22 — pista visual |
| `sheraton-lima.jpg` | Día 24 — foto del restaurante |

## Audios — `assets/audio/`

| Archivo | Uso |
|---|---|
| `musica-ambiental.mp3` | Música de fondo (se reproduce tras pulsar «ABRIR MI REGALO») |
| `cancion-dia-04.mp3` | Canción del día 4 |
| `voz-dia-07.mp3` | Audio grabado del día 7 |
| `cancion-dia-13.mp3` | Canción del día 13 |

## Recomendaciones

- Usa imágenes JPG comprimidas (ancho máximo ~1200 px) para que la página cargue rápido.
- Usa MP3 para los audios.
- Si cambias un nombre de archivo, actualiza también la ruta en `fuente/contenido-completo.js`.
- Después de agregar archivos, ejecuta `node generar-contenido.js --todo` para verlos en local,
  o `node generar-contenido.js` para generar la versión publicable.
