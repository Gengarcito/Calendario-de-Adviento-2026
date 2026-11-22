# Diciembre contigo 🎄

Calendario de Adviento virtual — 24 sorpresas preparadas para ti.

Título: **Diciembre contigo** · Subtítulo: *24 sorpresas preparadas para ti.* · Frase: *Un pequeño detalle para cada día.*

---

## 1. Estructura

```
diciembre-contigo/
├── index.html                  ← estructura de las 4 pantallas
├── styles.css                  ← diseño, paleta y animaciones
├── app.js                      ← lógica, fechas, progreso y reproductores
├── contenido.js                ← generado (no editar a mano)
├── generar-contenido.js        ← genera la versión publicable
├── fuente/
│   └── contenido-completo.js   ← ✏️ AQUÍ se editan los 24 días
├── assets/
│   ├── fotos/                  ← fotografías (pendientes)
│   └── audio/                  ← canciones y audios (pendientes)
├── public/                     ← generado por el script; es lo que se publica
├── netlify.toml
└── README.md
```

> **Regla de oro:** edita solo `fuente/contenido-completo.js`. Luego ejecuta el generador.

---

## 2. Verlo en tu computadora

Abre `index.html` con doble clic. El archivo `contenido.js` actual ya contiene los 24 días
para que puedas revisar todo el diseño.

Si quieres probar el desbloqueo real por fecha:

```bash
node generar-contenido.js
```

Esto deja bloqueados todos los días todavía no llegados (según la hora de Perú).
Para volver a ver los 24 días:

```bash
node generar-contenido.js --todo
```

---

## 3. Editar los 24 días

Abre `fuente/contenido-completo.js`. Cada objeto tiene esta forma:

```js
{
  dia: 3,
  titulo: "Un recuerdo que guardo",
  subtitulo: "El primer día en su habitación",
  forma: "paquete",     // sobre | caja | ventana | paquete | adorno
  tipo: "foto",         // ver tabla abajo
  datos: { imagen: "...", pie: "...", dedicatoria: "..." }
}
```

Tipos disponibles y campos que usa cada uno:

| `tipo` | Campos en `datos` |
|---|---|
| `carta` | `parrafos: []`, `firma` |
| `mensaje` | `parrafos: []`, `firma` |
| `foto` | `imagen`, `pie`, `dedicatoria` |
| `cancion` | `titulo`, `artista`, `portada`, `archivo`, `porque` |
| `audio` | `titulo`, `archivo`, `parrafos: []` |
| `anecdota` / `diversion` | `parrafos: []`, `imagen` (opcional) |
| `cualidades` | `items: []` |
| `detalles` | `items: [{ icono, titulo, texto }]` |
| `tarjetas` | `items: [{ simbolo, titulo, texto }]` |
| `regalo` | `texto`, `imagen` (opcional) |
| `poema` | `versos: []`, `firma` |
| `galeria` | `imagenes: [{ imagen, pie }]` |
| `planes` | `parrafos: []`, `items: []` |
| `secreto` | `texto`, `firma` |
| `pista` | `imagen`, `texto` |
| `cuenta` | `texto`, `fechaObjetivo` |
| `invitacion` | `imagen`, `fecha`, `hora`, `lugar`, `dedicatoria`, `detalles: []` |

Los textos entre `[corchetes]` son espacios pendientes de completar con contenido real.
**No se inventaron fotos, recuerdos, conversaciones ni datos personales.**

### Datos generales

En `configuracion` (mismo archivo):

- `dedicatoria`: texto de bienvenida que aparece antes de abrir el regalo.
- `musicaAmbiental`: ruta del MP3. Se reproduce **después** de pulsar el botón,
  cumpliendo las reglas de reproducción automática del navegador.
- `volumenInicial`: 0 a 1.
- `reserva.fecha`, `reserva.hora`, `reserva.nota`: se completan cuando la reserva
  del Sheraton Lima esté confirmada (el día 24 los muestra).
- `modoDemo: false`: déjalo en `false` siempre en producción.

---

## 4. Publicar en Netlify (enlace estable)

1. Crea un repositorio **privado** en GitHub y sube esta carpeta.
2. En Netlify → *Add new site → Import an existing project* → elige GitHub y el repo.
3. Netlify detectará `netlify.toml` automáticamente:
   - Build command: `node generar-contenido.js`
   - Publish directory: `public`
4. Despliega. El enlace (`https://...netlify.app`) será el definitivo.
5. Cada vez que actualices el contenido, haz `git push`: la dirección no cambia.

Si quieres un enlace propio (por ejemplo `diciembrecontigo.com`), agrégalo en
*Site settings → Domain management → Custom domains*.

---

## 5. Protección real de días futuros (importante)

Con HTML/CSS/JS estático **no basta** con ocultar una puerta con JavaScript:
cualquier persona podría leer el archivo y ver los mensajes de los días 20, 21 o 24.

La solución incluida funciona así:

- El contenido completo vive en `fuente/contenido-completo.js`, que **no se publica**.
- El script `generar-contenido.js` crea `public/contenido.js` y **reemplaza los días
  futuros por simples marcadores bloqueados**, según la fecha de Perú (UTC-5).
- Netlify publica únicamente `public/`.

Con esto, el contenido futuro **no existe en internet** hasta su día.

### Para que se actualice solo cada día

Netlify no programa builds por fecha por sí solo, así que hay que disparar un
*build hook* una vez al día. Ejemplo con GitHub Actions (00:05 hora Perú = 05:05 UTC):

```yaml
# .github/workflows/actualizar-diario.yml
name: Actualizar calendario
on:
  schedule:
    - cron: '5 5 * * *'
  workflow_dispatch:
jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Avisar a Netlify
        run: curl -X POST -d '{}' "${{ secrets.NETLIFY_BUILD_HOOK }}"
```

Crea el build hook en *Netlify → Site settings → Build & deploy → Build hooks*
y guarda la URL como secreto `NETLIFY_BUILD_HOOK` en GitHub.

> Alternativa: si prefieres no depender de un cron externo, puedes subir cada día
> una versión nueva manualmente. Mientras el repo sea privado y el publish sea
> `public/`, el contenido futuro seguirá sin exponerse.

---

## 6. Detalles de funcionamiento

- **Desbloqueo:** usa la fecha real de `America/Lima`. Día 1 desde el 1/12/2026,
  día 24 desde el 24/12/2026. Las puertas anteriores siguen abiertas.
- **Progreso:** se guarda en `localStorage` del dispositivo: sorpresas vistas,
  barra dorada, luces del árbol y preferencias de música.
- **Música:** un solo elemento `<audio>` permanece entre pantallas, con play/pausa,
  volumen y silencio. Para silenciar por defecto, deja `musicaAmbiental: ""`.
- **Navegación:** portada → calendario → sorpresa → invitación final del día 24.
  Cada sorpresa tiene «Volver al calendario», indicador del día y flechas
  anterior/siguiente solo para días desbloqueados.
- **Diseño:** 4 columnas en escritorio, 3 en tablet y 2 en móvil.
- **Accesibilidad:** se respeta `prefers-reduced-motion`.

---

## 7. Checklist antes de compartir el enlace

- [ ] Reemplazar todos los `[textos entre corchetes]` en `fuente/contenido-completo.js`.
- [ ] Subir las fotos y audios a `assets/` con los nombres indicados.
- [ ] Confirmar fecha y hora de la reserva en `configuracion.reserva`.
- [ ] Elegir la canción ambiental y colocarla en `assets/audio/musica-ambiental.mp3`.
- [ ] `modoDemo: false`.
- [ ] Repo privado + build hook programado.
- [ ] Probar en celular y computadora.
