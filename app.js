/* =====================================================================
   MOVIE DATA — edit this array to add/remove movies.
   id must be unique and lowercase (m1, m2, m3...). Code shown on site
   is just id.toUpperCase(), so "m1" displays as "M1".
   slotsLeft is just a display number — edit it directly, or compute it
   from the seat map if you want it to be fully accurate.
   hall must be one of the HALLS keys below.
   ===================================================================== */
const SHOW_TITLES = true; // true = show film names instead of M1, M2...

/* HALLS — names are placeholders, rename freely.
   type "imax" = big curved seating, "standard" = flat rows.
   price is per seat, in MYR (converted to GBP on the fly). */
const HALLS = {
  h1:   { name: "Hall 1 (placeholder)",    type: "standard", rows: ["G","H","I","J","K","L","M","N","O"], seatsPerRow: 12, price: 18 },
  h2:   { name: "Hall 2 (placeholder)",    type: "standard", rows: ["G","H","I","J","K","L","M","N","O"], seatsPerRow: 12, price: 18 },
  imax: { name: "IMAX Hall (placeholder)", type: "imax",     rows: ["A","B","C","D","E","F","G","H","I","J","K","L"], seatsPerRow: 18, price: 28 }
};
const MAX_SEATS = 8; // most seats one booking can hold

const MOVIES = [
  { id: "m1", title: "Burning", year: 2018, hall: "h1", runtime: 148, rating: "15",
    times: ["6:30 PM", "9:30 PM"], slotsLeft: 14,
    poster: "https://image.tmdb.org/t/p/w500/kXiF80o74fE9gf3Utf9moAI7ar0.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/qQEt2FqF8McryFBNX30dyDJKiEK.jpg",
    overview: "A part-time courier runs into a girl from his old neighbourhood, who asks him to feed her cat while she travels. When she comes back with a wealthy, enigmatic man and then disappears, his suspicion grows." },
  { id: "m2", title: "Bodies Bodies Bodies", year: 2022, hall: "h2", runtime: 94, rating: "15",
    times: ["7:00 PM", "9:15 PM"], slotsLeft: 32,
    poster: "https://image.tmdb.org/t/p/w500/hSuTjDmqRdy7Dii8ymnF2WILTeP.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/qYCl28dMJwRTzlbteTrW75szZPN.jpg",
    overview: "A group of wealthy twenty-somethings throw a hurricane party at a remote mansion and play a murder game. When one of them turns up dead, paranoia and accusations take over the night." },
  { id: "m3", title: "Your Name", year: 2016, hall: "h1", runtime: 106, rating: "12A",
    times: ["6:00 PM", "8:30 PM"], slotsLeft: 6,
    poster: "https://image.tmdb.org/t/p/w500/vfJFJPepRKapMd5G2ro7klIRysq.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/mMtUybQ6hL24FXo0F3Z4j2KG7kZ.jpg",
    overview: "A country girl in Japan and a boy in Tokyo start swapping bodies in their sleep. As they learn each other's lives through notes, they try to find each other, and a bigger secret comes out." },
  { id: "m4", title: "Wolfwalkers", year: 2020, hall: "imax", runtime: 102, rating: "PG",
    times: ["5:30 PM", "8:00 PM"], slotsLeft: 21,
    poster: "https://image.tmdb.org/t/p/w500/vqGiNbdc2sDwsnivMMYzwAoSSu6.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/3zTbERSBLh7waK9811RTKGAcG86.jpg",
    overview: "In 17th-century Ireland, a young apprentice hunter arrives with her father to wipe out the last wolf pack. In the forest she befriends a free-spirited girl who can turn into a wolf." },
  { id: "m5", title: "Parasite", year: 2019, hall: "h1", runtime: 133, rating: "15",
    times: ["7:30 PM", "10:00 PM"], slotsLeft: 9,
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    overview: "A struggling family gets themselves hired by a wealthy household one by one, posing as unrelated and qualified workers. Things go wrong as the two families' lives get tangled together." },
  { id: "m6", title: "Hit Man", year: 2024, hall: "h2", runtime: 116, rating: "15",
    times: ["6:45 PM", "9:15 PM"], slotsLeft: 27,
    poster: "https://image.tmdb.org/t/p/w500/oil3EZwKFp3CWxZnfGfGglesvm9.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/nv6F6tz7r61DUhE7zgHwLJFcTYp.jpg",
    overview: "A mild-mannered professor moonlights as a fake hit man in police stings. He falls for a client who wants her husband dead, and the line between his act and reality starts to blur." },
  { id: "m7", title: "Novocaine", year: 2025, hall: "imax", runtime: 110, rating: "15",
    times: ["7:15 PM", "9:45 PM"], slotsLeft: 18,
    poster: "https://image.tmdb.org/t/p/w500/xmMHGz9dVRaMY6rRAlEX4W0Wdhm.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/lyBH2mFFU6qrHwD5QKotL2JnEb6.jpg",
    overview: "A bank assistant manager who can't feel physical pain is pulled into a robbery when the girl he likes is taken hostage. He turns his condition into his advantage." },
  { id: "m8", title: "Companion", year: 2025, hall: "h1", runtime: 97, rating: "15",
    times: ["6:15 PM", "8:45 PM"], slotsLeft: 11,
    poster: "https://image.tmdb.org/t/p/w500/oCoTgC3UyWGfyQ9thE10ulWR7bn.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/sc1abgWNXc29wSBaerrjGBih06l.jpg",
    overview: "Iris heads to a lake house with her boyfriend and his friends for a weekend away, and finds out something about their relationship that she was never meant to know." },
  { id: "m9", title: "Strange Darling", year: 2024, hall: "h2", runtime: 97, rating: "18",
    times: ["8:00 PM", "10:15 PM"], slotsLeft: 24,
    poster: "https://image.tmdb.org/t/p/w500/kWNCRgt3ocv19bYO0sk7TRuZuFY.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/I4ofwq3XfmwXAETUs5pjubcMJ0.jpg",
    overview: "A one-night stand turns into a night of violence, told out of order in six chapters." },
  { id: "m10", title: "Heretic", year: 2024, hall: "imax", runtime: 111, rating: "15",
    times: ["7:45 PM", "10:00 PM"], slotsLeft: 5,
    poster: "https://image.tmdb.org/t/p/w500/fr96XzlzsONrQrGfdLMiwtQjott.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/ag66gJCiZ06q1GSJuQlhGLi3Udx.jpg",
    overview: "Two young missionaries visit the home of a friendly, polite man to share their faith, and find themselves stuck in a debate they can't walk out of." }
];

function hallOf(m){
  return HALLS[m.hall] || HALLS.h1;
}

function movieLabel(m){
  return (SHOW_TITLES ? m.title : m.id.toUpperCase()) + (hallOf(m).type === "imax" ? " · IMAX" : "");
}

/* ---------------- currency (MYR base, optional GBP) ---------------- */
const CURRENCY_KEY = "pawnchies_currency";
const RATE_KEY = "pawnchies_rate_gbp";
const RATE_MAX_AGE = 12 * 60 * 60 * 1000; // refresh the live rate twice a day
let gbpPerMyr = 0.18; // fallback if the live rate can't be fetched

function getCurrency(){
  try{ return localStorage.getItem(CURRENCY_KEY) === "GBP" ? "GBP" : "MYR"; }catch(e){ return "MYR"; }
}

function setCurrency(code){
  try{ localStorage.setItem(CURRENCY_KEY, code); }catch(e){}
}

function formatPrice(myr){
  return getCurrency() === "GBP" ? "£" + (myr * gbpPerMyr).toFixed(2) : "RM " + myr.toFixed(2);
}

function applyCachedRate(){
  try{
    const cached = JSON.parse(localStorage.getItem(RATE_KEY));
    if (cached && cached.rate > 0){
      gbpPerMyr = cached.rate;
      return Date.now() - cached.at < RATE_MAX_AGE;
    }
  }catch(e){}
  return false;
}

/* resolves true when a fresh rate arrived, so prices can re-render */
async function loadRate(){
  if (applyCachedRate()) return false;
  try{
    const data = await (await fetch("https://open.er-api.com/v6/latest/MYR")).json();
    const rate = data && data.rates && data.rates.GBP;
    if (!(rate > 0)) return false;
    gbpPerMyr = rate;
    try{ localStorage.setItem(RATE_KEY, JSON.stringify({ rate, at: Date.now() })); }catch(e){}
    return true;
  }catch(e){ return false; } // offline: keep cached/fallback rate
}

/* pages push re-render functions here; they run when the currency or rate changes */
const priceRenderers = [];
function refreshPrices(){
  priceRenderers.forEach(fn => fn());
}

function posterHtml(m){
  return m.poster ? `<img src="${m.poster}" alt="${m.title} poster" loading="lazy">` : `<div class="poster-ph"></div>`;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}

function fmtRuntime(min){
  return `${Math.floor(min / 60)}h ${String(min % 60).padStart(2, "0")}m`;
}

/* ---------------- showtimes: UK time on the site, MYT on the ticket ---------------- */
function parseTime(str){ // "6:30 PM" -> minutes after midnight
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(String(str).trim());
  if (!m) return null;
  return (Number(m[1]) % 12 + (m[3].toUpperCase() === "PM" ? 12 : 0)) * 60 + Number(m[2]);
}

function clockParts(min, pad){
  min = ((min % 1440) + 1440) % 1440;
  const h = Math.floor(min / 60);
  const h12 = String(h % 12 || 12);
  return { text: `${pad ? h12.padStart(2, "0") : h12}:${String(min % 60).padStart(2, "0")}`, ampm: h < 12 ? "AM" : "PM" };
}

// "6:30 – 10:00 PM", or "11:30 PM – 1:25 AM" when it crosses AM/PM
function fmtRange(start, end, pad){
  const a = clockParts(start, pad), b = clockParts(end, pad);
  return a.ampm === b.ampm ? `${a.text} – ${b.text} ${b.ampm}` : `${a.text} ${a.ampm} – ${b.text} ${b.ampm}`;
}

// minutes London is ahead of UTC on a given day (0 in winter, 60 in summer)
function londonOffset(date){
  const p = {};
  new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    .formatToParts(date).forEach(x => { p[x.type] = x.value; });
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
  return Math.round((asUtc - date.getTime()) / 60000 / 15) * 15;
}

const MYT_OFFSET = 8 * 60; // Malaysia is UTC+8 all year

/* showtime (UK) + runtime -> { uk: "6:30 – 9:00 PM", myt: "02:30 – 05:00 AM" } */
function showWindow(timeStr, runtime, date){
  const start = parseTime(timeStr);
  if (start == null) return { uk: timeStr, myt: "" };
  const end = start + Math.ceil((runtime || 120) / 5) * 5;
  const shift = MYT_OFFSET - londonOffset(date || new Date());
  return { uk: fmtRange(start, end, false), myt: fmtRange(start + shift, end + shift, true) };
}

/* ---------------- e-ticket bits ---------------- */
/* EmailJS (emailjs.com) — fill these three in to make "send ticket" really email.
   Leave them empty and the site says email isn't set up instead of pretending. */
const EMAILJS = { serviceId: "", templateId: "", publicKey: "" };

function emailConfigured(){
  return !!(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);
}

const TNC_RULES = [
  "No Refunds or Cancellations, Meowchkins gets mad and does pawpissies or pawpunchies. Vegimals decide everything.",
  "No Pee or Poopies Once Inside.",
  "Show Your Ticket to Baby Oyen or Baby Hitler Buh Sniffers.",
  "No Sneaky Foodies. Meowchkins will launch a rock missile to your seats.",
  "By buying/using this ticket, you pawmish to follow ALL rules."
];

const BARCODE_WORDS = ["KY5HIES-poo-oyen", "PICHIES-smell-g00d", "BUNCHIES-see-yuh", "QOOBEE-walk-lah", "MEOWCHKINS-rock-missile"];

function nextTicketNumber(){
  let n = 0;
  try{ n = Number(localStorage.getItem("pawnchies_ticket_seq")) || 0; }catch(e){}
  n += 1;
  try{ localStorage.setItem("pawnchies_ticket_seq", String(n)); }catch(e){}
  return n;
}

/* tickets travel inside the emailed link (ticket.html#t=...) so they open on any device */
function encodeTicket(t){
  return btoa(unescape(encodeURIComponent(JSON.stringify(t)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeTicket(str){
  try{
    const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(b64))));
  }catch(e){ return null; }
}

function ticketLink(t){
  return new URL("ticket.html", location.href).href.split("#")[0] + "#t=" + encodeTicket(t);
}

/* resolves "sent" | "failed" | "off" */
async function sendTicketEmail(t, email){
  if (!emailConfigured()) return "off";
  const win = showWindow(t.time, t.runtime, new Date(t.issuedAt));
  try{
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS.serviceId,
        template_id: EMAILJS.templateId,
        user_id: EMAILJS.publicKey,
        template_params: {
          to_email: email,
          movie: t.title,
          hall: t.hall,
          seats: t.seats.join(", "),
          time_uk: win.uk,
          time_myt: win.myt,
          total: t.total,
          ticket_numbers: t.numbers.map(n => String(n).padStart(6, "0")).join(", "),
          issued: t.issued,
          ticket_link: ticketLink(t)
        }
      })
    });
    return res.ok ? "sent" : "failed";
  }catch(e){ return "failed"; }
}

const SPOTLIGHT_ID = "m1";

/* Swap these paths once you have real photos. Put images in /assets. */
const TEAM = [
  { name: "Irfan", role: "Co-founder", photo: "assets/pich.jpg" },
  { name: "Kyshies", role: "Owner", photo: "assets/partner.jpg" },
  { name: "Plushkins & Meowchkins", role: "Snackies Inspector", photo: "assets/plushkins.jpg" }
];

const ABOUT_COPY = `
  <p>[testing]</p>
`;

function getMovie(id){
  return MOVIES.find(m => m.id === id);
}

function slotsClass(n){
  return n <= 8 ? "slots low" : "slots";
}

/* deterministic pseudo-random so the same movie always shows the same
   "taken" seats instead of reshuffling on every reload */
function seededRandom(seedStr){
  let h = 0;
  for (let i = 0; i < seedStr.length; i++){
    h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  return function(){
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };
}

function buildSeatStatus(movieId, hall){
  const rand = seededRandom(movieId);
  const status = {}; // "A1" -> "taken" | "open"
  hall.rows.forEach(row => {
    for (let n = 1; n <= hall.seatsPerRow; n++){
      status[row + n] = rand() < 0.22 ? "taken" : "open";
    }
  });
  return status;
}

/* ---------------- shared render: browse row (index.html) ---------------- */
function renderBrowseRow(){
  const row = document.getElementById("browseRow");
  if (!row) return;
  row.innerHTML = MOVIES.map(m => `
    <a class="poster-card" href="main.html?id=${m.id}">
      ${posterHtml(m)}
      <div class="code">${movieLabel(m)}</div>
      <div class="price-tag">${formatPrice(hallOf(m).price)}</div>
      <div class="${slotsClass(m.slotsLeft)}">${m.slotsLeft} slots left</div>
    </a>
  `).join("");
}

function renderSpotlight(){
  const el = document.getElementById("spotlight");
  if (!el) return;
  const m = getMovie(SPOTLIGHT_ID) || MOVIES[0];
  el.innerHTML = `
    ${posterHtml(m)}
    <div>
      <span class="tag">THIS WEEK</span>
      <h3>${movieLabel(m)}</h3>
      <p>${hallOf(m).name} · ${m.times.join(" / ")} · ${m.slotsLeft} slots left</p>
      <p class="price-tag">${formatPrice(hallOf(m).price)} per seat</p>
    </div>`;
}

/* ---------------- mobile home: Apple TV style hero + shelves ---------------- */
const HERO_IDS = ["m1", "m4", "m3", "m7", "m10"];

function movieMeta(m){
  const hall = hallOf(m);
  return [m.rating, fmtRuntime(m.runtime), hall.type === "imax" ? "IMAX" : hall.name].join(" · ");
}

function renderHero(){
  const track = document.getElementById("heroTrack");
  if (!track) return;
  const keep = track.scrollLeft; // re-render on currency change must not jump slides
  track.innerHTML = HERO_IDS.map(getMovie).filter(Boolean).map(m => `
    <a class="hero-slide" href="main.html?id=${m.id}" style="background-image:url('${m.backdrop}')">
      <div class="hero-shade"></div>
      <div class="hero-info">
        <h2 class="hero-title">${escapeHtml(m.title)}</h2>
        <p class="hero-meta">${escapeHtml(movieMeta(m))}</p>
        <span class="hero-btn">Get tickets · ${formatPrice(hallOf(m).price)}</span>
      </div>
    </a>`).join("");
  track.scrollLeft = keep;
}

function setupHeroCarousel(){
  const track = document.getElementById("heroTrack");
  const dots = document.getElementById("heroDots");
  if (!track || !dots) return;
  const count = track.children.length;
  dots.innerHTML = Array.from({ length: count }, (_, i) => `<span data-i="${i}"></span>`).join("");
  const current = () => Math.round(track.scrollLeft / track.clientWidth);
  const paint = () => {
    const i = current();
    dots.querySelectorAll("span").forEach((d, j) => d.classList.toggle("active", j === i));
  };
  track.addEventListener("scroll", () => requestAnimationFrame(paint), { passive: true });
  paint();

  // auto-advance every 5s, but leave it alone for a while after the user swipes
  let lastTouch = 0;
  ["touchstart", "pointerdown", "wheel"].forEach(ev => track.addEventListener(ev, () => { lastTouch = Date.now(); }, { passive: true }));
  setInterval(() => {
    if (Date.now() - lastTouch < 8000 || !track.clientWidth || document.hidden) return;
    const next = (current() + 1) % count;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  }, 5000);
}

function renderShelves(){
  const el = document.getElementById("shelves");
  if (!el) return;
  const shelf = (title, list) => `
    <section class="shelf">
      <h2>${title}</h2>
      <div class="shelf-row">
        ${list.map(m => `
          <a class="wide-card" href="main.html?id=${m.id}">
            <div class="wide-art" style="background-image:url('${m.backdrop}')"></div>
            <div class="wide-title">${escapeHtml(m.title)}</div>
            <div class="wide-meta">${escapeHtml(m.rating)} · ${fmtRuntime(m.runtime)} · <span class="price-tag">${formatPrice(hallOf(m).price)}</span></div>
          </a>`).join("")}
      </div>
    </section>`;
  el.innerHTML =
    shelf("IMAX Experience", MOVIES.filter(m => hallOf(m).type === "imax")) +
    shelf("In the halls", MOVIES.filter(m => hallOf(m).type !== "imax"));
}

/* currency dropdown (index.html) */
function setupCurrencySelect(){
  const select = document.getElementById("currencySelect");
  if (!select) return;
  select.value = getCurrency();
  select.addEventListener("change", () => {
    setCurrency(select.value);
    refreshPrices();
  });
}

function renderTeam(){
  const el = document.getElementById("teamGrid");
  if (!el) return;
  el.innerHTML = TEAM.map(p => `
    <div class="team-card">
      <img src="${p.photo}" alt="${p.name}" loading="lazy" onerror="this.style.visibility='hidden'">
      <h4>${p.name}</h4>
      <p>${p.role}</p>
    </div>
  `).join("");
}

function renderAbout(){
  const el = document.getElementById("aboutCopy");
  if (el) el.innerHTML = ABOUT_COPY;
}

function setupTabToggle(){
  const buttons = document.querySelectorAll(".tab-toggle button");
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.panel).classList.add("active");
    });
  });
}

/* ---------------- loading splash (index.html only) ---------------- */
function setupSplash(){
  const splash = document.getElementById("splash");
  if (!splash) return;
  if (sessionStorage.getItem("pawnchies_splash_seen")){
    splash.remove();
    return;
  }
  sessionStorage.setItem("pawnchies_splash_seen", "1");
  const dismiss = () => splash.classList.add("hide");
  setTimeout(dismiss, 2800);
  splash.addEventListener("click", dismiss);
}

/* ---------------- movie detail page (movie.html) ---------------- */
function initMoviePage(){
  const root = document.getElementById("movieRoot");
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const movie = getMovie(params.get("id"));
  if (!movie){
    location.href = "index.html";
    return;
  }

  const hall = hallOf(movie);
  if (movie.poster) document.getElementById("detailPoster").src = movie.poster;
  document.getElementById("detailCode").textContent = movieLabel(movie);
  document.getElementById("detailSlots").textContent = `${movie.slotsLeft} slots left · ${hall.name}`;
  document.getElementById("detailDesc").textContent = movie.overview || "";
  document.getElementById("detailMeta").textContent = movieMeta(movie);
  document.getElementById("detailBackdrop").style.backgroundImage = `url('${movie.backdrop}')`;
  const priceEl = document.getElementById("detailPrice");
  priceRenderers.push(() => { priceEl.textContent = `${formatPrice(hall.price)} per seat`; });

  // showtimes
  let chosenTime = null;
  const timesEl = document.getElementById("showtimes");
  timesEl.innerHTML = movie.times.map(t => `<button class="showtime-btn" data-time="${t}">${t}</button>`).join("");
  timesEl.querySelectorAll(".showtime-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      timesEl.querySelectorAll(".showtime-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      chosenTime = btn.dataset.time;
      updateCta();
    });
  });

  // seat map — imax rows bend toward the screen, standard rows stay flat.
  // --x runs -1 (left edge) → 1 (right edge) and drives the curve in CSS.
  const chosenSeats = [];
  const status = buildSeatStatus(movie.id, hall);
  const seatMap = document.getElementById("seatMap");
  const mid = (hall.seatsPerRow - 1) / 2;
  seatMap.classList.add(hall.type);
  document.getElementById("screenBar").classList.add(hall.type);
  seatMap.innerHTML = hall.rows.map(row => `
    <div class="seat-row">
      <span class="row-label">${row}</span>
      ${Array.from({length: hall.seatsPerRow}, (_, i) => {
        const id = row + (i + 1);
        const s = status[id];
        const x = ((i - mid) / mid).toFixed(3);
        return `<button class="seat ${s}" style="--x:${x}" data-seat="${id}" ${s !== "open" ? "disabled" : ""}>${i + 1}</button>`;
      }).join("")}
    </div>
  `).join("");
  seatMap.scrollLeft = (seatMap.scrollWidth - seatMap.clientWidth) / 2; // start centred on wide halls

  const seatOrder = id => hall.rows.indexOf(id[0]) * 100 + Number(id.slice(1));
  seatMap.querySelectorAll(".seat.open").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.seat;
      const at = chosenSeats.indexOf(id);
      if (at >= 0){
        chosenSeats.splice(at, 1);
        btn.classList.remove("selected");
      } else if (chosenSeats.length < MAX_SEATS){
        chosenSeats.push(id);
        chosenSeats.sort((a, b) => seatOrder(a) - seatOrder(b));
        btn.classList.add("selected");
      }
      updateCta();
    });
  });

  // T&C gate
  let tncAgreed = sessionStorage.getItem("pawnchies_tnc_agreed") === "1";
  const modal = document.getElementById("tncModal");
  const scrollBox = document.getElementById("tncScroll");
  const agreeCheck = document.getElementById("agreeCheck");
  const scrollHint = document.getElementById("scrollHint");
  const tncConfirm = document.getElementById("tncConfirm");

  // unlock the checkbox once the end of the T&C is on screen. A marker at the
  // bottom covers both cases: scrolled to the end, or short enough to need no
  // scrolling at all (desktop). The scroll check is a fallback for old browsers.
  function unlockTnc(){
    agreeCheck.disabled = false;
    scrollHint.style.display = "none";
  }
  const tncEnd = document.createElement("div");
  tncEnd.style.height = "1px";
  scrollBox.appendChild(tncEnd);
  if ("IntersectionObserver" in window){
    new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting) && modal.classList.contains("open")) unlockTnc();
    }, { root: scrollBox }).observe(tncEnd);
  }
  scrollBox.addEventListener("scroll", () => {
    if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 8) unlockTnc();
  }, { passive: true });
  function openTnc(){
    agreeCheck.checked = false;
    agreeCheck.disabled = true;
    tncConfirm.disabled = true;
    scrollHint.style.display = "block";
    scrollBox.scrollTop = 0;
    modal.classList.add("open");
    // desktop, or anything that already fits: nothing to scroll, unlock now
    if (window.matchMedia("(min-width:860px)").matches || scrollBox.scrollHeight <= scrollBox.clientHeight + 8) unlockTnc();
  }
  agreeCheck.addEventListener("change", () => {
    tncConfirm.disabled = !agreeCheck.checked;
  });
  tncConfirm.addEventListener("click", () => {
    tncAgreed = true;
    sessionStorage.setItem("pawnchies_tnc_agreed", "1");
    modal.classList.remove("open");
    proceedToTicket();
  });
  document.getElementById("tncCancel").addEventListener("click", () => {
    modal.classList.remove("open");
  });

  function updateCta(){
    const summary = document.getElementById("ctaSummary");
    const btn = document.getElementById("ctaButton");
    const n = chosenSeats.length;
    if (chosenTime && n){
      const full = n === MAX_SEATS ? ` (max ${MAX_SEATS})` : "";
      summary.textContent = `${movieLabel(movie)} · ${chosenTime} · ${n > 1 ? "Seats" : "Seat"} ${chosenSeats.join(", ")}${full} · ${formatPrice(hall.price * n)}`;
      btn.disabled = false;
    } else {
      summary.textContent = "Pick a showtime and your seats to continue";
      btn.disabled = true;
    }
  }
  priceRenderers.push(updateCta);
  refreshPrices();

  document.getElementById("ctaButton").addEventListener("click", () => {
    if (!chosenTime || !chosenSeats.length) return;
    if (!tncAgreed){
      openTnc();
      return;
    }
    proceedToTicket();
  });

  function proceedToTicket(){
    // this is a *booking draft* — not the final ticket yet, money.html
    // adds the payment method and turns it into the real ticket
    const booking = {
      movieId: movie.id,
      movieCode: movieLabel(movie),
      time: chosenTime,
      seats: chosenSeats.slice(),
      hall: hall.name,
      totalMyr: hall.price * chosenSeats.length
    };
    localStorage.setItem("pawnchies_booking", JSON.stringify(booking));
    location.href = "money.html";
  }
}

/* ---------------- payment page (money.html) ---------------- */
function initPaymentPage(){
  const root = document.getElementById("paymentRoot");
  if (!root) return;

  let booking;
  try{ booking = JSON.parse(localStorage.getItem("pawnchies_booking")); }catch(e){ booking = null; }
  if (!booking){
    location.href = "index.html";
    return;
  }

  // drafts saved before multi-seat only had a single "seat" and no total
  const seats = booking.seats || [booking.seat];
  const totalMyr = booking.totalMyr != null ? booking.totalMyr : HALLS.h1.price * seats.length;
  const seatText = `${seats.length > 1 ? "Seats" : "Seat"} ${seats.join(", ")}`;

  document.getElementById("paySummaryMovie").textContent = booking.movieCode;
  document.getElementById("paySummaryDetails").textContent = `${booking.time} · ${seatText} · ${booking.hall}`;

  const methodInputs = document.querySelectorAll('input[name="payMethod"]');
  const cardFields = document.getElementById("cardFields");
  const cardNumber = document.getElementById("cardNumber");
  const cardExpiry = document.getElementById("cardExpiry");
  const cardCvv = document.getElementById("cardCvv");
  const payBtn = document.getElementById("payBtn");
  const payAmount = document.getElementById("payAmount");

  function currentMethod(){
    return document.querySelector('input[name="payMethod"]:checked').value;
  }

  function refreshMethod(){
    const method = currentMethod();
    document.getElementById("cashSub").textContent = formatPrice(0);
    if (method === "cash"){
      cardFields.style.display = "none";
      payAmount.textContent = `Pay ${formatPrice(0)} (Free)`;
    } else {
      cardFields.style.display = "block";
      payAmount.textContent = `Pay ${formatPrice(totalMyr)} with Kawaii Bank`;
    }
    validateForm();
  }
  methodInputs.forEach(r => r.addEventListener("change", refreshMethod));
  priceRenderers.push(refreshMethod);

  // light formatting — spaces every 4 digits, 16 digit cap (no real validation, it's dummy)
  cardNumber.addEventListener("input", () => {
    let digits = cardNumber.value.replace(/\D/g, "").slice(0, 16);
    cardNumber.value = digits.replace(/(.{4})/g, "$1 ").trim();
    validateForm();
  });
  cardExpiry.addEventListener("input", () => {
    let digits = cardExpiry.value.replace(/\D/g, "").slice(0, 4);
    cardExpiry.value = digits.length > 2 ? digits.slice(0,2) + "/" + digits.slice(2) : digits;
    validateForm();
  });
  cardCvv.addEventListener("input", () => {
    cardCvv.value = cardCvv.value.replace(/\D/g, "").slice(0, 3);
    validateForm();
  });

  // the ticket gets emailed here; optional, but if typed it has to look like an email
  const payEmail = document.getElementById("payEmail");
  const payEmailNote = document.getElementById("payEmailNote");
  const emailOk = () => !payEmail.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payEmail.value.trim());
  payEmail.addEventListener("input", validateForm);
  payEmailNote.textContent = emailConfigured()
    ? "Your e-ticket will be emailed here after paying."
    : "Email sending isn't set up yet, your ticket will still show on the next page.";

  function validateForm(){
    const method = currentMethod();
    payEmail.classList.toggle("bad", !emailOk());
    if (method === "cash"){
      payBtn.disabled = !emailOk();
      return;
    }
    const numOk = cardNumber.value.replace(/\D/g, "").length === 16;
    const expOk = /^\d{2}\/\d{2}$/.test(cardExpiry.value);
    const cvvOk = cardCvv.value.length === 3;
    payBtn.disabled = !(numOk && expOk && cvvOk && emailOk());
  }
  refreshMethod();

  // preload the "payment done" gif as a blob so it shows instantly; a fresh
  // object URL at show time makes the gif start from its first frame
  const OKAY_GIF = "assets/okay.gif";
  const OKAY_GIF_MS = 1600; // one full loop of okay.gif
  let okayBlob = null;
  fetch(OKAY_GIF).then(r => r.ok ? r.blob() : null).then(b => { okayBlob = b; }).catch(() => {});

  payBtn.addEventListener("click", () => {
    payBtn.disabled = true;
    payBtn.textContent = "Processing…";
    const loader = document.createElement("div");
    loader.className = "splash";
    loader.innerHTML = '<div class="splash-sprite"></div><p>Processing…</p><div class="bar"><div class="bar-fill"></div></div>';
    document.body.appendChild(loader);

    // build the ticket now so the email can send while the animations play
    const ticket = buildTicket(currentMethod());
    const email = payEmail.value.trim();
    const emailSent = email ? sendTicketEmail(ticket, email) : Promise.resolve(null);

    setTimeout(() => {
      const src = okayBlob ? URL.createObjectURL(okayBlob) : OKAY_GIF;
      loader.innerHTML = `<img class="splash-okay" src="${src}" alt=""><p>Payment done!</p>`;
      payBtn.textContent = "Paid!";
      setTimeout(issueTicket, OKAY_GIF_MS);
    }, 2600);

    async function issueTicket(){
      // give a slow email up to 6 more seconds before moving on
      const status = await Promise.race([emailSent, new Promise(r => setTimeout(() => r("failed"), 6000))]);
      ticket.email = email || null;
      ticket.emailStatus = status;
      localStorage.setItem("pawnchies_ticket", JSON.stringify(ticket));
      localStorage.removeItem("pawnchies_booking");
      location.href = "ticket.html";
    }
  });

  function buildTicket(method){
    const movie = getMovie(booking.movieId) || {};
    const free = method === "cash";
    const now = new Date();
    return {
      v: 2,
      movieId: booking.movieId,
      title: movie.title || booking.movieCode,
      runtime: movie.runtime || null,
      rating: movie.rating || "",
      time: booking.time,
      seats: seats,
      hall: booking.hall,
      seatPrice: formatPrice(free ? 0 : totalMyr / seats.length), // frozen in the currency paid
      total: formatPrice(free ? 0 : totalMyr),
      payMethod: free ? "Cash (Free)" : "Kawaii Bank",
      cardLast4: free ? null : cardNumber.value.replace(/\D/g, "").slice(-4),
      numbers: seats.map(() => nextTicketNumber()),
      codes: seats.map(() => BARCODE_WORDS[Math.floor(Math.random() * BARCODE_WORDS.length)] + "-" + String(Math.floor(1000 + Math.random() * 9000))),
      issuedAt: now.toISOString(),
      issued: now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
    };
  }
}

/* ---------------- ticket / receipt page (ticket.html) ---------------- */
/* tickets saved before the e-ticket format get filled in so they still render */
function upgradeTicket(t){
  if (t.v === 2) return t;
  const seats = t.seats || [t.seat];
  const code = String(t.movieCode || "");
  const movie = MOVIES.find(m => movieLabel(m) === code || m.id === code.split(" ")[0].toLowerCase()) || {};
  return Object.assign({}, t, {
    v: 2, movieId: movie.id, title: movie.title || code, runtime: movie.runtime, rating: movie.rating || "",
    seats, seatPrice: t.total || "—", total: t.total || "—",
    numbers: seats.map((_, i) => i + 1),
    codes: seats.map((_, i) => `PAWN-${t.ticketNo || "OLD"}-${i + 1}`),
    issuedAt: new Date().toISOString()
  });
}

function eticketHtml(t, i){
  const movie = getMovie(t.movieId) || {};
  const win = showWindow(t.time, t.runtime, new Date(t.issuedAt));
  const num = String(t.numbers[i]).padStart(6, "0");
  // title fills ~52% of the ticket width; Bebas Neue glyphs average ~0.42em wide
  const titleSize = Math.min(14, 52 / (Math.max(t.title.length, 3) * 0.42)).toFixed(2);
  const metal = i % 2 ? "copper" : "gold"; // alternate like the two sample tickets
  return `
  <article class="eticket-pair">
    <p class="eticket-count">Ticket ${i + 1} of ${t.seats.length}</p>
    <div class="eticket-scroll"><div class="eticket front">
      <div class="et-art" style="background-image:url('${movie.backdrop || movie.poster || ""}')">
        <div class="et-premiere">GRAND KAWAII<br>PREMIERE</div>
        <div class="et-hallseat">${escapeHtml(t.hall.replace(/\s*\(placeholder\)/i, "").toUpperCase())} • SEAT #${escapeHtml(t.seats[i])}</div>
        <h3 class="et-title" style="font-size:${titleSize}cqw">${escapeHtml(t.title)}</h3>
      </div>
      <div class="et-strip"><span>RATING: ${escapeHtml(t.rating || "U")}</span></div>
      <div class="et-stub">
        <div><span>TICKET PRICE</span><b>${escapeHtml(t.seatPrice)}</b></div>
        <div><span>DATE ISSUED</span><b>${escapeHtml(t.issued)}</b></div>
        <div><span>TIME (UK/MYT)</span><b>${escapeHtml(win.uk)}</b><b>${escapeHtml(win.myt)}</b></div>
      </div>
    </div></div>
    <div class="eticket-scroll"><div class="eticket back">
      <div class="et-metal ${metal}">
        <div class="et-num">${num}</div>
        <div class="et-side">
          <div class="et-bc-row">
            <div class="et-code">${escapeHtml(t.codes[i])}</div>
            <div class="et-barcode"><svg data-code="${escapeHtml(t.codes[i])}"></svg></div>
          </div>
          <div class="et-info">PRICE: ${escapeHtml(t.seatPrice)}<br>TIME: ${escapeHtml(win.uk)}<br>${escapeHtml(t.hall.replace(/\s*\(placeholder\)/i, "").toUpperCase())}</div>
        </div>
      </div>
      <div class="et-terms">
        <h4>PAWNCHINEMA TERMS AND CONDITIONS</h4>
        ${TNC_RULES.map(r => `<p>${escapeHtml(r)}</p>`).join("")}
      </div>
    </div></div>
  </article>`;
}

function initTicketPage(){
  const root = document.getElementById("ticketRoot");
  if (!root) return;
  // an emailed link carries the ticket in the URL; otherwise use this browser's last ticket
  const fromLink = location.hash.startsWith("#t=") ? decodeTicket(location.hash.slice(3)) : null;
  let ticket = fromLink;
  if (!ticket){
    try{ ticket = JSON.parse(localStorage.getItem("pawnchies_ticket")); }catch(e){ ticket = null; }
  }
  if (!ticket){
    location.href = "index.html";
    return;
  }
  ticket = upgradeTicket(ticket);

  document.getElementById("ticketList").innerHTML = ticket.seats.map((_, i) => eticketHtml(ticket, i)).join("");
  document.getElementById("ticketSummary").textContent =
    `${ticket.title} · ${ticket.seats.length > 1 ? "Seats" : "Seat"} ${ticket.seats.join(", ")} · Total ${ticket.total} · ${ticket.payMethod}${ticket.cardLast4 ? " ····" + ticket.cardLast4 : ""}`;

  if (window.JsBarcode){
    document.querySelectorAll(".et-barcode svg").forEach(svg => {
      JsBarcode(svg, svg.dataset.code, { format: "CODE128", displayValue: false, margin: 0, height: 60, width: 2, background: "transparent", lineColor: "#141008" });
      // JsBarcode sizes in fixed px; a viewBox lets CSS stretch it to the stub
      svg.setAttribute("viewBox", `0 0 ${svg.getAttribute("width")} ${svg.getAttribute("height")}`.replace(/px/g, ""));
      svg.setAttribute("preserveAspectRatio", "none");
    });
  }

  document.getElementById("printTicket").addEventListener("click", () => window.print());

  const sendBtn = document.getElementById("sendReceiptBtn");
  const emailInput = document.getElementById("receiptEmail");
  const sendStatus = document.getElementById("sendStatus");
  const say = (msg, good) => {
    sendStatus.textContent = msg;
    sendStatus.style.color = good ? "var(--good)" : "var(--danger)";
  };
  if (!fromLink && ticket.email){
    emailInput.value = ticket.email;
    if (ticket.emailStatus === "sent") say(`Sent to ${ticket.email} ✓`, true);
    else if (ticket.emailStatus === "failed") say(`Couldn't email ${ticket.email}, try again below.`, false);
    else if (ticket.emailStatus === "off") say("Email sending isn't set up yet.", false);
  }
  sendBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      say("Enter a valid email first.", false);
      return;
    }
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending…";
    const status = await sendTicketEmail(ticket, email);
    if (status === "sent") say(`Sent to ${email} ✓`, true);
    else if (status === "off") say("Email sending isn't set up yet.", false);
    else say(`Couldn't email ${email}, try again.`, false);
    sendBtn.disabled = false;
    sendBtn.textContent = "Send ticket";
  });
}

/* ---------------- boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  applyCachedRate();
  priceRenderers.push(renderSpotlight, renderBrowseRow, renderHero, renderShelves);
  renderSpotlight();
  renderBrowseRow();
  renderHero();
  setupHeroCarousel();
  renderShelves();
  renderTeam();
  renderAbout();
  setupTabToggle();
  setupCurrencySelect();
  setupSplash();
  initMoviePage();
  initPaymentPage();
  initTicketPage();

  // re-render once a fresh live rate arrives (first visit starts on the fallback rate)
  loadRate().then(changed => { if (changed) refreshPrices(); });
});
