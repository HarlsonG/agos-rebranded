const LOGO = "assets/logo.webp",
  $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)],
  root = document.documentElement;
$$(".lgi").forEach((i) => (i.src = LOGO));
$("link[rel=icon]").href = LOGO;
try {
  scrollTo(0, 0);
} catch (e) {}
/* adaptive grid */
function ag() {
  const w = innerWidth,
    s = 16 - (16 * (((1920 - w) / 1920) * 100 * 0.6666)) / 100;
  s > 16
    ? (root.style.fontSize = s + "px")
    : root.style.removeProperty("font-size");
}
ag();
addEventListener("resize", ag);
/* lenis + scroll lock */
let lenis = null;
try {
  lenis = new Lenis({ smoothWheel: true });
  (function r(t) {
    lenis.raf(t);
    requestAnimationFrame(r);
  })(0);
} catch (e) {}
const stop = () => {
    lenis && lenis.stop();
    root.style.cssText += "position:relative;overflow:hidden;height:100%";
  },
  start = () => {
    lenis && lenis.start();
    ["position", "overflow", "height"].forEach((p) =>
      root.style.removeProperty(p),
    );
  };
let busy = false;
function go(id) {
  const e = document.getElementById(id);
  if (!e) return;
  busy = true;
  setTimeout(
    () =>
      scrollTo({
        top: e.getBoundingClientRect().top + pageYOffset,
        behavior: "smooth",
      }),
    50,
  );
  setTimeout(() => (busy = false), 100);
}
/* data */
const A = [
  [
    "Operations Center",
    "AGOS Admin",
    "A secure command center for LGU teams to monitor water levels and camera insights, review history, and coordinate responders and evacuations.",
    [
      "Live risk and water monitoring",
      "Responder and evacuation coordination",
      "Historical trends and AI-assisted analysis",
    ],
    ["Dashboard", "Reading logs", "Sensor", "Responders"],
    "Open AGOS Admin",
    "https://agos-admin.vercel.app/auth/login",
  ],
  [
    "Field Response",
    "AGOS Patrol",
    "A field app for live waterway conditions, targeted alerts, and accountable response actions for deployed patrol teams.",
    [
      "Mobile-first live field monitoring",
      "Targeted alerts and acknowledgements",
      "Bilingual preferences and notification controls",
    ],
    ["Home", "Alerts", "Profile"],
    "Open AGOS Patrol",
    "https://agos-patrol.vercel.app/",
  ],
  [
    "Community Safety",
    "AGOS Advisory",
    "An anonymous app for residents with clear flood guidance, official alerts, and routes to nearby evacuation centers.",
    [
      "Clear, color-coded safety guidance",
      "Anonymous official flood and evacuation alerts",
      "Open evacuation centers and turn-by-turn directions",
    ],
    ["Status", "Alerts", "Map", "Profile", "Safety"],
    "Open AGOS Advisory",
    "https://agos-advisory.vercel.app/install",
  ],
];
const F = [
  [
    "Field Personnel Notifications",
    "Notifies field personnel through a dedicated mobile application with instant alerts via VAPID Web Push and an Android-powered SMS Gateway for critical risk tiers.",
  ],
  [
    "Ultrasonic Telemetry",
    "High-frequency, precision distance sensor tracking provides reliable water level data, broadcasted in real-time to the dashboard via a WebSocket connection.",
  ],
  [
    "Vision AI Fusion",
    "Advanced machine learning models process live RTSP camera feeds to identify trash and debris. Captured frames are uploaded to Cloudinary for logging.",
  ],
  [
    "Predictive Analysis Engine",
    "Powered by Groq, AGOS combines sensor readings, vision results, and weather forecasts into risk scores and predictive summaries.",
  ],
];
const P = [
  [
    "Edge Hardware",
    "IoT devices deployed at waterways.",
    ["Ultrasonic Distance Sensor", "Raspberry Pi & IR-Cut Camera"],
  ],
  [
    "Cloud Processing",
    "Real-time fusion & AI analysis.",
    ["ML Surface-Obstruction Inference", "WebSocket & Fusion Engine"],
    "FastAPI & PostgreSQL",
  ],
  [
    "Actionable UX",
    "Interfaces for LGU admins, responders, & residents.",
    ["Admin, Advisory & Patrol Apps", "Mobile App for Field Personnel"],
  ],
];
const HC = [
  ["Operations Center", "AGOS Admin", LOGO],
  ["Field Response", "AGOS Patrol", "assets/agos-patrol.png"],
  ["Community Safety", "AGOS Advisory", "assets/agos-advisory.png"],
];
$("#pg").innerHTML = A.map((a, i) => {
  const preview =
    i === 0
      ? `<div class="laptop-mock" aria-hidden="true"><div class="laptop-screen"><div class="laptop-screen-slot" data-preview-slot="agos-admin"><img src="assets/agos-admin-dashboard.png" alt=""></div></div><div class="laptop-base"></div></div>`
      : `<div class="phone-mock" aria-hidden="true"><div class="phone-screen"><div class="phone-screen-slot" data-preview-slot="${i === 1 ? "agos-patrol" : "agos-advisory"}"><img src="assets/agos-${i === 1 ? "patrol" : "advisory"}-screen.png" alt=""></div></div></div><img src="${LOGO}" alt="" aria-hidden="true">`;
  return `<article class="pc rv" data-d="${i * 0.09}"><div class="pm"><span>${a[0]} — 0${i + 1}</span></div><div class="pb"><h3>${a[1]}</h3><p>${a[2]}</p><div class="tg">${a[3].map((x) => `<span>${x}</span>`).join("")}</div><div class="tg s">${a[4].map((x) => `<span>${x}</span>`).join("")}</div><div><a class="pill l" href="${a[6]}" target="_blank" rel="noopener noreferrer">${a[5]} <i aria-hidden="true">↗</i></a></div></div>${preview}</article>`;
}).join("");
$("#sr").innerHTML = F.map(
  (f, i) =>
    `<li class="rv" data-d="${i * 0.08}"><div class="feature-row"><span class="n">0${i + 1}</span><div class="tx"><h3>${f[0]}</h3><p>${f[1]}</p></div><span class="bg" aria-hidden="true"></span></div></li>`,
).join("");
$("#pp").innerHTML = P.map(
  (p, i) =>
    `<div class="rv" data-d="${i * 0.09}"><div class="num">0${i + 1}</div><h3>${p[0]}</h3><p>${p[1]}</p><div class="tg">${p[3] ? `<span class="featured">${p[3]}</span>` : ""}${p[2].map((x) => `<span>${x}</span>`).join("")}</div></div>`,
).join("");
$("#ff").innerHTML = F.map(
  (f) => `<li><a href="#features">${f[0]}</a></li>`,
).join("");
$("#pw").innerHTML = [
  "FastAPI",
  "PostgreSQL",
  "WebSocket",
  "Groq",
  "OpenMeteo",
  "Cloudinary",
  "VAPID",
  "RTSP",
]
  .map((x) => `<li>${x}</li>`)
  .join("");
const NV = [
  ["Home", "home"],
  ["Architecture", "pipeline"],
  ["Apps", "apps"],
  ["Features", "features"],
  ["Contact", ""],
];
$("#nl").innerHTML = NV.map(
  (n, i) =>
    `<li><button style="--k:${i}" ${n[1] ? `data-go="${n[1]}"` : "data-modal"}><small>0${i + 1}</small><span>${n[0]}</span></button></li>`,
).join("");
/* text reveal */
$$("[data-l]").forEach((el) => {
  el.classList.add("lr");
  el.innerHTML = el.dataset.l
    .split("|")
    .map(
      (t, i) =>
        `<span class="l"><span class="i" style="--d:${(+el.dataset.d || 0) + i * (+el.dataset.s || 0.12)}s">${t}</span></span>`,
    )
    .join("");
});
$("#ah").innerHTML =
  "We partner with LGUs to see floods coming: "
    .split(" ")
    .map((w) => w && `<span>${w}&nbsp;</span>`)
    .join("") + '<span class="m"> </span>';
(() => {
  const a =
      "We turn live waterway data into clear, timely flood warnings,".split(
        " ",
      ),
    b =
      "helping communities prepare earlier and local teams respond faster.".split(
        " ",
      );
  let k = 0;
  const w = (t, c) =>
    t
      .map(
        (x) =>
          `<span class="${c}" style="--d:${k++ * 0.035}s">${x}&nbsp;</span>`,
      )
      .join("");
  $("#ah").innerHTML = w(a, "") + w(b, "m");
})();
$$("[data-d]").forEach((e) => {
  if (!e.dataset.l) e.style.setProperty("--d", e.dataset.d + "s");
});
$$("#ah span.m").forEach((s) => (s.style.color = "var(--mut)"));
const io = new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (x.isIntersecting) {
        x.target.classList.add("in");
        io.unobserve(x.target);
      }
    }),
  { threshold: 0.12 },
);
const cue = $(".scroll-cue");
let previousScrollY = scrollY;
function revealCue() {
  const currentScrollY = scrollY;
  const scrollDelta = currentScrollY - previousScrollY;
  previousScrollY = currentScrollY;

  if (scrollDelta < 0) {
    cue.classList.remove("shown");
    return;
  }
  if (
    cue.classList.contains("shown") ||
    currentScrollY < Math.min(260, innerHeight * 0.32)
  )
    return;
  const r = cue.getBoundingClientRect();
  if (r.top < innerHeight * 0.75 && r.bottom > 0) {
    cue.classList.add("shown");
  }
}
addEventListener("scroll", revealCue, { passive: true });
const homeSection = $("#home");
const homeContent = homeSection.querySelector(".hero");
const scrollFadeElements = $$("[data-scroll-fade]");
function updateScrollEffects() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    homeContent.style.removeProperty("opacity");
    homeContent.style.removeProperty("transform");
    scrollFadeElements.forEach((element) => {
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
    });
    return;
  }
  const { bottom } = homeSection.getBoundingClientRect();
  const progress = Math.max(
    0,
    Math.min(1, (innerHeight - bottom) / (innerHeight * 0.85)),
  );
  homeContent.style.opacity = String(1 - progress * 0.88);
  homeContent.style.transform = `translate3d(0, ${-progress * 18}px, 0)`;
  scrollFadeElements.forEach((element) => {
    const sectionProgress = Math.max(
      0,
      Math.min(1, -element.getBoundingClientRect().top / (innerHeight * 0.85)),
    );
    element.style.opacity = String(1 - sectionProgress * 0.88);
    element.style.transform = `translate3d(0, ${-sectionProgress * 18}px, 0)`;
  });
}
addEventListener("scroll", updateScrollEffects, { passive: true });
addEventListener("resize", updateScrollEffects);
updateScrollEffects();
/* theme */
let night = false;
try {
  const s = localStorage.getItem("agos-theme");
  night = s ? s === "night" : matchMedia("(prefers-color-scheme:dark)").matches;
} catch (e) {}
function theme(n, save) {
  night = n;
  root.dataset.theme = n ? "night" : "day";
  $("#tg").setAttribute("aria-pressed", String(n));
  $("#tg").setAttribute(
    "aria-label",
    n ? "Switch to day mode" : "Switch to night mode",
  );
  if (save)
    try {
      localStorage.setItem("agos-theme", n ? "night" : "day");
    } catch (e) {}
  build();
}
$("#tg").onclick = () => theme(!night, 1);
/* hero liquid reveal */
const hero = $("#home"),
  bg = $("#bg"),
  fx = $("#fx"),
  dpr = Math.min(devicePixelRatio || 1, 2),
  rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
let W = 0,
  H = 0,
  cover,
  brush,
  R = 0,
  pts = [],
  last = null,
  idle = 0,
  raf = 0;
const SHOW_HERO_DEVICE = false,
  LEXT = "assets/device-exterior.webp",
  LCUT = "assets/device-cutaway.webp",
  IM = SHOW_HERO_DEVICE
    ? [LEXT, LCUT].map((u) => {
        const i = new Image();
        i.onload = () => build();
        i.src = u;
        return i;
      })
    : [];
function paint(c, w, h, img, vis) {
  const g = c.createLinearGradient(0, 0, w, h);
  night
    ? (g.addColorStop(0, "#05161d"), g.addColorStop(1, "#0b3a47"))
    : (g.addColorStop(0, "#ffffff"), g.addColorStop(1, "#f5f7f8"));
  c.fillStyle = g;
  c.fillRect(0, 0, w, h);
  c.lineWidth = Math.max(1, w / 900);
  for (let k = 0; k < 28; k++) {
    c.beginPath();
    for (let x = 0; x <= w; x += w / 100) {
      const y =
        h * (0.08 + k * 0.034) +
        Math.sin((x / w) * 7 + k * 0.55) * h * 0.035 +
        Math.sin((x / w) * 17 - k) * h * 0.008;
      x ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.strokeStyle = night
      ? `rgba(47,216,196,${0.06 + (k % 5) * 0.04})`
      : `rgba(30,41,59,${0.02 + (k % 5) * 0.01})`;
    c.stroke();
  }
  const lg = innerWidth >= 1024,
    dh = lg ? h * 0.47 : Math.min(h * 0.34, (w * 0.92) / 1.5625),
    dw = dh * 1.5625,
    cx = lg ? w * 0.66 : w * 0.5,
    cy = lg ? h * 0.95 - dh / 2 : h * 0.72;
  if (vis || SHOW_HERO_DEVICE) {
    const rg = c.createRadialGradient(cx, cy, 0, cx, cy, dw * 0.62);
    rg.addColorStop(
      0,
      vis
        ? night
          ? "rgba(47,216,196,.16)"
          : "rgba(255,255,255,.55)"
        : night
          ? "rgba(47,216,196,.12)"
          : "rgba(255,255,255,.5)",
    );
    rg.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = rg;
    c.fillRect(0, 0, w, h);
  }
  if (img && img.complete && img.naturalWidth) {
    c.save();
    c.shadowColor = night ? "rgba(0,0,0,.45)" : "rgba(5,40,50,.25)";
    c.shadowBlur = 40 * dpr;
    c.shadowOffsetY = 22 * dpr;
    if (night) c.filter = "brightness(.82) contrast(1.05)";
    c.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
    c.restore();
  }
}
function build() {
  const r = hero.getBoundingClientRect();
  W = Math.round(r.width * dpr);
  H = Math.round(r.height * dpr);
  if (!W) return;
  bg.width = fx.width = W;
  bg.height = fx.height = H;
  paint(bg.getContext("2d"), W, H, IM[0], 0);
  if (rm) return;
  cover = document.createElement("canvas");
  cover.width = W;
  cover.height = H;
  paint(cover.getContext("2d"), W, H, IM[1], 1);
  R = 143 * dpr;
  brush = document.createElement("canvas");
  brush.width = brush.height = Math.ceil(R * 2);
}
new ResizeObserver(build).observe(hero);
addEventListener("pointermove", (e) => {
  if (rm || !R) return;
  const r = fx.getBoundingClientRect(),
    x = (e.clientX - r.left) * dpr,
    y = (e.clientY - r.top) * dpr;
  if (x < -R || y < -R || x > W + R || y > H + R) {
    last = null;
    return;
  }
  if (last) {
    const dx = x - last.x,
      dy = y - last.y,
      n = Math.min(Math.ceil(Math.hypot(dx, dy) / Math.max(R * 0.3, 1)), 60);
    for (let i = 1; i <= n; i++)
      pts.push({ x: last.x + (dx * i) / n, y: last.y + (dy * i) / n });
  } else pts.push({ x, y });
  last = { x, y };
  if (!raf) {
    idle = 0;
    raf = requestAnimationFrame(tick);
  }
});
function tick() {
  const c = fx.getContext("2d");
  if (pts.length) idle = 0;
  else if (++idle > 120) {
    c.clearRect(0, 0, W, H);
    raf = 0;
    return;
  }
  const dr = pts.length > 0,
    f = dr ? 0.016 : Math.min(0.016 + idle * 0.004, 0.5);
  c.globalCompositeOperation = "destination-out";
  c.fillStyle = `rgba(0,0,0,${f})`;
  c.fillRect(0, 0, W, H);
  c.globalCompositeOperation = "source-over";
  const b = brush.getContext("2d"),
    d = brush.width;
  for (const p of pts) {
    b.globalCompositeOperation = "source-over";
    b.clearRect(0, 0, d, d);
    const g = b.createRadialGradient(R, R, 0, R, R, R);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.55, "rgba(255,255,255,.82)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    b.fillStyle = g;
    b.fillRect(0, 0, d, d);
    b.globalCompositeOperation = "source-in";
    b.drawImage(cover, p.x - R, p.y - R, d, d, 0, 0, d, d);
    c.drawImage(brush, p.x - R, p.y - R);
  }
  pts = [];
  raf = requestAnimationFrame(tick);
}
theme(night, 0);
/* hero card */
let hi = 0,
  hl = false;
const hs = $("#hs"),
  dots = $("#dots");
dots.innerHTML = HC.map(() => "<i></i>").join("");
function show(step, first) {
  const sw = () => {
    hi = (hi + step + HC.length) % HC.length;
    hs.innerHTML = `<small>${HC[hi][0]}</small><b>${HC[hi][1]}</b>`;
    const icon = $(".ht img");
    icon.style.transition = "none";
    icon.style.opacity = 0;
    icon.style.transform = `translateY(${step > 0 ? 8 : -8}px) scale(.96)`;
    icon.src = HC[hi][2];
    icon.alt = HC[hi][1] + " logo";
    icon.classList.toggle("app-logo", hi > 0);
    [...dots.children].forEach((d, i) => d.classList.toggle("a", i === hi));
    hs.style.transition = "none";
    hs.style.transform = `translateY(${step > 0 ? 14 : -14}px)`;
    setTimeout(() => {
      hs.style.transition = "";
      hs.style.opacity = 1;
      hs.style.transform = "none";
      icon.style.transition = "";
      icon.style.opacity = 1;
      icon.style.transform = "none";
    }, 20);
  };
  if (first) return sw();
  hs.style.opacity = 0;
  hs.style.transform = `translateY(${step > 0 ? -14 : 14}px)`;
  setTimeout(sw, 220);
}
hi = -1;
show(1, 1);
$("#hcard").onclick = () => show(1);
$("#nx").onclick = (e) => {
  e.stopPropagation();
  show(1);
};
$("#pv").onclick = (e) => {
  e.stopPropagation();
  show(-1);
};
/* overlays */
const nv = $("#nv"),
  md = $("#md"),
  pnl = $("#pnl");
function openNav() {
  nv.classList.add("on");
  stop();
}
function closeNav() {
  nv.classList.remove("on");
  if (!md.classList.contains("on")) start();
}
function openM() {
  md.classList.add("on");
  stop();
}
function closeM() {
  md.classList.remove("on");
  start();
  setTimeout(() => {
    pnl.classList.remove("done");
    $("#fm").reset();
    $("#sb2").firstChild.textContent = "Send request ";
  }, 300);
}
$("#mb").onclick = openNav;
$("#nc").onclick = closeNav;
$("#mx").onclick = $("#mc").onclick = closeM;
md.onclick = (e) => {
  if (e.target === md) closeM();
};
addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    md.classList.contains("on")
      ? closeM()
      : nv.classList.contains("on") && closeNav();
  }
});
document.addEventListener("click", (e) => {
  const g = e.target.closest("[data-go]"),
    m = e.target.closest("[data-modal]");
  if (g) {
    const o = nv.classList.contains("on");
    if (o) closeNav();
    go(g.dataset.go);
  } else if (m) {
    if (nv.classList.contains("on")) closeNav();
    openM();
  }
});
$("#fm").onsubmit = (e) => {
  e.preventDefault();
  $("#sb2").firstChild.textContent = "Sending… ";
  setTimeout(() => pnl.classList.add("done"), 900);
};
/* loader */
stop();
const ld = $("#ld"),
  loadingProgress = $("#lp"),
  loadingNumber = $("#ln"),
  t0 = performance.now();
function updateLoadingProgress(value) {
  loadingNumber.textContent = String(value).padStart(2, "0");
  loadingProgress.style.setProperty("--progress", `${value}%`);
  loadingProgress.setAttribute("aria-valuenow", String(value));
}
function ready() {
  ld.classList.add("x");
  setTimeout(() => {
    ld.remove();
    start();
    $$(".rv,.lr,.wr").forEach((e) => io.observe(e));
  }, 800);
}
if (rm) {
  updateLoadingProgress(100);
  ready();
} else
  (function s(t) {
    const p = Math.min((t - t0) / 1300, 1),
      v = Math.round(
        (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2) * 100,
      );
    updateLoadingProgress(v);
    p < 1 ? requestAnimationFrame(s) : ready();
  })(t0);
