/* Criado pelo Atlas · Paraná Contra os Corruptos · https://paranacontraoscorruptos.org/ */
(function(){var h=document.documentElement,reduz=matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduz)h.classList.remove("anim");
var tip=document.createElement("div");tip.className="tip";tip.hidden=true;document.body.appendChild(tip);var at=null;
function encher(el){if(at===el)return;at=el;tip.textContent="";var l=el.getAttribute("data-tip").split("\n"),s=document.createElement("strong");s.textContent=l[0];tip.appendChild(s);for(var i=1;i<l.length;i++){var d=document.createElement("div");d.textContent=l[i];tip.appendChild(d);}tip.hidden=false;}
function pos(x,y){var r=tip.getBoundingClientRect(),a=x+14,b=y-r.height-12;if(a+r.width>innerWidth-8)a=Math.max(8,x-r.width-14);if(b<8)b=y+18;tip.style.left=a+"px";tip.style.top=b+"px";}
function sai(){tip.hidden=true;at=null;}
document.addEventListener("mousemove",function(e){var el=e.target.closest("[data-tip]");if(el){encher(el);pos(e.clientX,e.clientY);}else if(at)sai();});
document.addEventListener("click",function(e){var el=e.target.closest("[data-tip]");if(el){encher(el);var r=el.getBoundingClientRect();pos(r.left+Math.min(r.width/2,120),r.top);}else sai();});
document.addEventListener("focusin",function(e){var el=e.target.closest("[data-tip]");if(el){encher(el);var r=el.getBoundingClientRect();pos(r.left+Math.min(r.width/2,120),r.top);}});
addEventListener("scroll",sai,{passive:true});
var fmt=new Intl.NumberFormat(h.getAttribute("data-locale")||"pt-BR");
function conta(el){var alvo=+el.getAttribute("data-count"),t0=performance.now();function p(t){var k=Math.min(1,(t-t0)/1500),e=1-Math.pow(1-k,3);el.textContent=fmt.format(Math.round(alvo*e));if(k<1)requestAnimationFrame(p);}requestAnimationFrame(p);}
if(reduz||!("IntersectionObserver" in window))return;
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;io.unobserve(en.target);if(en.target.classList.contains("bars"))en.target.classList.add("in");else conta(en.target);});},{rootMargin:"0px 0px -6% 0px"});
document.querySelectorAll(".bars").forEach(function(el){el.classList.remove("in");io.observe(el);});
document.querySelectorAll("[data-count]").forEach(function(el){el.textContent=fmt.format(0);io.observe(el);});})();
(function rtBase() {
    var d = document, h = d.documentElement, CFG = JSON.parse(d.getElementById("gs-cfg").textContent);
    var LOC = { PT: "pt-BR", EN: "en", ES: "es" }, HL = { PT: "pt-BR", EN: "en", ES: "es" };
    var GS = window.GS = { cfg: CFG, lang: CFG.lang, ouvir: [] };
    var cada = function (sel, f, r) { Array.prototype.forEach.call((r || d).querySelectorAll(sel), f); };
    var CH_LANG = "gs-lang:" + CFG.arq;
    try { var lg = localStorage.getItem(CH_LANG); if (lg && CFG.langs.indexOf(lg) >= 0) GS.lang = lg; } catch (e) { /* sem armazenamento */ }
    GS.esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
    GS.t = function (k, p) {
      var s = (CFG.t[GS.lang] || {})[k];
      if (s == null) s = (CFG.t[CFG.lang] || {})[k];
      if (s == null) return k;
      if (p) Object.keys(p).forEach(function (x) { s = s.split("{" + x + "}").join(p[x]); });
      return s;
    };
    GS.loc = function () { return LOC[GS.lang] || "pt-BR"; };
    GS.nf = function (n, c) { return new Intl.NumberFormat(GS.loc(), { minimumFractionDigits: c || 0, maximumFractionDigits: c || 0 }).format(n); };
    GS.pct = function (x, c) { if (x == null || isNaN(x)) return "–"; c = c == null ? 1 : c; return new Intl.NumberFormat(GS.loc(), { style: "percent", minimumFractionDigits: c, maximumFractionDigits: c }).format(x); };
    GS.norm = function (s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim(); };
    GS.quando = function () { return new Intl.DateTimeFormat(GS.loc(), { dateStyle: "long", timeStyle: "short" }).format(new Date(CFG.quando)); };
    GS.aviso = function (msg) { var a = d.createElement("div"); a.className = "gs-toast"; a.setAttribute("role", "status"); a.textContent = msg; d.body.appendChild(a); setTimeout(function () { a.remove(); }, 2800); };
    GS.baixar = function (nome, txt, tipo) {
      var u = URL.createObjectURL(new Blob([txt], { type: tipo })), a = d.createElement("a");
      a.href = u; a.download = nome; d.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(u); }, 5000);
    };
    GS.csv = function (linhas) {
      var q = function (v) { v = String(v == null ? "" : v); return /[";\r\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
      return "﻿" + linhas.map(function (l) { return l.map(q).join(";"); }).join("\r\n");
    };
    // gráficos de barras crescendo de novo depois de redesenhar a tela
    GS.animar = function (raiz) {
      var bs = raiz.querySelectorAll(".bars");
      if (!h.classList.contains("anim")) { cada(".bars", function (b) { b.classList.add("in"); }, raiz); return; }
      Array.prototype.forEach.call(bs, function (b) { b.classList.remove("in"); });
      requestAnimationFrame(function () { requestAnimationFrame(function () { Array.prototype.forEach.call(bs, function (b) { b.classList.add("in"); }); }); });
    };
    function traduzir() {
      h.lang = HL[GS.lang] || "pt-BR"; h.setAttribute("data-locale", GS.loc());
      cada("[data-t]", function (el) { el.textContent = GS.t(el.getAttribute("data-t"), { d: GS.quando() }); });
      cada("[data-tl]", function (el) { var s = GS.t(el.getAttribute("data-tl")); el.setAttribute("aria-label", s); if (el.hasAttribute("title")) el.title = s; });
      cada("[data-tp]", function (el) { el.placeholder = GS.t(el.getAttribute("data-tp")); });
    }
    GS.mudar = function (l) { GS.lang = l; try { localStorage.setItem(CH_LANG, l); } catch (e) { /* sem armazenamento */ } traduzir(); GS.ouvir.forEach(function (f) { f(); }); };
    traduzir();
    var sel = d.querySelector(".gs-lang select");
    if (sel) { sel.value = GS.lang; sel.addEventListener("change", function () { GS.mudar(sel.value); }); }
    // tema claro e escuro
    var bt = d.querySelector(".gs-tema");
    if (bt) bt.addEventListener("click", function () { var l = h.getAttribute("data-theme") !== "light"; if (l) h.setAttribute("data-theme", "light"); else h.removeAttribute("data-theme"); try { localStorage.setItem("gs-tema", l ? "light" : "dark"); } catch (e) { /* sem armazenamento */ } });
    // compartilhar, imprimir e baixar os dados
    d.addEventListener("click", function (e) {
      var b = e.target.closest("[data-gs]"); if (!b) return;
      var k = b.getAttribute("data-gs");
      if (k === "share") compartilhar();
      else if (k === "print") window.print();
      else if (k === "csv") GS.baixar(CFG.arq + ".csv", GS.csv(window.GS_CSV ? window.GS_CSV() : csvDaPagina()), "text/csv;charset=utf-8");
    });
    function csvDaPagina() {
      var L = [[GS.t("csv_parte"), GS.t("csv_item"), GS.t("csv_valor")]];
      // números que ainda estão contando (ou em página escondida) saem com o valor final
      var tx = function (el) {
        if (!el) return "";
        var c = el.cloneNode(true);
        cada("[data-count]", function (x) { x.textContent = GS.nf(+x.getAttribute("data-count")); }, c);
        return c.textContent.replace(/\s+/g, " ").trim();
      };
      cada("[data-parte]", function (p) {
        var tit = p.getAttribute("data-parte"), n0 = L.length;
        cada(".kv > div", function (x) { L.push([tit, tx(x.querySelector("dt")), tx(x.querySelector("dd"))]); }, p);
        cada(".bar-row", function (x) { L.push([tit, tx(x.querySelector(".bar-label")), tx(x.querySelector(".bar-value"))]); }, p);
        cada("table tr", function (tr) { L.push([tit].concat(Array.prototype.map.call(tr.children, tx))); }, p);
        if (L.length === n0) cada(".doc-corpo p, .doc-corpo li", function (x) { var s = tx(x); if (s) L.push([tit, "", s]); }, p);
      });
      return L;
    }
    function compartilhar() {
      var local = location.protocol === "file:", url = location.href, tit = d.title, I = CFG.ico;
      var dl = d.createElement("dialog");
      var op = function (href, ic, txt) { return '<a class="gs-op" target="_blank" rel="noopener" href="' + GS.esc(href) + '">' + I[ic] + "<span>" + GS.esc(txt) + "</span></a>"; };
      var bo = function (k, ic, txt) { return '<button type="button" class="gs-op" data-op="' + k + '">' + I[ic] + "<span>" + GS.esc(txt) + "</span></button>"; };
      dl.className = "gs-dlg";
      dl.innerHTML = "<h2>" + GS.esc(GS.t("comp")) + "</h2>" + (local ? '<p class="gs-dlg-n">' + GS.esc(GS.t("local")) + "</p>" : "") + '<div class="gs-lst">'
        + op("https://wa.me/?text=" + encodeURIComponent(local ? tit : tit + "\n" + url), "chat", "WhatsApp")
        + op("https://t.me/share/url?url=" + encodeURIComponent(local ? "" : url) + "&text=" + encodeURIComponent(tit), "send", "Telegram")
        + op("https://twitter.com/intent/tweet?text=" + encodeURIComponent(tit) + (local ? "" : "&url=" + encodeURIComponent(url)), "share", "X (Twitter)")
        + (local ? "" : bo("copiar", "link", GS.t("copiar")))
        + (navigator.share && !local ? bo("nativo", "share", GS.t("mais")) : "")
        + bo("fechar", "close", GS.t("fechar")) + "</div>";
      d.body.appendChild(dl);
      dl.addEventListener("close", function () { dl.remove(); });
      dl.addEventListener("click", function (e) {
        if (e.target === dl) { dl.close(); return; }
        var b = e.target.closest("[data-op]"); if (!b) return;
        var k = b.getAttribute("data-op");
        if (k === "copiar") (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () { GS.aviso(GS.t("copiado")); }, function () { window.prompt(GS.t("copiar"), url); });
        else if (k === "nativo") navigator.share({ title: tit, url: url }).catch(function () { /* cancelado */ });
        dl.close();
      });
      if (dl.showModal) dl.showModal(); else dl.setAttribute("open", "");
    }
    // relatório: o menu acompanha a parte que está na tela
    if (CFG.tipo !== "relatorio" || !("IntersectionObserver" in window)) return;
    var ls = [].slice.call(d.querySelectorAll(".gs-nav a")); if (!ls.length) return;
    var nav = ls[0].parentNode, por = {};
    ls.forEach(function (a) { por[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var a = por[en.target.id];
        ls.forEach(function (x) { x.removeAttribute("aria-current"); });
        if (a) { a.setAttribute("aria-current", "true"); nav.scrollLeft = a.offsetLeft - nav.clientWidth / 2 + a.offsetWidth / 2; }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    cada(".gs-sec", function (s) { io.observe(s); });
  })();
(function rtDados() {
    var d = document, GS = window.GS, E = GS.esc, D = JSON.parse(d.getElementById("gs-dados").textContent), raiz = d.getElementById("gd");
    var st = { n: 2, ord: "aptos", dir: -1, busca: "", uf: "", lim: 50, sel: null, med: "compP" };
    var POR = {}; D.un.forEach(function (u) { POR[u.k] = u; });
    var I = GS.cfg.ico;
    function nome(u) { if (u.tp === "uf") { var x = D.ufn[u.u]; return x ? x[GS.lang] || x.PT : u.u; } return u.tp === "br" ? GS.t("brasil") : u.n; }
    function rot(u) { return u.tp === "mun" && D.comUf ? nome(u) + " (" + u.u + ")" : nome(u); }
    function sub(u) { if (u.tp === "mun") { var x = D.ufn[u.u]; return x ? x[GS.lang] || x.PT : u.u; } return GS.t(u.tp === "uf" ? "estado" : "pais"); }
    function cands(n) { return D.cands[n] || []; }
    function iC(n, nr) { var l = cands(n); for (var i = 0; i < l.length; i++) if (l[i][0] === nr) return i; return -1; }
    function vt(u, n, nr) { var x = u.t[n], i = iC(n, nr); return x && i >= 0 ? x[2 + i] || 0 : 0; }
    function validos(u, n) { var x = u.t[n], s = 0; if (!x) return 0; cands(n).forEach(function (c, i) { if (c[0] !== "95" && c[0] !== "96") s += x[2 + i] || 0; }); return s; }
    function candNome(c) { return c[0] === "95" ? GS.t("branco") : c[0] === "96" ? GS.t("nulo") : c[1] + " (" + c[0] + ")"; }
    function principais(n, k) { return cands(n).filter(function (c) { return c[0] !== "95" && c[0] !== "96"; }).slice(0, k); }
    // medidas: valor (número para ordenar e pintar) e texto
    function med(k) {
      var n = st.n, P = function (v) { return GS.pct(v, 2); }, M;
      if (k.indexOf("c:") === 0) {
        var nr = k.slice(2), c = cands(n)[iC(n, nr)] || [nr, nr];
        return { k: k, p: true, nome: GS.t("m_cand", { c: candNome(c) }), curto: c[1] ? c[1].split(" ").slice(-1)[0] + " (" + nr + ")" : nr,
          val: function (u) { var v = validos(u, n); return u.t[n] && v ? vt(u, n, nr) / v : null; }, txt: P, dica: function (u) { return GS.nf(vt(u, n, nr)) + " " + GS.t("votos"); } };
      }
      var x = function (u) { return u.t[n]; };
      M = {
        aptos: { val: function (u) { return x(u) ? x(u)[0] : null; }, txt: GS.nf },
        comp: { val: function (u) { return x(u) ? x(u)[1] : null; }, txt: GS.nf },
        compP: { p: true, val: function (u) { return x(u) && x(u)[0] ? x(u)[1] / x(u)[0] : null; }, txt: P, dica: function (u) { return GS.t("d_comp", { v: GS.nf(x(u)[1]), a: GS.nf(x(u)[0]) }); } },
        abst: { p: true, val: function (u) { return x(u) && x(u)[0] ? 1 - x(u)[1] / x(u)[0] : null; }, txt: P, dica: function (u) { return GS.t("d_abst", { v: GS.nf(x(u)[0] - x(u)[1]) }); } },
        brancos: { p: true, val: function (u) { return x(u) && x(u)[1] ? vt(u, n, "95") / x(u)[1] : null; }, txt: P, dica: function (u) { return GS.nf(vt(u, n, "95")) + " " + GS.t("votos"); } },
        nulos: { p: true, val: function (u) { return x(u) && x(u)[1] ? vt(u, n, "96") / x(u)[1] : null; }, txt: P, dica: function (u) { return GS.nf(vt(u, n, "96")) + " " + GS.t("votos"); } },
        secoes: { val: function (u) { return u.s; }, txt: GS.nf },
        anom: { val: function (u) { return u.a[n] ? u.a[n][0] : null; }, txt: GS.nf, dica: function (u) { return GS.t("d_anom", { a: GS.nf(u.a[n][0]), s: GS.nf(u.s) }); } },
        anomP: { val: function (u) { return u.a[n] && u.s ? (u.a[n][0] / u.s) * 1000 : null; }, txt: function (v) { return GS.nf(v, 1); }, dica: function (u) { return GS.t("d_anom", { a: GS.nf(u.a[n][0]), s: GS.nf(u.s) }); } },
      }[k];
      M.k = k; M.nome = GS.t("m_" + k); M.curto = GS.t("c_" + k);
      return M;
    }
    function fv(M, u) { var v = M.val(u); return v == null ? "–" : M.txt(v); }
    function csvv(M, u) { var v = M.val(u); return v == null ? "" : M.p ? GS.nf(v * 100, 2) : M.k === "anomP" ? GS.nf(v, 2) : v; }
    function cabCsv(M) { return M.nome + (M.p && M.k.indexOf("c:") ? " (%)" : ""); }
    function dicaDe(M, u) { var v = fv(M, u); return rot(u) + "\n" + M.nome + ": " + v + (M.dica && M.val(u) != null ? "\n" + M.dica(u) : ""); }
    function barras(linhas) {
      var max = Math.max.apply(null, linhas.map(function (l) { return l.v || 0; }).concat([1e-9]));
      var res = Math.round(Math.min(170, 16 + Math.max.apply(null, linhas.map(function (l) { return String(l.txt).length; }).concat([4])) * 7.4));
      return '<div class="bars" role="list" style="--res:' + res + 'px">' + linhas.map(function (l, i) {
        return '<div class="bar-row' + (l.cls ? " " + l.cls : "") + '" role="listitem" tabindex="0" data-tip="' + E(l.dica || l.rot + "\n" + l.txt) + '" style="--i:' + Math.min(i, 30) + '"><span class="bar-label">' + E(l.rot)
          + '</span><span class="bar-track"><span class="bar" style="--f:' + ((l.v || 0) / max).toFixed(4) + '"></span><span class="bar-value">' + E(l.txt) + "</span></span></div>";
      }).join("") + "</div>";
    }
    function kvi(M, u) { return '<div data-tip="' + E(dicaDe(M, u)) + '"><dt>' + E(M.nome) + "</dt><dd>" + E(fv(M, u)) + "</dd></div>"; }
    function barrasCands(u) {
      var n = st.n, v = validos(u, n);
      var l = principais(n, 99).map(function (c) { return { c: c, x: vt(u, n, c[0]) }; }).filter(function (o) { return o.x > 0; }).sort(function (a, b) { return b.x - a.x; });
      if (!v) return '<p class="small muted">–</p>';
      var linhas = l.slice(0, 6).map(function (o) { return { rot: candNome(o.c), v: o.x, txt: GS.pct(o.x / v, 1), dica: candNome(o.c) + "\n" + GS.nf(o.x) + " " + GS.t("votos") + " · " + GS.pct(o.x / v, 2) }; });
      var resto = l.slice(6).reduce(function (s, o) { return s + o.x; }, 0);
      if (resto) linhas.push({ rot: GS.t("outros"), v: resto, txt: GS.pct(resto / v, 1), dica: GS.t("outros") + "\n" + GS.nf(resto) + " " + GS.t("votos") });
      return barras(linhas) + '<p class="small muted">' + E(GS.t("validos", { v: GS.nf(v) })) + "</p>";
    }
    function ctlTurno() {
      return '<div class="gd-seg" role="group" aria-label="' + E(GS.t("turno_t")) + '">' + [2, 1].map(function (n) {
        return '<button type="button" data-n="' + n + '" aria-pressed="' + (st.n === n) + '">' + E(GS.t("turno", { n: n })) + "</button>";
      }).join("") + "</div>";
    }
    function nota() { return '<p class="small muted gd-nota">' + E(GS.t("anom_nota")) + "</p>"; }
    function opcao(v, txt, on) { return '<option value="' + E(v) + '"' + (on ? " selected" : "") + ">" + E(txt) + "</option>"; }
    function refocar(sel) { var el = raiz.querySelector(sel); if (el) el.focus({ preventScroll: true }); }
    var ordenados = function () { return D.un.slice().sort(function (a, b) { return rot(a).localeCompare(rot(b), GS.loc()); }); };

    // --- comparativo ---
    function cmpMontar() { raiz.innerHTML = '<div class="gd-ctl">' + ctlTurno() + '</div><div class="gd-res"></div>' + nota(); cmpAtualizar(); }
    function cmpAtualizar() {
      var n = st.n, us = D.un, top = principais(n, n === 1 ? 3 : 2);
      var Ms = ["aptos", "comp", "compP", "abst", "brancos", "nulos"].concat(top.map(function (c) { return "c:" + c[0]; })).concat(["secoes", "anom", "anomP"]).map(med);
      var graf = ["compP", "abst", "brancos", "nulos"].concat(top.slice(0, 2).map(function (c) { return "c:" + c[0]; })).concat(["anomP"]).map(med);
      raiz.querySelector(".gd-res").innerHTML = '<div class="gd-cards">' + us.map(function (u) {
        return '<article class="card gd-card"><h3>' + E(nome(u)) + '</h3><p class="small muted">' + E(sub(u)) + '</p><dl class="kv">' + ["aptos", "compP", "abst", "anomP"].map(function (k) { return kvi(med(k), u); }).join("") + "</dl></article>";
      }).join("") + "</div>"
        + "<h2>" + E(GS.t("lado")) + '</h2><div class="table-wrap"><table class="num-cols"><thead><tr><th scope="col">' + E(GS.t("medida")) + "</th>" + us.map(function (u) { return '<th scope="col">' + E(nome(u)) + "</th>"; }).join("") + "</tr></thead><tbody>"
        + Ms.map(function (M) { return '<tr><th scope="row">' + E(M.nome) + "</th>" + us.map(function (u) { return "<td" + (M.dica && M.val(u) != null ? ' data-tip="' + E(dicaDe(M, u)) + '"' : "") + ">" + E(fv(M, u)) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>"
        + "<h2>" + E(GS.t("graficos")) + '</h2><div class="gd-grafs">' + graf.map(function (M) {
          return '<section class="card"><h3>' + E(M.nome) + "</h3>" + barras(us.map(function (u) { return { rot: nome(u), v: M.val(u), txt: fv(M, u), dica: dicaDe(M, u) }; })) + "</section>";
        }).join("") + "</div>"
        + "<h2>" + E(GS.t("candidatos")) + '</h2><div class="gd-grafs">' + us.map(function (u) { return '<section class="card"><h3>' + E(nome(u)) + "</h3>" + barrasCands(u) + "</section>"; }).join("") + "</div>";
      window.GS_CSV = function () { return [[GS.t("medida")].concat(us.map(nome))].concat(Ms.map(function (M) { return [cabCsv(M)].concat(us.map(function (u) { return csvv(M, u); })); })); };
    }

    // --- ranking ---
    function colsRank() { return ["secoes", "aptos", "compP", "abst", "brancos", "nulos"].concat(principais(st.n, 2).map(function (c) { return "c:" + c[0]; })).concat(["anom", "anomP"]); }
    function rankMontar() {
      var ufs = D.comUf ? D.un.map(function (u) { return u.u; }).filter(function (u, i, l) { return l.indexOf(u) === i; }).sort() : [];
      raiz.innerHTML = '<div class="gd-ctl">' + ctlTurno()
        + '<label class="gd-busca"><span class="gd-f">' + E(GS.t("buscar")) + '</span><input type="search" data-gd="busca" placeholder="' + E(GS.t("busca_nome")) + '" value="' + E(st.busca) + '"></label>'
        + (ufs.length ? '<label class="gd-f"><span>' + E(GS.t("uf")) + '</span><select data-gd="uf">' + opcao("", GS.t("todos"), !st.uf) + ufs.map(function (u) { return opcao(u, u, st.uf === u); }).join("") + "</select></label>" : "")
        + '<label class="gd-f"><span>' + E(GS.t("mostrar")) + '</span><select data-gd="lim">' + [25, 50, 100, 0].map(function (x) { return opcao(x, x ? GS.nf(x) : GS.t("todos"), st.lim === x); }).join("") + "</select></label></div>"
        + '<p class="small muted gd-resumo" aria-live="polite"></p><div class="table-wrap"></div><p class="gd-mais"></p>' + nota();
      rankTabela();
    }
    function rankTabela() {
      var cols = colsRank(); if (cols.indexOf(st.ord) < 0) { st.ord = "aptos"; st.dir = -1; }
      var Ms = {}; cols.forEach(function (k) { Ms[k] = med(k); });
      var s = GS.norm(st.busca), Mo = Ms[st.ord];
      var l = D.un.filter(function (u) { return (!s || GS.norm(rot(u)).indexOf(s) >= 0) && (!st.uf || u.u === st.uf); })
        .map(function (u) { return { u: u, v: Mo.val(u) }; });
      l.sort(function (a, b) { if (a.v == null && b.v == null) return 0; if (a.v == null) return 1; if (b.v == null) return -1; return (st.dir < 0 ? b.v - a.v : a.v - b.v) || rot(a.u).localeCompare(rot(b.u)); });
      var max = Math.max.apply(null, l.map(function (x) { return Math.abs(x.v || 0); }).concat([1e-9])), vis = st.lim ? l.slice(0, st.lim) : l;
      raiz.querySelector(".table-wrap").innerHTML = '<table class="num-cols gd-rank"><thead><tr><th scope="col">#</th><th scope="col">' + E(GS.t("lugar")) + "</th>" + cols.map(function (k) {
        var on = k === st.ord;
        return '<th scope="col" aria-sort="' + (on ? (st.dir < 0 ? "descending" : "ascending") : "none") + '"><button type="button" data-ord="' + k + '" data-tip="' + E(Ms[k].nome) + '">' + E(Ms[k].curto) + (on ? (st.dir < 0 ? " ↓" : " ↑") : "") + "</button></th>";
      }).join("") + "</tr></thead><tbody>" + (vis.length ? vis.map(function (x, i) {
        return "<tr><td>" + GS.nf(i + 1) + '</td><th scope="row">' + E(rot(x.u)) + "</th>" + cols.map(function (k) {
          var M = Ms[k], v = M.val(x.u);
          return "<td" + (v != null && M.dica ? ' data-tip="' + E(dicaDe(M, x.u)) + '"' : "") + ">" + E(v == null ? "–" : M.txt(v)) + (k === st.ord && v != null ? '<span class="gd-mb" style="--f:' + (Math.abs(v) / max).toFixed(4) + '"></span>' : "") + "</td>";
        }).join("") + "</tr>";
      }).join("") : '<tr><td colspan="' + (cols.length + 2) + '">' + E(GS.t("nenhum")) + "</td></tr>") + "</tbody></table>";
      raiz.querySelector(".gd-resumo").textContent = GS.t("r_resumo", { n: GS.nf(l.length), m: Mo.nome, o: GS.t(st.dir < 0 ? "maior" : "menor") });
      var falta = l.length - vis.length;
      raiz.querySelector(".gd-mais").innerHTML = falta > 0 ? '<button type="button" class="btn btn-sm" data-gd="mais">' + E(GS.t("ver_mais", { n: GS.nf(Math.min(50, falta)) })) + "</button>" : "";
      window.GS_CSV = function () {
        return [["#", GS.t("lugar")].concat(D.comUf ? [GS.t("uf")] : []).concat(cols.map(function (k) { return cabCsv(Ms[k]); }))]
          .concat(l.map(function (x, i) { return [i + 1, nome(x.u)].concat(D.comUf ? [x.u.u] : []).concat(cols.map(function (k) { return csvv(Ms[k], x.u); })); }));
      };
    }

    // --- painel ---
    function painelMontar() {
      var ord = ordenados();
      if (!st.sel || !POR[st.sel]) { var m = location.hash.match(/^#k=(.+)$/), k = m ? decodeURIComponent(m[1]) : null; st.sel = k && POR[k] ? k : POR[D.sel] ? D.sel : ord[0].k; }
      raiz.innerHTML = '<div class="gd-ctl">' + ctlTurno() + '<label class="gd-f gd-lugar"><span>' + E(GS.t("lugar")) + '</span><select data-gd="sel">' + ord.map(function (u) { return opcao(u.k, rot(u), u.k === st.sel); }).join("") + "</select></label>"
        + '<span class="gd-nav"><button type="button" class="gs-bt" data-gd="ant" aria-label="' + E(GS.t("ant_l")) + '" title="' + E(GS.t("ant_l")) + '">' + I.back + '</button><button type="button" class="gs-bt gs-prx" data-gd="prox" aria-label="' + E(GS.t("prox_l")) + '" title="' + E(GS.t("prox_l")) + '">' + I.back + "</button></span></div>"
        + '<div class="gd-res"></div>' + nota();
      painelAtualizar();
    }
    function painelAtualizar() {
      var u = POR[st.sel], n = st.n, R = D.ref, top = principais(n, 2).map(function (c) { return "c:" + c[0]; });
      var tiles = [["aptos", "users"], ["compP", "vote"], ["abst", "users"], ["brancos", "file"], ["nulos", "file"], ["secoes", "grid"], ["anom", "flag"]];
      var cmp = ["compP", "abst", "brancos", "nulos"].concat(top);
      var pos = ["aptos", "compP", "abst", "brancos", "nulos"].concat(top).concat(["anomP"]);
      raiz.querySelector(".gd-res").innerHTML = '<h2 class="gd-nome">' + E(nome(u)) + '</h2><p class="small muted">' + E(sub(u)) + " · " + E(GS.t("turno", { n: n })) + "</p>"
        + '<div class="tiles">' + tiles.map(function (x) {
          var M = med(x[0]);
          return '<div class="tile" tabindex="0" data-tip="' + E(dicaDe(M, u)) + '"><div class="tile-top">' + I[x[1]] + '</div><div class="tile-v">' + E(fv(M, u))
            + (x[0] === "anom" && M.val(u) != null ? " <small>" + E(GS.t("por_mil", { v: fv(med("anomP"), u) })) + "</small>" : "") + '</div><div class="tile-l">' + E(M.nome) + "</div></div>";
        }).join("") + "</div>"
        + '<section class="card"><h3>' + E(GS.t("candidatos")) + "</h3>" + barrasCands(u) + "</section>"
        + (R ? '<section class="card"><h3>' + E(GS.t("comparado", { r: nome(R) })) + '</h3><div class="gd-grafs gd-mini">' + cmp.map(function (k) {
          var M = med(k);
          return "<div><h4>" + E(M.nome) + "</h4>" + barras([{ rot: nome(u), v: M.val(u), txt: fv(M, u), dica: dicaDe(M, u) }, { rot: nome(R), v: M.val(R), txt: fv(M, R), dica: dicaDe(M, R), cls: "gd-ref" }]) + "</div>";
        }).join("") + "</div></section>" : "")
        + (D.un.length > 1 ? '<section class="card"><h3>' + E(GS.t("posicoes", { n: GS.nf(D.un.length) })) + '</h3><ul class="gd-pos">' + pos.map(function (k) {
          var M = med(k), v = M.val(u); if (v == null) return "";
          var p = 1 + D.un.filter(function (o) { var w = M.val(o); return w != null && w > v; }).length;
          return "<li><span>" + E(M.nome) + "</span><b>" + E(GS.t("pos", { p: GS.nf(p), t: GS.nf(D.un.length) })) + "</b></li>";
        }).join("") + '</ul><p class="small muted">' + E(GS.t("pos_nota")) + "</p></section>" : "");
      if (history.replaceState) history.replaceState(null, "", "#k=" + encodeURIComponent(u.k));
      var todas = ["aptos", "comp", "compP", "abst", "brancos", "nulos"].concat(principais(n, 99).map(function (c) { return "c:" + c[0]; })).concat(["secoes", "anom", "anomP"]).map(med);
      window.GS_CSV = function () { return [[GS.t("medida"), nome(u)].concat(R ? [nome(R)] : [])].concat(todas.map(function (M) { return [cabCsv(M), csvv(M, u)].concat(R ? [csvv(M, R)] : []); })); };
    }
    function mover(passo) {
      var ord = ordenados(), i = ord.findIndex(function (u) { return u.k === st.sel; });
      st.sel = ord[(i + passo + ord.length) % ord.length].k;
      var s = raiz.querySelector('[data-gd="sel"]'); if (s) s.value = st.sel;
      painelAtualizar();
    }

    // --- mapa ---
    function classes(vals) {
      var pos = vals.filter(function (v) { return v > 0; }).sort(function (a, b) { return a - b; }), zero = vals.some(function (v) { return v <= 0; });
      if (!pos.length) return { cls: function () { return 0; }, faixas: [], zero: zero };
      var q = [0.25, 0.5, 0.75].map(function (p) { return pos[Math.min(pos.length - 1, Math.floor(p * pos.length))]; });
      var lim = q.filter(function (x, i) { return q.indexOf(x) === i && x < pos[pos.length - 1]; });
      var faixas = [], ini = pos[0];
      lim.forEach(function (x) { faixas.push([ini, x]); ini = pos.filter(function (v) { return v > x; })[0]; });
      faixas.push([ini, pos[pos.length - 1]]);
      return { cls: function (v) { return v <= 0 ? 0 : 1 + lim.filter(function (x) { return v > x; }).length; }, faixas: faixas, zero: zero };
    }
    function opsMapa() { return ["compP", "abst", "brancos", "nulos"].concat(principais(st.n, st.n === 1 ? 5 : 2).map(function (c) { return "c:" + c[0]; })).concat(["anomP"]); }
    function mapaMontar() {
      var ops = opsMapa(); if (ops.indexOf(st.med) < 0) st.med = "compP";
      if (!st.sel) { var m = location.hash.match(/^#k=(.+)$/), k = m ? decodeURIComponent(m[1]) : null; if (k && POR[k]) st.sel = k; }
      raiz.innerHTML = '<div class="gd-ctl">' + ctlTurno() + '<label class="gd-f"><span>' + E(GS.t("medida")) + '</span><select data-gd="med">' + ops.map(function (k) { return opcao(k, med(k).nome, k === st.med); }).join("") + "</select></label>"
        + '<label class="gd-busca"><span class="gd-f">' + E(GS.t("achar")) + '</span><input type="search" list="gd-dl" data-gd="achar" placeholder="' + E(GS.t("achar_ph")) + '"></label><datalist id="gd-dl">' + ordenados().map(function (u) { return '<option value="' + E(rot(u)) + '">'; }).join("") + "</datalist></div>"
        + '<div class="map-wrap gd-mapa"><div class="map' + (D.mapaUf ? " map-uf" : "") + '"></div><div class="map-side"></div></div>'
        + '<details class="gd-tabela"><summary>' + E(GS.t("ver_tabela")) + '</summary><div class="table-wrap"></div></details>' + nota();
      mapaAtualizar();
    }
    function mapaAtualizar() {
      var M = med(st.med), vals = {}, l = [];
      D.un.forEach(function (u) { var v = M.val(u); vals[u.k] = v; if (v != null) l.push(v); });
      var C = classes(l), P = D.mapa.p;
      raiz.querySelector(".map").innerHTML = '<svg viewBox="0 0 ' + D.mapa.vb[0] + " " + D.mapa.vb[1] + '" role="group" aria-label="' + E(M.nome) + '">' + Object.keys(P).map(function (k) {
        var u = POR[k]; if (!u) return "";
        var v = vals[k], tx = v == null ? "–" : M.txt(v);
        return '<a class="mp-uf q' + (v == null ? 0 : C.cls(v)) + (k === st.sel ? " mp-dest" : "") + '" data-k="' + E(k) + '" role="button" tabindex="0" aria-label="' + E(rot(u) + ": " + tx) + '" data-tip="' + E(dicaDe(M, u)) + '"><path d="' + P[k] + '"/></a>';
      }).join("") + (st.sel && P[st.sel] ? '<path class="mp-dest-c" d="' + P[st.sel] + '"/>' : "") + "</svg>";
      var u = st.sel && POR[st.sel];
      raiz.querySelector(".map-side").innerHTML = '<p class="small"><b>' + E(M.nome) + " · " + E(GS.t("turno", { n: st.n })) + '</b></p><ul class="seq-leg">'
        + (C.zero ? '<li><span class="sw q0"></span>' + E(GS.t("zero")) + "</li>" : "")
        + C.faixas.map(function (f, i) { return '<li><span class="sw q' + (i + 1) + '"></span>' + E(f[0] === f[1] ? M.txt(f[0]) : M.txt(f[0]) + " – " + M.txt(f[1])) + "</li>"; }).join("")
        + '</ul><p class="small muted">' + E(GS.t("leg_nota")) + "</p>"
        + (u ? '<div class="card"><h3>' + E(rot(u)) + '</h3><dl class="kv">' + ["aptos", "compP", "abst", "brancos", "nulos", "anom"].map(function (k) { return kvi(med(k), u); }).join("") + "</dl>" + barrasCands(u) + "</div>"
          : '<p class="small muted">' + E(GS.t("toque")) + "</p>");
      var ord = D.un.map(function (o) { return { u: o, v: vals[o.k] }; }).filter(function (x) { return x.v != null; }).sort(function (a, b) { return b.v - a.v; });
      raiz.querySelector(".gd-tabela .table-wrap").innerHTML = '<table class="num-cols"><thead><tr><th scope="col">#</th><th scope="col">' + E(GS.t("lugar")) + '</th><th scope="col">' + E(M.nome) + "</th></tr></thead><tbody>"
        + ord.map(function (x, i) { return "<tr><td>" + GS.nf(i + 1) + "</td><td>" + E(rot(x.u)) + "</td><td>" + E(M.txt(x.v)) + "</td></tr>"; }).join("") + "</tbody></table>";
      if (u && history.replaceState) history.replaceState(null, "", "#k=" + encodeURIComponent(u.k));
      window.GS_CSV = function () { return [[GS.t("lugar")].concat(D.comUf ? [GS.t("uf")] : []).concat([cabCsv(M)])].concat(ord.map(function (x) { return [nome(x.u)].concat(D.comUf ? [x.u.u] : []).concat([csvv(M, x.u)]); })); };
    }
    function achar(txt) {
      var s = GS.norm(txt); if (!s) return;
      var u = D.un.filter(function (o) { return GS.norm(rot(o)) === s; })[0] || D.un.filter(function (o) { return GS.norm(rot(o)).indexOf(s) === 0; })[0];
      if (!u) { GS.aviso(GS.t("nenhum")); return; }
      st.sel = u.k; mapaAtualizar();
    }

    var VISTAS = { comparativo: cmpMontar, ranking: rankMontar, painel: painelMontar, mapa: mapaMontar };
    function montar() { VISTAS[D.tipo](); GS.animar(raiz); }
    raiz.addEventListener("click", function (e) {
      var b = e.target.closest("[data-n]");
      if (b) { st.n = +b.getAttribute("data-n"); montar(); refocar('[data-n="' + st.n + '"]'); return; }
      b = e.target.closest("[data-ord]");
      if (b) { var k = b.getAttribute("data-ord"); if (st.ord === k) st.dir = -st.dir; else { st.ord = k; st.dir = -1; } rankTabela(); refocar('[data-ord="' + k + '"]'); return; }
      b = e.target.closest("[data-gd]");
      if (b) { var g = b.getAttribute("data-gd"); if (g === "mais") { st.lim += 50; rankTabela(); } else if (g === "ant" || g === "prox") { mover(g === "prox" ? 1 : -1); GS.animar(raiz); } return; }
      var a = e.target.closest(".mp-uf[data-k]");
      if (a) { st.sel = a.getAttribute("data-k"); mapaAtualizar(); GS.animar(raiz.querySelector(".map-side")); }
    });
    raiz.addEventListener("keydown", function (e) {
      var a = e.target.closest && e.target.closest(".mp-uf[data-k]");
      if (a && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); st.sel = a.getAttribute("data-k"); mapaAtualizar(); refocar('.mp-uf[data-k="' + st.sel + '"]'); }
    });
    raiz.addEventListener("input", function (e) { if (e.target.getAttribute("data-gd") === "busca") { st.busca = e.target.value; rankTabela(); } });
    raiz.addEventListener("change", function (e) {
      var g = e.target.getAttribute("data-gd"), v = e.target.value;
      if (g === "uf") { st.uf = v; rankTabela(); } else if (g === "lim") { st.lim = +v; rankTabela(); }
      else if (g === "sel") { st.sel = v; painelAtualizar(); GS.animar(raiz); }
      else if (g === "med") { st.med = v; mapaAtualizar(); }
      else if (g === "achar") { achar(v); e.target.value = ""; }
    });
    GS.ouvir.push(montar);
    montar();
  })();
