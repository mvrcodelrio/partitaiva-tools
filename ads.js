// Config: compila dopo aver aperto gli account. Lasciato vuoto = nessun annuncio.
window.SITE_CONFIG = {
  adsenseClient: "",   // es. "ca-pub-XXXXXXXXXXXXXXXX"
  buyUrl: ""           // link Gumroad/Stripe del template
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
