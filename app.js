/* ============================================================
   DICIEMBRE CONTIGO — lógica
   ============================================================ */

(function () {
  "use strict";

  const DATA = window.DICIEMBRE_CONTIGO;
  if (!DATA) { console.error("Falta contenido.js"); return; }

  const CFG = DATA.configuracion || {};
  const DIAS = DATA.dias || [];
  const ANIO = 2026;

  const LS_PROGRESO = "diciembre_contigo_progreso_v1";
  const LS_MUSICA = "diciembre_contigo_musica_v1";

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);

  /* ---------------------------------------------------------
     1. Fecha de Perú y desbloqueo
     --------------------------------------------------------- */
  function fechaPeru() {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Lima", year: "numeric", month: "2-digit", day: "2-digit"
    });
    const partes = fmt.format(new Date()).split("-").map(Number);
    return { anio: partes[0], mes: partes[1], dia: partes[2] };
  }



// FECHA DIA ABRIR REGALOS DESBLOQUEAR





 function diasDesbloqueados() {
  if (CFG.modoDemo) return 24;
  const f = fechaPeru();
  if (f.anio < ANIO || (f.anio === ANIO && f.mes < 10)) return 0;
  if (f.anio > ANIO || f.mes > 10) return 24;
  return Math.max(0, Math.min(24, f.dia));
}

function diaActual() {
  if (CFG.modoDemo) return 24;
  const f = fechaPeru();
  return (f.anio === ANIO && f.mes === 10) ? f.dia : null;
}


// FECHA DIA ABRIR REGALOS DESBLOQUEAR



// FECHA DIA ABRIR REGALOS DESBLOQUEAR
  
  /* ---------------------------------------------------------
     2. Progreso guardado
     --------------------------------------------------------- */
  let descubiertas = new Set();
  try {
    const guardado = JSON.parse(localStorage.getItem(LS_PROGRESO) || "[]");
    if (Array.isArray(guardado)) descubiertas = new Set(guardado.filter(n => n >= 1 && n <= 24));
  } catch (e) { descubiertas = new Set(); }

  function guardarProgreso() {
    const max = diasDesbloqueados();
    descubiertas = new Set([...descubiertas].filter(n => n <= max));
    try { localStorage.setItem(LS_PROGRESO, JSON.stringify([...descubiertas].sort((a, b) => a - b))); } catch (e) {}
  }

  function marcarDescubierta(n) {
    if (!descubiertas.has(n)) {
      descubiertas.add(n);
      guardarProgreso();
      actualizarProgreso();
    }
  }

  /* ---------------------------------------------------------
     3. Ambiente: nieve, estrellas, bombillas
     --------------------------------------------------------- */
  function crearAmbiente() {
    const nieve = $("nieve");
    for (let i = 0; i < 55; i++) {
      const c = document.createElement("span");
      const tam = 2 + Math.random() * 4;
      c.className = "copo";
      c.style.width = tam + "px";
      c.style.height = tam + "px";
      c.style.left = (Math.random() * 100) + "%";
      c.style.animationDuration = (13 + Math.random() * 16) + "s";
      c.style.animationDelay = (-Math.random() * 25) + "s";
      c.style.setProperty("--der", (-70 + Math.random() * 140) + "px");
      c.style.opacity = (0.35 + Math.random() * 0.5).toFixed(2);
      nieve.appendChild(c);
    }

    const estrellas = $("estrellas");
    for (let i = 0; i < 46; i++) {
      const e = document.createElement("span");
      e.className = "estrella";
      e.style.left = (Math.random() * 100) + "%";
      e.style.top = (Math.random() * 100) + "%";
      e.style.animationDelay = (Math.random() * 3) + "s";
      e.style.animationDuration = (2.5 + Math.random() * 3) + "s";
      estrellas.appendChild(e);
    }

    const bombillas = $("bombillas");
    for (let i = 0; i < 17; i++) {
      const t = 0.03 + (0.94 * i) / 16;
      const y = (1 - t) * (1 - t) * 8 + 2 * (1 - t) * t * 132 + t * t * 8;
      const b = document.createElement("span");
      b.className = "bombilla";
      b.style.left = (t * 100) + "%";
      b.style.top = ((y / 120) * 100) + "%";
      b.style.animationDelay = (Math.random() * 2) + "s";
      bombillas.appendChild(b);
    }
  }

  function particulasEn(x, y, cantidad) {
    const capa = $("particulas");
    for (let i = 0; i < cantidad; i++) {
      const p = document.createElement("span");
      p.className = "particula";
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.setProperty("--dx", (-110 + Math.random() * 220) + "px");
      p.style.setProperty("--dy", (-140 + Math.random() * 90) + "px");
      p.style.animationDelay = (Math.random() * 0.25) + "s";
      capa.appendChild(p);
      setTimeout(() => p.remove(), 1500);
    }
  }

  /* ---------------------------------------------------------
     4. Árbol de luces
     --------------------------------------------------------- */
  const COORD_LUCES = [
    [100,34],[88,58],[112,58],[100,70],
    [76,90],[100,84],[124,90],[86,106],[114,106],[100,116],[68,122],[132,122],
    [58,150],[78,140],[100,150],[122,140],[142,150],[68,164],[88,160],
    [110,160],[132,164],[100,172],[100,128],[100,196]
  ];
  let lucesArbol = [];

  function crearArbol() {
    const g = $("luces-arbol");
    g.innerHTML = "";
    lucesArbol = COORD_LUCES.map(([x, y], i) => {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", x);
      c.setAttribute("cy", y);
      c.setAttribute("r", "4");
      c.setAttribute("fill", "#FFD97A");
      c.setAttribute("class", "luz-arbol");
      c.dataset.i = i;
      g.appendChild(c);
      return c;
    });
  }

  function actualizarProgreso() {
    const total = descubiertas.size;
    const pct = Math.round((total / 24) * 100);

    $("progreso-texto").textContent = total + " de 24 sorpresas descubiertas";
    $("progreso-porcentaje").textContent = pct + " %";
    $("progreso-barra").style.width = pct + "%";
    $("leyenda-arbol").textContent = total + " luces encendidas";
    $("barra-nota").textContent = total === 24
      ? "Calendario completo. Gracias por recorrerlo conmigo. ✦"
      : "Cada sorpresa enciende una luz del árbol.";

    lucesArbol.forEach((luz, i) => luz.classList.toggle("encendida", i < total));
    document.querySelector(".arbol").classList.toggle("completo", total === 24);

    const max = diasDesbloqueados();
    const hoy = diaActual();
    let estado = "";
    if (CFG.modoDemo) estado = "Modo demostración · todas las puertas disponibles";
    else if (max === 0) estado = "El calendario comienza el 1 de diciembre de 2026";
    else if (hoy) estado = "Hoy puedes abrir la puerta " + hoy;
    else estado = "Ya puedes abrir las puertas hasta la " + max;
    $("estado-fecha").textContent = estado;
  }

  /* ---------------------------------------------------------
     5. Puertas
     --------------------------------------------------------- */
  const ICONOS_FORMA = { sobre: "✉", caja: "✧", ventana: "❆", paquete: "✦", adorno: "✶" };

  function pintarPuertas() {
    const max = diasDesbloqueados();
    const hoy = diaActual();
    const cont = $("puertas");
    cont.innerHTML = "";

    DIAS.forEach((d) => {
      const n = Number(d.dia);
      const bloqueada = n > max;
      const descubierta = descubiertas.has(n);
      const btn = document.createElement("button");
      btn.className = "puerta" +
        (bloqueada ? " bloqueada" : "") +
        (!bloqueada && !descubierta ? " disponible" : "") +
        (descubierta ? " descubierta" : "") +
        (hoy === n ? " hoy" : "");
      btn.disabled = bloqueada;
      btn.dataset.dia = n;
      btn.setAttribute("aria-label", "Día " + n + ": " + d.titulo + (bloqueada ? " (bloqueada)" : ""));
      btn.innerHTML =
        '<span class="forma forma-' + esc(d.forma || "caja") + '">' +
          '<span class="icono-forma">' + (ICONOS_FORMA[d.forma] || "✦") + "</span>" +
          '<span class="numero">' + n + "</span>" +
          '<span class="etiqueta">' + esc(d.titulo) + "</span>" +
          (hoy === n ? '<span class="hoy-marca">HOY</span>' : "") +
          (bloqueada ? '<span class="candado">🔒</span>' : "") +
        "</span>";
      if (!bloqueada) btn.addEventListener("click", () => abrirPuerta(n, btn));
      cont.appendChild(btn);
    });
  }

  function abrirPuerta(n, btn) {
    if (n > diasDesbloqueados()) return;
    const r = btn.getBoundingClientRect();
    btn.classList.add("abriendo");
    particulasEn(r.left + r.width / 2, r.top + r.height / 2, 16);
    marcarDescubierta(n);
    setTimeout(() => {
      mostrarSorpresa(n);
      pintarPuertas();
    }, 560);
  }

  /* ---------------------------------------------------------
     6. Render de sorpresas
     --------------------------------------------------------- */
  let audioSorpresa = [];
  let cuentaInterval = null;

  function limpiarSorpresa() {
    audioSorpresa.forEach(a => { try { a.pause(); } catch (e) {} });
    audioSorpresa = [];
    if (cuentaInterval) { clearInterval(cuentaInterval); cuentaInterval = null; }
  }

  function parrafos(arr, cls) {
    if (!Array.isArray(arr) || !arr.length) return "";
    return arr.map((p, i) =>
      '<p class="' + (cls || "") + '" style="animation-delay:' + (i * 0.18) + 's">' +
      esc(p).replace(/\n/g, "<br>") + "</p>"
    ).join("");
  }

  function base(d, contenido, esFinal) {
    return '<div class="tarjeta-sorpresa">' +
      '<div class="etiqueta-dia">Día ' + d.dia + ' de 24</div>' +
      '<h3 class="titulo-sorpresa">' + esc(d.titulo) + "</h3>" +
      '<p class="subtitulo-sorpresa">' + esc(d.subtitulo || "") + "</p>" +
      '<div class="cuerpo-sorpresa">' + contenido + "</div>" +
      "</div>";
  }

  function imgTag(src, nombre, cls) {
    return '<img data-src="' + esc(src || "") + '" data-nombre="' + esc(nombre) +
      '" class="' + esc(cls || "") + '" alt="' + esc(nombre) + '">';
  }

  function renderTipo(d) {
    const x = d.datos || {};

    switch (d.tipo) {
      case "carta":
        return base(d,
          '<div class="carta-hoja">' +
            parrafos(x.parrafos, "linea-escritura") +
            (x.firma ? '<div class="firma">' + esc(x.firma) + "</div>" : "") +
          "</div>");

      case "mensaje":
        return base(d, parrafos(x.parrafos) +
          (x.firma ? '<div class="firma">' + esc(x.firma) + "</div>" : ""));

      case "foto":
        return base(d,
          '<div class="polaroid">' +
            imgTag(x.imagen, "Fotografía del día " + d.dia) +
            '<div class="pie-foto">' + esc(x.pie || "") + "</div>" +
          "</div>" +
          (x.dedicatoria ? '<p style="margin-top:34px">' + esc(x.dedicatoria) + "</p>" : ""));

      case "cancion":
        return base(d,
          '<div class="reproductor" data-audio="' + esc(x.archivo || "") + '">' +
            '<div class="portada-cancion">' + imgTag(x.portada, "Portada", "portada-cancion") + "♫</div>" +
            '<button class="btn-play" aria-label="Reproducir">▶</button>' +
            '<div class="info-pista"><b>' + esc(x.titulo || "[Nombre de la canción]") + "</b>" +
            "<span>" + esc(x.artista || "[Artista]") + "</span></div>" +
            '<input type="range" class="progreso-audio" min="0" max="100" value="0" aria-label="Progreso">' +
          "</div>" +
          (x.porque ? '<p class="audio-nota">' + esc(x.porque) + "</p>" : ""));

      case "audio":
        return base(d, parrafos(x.parrafos) +
          '<div class="reproductor" data-audio="' + esc(x.archivo || "") + '">' +
            '<button class="btn-play" aria-label="Reproducir">▶</button>' +
            '<div class="info-pista"><b>' + esc(x.titulo || "[Título del audio]") + "</b>" +
            "<span>Grabado para ti</span></div>" +
            '<input type="range" class="progreso-audio" min="0" max="100" value="0" aria-label="Progreso">' +
          "</div>");

      case "anecdota":
      case "diversion":
        return base(d,
          (x.imagen ? '<div style="max-width:460px;margin:0 auto 22px">' + imgTag(x.imagen, "Imagen del día " + d.dia) + "</div>" : "") +
          parrafos(x.parrafos));

      case "cualidades": {
        const items = (x.items || []).map(i => "<li>" + esc(i) + "</li>").join("");
        return base(d, '<ul class="lista-elegante">' + items + "</ul>");
      }

      case "detalles": {
        const items = (x.items || []).map(i =>
          '<li><span style="margin-right:10px">' + esc(i.icono || "✦") + "</span><b>" +
          esc(i.titulo || "") + "</b>" + (i.texto ? " — " + esc(i.texto) : "") + "</li>"
        ).join("");
        return base(d, '<ul class="lista-elegante">' + items + "</ul>");
      }

      case "tarjetas": {
        const items = (x.items || []).map(i =>
          '<div class="tarjeta-detalle"><span class="simbolo">' + esc(i.simbolo || "✦") + "</span>" +
          "<strong>" + esc(i.titulo || "") + "</strong>" +
          (i.texto ? "<span>" + esc(i.texto) + "</span>" : "") + "</div>"
        ).join("");
        return base(d, '<div class="tarjetas-detalle">' + items + "</div>");
      }

      case "regalo":
        return base(d,
          '<div class="caja-regalo" id="caja-regalo" role="button" tabindex="0">' +
            '<div class="cuerpo"></div><div class="cinta"></div><div class="tapa"></div>' +
          "</div>" +
          '<div class="contenido-regalo" id="contenido-regalo">' +
            (x.imagen ? '<div style="max-width:420px;margin:0 auto 20px">' + imgTag(x.imagen, "Regalo") + "</div>" : "") +
            parrafos(Array.isArray(x.texto) ? x.texto : [x.texto]) +
          "</div>");

      case "poema": {
        const versos = (x.versos || []).map((v, i) =>
          '<span style="animation-delay:' + (i * 0.22) + 's">' + esc(v) + "</span>"
        ).join("");
        return base(d, '<div class="poema">' + versos + "</div>" +
          (x.firma ? '<div class="firma">' + esc(x.firma) + "</div>" : ""));
      }

      case "galeria": {
        const fotos = x.imagenes || [];
        if (!fotos.length) return base(d, "[Agrega fotografías en contenido.js]");
        const puntos = fotos.map((_, i) =>
          '<button class="punto' + (i === 0 ? " activo" : "") + '" data-i="' + i + '" aria-label="Foto ' + (i + 1) + '"></button>'
        ).join("");
        return base(d,
          '<div class="galeria" id="galeria">' +
            imgTag(fotos[0].imagen, fotos[0].pie || "Foto 1", "foto-actual") +
            '<div class="pie-galeria" id="pie-galeria">' + esc(fotos[0].pie || "") + "</div>" +
            '<div class="controles-galeria">' +
              '<button class="btn-nav" id="gal-anterior">‹</button>' +
              '<div class="puntos-galeria">' + puntos + "</div>" +
              '<button class="btn-nav" id="gal-siguiente">›</button>' +
            "</div>" +
          "</div>");
      }

      case "planes":
        return base(d, parrafos(x.parrafos) +
          '<ul class="lista-elegante">' +
          (x.items || []).map(i => "<li>" + esc(i) + "</li>").join("") +
          "</ul>");

      case "secreto":
        return base(d,
          '<div class="sobre-misterioso" id="sobre-misterioso" role="button" tabindex="0">' +
            '<div class="sello">L</div>' +
          "</div>" +
          '<p style="font-family:var(--serif);font-style:italic;opacity:.7">Toca el sobre para abrirlo</p>' +
          '<div class="mensaje-secreto" id="mensaje-secreto">' +
            parrafos(Array.isArray(x.texto) ? x.texto : [x.texto]) +
            (x.firma ? '<div class="firma">' + esc(x.firma) + "</div>" : "") +
          "</div>");

      case "pista":
        return base(d,
          '<div style="max-width:520px;margin:0 auto 22px">' + imgTag(x.imagen, "Pista visual") + "</div>" +
          parrafos(Array.isArray(x.texto) ? x.texto : [x.texto]));

      case "cuenta":
        return base(d, parrafos(x.texto ? [x.texto] : []) +
          '<div class="cuenta" id="cuenta" data-objetivo="' + esc(x.fechaObjetivo || "2026-12-24T00:00:00-05:00") + '">' +
            ["días", "horas", "min", "seg"].map((u, i) =>
              '<div class="bloque"><b id="c' + i + '">--</b><span>' + u + "</span></div>"
            ).join("") +
          "</div>");

      case "invitacion":
        return '<div class="invitacion">' +
          imgTag(x.imagen, "Restaurante Sheraton Lima", "invitacion-imagen") +
          '<div class="invitacion-tarjeta">' +
            '<div class="etiqueta-dia">Día 24 de 24 · La sorpresa final</div>' +
            "<h3>Una invitación<br>para ti</h3>" +
            '<p class="para">Para Hillary</p>' +
            (x.dedicatoria ? '<p>' + esc(x.dedicatoria) + "</p>" : "") +
            '<div class="invitacion-datos">' +
              "<div><span>Fecha</span><b>" + esc(x.fecha || "[Fecha]") + "</b></div>" +
              "<div><span>Hora</span><b>" + esc(x.hora || "[Hora]") + "</b></div>" +
              "<div><span>Lugar</span><b>" + esc(x.lugar || "Sheraton Lima") + "</b></div>" +
            "</div>" +
            ((x.detalles || []).length
              ? '<ul class="lista-elegante" style="max-width:480px">' +
                x.detalles.map(i => "<li>" + esc(i) + "</li>").join("") + "</ul>"
              : "") +
            '<div class="invitacion-final">Me encantaría compartir esta noche contigo. ✦</div>' +
            '<div class="sello-cera">L</div>' +
          "</div>" +
        "</div>";

      case "bloqueado":
        return base(d,
          '<p style="font-family:var(--serif);font-style:italic;font-size:1.3rem;color:var(--burdeos)">' +
          "Esta sorpresa se revelará el " + d.dia + " de diciembre.</p>" +
          "<p>Ten un poco de paciencia ✦</p>");

      default:
        return base(d, "[Diseño pendiente para este día]");
    }
  }

  function aplicarImagenes(cont) {
    cont.querySelectorAll("img[data-src]").forEach(img => {
      const src = img.dataset.src;
      const nombre = img.dataset.nombre || "imagen";
      const cls = img.className;
      const fallback = () => {
        img.onerror = null;
        img.className = "placeholder-img " + cls;
        img.removeAttribute("src");
        img.textContent = "[Imagen pendiente: " + nombre + "]";
      };
      img.onerror = fallback;
      if (src) img.src = src; else fallback();
    });
  }

  function cablearSorpresa(cont, d) {
    aplicarImagenes(cont);

    /* Reproductores */
    cont.querySelectorAll(".reproductor").forEach(rep => {
      const src = rep.dataset.audio;
      const btn = rep.querySelector(".btn-play");
      const range = rep.querySelector(".progreso-audio");
      if (!src) { btn.disabled = true; btn.title = "Audio pendiente"; return; }
      const a = new Audio(src);
      a.preload = "metadata";
      btn.addEventListener("click", () => a.paused ? a.play() : a.pause());
      a.addEventListener("play", () => btn.textContent = "❚❚");
      a.addEventListener("pause", () => btn.textContent = "▶");
      a.addEventListener("ended", () => btn.textContent = "▶");
      a.addEventListener("timeupdate", () => {
        if (a.duration) range.value = (a.currentTime / a.duration) * 100;
      });
      range.addEventListener("input", () => {
        if (a.duration) a.currentTime = (range.value / 100) * a.duration;
      });
      audioSorpresa.push(a);
    });

    /* Sobre secreto */
    const sobre = $("sobre-misterioso");
    if (sobre) {
      const abrir = () => {
        sobre.classList.add("abierto");
        const msg = $("mensaje-secreto");
        if (msg) msg.classList.add("visible");
      };
      sobre.addEventListener("click", abrir);
      sobre.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") abrir(); });
    }

    /* Caja de regalo */
    const cajaR = $("caja-regalo");
    if (cajaR) {
      const abrir = () => {
        cajaR.classList.add("abierta");
        const c = $("contenido-regalo");
        if (c) c.classList.add("visible");
      };
      cajaR.addEventListener("click", abrir);
      cajaR.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") abrir(); });
    }

    /* Galería */
    const gal = $("galeria");
    if (gal) {
      const fotos = (d.datos && d.datos.imagenes) || [];
      const img = gal.querySelector(".foto-actual");
      const pie = $("pie-galeria");
      const puntos = [...gal.querySelectorAll(".punto")];
      let idx = 0;
      const pintar = () => {
        const f = fotos[idx];
        if (!f) return;
        img.onerror = () => {
          img.className = "placeholder-img foto-actual";
          img.textContent = "[Imagen pendiente: " + (f.pie || "foto") + "]";
        };
        img.src = f.imagen || "";
        if (!f.imagen) img.onerror();
        pie.textContent = f.pie || "";
        puntos.forEach((p, i) => p.classList.toggle("activo", i === idx));
      };
      $("gal-anterior").addEventListener("click", () => { idx = (idx - 1 + fotos.length) % fotos.length; pintar(); });
      $("gal-siguiente").addEventListener("click", () => { idx = (idx + 1) % fotos.length; pintar(); });
      puntos.forEach(p => p.addEventListener("click", () => { idx = Number(p.dataset.i); pintar(); }));
    }

    /* Cuenta regresiva */
    const cuenta = $("cuenta");
    if (cuenta) {
      const objetivo = new Date(cuenta.dataset.objetivo).getTime();
      const ids = [0, 1, 2, 3].map(i => $("c" + i));
      const tick = () => {
        const restante = Math.max(0, objetivo - Date.now());
        const s = Math.floor(restante / 1000);
        const vals = [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
        vals.forEach((v, i) => { if (ids[i]) ids[i].textContent = v; });
      };
      tick();
      cuentaInterval = setInterval(tick, 1000);
    }
  }

  function actualizarNav(n) {
    const max = diasDesbloqueados();
    const idx = DIAS.findIndex(d => Number(d.dia) === n);
    $("indicador-dia").textContent = "Día " + n + " de 24";
    $("btn-anterior").disabled = idx <= 0 || Number(DIAS[idx - 1].dia) > max;
    $("btn-siguiente").disabled = idx >= DIAS.length - 1 || Number(DIAS[idx + 1].dia) > max;
  }

  function mostrarSorpresa(n) {
    const d = DIAS.find(x => Number(x.dia) === n);
    if (!d) return;
    limpiarSorpresa();
    marcarDescubierta(n);

    const cont = $("sorpresa-contenedor");
    cont.innerHTML = renderTipo(d);
    $("pantalla-sorpresa").classList.toggle("es-final", d.tipo === "invitacion");
    cablearSorpresa(cont, d);
    actualizarNav(n);
    mostrar("pantalla-sorpresa");
    $("pantalla-sorpresa").scrollTop = 0;
  }

  /* ---------------------------------------------------------
     7. Navegación entre pantallas
     --------------------------------------------------------- */
  function mostrar(id) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.toggle("activa", p.id === id));
  }

  /* ---------------------------------------------------------
     8. Música ambiental
     --------------------------------------------------------- */
  const musica = $("musica-ambiente");
  let prefMusica = { activo: false, volumen: CFG.volumenInicial ?? 0.5, silenciado: false };
  try {
    const guardado = JSON.parse(localStorage.getItem(LS_MUSICA) || "null");
    if (guardado && typeof guardado === "object") prefMusica = Object.assign(prefMusica, guardado);
  } catch (e) {}

  function guardarMusica() {
    try { localStorage.setItem(LS_MUSICA, JSON.stringify(prefMusica)); } catch (e) {}
  }

  function aplicarMusica() {
    musica.volume = prefMusica.silenciado ? 0 : prefMusica.volumen;
    $("musica-toggle").textContent = prefMusica.activo ? "❚❚" : "♫";
    $("musica-mute").textContent = prefMusica.silenciado ? "×" : "♪";
    $("musica-volumen").value = Math.round(prefMusica.volumen * 100);
  }

  function reproducirMusica() {
    if (!CFG.musicaAmbiental) return;
    if (!musica.src) musica.src = CFG.musicaAmbiental;
    if (prefMusica.activo) musica.play().catch(() => {});
  }

  function initMusica() {
    if (CFG.musicaAmbiental) musica.src = CFG.musicaAmbiental;
    aplicarMusica();

    $("musica-toggle").addEventListener("click", () => {
      prefMusica.activo = !prefMusica.activo;
      if (prefMusica.activo) { prefMusica.silenciado = false; reproducirMusica(); }
      else musica.pause();
      guardarMusica(); aplicarMusica();
    });

    $("musica-mute").addEventListener("click", () => {
      prefMusica.silenciado = !prefMusica.silenciado;
      guardarMusica(); aplicarMusica();
    });

    $("musica-volumen").addEventListener("input", e => {
      prefMusica.volumen = Number(e.target.value) / 100;
      if (prefMusica.volumen > 0) prefMusica.silenciado = false;
      aplicarMusica(); guardarMusica();
    });
  }

  /* ---------------------------------------------------------
     9. Arranque
     --------------------------------------------------------- */
  function init() {
    crearAmbiente();
    crearArbol();
    actualizarProgreso();
    pintarPuertas();
    initMusica();

    $("dedicatoria").textContent = CFG.dedicatoria || "";

    /* Apertura de la caja */
    const btnAbrir = $("btn-abrir");
    btnAbrir.addEventListener("click", () => {
      btnAbrir.disabled = true;
      $("pista-btn").textContent = "Abriendo tu regalo…";

      prefMusica.activo = true;
      guardarMusica(); aplicarMusica(); reproducirMusica();

      const caja = $("caja");
      caja.classList.add("abriendo");
      const r = caja.getBoundingClientRect();
      particulasEn(r.left + r.width / 2, r.top + r.height / 2, 26);

      setTimeout(() => $("flash").classList.add("activo"), 1250);
      setTimeout(() => {
        mostrar("pantalla-calendario");
        $("flash").classList.remove("activo");
      }, 1900);
      setTimeout(() => {
        caja.classList.remove("abriendo");
        btnAbrir.disabled = false;
        $("pista-btn").textContent = "Hecho con calma, para ti.";
      }, 2600);
    });

    /* Navegación */
    $("btn-volver").addEventListener("click", () => {
      limpiarSorpresa();
      $("pantalla-sorpresa").classList.remove("es-final");
      pintarPuertas();
      mostrar("pantalla-calendario");
    });

    $("btn-anterior").addEventListener("click", () => {
      const n = Number($("indicador-dia").textContent.match(/\d+/)[0]);
      if (n > 1 && (n - 1) <= diasDesbloqueados()) mostrarSorpresa(n - 1);
    });

    $("btn-siguiente").addEventListener("click", () => {
      const n = Number($("indicador-dia").textContent.match(/\d+/)[0]);
      if (n < 24 && (n + 1) <= diasDesbloqueados()) mostrarSorpresa(n + 1);
    });

    $("btn-reiniciar").addEventListener("click", () => {
      if (!confirm("¿Reiniciar tu progreso? Se apagarán las luces del árbol.")) return;
      descubiertas.clear();
      guardarProgreso();
      actualizarProgreso();
      pintarPuertas();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
