// Config: compila dopo aver aperto gli account. Lasciato vuoto = nessun annuncio.
window.SITE_CONFIG = {
  adsenseClient: "",   // es. "ca-pub-XXXXXXXXXXXXXXXX"
  buyUrl: "https://delriomarco.gumroad.com/l/ddknqn"           // link Gumroad/Stripe del template
};
(function () {
  var c = window.SITE_CONFIG;
  var buy = document.getElementById("buy");
  if (buy && c.buyUrl) buy.href = c.buyUrl;
  if (!c.adsenseClient) return;
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + c.adsenseClient;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
  document.querySelectorAll(".ad").forEach(function (el) {
    var ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", c.adsenseClient);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    el.appendChild(ins);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
})();

// Richiamo ai prodotti Vanquish, per sito (fisco / salute)
(function () {
  var DIARIO = "https://delriomarco.gumroad.com/l/liukxs";
  var PRODUCTS = [
    { s: "fisco", t: "Foglio di controllo Partita IVA (forfettario)", d: "Registro fatture, bollo automatico, imposta e INPS stimati, soglia 85.000 €, incassi per mese. Excel e Google Sheets.", u: "https://delriomarco.gumroad.com/l/ddknqn", p: "9 $" },
    { s: "fisco", t: "Budget Mensile Personale", d: "Entrate, spese e risparmio in un foglio Excel/Google Sheets: totali automatici, grafico mensile e obiettivo di risparmio.", u: "https://delriomarco.gumroad.com/l/kpqymk", p: "7 €" },
    { s: "salute", t: "Diario Alimentare e Peso", d: "Target calorico calcolato, diario di 90 giorni per peso e calorie, riepilogo e grafico. Excel e Google Sheets.", u: DIARIO, p: "5 €" }
  ];
  function add() {
    var b = document.getElementById("buy-salute");
    if (b) b.href = DIARIO;
    if (document.getElementById("buy") || b || document.getElementById("vq-cta")) return;
    var f = document.querySelector("footer");
    if (!f) return;
    var site = /salute/.test(location.pathname) ? "salute" : "fisco";
    var list = PRODUCTS.filter(function (p) { return p.s === site; });
    if (!list.length) return;
    var wrap = document.createElement("div");
    wrap.id = "vq-cta";
    wrap.style.cssText = "max-width:820px;margin:0 auto;padding:0 20px";
    var html = '<div class="card"><h2>Template Vanquish</h2>';
    list.forEach(function (p) {
      html += '<p><b>' + p.t + '</b> (' + p.p + ')<br><small>' + p.d + '</small><br><a class="vq-btn" href="' + p.u + '" rel="noopener">Scopri il template</a></p>';
    });
    wrap.innerHTML = html + "</div>";
    f.parentNode.insertBefore(wrap, f);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", add); else add();
})();

// Consenso cookie e statistiche (Google Analytics tramite Google Tag Manager, caricato solo dopo il consenso)
(function () {
  var GTM = "GTM-PP53V4K7", KEY = "vq_consent";
  function load() {
    if (window.__vqGtm) return;
    window.__vqGtm = 1;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM;
    document.head.appendChild(s);
  }
  var c = null;
  try { c = localStorage.getItem(KEY); } catch (e) {}
  if (c === "yes") { load(); return; }
  if (c === "no") return;
  function show() {
    var b = document.createElement("div");
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Consenso cookie");
    b.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#12261f;color:#fdfbf0;padding:14px 20px;font:14px/1.5 system-ui,sans-serif;display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:center";
    b.innerHTML = '<span style="max-width:620px">Usiamo cookie di misurazione (Google Analytics) per capire come viene usato il sito. Puoi accettare o rifiutare: il sito funziona allo stesso modo. <a href="privacy.html" style="color:#fdfbf0">Informativa</a></span>' +
      '<button id="vq-no" style="margin:0;padding:8px 16px;border-radius:999px;border:1px solid #fdfbf0;background:transparent;color:#fdfbf0;cursor:pointer">Rifiuta</button>' +
      '<button id="vq-yes" style="margin:0;padding:8px 16px;border-radius:999px;border:0;background:#fdfbf0;color:#12261f;font-weight:600;cursor:pointer">Accetta</button>';
    document.body.appendChild(b);
    function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} b.remove(); if (v === "yes") load(); }
    document.getElementById("vq-yes").onclick = function () { set("yes"); };
    document.getElementById("vq-no").onclick = function () { set("no"); };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", show); else show();
})();
