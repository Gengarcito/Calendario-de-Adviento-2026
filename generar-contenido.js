/* ============================================================
   GENERAR SITIO PUBLICABLE
   ------------------------------------------------------------
   Lee fuente/contenido-completo.js y crea la carpeta public/
   con:
     - index.html, styles.css, app.js (copias)
     - contenido.js con los días futuros REEMPLAZADOS por
       marcadores bloqueados
     - assets/ (copia)

   Así, el contenido de días futuros NO existe en los archivos
   que se publican. Se publica recién cuando llega su fecha.
   La carpeta fuente/ nunca se sube a internet.

   Uso:
     node generar-contenido.js          -> solo días desbloqueados
     node generar-contenido.js --todo   -> todos (prueba local)

   Netlify: build command = node generar-contenido.js
            publish directory = public
   ============================================================ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = __dirname;
const rutaFuente = path.join(raiz, "fuente", "contenido-completo.js");
const carpetaPublica = path.join(raiz, "public");

function maximoDias() {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Lima", year: "numeric", month: "2-digit", day: "2-digit"
  }).format(new Date()).split("-").map(Number);
  const [anio, mes, dia] = partes;
  if (anio < 2026 || (anio === 2026 && mes < 12)) return 0;
  if (anio > 2026) return 24;
  return Math.max(0, Math.min(24, dia));
}

function copiarRecursivo(origen, destino) {
  if (!fs.existsSync(origen)) return;
  fs.mkdirSync(destino, { recursive: true });
  for (const entrada of fs.readdirSync(origen, { withFileTypes: true })) {
    const o = path.join(origen, entrada.name);
    const d = path.join(destino, entrada.name);
    if (entrada.isDirectory()) copiarRecursivo(o, d);
    else fs.copyFileSync(o, d);
  }
}

/* 1. Leer contenido completo (archivo privado) */
const codigo = fs.readFileSync(rutaFuente, "utf8");
const caja = { window: {} };
vm.createContext(caja);
vm.runInContext(codigo, caja);

const datos = caja.window.DICIEMBRE_CONTIGO;
if (!datos || !Array.isArray(datos.dias)) {
  throw new Error("No se encontró window.DICIEMBRE_CONTIGO en fuente/contenido-completo.js");
}

/* 2. Filtrar según fecha de Perú */
const todo = process.argv.includes("--todo");
const maximo = todo ? 24 : maximoDias();

const salida = JSON.parse(JSON.stringify(datos));
salida.dias = salida.dias.map((d) => {
  if (Number(d.dia) <= maximo) return d;
  return {
    dia: d.dia,
    titulo: d.titulo,
    subtitulo: "Disponible próximamente",
    forma: d.forma || "caja",
    tipo: "bloqueado",
    datos: {}
  };
});

const cabecera =
  "/* ARCHIVO GENERADO — no editar a mano. " +
  "Edita fuente/contenido-completo.js y ejecuta generar-contenido.js */\n";
const contenidoGenerado = cabecera +
  "window.DICIEMBRE_CONTIGO = " + JSON.stringify(salida, null, 2) + ";\n";

/* 3. Crear carpeta public/ */
fs.mkdirSync(carpetaPublica, { recursive: true });
["index.html", "styles.css", "app.js"].forEach(archivo => {
  fs.copyFileSync(path.join(raiz, archivo), path.join(carpetaPublica, archivo));
});
copiarRecursivo(path.join(raiz, "assets"), path.join(carpetaPublica, "assets"));
fs.writeFileSync(path.join(carpetaPublica, "contenido.js"), contenidoGenerado, "utf8");

/* 4. También actualizar el contenido local para poder probar en el navegador */
fs.writeFileSync(path.join(raiz, "contenido.js"), contenidoGenerado, "utf8");

console.log("Sitio generado en public/ — días incluidos: " + maximo +
  (todo ? " (modo prueba: todos)" : " (hora de Perú)"));


node generar-contenido.js --todo