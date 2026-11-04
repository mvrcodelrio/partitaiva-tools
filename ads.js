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
