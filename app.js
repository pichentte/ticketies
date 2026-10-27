/* =====================================================================
   MOVIE DATA — edit this array to add/remove movies.
   id must be unique and lowercase (m1, m2, m3...).
   times are Malaysia time (MYT); the site shows them in UK time when the
   currency is GBP. trailer is a YouTube video id.
   hall must be one of the HALLS keys below.
   ===================================================================== */
const SHOW_TITLES = true;
const HALLS = {
  h1:   { name: "Meowchkins Hall",    type: "standard", rows: ["G","H","I","J","K","L","M","N","O"], seatsPerRow: 12, priceGbp: 5.99 },
  h2:   { name: "Swiss Roll Cake Hall",    type: "standard", rows: ["G","H","I","J","K","L","M","N","O"], seatsPerRow: 12, priceGbp: 5.99 },
  imax: { name: "OPIUM", type: "imax",     rows: ["A","B","C","D","E","F","G","H","I","J","K","L"], seatsPerRow: 18, priceGbp: 10.99 }
};

const MAX_SEATS = 8;
const TICKET_TYPES = [
  // code = the fixed name printed and encoded on that type's barcode, metal = back strip colour
  { id: "stinki", name: "Stinki",        note: "Full price",  pay: 1,    code: "PICHIES-sweaties-armpits-0112", metal: "sage" },
  { id: "kawaii", name: "Kawaii",        note: "100% off",    pay: 0,    code: "KY5HIES-poo-oyen-3012",         metal: "gold" },
  { id: "babies", name: "Kawaii Babies", note: "55% off",     pay: 0.45, code: "BUNCHIES-see-yuh-5555",         metal: "bronze" }
];

function ticketType(id){
  return TICKET_TYPES.find(t => t.id === id) || TICKET_TYPES[0];
}

/* ["stinki","stinki","babies"] -> "2× Stinki · 1× Kawaii Babies" */
function typeBreakdown(types){
  return TICKET_TYPES
    .map(t => ({ t, n: types.filter(id => id === t.id).length }))
    .filter(x => x.n)
    .map(x => `${x.n}× ${x.t.name}`)
    .join(" · ");
}

/* "2026-10-27T…" -> "27th October 2026" */
function longDate(iso){
  const d = new Date(iso);
  const day = d.getDate();
  const suffix = day % 100 >= 11 && day % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th");
  return `${day}${suffix} ${d.toLocaleDateString("en-GB", { month: "long" })} ${d.getFullYear()}`;
}

/* UK = BBFC (U/PG/12A/15/18),
   Malaysia = LPF classes since Feb 2023 (U/P12/13/16/18).
   Most MY values are inferred — few of these films list an LPF rating. */

const MOVIES = [
  { id: "m1", title: "Burning", year: 2018, hall: "h1", runtime: 148, ratings: { uk: "15", my: "16" }, titleFont: "Cormorant Garamond",
    times: ["12:30 AM", "3:00 AM", "5:30 AM"], trailer: "irBLY-Ev9vo",
    poster: "https://image.tmdb.org/t/p/w500/kXiF80o74fE9gf3Utf9moAI7ar0.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/qQEt2FqF8McryFBNX30dyDJKiEK.jpg",
    overview: "A part-time courier runs into a girl from his old neighbourhood, who asks him to feed her cat while she travels. When she comes back with a wealthy, enigmatic man and then disappears, his suspicion grows." },
  { id: "m2", title: "Bodies Bodies Bodies", year: 2022, hall: "h2", runtime: 94, ratings: { uk: "15", my: "18" }, titleFont: "Archivo Black",
    times: ["12:30 AM", "3:00 AM", "5:30 AM"], trailer: "cTzGKsZjBOY",
    poster: "https://image.tmdb.org/t/p/w500/hSuTjDmqRdy7Dii8ymnF2WILTeP.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/qYCl28dMJwRTzlbteTrW75szZPN.jpg",
    overview: "A group of wealthy twenty-somethings throw a hurricane party at a remote mansion and play a murder game. When one of them turns up dead, paranoia and accusations take over the night." },
  { id: "m3", title: "君の名は。", altTitle: "Your Name", year: 2016, hall: "h1", runtime: 106, ratings: { uk: "12A", my: "P12" }, titleFont: "Noto Serif JP",
    times: ["12:30 AM", "3:00 AM", "5:30 AM"], trailer: "TYku4P7MHdo",
    poster: "https://image.tmdb.org/t/p/w500/vfJFJPepRKapMd5G2ro7klIRysq.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/mMtUybQ6hL24FXo0F3Z4j2KG7kZ.jpg",
    overview: "A country girl in Japan and a boy in Tokyo start swapping bodies in their sleep. As they learn each other's lives through notes, they try to find each other, and a bigger secret comes out." },
  { id: "m4", title: "Wolfwalkers", year: 2020, hall: "imax", runtime: 102, ratings: { uk: "PG", my: "U" }, titleFont: "Cinzel",
    times: ["12:30 AM", "3:00 AM", "5:30 AM"], trailer: "d_Z_tybgPgg",
    poster: "https://image.tmdb.org/t/p/w500/vqGiNbdc2sDwsnivMMYzwAoSSu6.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/3zTbERSBLh7waK9811RTKGAcG86.jpg",
    overview: "In 17th-century Ireland, a young apprentice hunter arrives with her father to wipe out the last wolf pack. In the forest she befriends a free-spirited girl who can turn into a wolf." },
  { id: "m5", title: "Parasite", year: 2019, hall: "h1", runtime: 133, ratings: { uk: "15", my: "18" }, titleFont: "Montserrat",
    times: ["12:30 AM", "3:00 AM", "5:30 AM"], trailer: "isOGD_7hNIY",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    overview: "A struggling family gets themselves hired by a wealthy household one by one, posing as unrelated and qualified workers. Things go wrong as the two families' lives get tangled together." },
  { id: "m6", title: "Hit Man", year: 2024, hall: "h2", runtime: 116, ratings: { uk: "15", my: "18" }, titleFont: "Anton",
    times: ["12:30 AM", "3:00 AM", "5:30 AM"], trailer: "9a7C7Bxsm90",
    poster: "https://image.tmdb.org/t/p/w500/oil3EZwKFp3CWxZnfGfGglesvm9.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/nv6F6tz7r61DUhE7zgHwLJFcTYp.jpg",
    overview: "A mild-mannered professor moonlights as a fake hit man in police stings. He falls for a client who wants her husband dead, and the line between his act and reality starts to blur." },
  { id: "m7", title: "Novocaine", year: 2025, hall: "imax", runtime: 110, ratings: { uk: "15", my: "18" }, titleFont: "Bebas Neue",
    times: ["12:30 AM", "3:00 AM", "5:30 AM"], trailer: "99BLnkAlC1M",
    poster: "https://image.tmdb.org/t/p/w500/xmMHGz9dVRaMY6rRAlEX4W0Wdhm.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/lyBH2mFFU6qrHwD5QKotL2JnEb6.jpg",
    overview: "A bank assistant manager who can't feel physical pain is pulled into a robbery when the girl he likes is taken hostage. He turns his condition into his advantage." },
  { id: "m8", title: "Companion", year: 2025, hall: "h1", runtime: 97, ratings: { uk: "15", my: "18" }, titleFont: "Josefin Sans",
    times: ["12:30 AM", "3:00 AM", "5:30 AM"], trailer: "Qr_kX0D3DNA",
    poster: "https://image.tmdb.org/t/p/w500/oCoTgC3UyWGfyQ9thE10ulWR7bn.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/sc1abgWNXc29wSBaerrjGBih06l.jpg",
    overview: "Iris heads to a lake house with her boyfriend and his friends for a weekend away, and finds out something about their relationship that she was never meant to know." },
  { id: "m9", title: "Strange Darling", year: 2024, hall: "h2", runtime: 97, ratings: { uk: "18", my: "18" }, titleFont: "Playfair Display",
    times: ["12:30 AM", "3:00 AM", "5:30 AM"], trailer: "F_F3f_Fqtrc",
    poster: "https://image.tmdb.org/t/p/w500/kWNCRgt3ocv19bYO0sk7TRuZuFY.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/I4ofwq3XfmwXAETUs5pjubcMJ0.jpg",
    overview: "A one-night stand turns into a night of violence, told out of order in six chapters." },
  { id: "m10", title: "Heretic", year: 2024, hall: "imax", runtime: 111, ratings: { uk: "15", my: "16" }, titleFont: "Cormorant SC",
    times: ["12:30 AM", "3:00 AM", "5:30 AM"], trailer: "jpWUOxRozZg",
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

/* currency */
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

/* one seat's price in the current currency. MYR is rounded to .90 */
function seatAmount(gbp){
  if (getCurrency() === "GBP") return Math.round(gbp * 100) / 100;
  if (gbp <= 0) return 0;
  return Math.max(0.9, Math.round(gbp / gbpPerMyr) - 0.1);
}

function formatAmount(n){
  return (getCurrency() === "GBP" ? "£" : "RM ") + n.toFixed(2);
}

function formatPrice(gbp){ // a single seat's price
  return formatAmount(seatAmount(gbp));
}

/* totals add up the rounded seat prices, so the receipt always sums correctly */
function formatTotal(seatGbps){
  return formatAmount(seatGbps.reduce((sum, g) => sum + seatAmount(g), 0));
}

/* prices are tax-inclusive: UK, 20% VAT, & Malaysia, 25% */
function taxInfo(){
  return getCurrency() === "GBP" ? { name: "Kawaii Tax", rate: 0.2 } : { name: "Kawaii Tax", rate: 0.25 };
}

function taxLines(totalAmount){
  const { name, rate } = taxInfo();
  const net = Math.round(totalAmount / (1 + rate) * 100) / 100;
  return { name, pct: Math.round(rate * 100), net: formatAmount(net), tax: formatAmount(Math.round((totalAmount - net) * 100) / 100), total: formatAmount(totalAmount) };
}

/* rating for the country matching the currency, as a styled badge */
function ratingOf(m, country){
  const r = m.ratings || { uk: m.rating || "", my: m.rating || "" };
  return (country || (getCurrency() === "GBP" ? "uk" : "my")) === "uk" ? r.uk : r.my;
}

function ratingBadge(m){
  const uk = getCurrency() === "GBP";
  const r = ratingOf(m);
  return `<span class="rating-badge ${uk ? "bbfc" : "lpf"} r-${String(r).toLowerCase()}" title="${uk ? "BBFC (UK)" : "LPF (Malaysia)"} rating">${escapeHtml(r)}</span>`;
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
  return m.poster ? `<img src="${m.poster}" alt="${m.altTitle || m.title} poster" loading="lazy">` : `<div class="poster-ph"></div>`;
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

/* showtime (MYT) + runtime -> { uk: "4:30 – 6:15 PM", myt: "12:30 – 02:15 AM" } */
function showWindow(timeStr, runtime, date){
  const start = parseTime(timeStr);
  if (start == null) return { uk: timeStr, myt: "" };
  const end = start + Math.ceil((runtime || 120) / 5) * 5;
  const shift = londonOffset(date || new Date()) - MYT_OFFSET;
  return { uk: fmtRange(start + shift, end + shift, false), myt: fmtRange(start, end, true) };
}

/* the currency picks the time zone too: MYR -> Malaysia time, GBP -> UK time */
function tzLabel(){
  return getCurrency() === "GBP" ? "UK" : "MYT";
}

function displayTime(mytStr){
  if (getCurrency() !== "GBP") return mytStr;
  const start = parseTime(mytStr);
  if (start == null) return mytStr;
  const c = clockParts(start + londonOffset(new Date()) - MYT_OFFSET, false);
  return `${c.text} ${c.ampm}`;
}

/* ---------------- e-ticket bits ---------------- */
const EMAILJS = { serviceId: "service_4stffcj", templateId: "template_7cs5908", publicKey: "JbgmG2uoYE-RjqwAs" };

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
          issued: t.issuedAt ? longDate(t.issuedAt) : t.issued,
          name: t.name || "Guest",
          payment_method: t.payMethod + (t.cardLast4 ? " ····" + t.cardLast4 : ""),
          ticket_types: typeBreakdown(t.types),
          subtotal: t.tax ? t.tax.net : t.total,
          tax_label: t.tax ? `${t.tax.name} ${t.tax.pct}% (incl.)` : "Tax (incl.)",
          tax_amount: t.tax ? t.tax.tax : "",
          logo_url: new URL("assets/email-logo.png", location.href).href, // bunny + wordmark baked in, email apps can't load the font
          ticket_link: ticketLink(t)
        }
      })
    });
    return res.ok ? "sent" : "failed";
  }catch(e){ return "failed"; }
}

const SPOTLIGHT_ID = "m1";

/* Our images */
const TEAM = [
  { name: "Irfan", role: "Co-founder", photo: "assets/team/irfan.jpg" },
  { name: "Kyshies", role: "Owner", photo: "assets/team/Kyshies.jpg" },
  { name: "Plushkins & Meowchkins", role: "Snackies Inspector", photo: "assets/team/Plushkins.jpg" }
];

const ABOUT_COPY = `
  <div class="about-story">
  <p>Pawnchinema has been rebranded for maximum kawaiiness, and every seat is Kawaii Pass approved by the Plushkins. Only the non-kawaii (AKA the Stinkies) get rocks thrown at them.</p>
  <p>Founded in March 2026 as <b>Baby Oyen Cinema</b>, it was bought by Mr. Stinki for £5.55 Kawaiilion, who took over and rebranded it to what we know today: <b>PWC</b> (Pawchinema), or <b>Pawnchinema</b> as in Paw-Punch-inema muehehehe.</p>
  <p>This cinema has security, so beware of Yangzhi…</p>
  </div>
  <div class="about-locations">
  <h3>Locations</h3>
  <ul>
    <li>PWC Stinki Puchong, beside the kek lapis</li>
    <li>PWC Plushkins House, Derby</li>
  </ul>
  </div>
`;

function getMovie(id){
  return MOVIES.find(m => m.id === id);
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
  // always-free rows: K in standard halls, the two middle rows in IMAX
  const mid = Math.floor(hall.rows.length / 2);
  const freeRows = hall.type === "imax" ? hall.rows.slice(mid - 1, mid + 1) : ["K"];
  hall.rows.forEach(row => {
    for (let n = 1; n <= hall.seatsPerRow; n++){
      const taken = rand() < 0.22; // still roll for every seat so the other rows keep their pattern
      status[row + n] = taken && !freeRows.includes(row) ? "taken" : "open";
    }
  });
  return status;
}

/* ---------------- shared render: browse row (index.html) ---------------- */
function renderBrowseRow(){
  const row = document.getElementById("browseRow");
  if (!row) return;
  row.innerHTML = MOVIES.map(m => `
    <a class="poster-card" href="main.html?id=${m.id}" data-trailer="${m.trailer}">
      <div class="poster-wrap trailer-host">${posterHtml(m)}</div>
      <div class="code">${movieLabel(m)}</div>
      <div class="price-tag">${formatPrice(hallOf(m).priceGbp)}</div>
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
      <p>${hallOf(m).name} · ${m.times.map(displayTime).join(" / ")} ${tzLabel()}</p>
      <p class="price-tag">${formatPrice(hallOf(m).priceGbp)} per seat</p>
    </div>`;
}

/* ---------------- mobile home: Apple TV style hero + shelves ---------------- */
const HERO_IDS = ["m1", "m4", "m3", "m7", "m10"];

function movieMeta(m){
  const hall = hallOf(m);
  return [fmtRuntime(m.runtime), hall.type === "imax" ? "IMAX" : hall.name].join(" · ");
}

function renderHero(){
  const track = document.getElementById("heroTrack");
  if (!track) return;
  const keep = track.scrollLeft; // re-render on currency change must not jump slides
  track.innerHTML = HERO_IDS.map(getMovie).filter(Boolean).map(m => `
    <a class="hero-slide trailer-host" href="main.html?id=${m.id}" data-trailer="${m.trailer}" style="background-image:url('${m.backdrop}')">
      <div class="hero-shade"></div>
      <div class="hero-info">
        <h2 class="hero-title">${escapeHtml(m.title)}</h2>
        <p class="hero-meta">${ratingBadge(m)} ${escapeHtml(movieMeta(m))}</p>
        <p class="hero-desc">${escapeHtml(m.overview)}</p>
        <div class="hero-actions">
          <span class="hero-btn">Get tickets · ${formatPrice(hallOf(m).priceGbp)}</span>
          ${soundButton()}
        </div>
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

  if (canHover()){
    // desktop: rotate every 8s unless the cursor is on it (a trailer is playing)
    setInterval(() => {
      if (track.matches(":hover") || !track.clientWidth || document.hidden) return;
      track.scrollTo({ left: (current() + 1) % count * track.clientWidth, behavior: "smooth" });
    }, 8000);
    return;
  }
  // phone: no hover, so the slide you land on plays its trailer after 2s
  let settle = null;
  const playActive = () => {
    const slide = track.children[current()];
    [...track.children].forEach(s => { if (s !== slide) stopTrailer(s); });
    if (slide && !slide.querySelector(".trailer-frame")) playTrailer(slide, slide.dataset.trailer);
  };
  track.addEventListener("scroll", () => {
    clearTimeout(settle);
    [...track.children].forEach(stopTrailer);
    settle = setTimeout(playActive, 2000);
  }, { passive: true });
  settle = setTimeout(playActive, 2000);
}

/* ---------------- trailers ---------------- */
function canHover(){
  return window.matchMedia("(hover:hover) and (pointer:fine)").matches;
}

function trailerUrl(key, preview){
  // enablejsapi lets the page hear when the video is really playing and mute/unmute it
  const origin = location.origin && location.origin !== "null" ? `&origin=${encodeURIComponent(location.origin)}` : "";
  const q = preview
    ? `autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${key}&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1${origin}`
    : "autoplay=1&playsinline=1&rel=0&modestbranding=1";
  return `https://www.youtube-nocookie.com/embed/${key}?${q}`;
}

/* ---- sound: one shared setting, Netflix style. Trailers always start muted
   (browsers block autoplay with sound) and unmute once playing if it's on ---- */
let trailerSound = false;

const SPEAKER_OFF = `<svg class="ic-off" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const SPEAKER_ON = `<svg class="ic-on" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;

// a span, not a <button>: these sit inside the movie links
function soundButton(extra){
  return `<span class="sound-btn ${extra || ""}" role="button" tabindex="0" aria-label="Trailer sound" aria-pressed="${trailerSound}">${SPEAKER_OFF}${SPEAKER_ON}</span>`;
}

function ytCommand(frame, func, args){
  if (frame && frame.contentWindow) frame.contentWindow.postMessage(JSON.stringify({ event: "command", func, args: args || [] }), "*");
}

function applySound(frame){
  if (trailerSound){ ytCommand(frame, "unMute"); ytCommand(frame, "setVolume", [100]); }
  else ytCommand(frame, "mute");
}

function setTrailerSound(on){
  trailerSound = on;
  document.querySelectorAll(".trailer-frame.on").forEach(applySound);
  document.querySelectorAll(".sound-btn").forEach(b => b.setAttribute("aria-pressed", String(on)));
}

/* a click on the speaker must not follow the movie link it sits in */
document.addEventListener("click", e => {
  const b = e.target.closest(".sound-btn");
  if (!b) return;
  e.preventDefault();
  e.stopPropagation();
  setTrailerSound(!trailerSound);
}, true);
document.addEventListener("keydown", e => {
  const b = e.target.closest && e.target.closest(".sound-btn");
  if (b && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); setTrailerSound(!trailerSound); }
});

/* YouTube reports its state by postMessage; show the frame only once it's really playing,
   so its play button / title bar never show (if autoplay is blocked it just stays hidden) */
window.addEventListener("message", e => {
  if (!/youtube(-nocookie)?\.com$/.test(new URL(e.origin || "http://x").hostname)) return;
  let data;
  try{ data = typeof e.data === "string" ? JSON.parse(e.data) : e.data; }catch(err){ return; }
  const frame = [...document.querySelectorAll(".trailer-frame")].find(f => f.contentWindow === e.source);
  if (!frame || !data) return;
  frame.dataset.talking = "1";
  // two message shapes say "playing": infoDelivery {playerState:1} and onStateChange {info:1}
  const state = data.event === "onStateChange" ? data.info : data.info && data.info.playerState;
  if (state === 1 && !frame.classList.contains("on")) revealTrailer(frame);
});

function revealTrailer(frame){
  frame.classList.add("on");
  const host = frame.parentElement;
  if (host) host.classList.add("trailer-playing");
  if (host && !host.querySelector(".sound-btn")) host.insertAdjacentHTML("beforeend", soundButton("card-sound"));
  applySound(frame);
}

/* covers the host like background-size:cover */
function playTrailer(host, key){
  if (!host || !key) return;
  stopTrailer(host);
  const r = host.getBoundingClientRect();
  const h = Math.max(r.height, r.width * 9 / 16) * 1.35; // zoomed so YouTube's title bar and corners fall outside
  const frame = document.createElement("iframe");
  frame.className = "trailer-frame";
  frame.allow = "autoplay; encrypted-media; picture-in-picture";
  frame.tabIndex = -1;
  frame.setAttribute("aria-hidden", "true");
  frame.style.width = (h * 16 / 9) + "px";
  frame.style.height = h + "px";
  frame.addEventListener("load", () => {
    // ask YouTube to start reporting; repeat until it answers
    let tries = 0;
    const hello = () => {
      if (!frame.isConnected || frame.dataset.talking || tries++ > 20) return;
      frame.contentWindow.postMessage(JSON.stringify({ event: "listening", id: key, channel: "widget" }), "*");
      ytCommand(frame, "addEventListener", ["onStateChange"]);
      setTimeout(hello, 250);
    };
    hello();
    // if YouTube never talks back at all, fall back to just showing it
    setTimeout(() => { if (frame.isConnected && !frame.dataset.talking) revealTrailer(frame); }, 6000);
  });
  frame.src = trailerUrl(key, true);
  host.insertBefore(frame, host.firstChild);
}

function stopTrailer(host){
  if (!host) return;
  host.querySelectorAll(".trailer-frame").forEach(f => f.remove());
  host.querySelectorAll(".card-sound").forEach(b => b.remove());
  host.classList.remove("trailer-playing");
}

/* desktop: hover any card with data-trailer for 0.6s to preview it */
function setupHoverTrailers(){
  if (!canHover()) return;
  let timer = null, active = null;
  const stop = () => {
    clearTimeout(timer);
    if (active) stopTrailer(active.querySelector(".trailer-host") || active);
    active = null;
  };
  document.addEventListener("pointerover", e => {
    const card = e.target.closest("[data-trailer]");
    if (!card || card === active) return;
    stop();
    active = card;
    timer = setTimeout(() => {
      const host = card.classList.contains("trailer-host") ? card : card.querySelector(".trailer-host");
      playTrailer(host, card.dataset.trailer);
    }, 600);
  });
  document.addEventListener("pointerout", e => {
    if (!active || (e.relatedTarget && active.contains(e.relatedTarget))) return;
    stop();
  });
}

/* full trailer with sound, in a popup (movie page button) */
function openTrailerModal(key){
  const modal = document.createElement("div");
  modal.className = "modal-backdrop open trailer-modal";
  modal.innerHTML = `<div class="trailer-box"><button class="trailer-close" aria-label="Close">✕</button>
    <iframe src="${trailerUrl(key, false)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
  const close = () => modal.remove();
  modal.addEventListener("click", e => { if (e.target === modal || e.target.closest(".trailer-close")) close(); });
  document.addEventListener("keydown", function esc(e){ if (e.key === "Escape"){ close(); document.removeEventListener("keydown", esc); } });
  document.body.appendChild(modal);
}

function renderShelves(){
  const el = document.getElementById("shelves");
  if (!el) return;
  const shelf = (title, list) => `
    <section class="shelf">
      <h2>${title}</h2>
      <div class="shelf-row">
        ${list.map(m => `
          <a class="wide-card" href="main.html?id=${m.id}" data-trailer="${m.trailer}">
            <div class="wide-art trailer-host" style="background-image:url('${m.backdrop}')"></div>
            <div class="wide-title">${escapeHtml(m.title)}</div>
            <div class="wide-meta">${ratingBadge(m)} ${fmtRuntime(m.runtime)} · <span class="price-tag">${formatPrice(hallOf(m).priceGbp)}</span></div>
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
  document.getElementById("detailSlots").textContent = hall.name;
  document.getElementById("detailDesc").textContent = movie.overview || "";
  const metaEl = document.getElementById("detailMeta");
  priceRenderers.push(() => { metaEl.innerHTML = `${ratingBadge(movie)} ${escapeHtml(movieMeta(movie))}`; });
  document.getElementById("detailBackdrop").style.backgroundImage = `url('${movie.backdrop}')`;
  document.getElementById("trailerBtn").addEventListener("click", () => openTrailerModal(movie.trailer));
  const priceEl = document.getElementById("detailPrice");
  priceRenderers.push(() => { priceEl.textContent = `${formatPrice(hall.priceGbp)} per seat`; });

  // showtimes
  let chosenTime = null;
  const timesEl = document.getElementById("showtimes");
  const paintTimes = () => {
    timesEl.querySelectorAll(".showtime-btn").forEach(b => { b.textContent = displayTime(b.dataset.time); });
    document.getElementById("showtimeZone").textContent = tzLabel() === "UK" ? "UK time" : "Malaysia time";
  };
  timesEl.innerHTML = movie.times.map(t => `<button class="showtime-btn" data-time="${t}"></button>`).join("");
  paintTimes();
  priceRenderers.push(paintTimes);
  timesEl.querySelectorAll(".showtime-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      timesEl.querySelectorAll(".showtime-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      chosenTime = btn.dataset.time;
      updateCta();
    });
  });

  // seat map — imax rows got curves, standard rows stay flat.
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

  // TnC tick to allow continue payment
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

  // ticket types: Kawaii / Kawaii Babies counts are picked, Stinki is the rest
  const typeCount = { kawaii: 0, babies: 0 };
  const typesSection = document.getElementById("typesSection");
  const typesEl = document.getElementById("ticketTypes");
  const stinkiCount = () => chosenSeats.length - typeCount.kawaii - typeCount.babies;
  // seats in order get Stinki first, then Kawaii, then Kawaii Babies
  const seatTypes = () => chosenSeats.map((_, i) =>
    i < stinkiCount() ? "stinki" : i < stinkiCount() + typeCount.kawaii ? "kawaii" : "babies");
  const seatGbps = () => seatTypes().map(id => hall.priceGbp * ticketType(id).pay);
  const totalGbp = () => seatGbps().reduce((a, b) => a + b, 0);
  function fitTypes(){ // seats removed: take back from Babies, then Kawaii
    while (stinkiCount() < 0){
      if (typeCount.babies) typeCount.babies--; else typeCount.kawaii--;
    }
  }
  function renderTypes(){
    typesSection.hidden = !chosenSeats.length;
    typesEl.innerHTML = TICKET_TYPES.map(t => {
      const count = t.id === "stinki" ? stinkiCount() : typeCount[t.id];
      const controls = t.id === "stinki"
        ? `<span class="type-count">${count}</span>`
        : `<button type="button" class="type-btn" data-type="${t.id}" data-d="-1" ${count ? "" : "disabled"} aria-label="One less ${t.name}">−</button>
           <span class="type-count">${count}</span>
           <button type="button" class="type-btn" data-type="${t.id}" data-d="1" ${stinkiCount() ? "" : "disabled"} aria-label="One more ${t.name}">+</button>`;
      return `<div class="type-row">
        <div><div class="type-name">${t.name}</div><div class="type-note">${t.note} · ${formatPrice(hall.priceGbp * t.pay)}</div></div>
        <div class="type-ctrl">${controls}</div></div>`;
    }).join("");
  }
  typesEl.addEventListener("click", e => {
    const b = e.target.closest(".type-btn");
    if (!b || b.disabled) return;
    typeCount[b.dataset.type] += Number(b.dataset.d);
    updateCta();
  });

  function updateCta(){
    fitTypes();
    renderTypes();
    const summary = document.getElementById("ctaSummary");
    const btn = document.getElementById("ctaButton");
    const n = chosenSeats.length;
    // babies can't watch alone: at least one Stinki or Kawaii has to come with them
    if (typeCount.babies && stinkiCount() + typeCount.kawaii === 0){
      summary.textContent = "Kawaii Babies need a grown-up! Add a Stinki or Kawaii ticket to come with them.";
      btn.disabled = true;
      return;
    }
    if (chosenTime && n){
      const full = n === MAX_SEATS ? ` (max ${MAX_SEATS})` : "";
      summary.textContent = `${movieLabel(movie)} · ${displayTime(chosenTime)} ${tzLabel()} · ${n > 1 ? "Seats" : "Seat"} ${chosenSeats.join(", ")}${full} · ${formatTotal(seatGbps())}`;
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
      types: seatTypes(),
      hallId: movie.hall,
      hall: hall.name,
      priceGbp: hall.priceGbp,
      totalGbp: totalGbp()
    };
    localStorage.setItem("pawnchies_booking", JSON.stringify(booking));
    location.href = "money.html";
  }
}

/* ---------------- money.html ---------------- */
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
  // older drafts have no types/GBP prices: treat them as full-price standard seats
  const types = booking.types || seats.map(() => "stinki");
  const priceGbp = booking.priceGbp || HALLS.h1.priceGbp;
  const seatGbp = types.map(id => priceGbp * ticketType(id).pay);
  const totalGbp = booking.totalGbp != null ? booking.totalGbp : seatGbp.reduce((a, b) => a + b, 0);
  const seatText = `${seats.length > 1 ? "Seats" : "Seat"} ${seats.join(", ")}`;

  document.getElementById("paySummaryMovie").textContent = booking.movieCode;
  const typeLines = () => TICKET_TYPES
    .map(t => ({ t, n: types.filter(id => id === t.id).length }))
    .filter(x => x.n)
    .map(x => `${x.n}× ${x.t.name} ${formatTotal(Array(x.n).fill(priceGbp * x.t.pay))}`)
    .join(" · ");
  priceRenderers.push(() => {
    document.getElementById("paySummaryDetails").textContent = `${displayTime(booking.time)} ${tzLabel()} · ${seatText} · ${booking.hall}`;
    document.getElementById("payTypes").textContent = typeLines();
    // tax is already inside the price; show the split like a real receipt
    const amount = seatGbp.reduce((sum, g) => sum + seatAmount(g), 0);
    const tx = taxLines(amount);
    document.getElementById("payTax").innerHTML =
      `<span>Subtotal</span><span>${tx.net}</span><span>${tx.name} ${tx.pct}% (incl.)</span><span>${tx.tax}</span><b>Total</b><b>${tx.total}</b>`;
  });

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
      payAmount.textContent = `Pay ${formatPrice(0)}`;
    } else {
      cardFields.style.display = "block";
      payAmount.textContent = `Pay ${formatTotal(seatGbp)} with Kawaii Bank`;
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
  const payName = document.getElementById("payName");
  payName.addEventListener("input", validateForm);
  const nameOk = () => payName.value.trim().length > 0;
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
      payBtn.disabled = !(emailOk() && nameOk());
      return;
    }
    const numOk = cardNumber.value.replace(/\D/g, "").length === 16;
    const expOk = /^\d{2}\/\d{2}$/.test(cardExpiry.value);
    const cvvOk = cardCvv.value.length === 3;
    payBtn.disabled = !(numOk && expOk && cvvOk && emailOk() && nameOk());
  }
  refreshPrices(); // summary, type breakdown and pay button

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
    ticket.email = email || null; // before sending: the emailed link must carry it for the gift
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
      // currency, time zone and rating country all follow the home-page choice, frozen at payment
      currency: getCurrency(),
      rating: movie.ratings ? ratingOf(movie) : "",
      ratingCountry: getCurrency() === "GBP" ? "uk" : "my",
      time: booking.time,
      seats: seats,
      types: types,
      hallId: booking.hallId || null,
      hall: booking.hall,
      seatPrices: seatGbp.map(g => formatPrice(free ? 0 : g)),
      total: formatTotal(free ? [0] : seatGbp),
      tax: taxLines(free ? 0 : seatGbp.reduce((sum, g) => sum + seatAmount(g), 0)),
      name: payName.value.trim(),
      payMethod: free ? "Cash" : "Kawaii Bank",
      cardLast4: free ? null : cardNumber.value.replace(/\D/g, "").slice(-4),
      numbers: seats.map(() => nextTicketNumber()),
      codes: types.map(id => ticketType(id).code),
      issuedAt: now.toISOString(),
      issued: now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
    };
  }
}

/* ---------------- ticket.html ---------------- */
/* tickets saved before the e-ticket format get filled in so they still render */
function upgradeTicket(t){
  const seats = t.seats || [t.seat];
  if (t.v !== 2){
    const code = String(t.movieCode || "");
    const movie = MOVIES.find(m => movieLabel(m) === code || m.id === code.split(" ")[0].toLowerCase()) || {};
    t = Object.assign({}, t, {
      v: 2, movieId: movie.id, title: movie.title || code, runtime: movie.runtime,
      numbers: seats.map((_, i) => i + 1),
      codes: seats.map((_, i) => `PAWN-${t.ticketNo || "OLD"}-${i + 1}`),
      issuedAt: new Date().toISOString()
    });
  }
  // fill anything older tickets didn't store
  return Object.assign({ seats, types: seats.map(() => "stinki"), seatPrices: seats.map(() => t.seatPrice || t.total || "—") }, t, { seats });
}

/* average glyph width (em) of each poster font, so titles can be sized to fit */
const TITLE_FONT_WIDTH = {
  "Cormorant Garamond": 0.48, "Archivo Black": 0.72, "Noto Serif JP": 1.0, "Cinzel": 0.72,
  "Montserrat": 0.66, "Anton": 0.46, "Bebas Neue": 0.42, "Josefin Sans": 0.56,
  "Playfair Display": 0.56, "Cormorant SC": 0.6
};

function eticketHtml(t, i){
  const movie = getMovie(t.movieId) || {};
  const win = showWindow(t.time, t.runtime, new Date(t.issuedAt));
  // the stub follows the currency picked on the home page when it was bought
  // older tickets didn't store the currency: read it off the price so price and time zone agree
  const currency = t.currency || (/^£/.test(t.seatPrices[i] || t.total) ? "GBP" : /^RM/.test(t.seatPrices[i] || t.total) ? "MYR" : null);
  const zone = currency === "GBP" ? "uk" : currency === "MYR" ? "my" : null;
  const timeLabel = zone === "uk" ? "TIME (UK)" : zone === "my" ? "TIME (MYT)" : "TIME (UK/MYT)";
  const timeLines = zone === "uk" ? [win.uk] : zone === "my" ? [win.myt] : [win.uk, win.myt];
  const rating = t.rating || (movie.ratings ? ratingOf(movie, t.ratingCountry || (zone === "uk" ? "uk" : "my")) : "U");
  // use the hall's current name, so renaming a placeholder hall updates old tickets too
  const hallName = ((HALLS[t.hallId] && HALLS[t.hallId].name) || t.hall).replace(/\s*\(placeholder\)/i, "").toUpperCase();
  const type = ticketType(t.types[i]);
  const price = t.seatPrices[i];
  // title sits in the ~36cqw left of the poster, wrapping onto up to three lines
  const font = movie.titleFont || "Bebas Neue";
  const fw = TITLE_FONT_WIDTH[font] || 0.6;
  const longest = Math.max(...t.title.split(/\s+/).map(w => w.length), 2);
  const titleSize = Math.min(9.5, 34 / (longest * fw)).toFixed(2);
  const art = movie.poster || movie.backdrop || "";
  const metal = type.metal;
  const code = type.code; // the barcode name belongs to the ticket type
  return `
  <article class="eticket-pair">
    <p class="eticket-count">Ticket ${i + 1} of ${t.seats.length} · ${type.name}</p>
    <div class="eticket-scroll"><div class="eticket front">
      <div class="et-art">
        <div class="et-art-fill" style="background-image:url('${art}')"></div>
        <img class="et-poster" src="${art}" alt="">
        <div class="et-hallseat">${escapeHtml(hallName)} • SEAT #${escapeHtml(t.seats[i])}</div>
        <h3 class="et-title" style="font-family:'${font}',serif;font-weight:${["Anton", "Bebas Neue", "Archivo Black"].includes(font) ? 400 : 700};font-size:${titleSize}cqw">${escapeHtml(t.title)}</h3>
      </div>
      <div class="et-strip"><span>RATING: ${escapeHtml(rating)}</span></div>
      <div class="et-stub">
        <div><span>TICKET PRICE</span><b>${escapeHtml(price)}</b><em>${escapeHtml(type.name.toUpperCase())}</em></div>
        <div><span>DATE ISSUED</span><b>${escapeHtml(t.issued)}</b></div>
        ${t.name ? `<div><span>PURCHASED BY</span><b>${escapeHtml(t.name.toUpperCase())}</b></div>` : ""}
        <div><span>${timeLabel}</span>${timeLines.map(l => `<b>${escapeHtml(l)}</b>`).join("")}</div>
      </div>
    </div></div>
    <div class="eticket-scroll"><div class="eticket back">
      <div class="et-metal ${metal}">
        <!-- just the barcode on the strip (it still encodes the ticket type's name) -->
        <img class="et-barcode-img" data-code="${escapeHtml(code)}" alt="Barcode ${escapeHtml(code)}">
      </div>
      <div class="et-terms">
        <h4>PAWNCHINEMA TERMS AND CONDITIONS</h4>
        ${TNC_RULES.map(r => `<p>${escapeHtml(r)}</p>`).join("")}
      </div>
    </div></div>
  </article>`;
}

/* ---------------- secret anniversary gift ----------------
   Only shows when the ticket was emailed to one of these addresses.
   Testing: put your own email here first, then swap in hers. */
const GIFT_EMAILS = ["kya20130@gmail.com", "thejuliette69@gmail.com"]; // hers + your test email

/* the letter inside the paper plane — each string is one paragraph */
const GIFT_LETTER = {
  title: "Happy 2 months, Kyshies 💕",
  body: [
    "[Placeholder letter] Two months of movie nights across two time zones, and every single one still feels like the first.",
    "Thank you for staying up late, waking up early, and always saving me the seat next to you.",
    "Here's to many more tickets together."
  ],
  sign: "— Mr. Stinki"
};

function isGiftTicket(t){
  return !!(t && t.email && GIFT_EMAILS.some(e => e.trim().toLowerCase() === t.email.trim().toLowerCase()));
}

function setupGift(ticket){
  if (!isGiftTicket(ticket)) return;
  // a little button stays on the page so the gift can be reopened
  const again = document.createElement("button");
  again.className = "gift-again";
  again.type = "button";
  again.textContent = "Your gifties";
  again.addEventListener("click", openGift);
  document.querySelector(".topbar").appendChild(again); // sits on the right of the header

  // pop up on its own once per ticket
  const seenKey = "pawnchies_gift_seen_" + (ticket.issuedAt || "");
  try{ if (localStorage.getItem(seenKey)) return; localStorage.setItem(seenKey, "1"); }catch(e){}
  setTimeout(openGift, 900);
}

/* step 1: gift popup -> step 2: paper plane flies in -> step 3: letter opens */
function openGift(){
  if (document.querySelector(".gift-layer")) return;
  const layer = document.createElement("div");
  layer.className = "gift-layer";
  layer.innerHTML = `
    <div class="gift-pop">
      <img src="assets/gift-qoobee.gif" alt="">
      <h3>You got a new gifties!</h3>
      <button class="pick-btn gift-claim" type="button">Claim your gift</button>
    </div>`;
  document.body.appendChild(layer);
  layer.querySelector(".gift-claim").addEventListener("click", () => flyPlane(layer));
}

function flyPlane(layer){
  layer.querySelector(".gift-pop").classList.add("leave");
  const stage = document.createElement("div");
  stage.className = "plane-stage";
  // one path in real screen pixels: the trail draws it and the plane flies it (offset-path),
  // so they always line up, on a phone or a big screen
  const w = window.innerWidth, h = window.innerHeight;
  const cx = w / 2, cy = h / 2;
  const d = `M ${-0.08 * w} ${0.88 * h} C ${0.2 * w} ${0.1 * h}, ${0.42 * w} ${0.95 * h}, ${0.62 * w} ${0.42 * h}` +
            ` S ${0.95 * w} ${0.12 * h}, ${cx} ${cy}`;
  stage.innerHTML = `
    <svg class="plane-trail" viewBox="0 0 ${w} ${h}" aria-hidden="true">
      <defs><mask id="trailReveal" maskUnits="userSpaceOnUse"><path class="trail-reveal" d="${d}" /></mask></defs>
      <path class="trail-line" d="${d}" mask="url(#trailReveal)" />
    </svg>
    <div class="plane">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M4 30 L60 6 L40 58 L30 38 Z" fill="#fff"/>
        <path d="M30 38 L60 6 L22 34 Z" fill="#e7e2d6"/>
        <path d="M30 38 L34 50 L40 58 Z" fill="#cfc8b8"/>
      </svg>
    </div>`;
  layer.appendChild(stage);
  // each frame reads the plane's spot straight off the trail's own path, so the two
  // can't drift apart in any browser (CSS offset-path lands a bit differently per browser)
  const plane = stage.querySelector(".plane");
  const reveal = stage.querySelector(".trail-reveal");
  const len = reveal.getTotalLength();
  reveal.style.strokeDasharray = `${len} ${len}`;
  reveal.style.strokeDashoffset = len;
  const DURATION = 2600;
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const start = performance.now();
  function frame(now){
    const t = Math.min(1, (now - start) / DURATION), e = ease(t), at = len * e;
    const p = reveal.getPointAtLength(at);
    const ahead = reveal.getPointAtLength(Math.min(len, at + 1)), behind = reveal.getPointAtLength(Math.max(0, at - 1));
    const angle = Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180 / Math.PI + 45; // svg nose points up-right
    const scale = 0.7 + 0.7 * e;
    plane.style.transform = `translate(${p.x - 32}px, ${p.y - 32}px) rotate(${angle}deg) scale(${scale})`;
    reveal.style.strokeDashoffset = len - at; // trail drawn up to the plane
    if (t < 1) requestAnimationFrame(frame);
    else openLetter(layer, stage); // plane lands in the middle, then unfolds into the letter
  }
  requestAnimationFrame(frame);
}

/* the letter (title + paragraphs) is capped at 5000 characters so it always fits the layout */
const GIFT_LETTER_MAX = 5000;
function capLetter(letter){
  let left = GIFT_LETTER_MAX - letter.title.length;
  const body = [];
  for (const p of letter.body){
    if (left <= 0) break;
    body.push(p.length > left ? p.slice(0, Math.max(0, left - 1)).trimEnd() + "…" : p);
    left -= p.length;
  }
  return { title: letter.title.slice(0, GIFT_LETTER_MAX), body };
}

function openLetter(layer, stage){
  stage.classList.add("landed");
  const letter = document.createElement("div");
  letter.className = "gift-letter";
  // text scrolls inside its own box so roses, close button and Qoobee never cover it
  const { title, body } = capLetter(GIFT_LETTER);
  letter.innerHTML = `
    <button class="gift-close" type="button" aria-label="Close">✕</button>
    <div class="gift-letter-text">
      <h3>${escapeHtml(title)}</h3>
      ${body.map(p => `<p>${escapeHtml(p)}</p>`).join("")}
      <p class="gift-sign">${escapeHtml(GIFT_LETTER.sign)}</p>
    </div>`;
  letter.insertAdjacentHTML("beforeend", `<img class="gift-rose-qoobee" src="assets/qoobee-rose.gif" alt="">`);
  setTimeout(() => {
    stage.remove();
    // the faded-out popup still took up room in the layer and squashed the letter
    // sideways on phones, so take it out completely before the letter goes in
    const pop = layer.querySelector(".gift-pop");
    if (pop) pop.remove();
    layer.appendChild(letter);
    rosesBloom(letter);
    petalShower(layer);
  }, 450);
  const close = () => layer.remove(); // petals live inside the layer, so they go too
  letter.addEventListener("click", e => { if (e.target.closest(".gift-close")) close(); });
}

/* flowers since there were no real ones today: petals fall the whole time the letter is open */
const PETAL_COLOURS = ["#e8456b", "#ff7a9a", "#c9184a", "#ffb3c6", "#d6336c"];

function petalSvg(colour){
  return `<svg viewBox="0 0 20 24" aria-hidden="true"><path d="M10 1 C17 6 19 14 10 23 C1 14 3 6 10 1 Z" fill="${colour}"/><path d="M10 4 C12 10 12 16 10 21" stroke="rgba(255,255,255,.35)" stroke-width="1" fill="none"/></svg>`;
}

function roseSvg(colour){
  return `<svg viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="17" fill="${colour}"/>
    <path d="M20 6 C29 9 31 20 22 25 C14 29 9 20 15 15 C19 12 25 15 23 20" stroke="rgba(0,0,0,.22)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M9 30 C3 34 2 38 6 39 C11 38 13 34 12 30 Z" fill="#3f7d4e"/>
    <path d="M31 30 C37 34 38 38 34 39 C29 38 27 34 28 30 Z" fill="#3f7d4e"/>
  </svg>`;
}

function petalShower(layer){
  const box = document.createElement("div");
  box.className = "petal-shower";
  for (let i = 0; i < 26; i++){
    const el = document.createElement("span");
    el.className = "petal" + (i % 6 === 0 ? " rose" : "");
    const colour = PETAL_COLOURS[i % PETAL_COLOURS.length];
    el.innerHTML = i % 6 === 0 ? roseSvg(colour) : petalSvg(colour);
    const size = i % 6 === 0 ? 26 + Math.random() * 14 : 12 + Math.random() * 12;
    el.style.cssText = `left:${Math.random() * 100}vw;width:${size}px;height:${size * 1.2}px;` +
      `--sway:${(Math.random() * 2 - 1) * 90}px;--spin:${360 + Math.random() * 540}deg;` +
      `animation-duration:${6 + Math.random() * 6}s;animation-delay:${-Math.random() * 8}s;`;
    box.appendChild(el);
  }
  layer.insertBefore(box, layer.firstChild); // behind the letter
}

function rosesBloom(letter){
  const row = document.createElement("div");
  row.className = "rose-row";
  row.innerHTML = [0, 1, 2, 3, 4].map(i => `<span style="animation-delay:${0.2 + i * 0.12}s">${roseSvg(PETAL_COLOURS[i])}</span>`).join("");
  letter.prepend(row);
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
    document.querySelector(".ticket-actions").hidden = true;
    document.getElementById("ticketList").innerHTML = `
      <div class="ticket-empty">
        <img src="assets/okay.gif" alt="">
        <h2>No ticket yet</h2>
        <p>Please buy a ticket first so you can see it here.</p>
        <a class="pick-btn" href="index.html#browse-section">Browse movies</a>
      </div>`;
    return;
  }
  ticket = upgradeTicket(ticket);

  document.getElementById("ticketList").innerHTML = ticket.seats.map((_, i) => eticketHtml(ticket, i)).join("");
  const row = (label, value, cls) => `<div class="rc-row ${cls || ""}"><span>${label}</span><b>${escapeHtml(value)}</b></div>`;
  document.getElementById("ticketSummary").innerHTML = `
    <h3>Receipt</h3>
    ${ticket.name ? row("Purchased by", ticket.name) : ""}
    ${row("Movie", ticket.title)}
    ${row(ticket.seats.length > 1 ? "Seats" : "Seat", ticket.seats.join(", "))}
    ${row("Tickets", typeBreakdown(ticket.types))}
    ${row("Paid with", ticket.payMethod + (ticket.cardLast4 ? " ····" + ticket.cardLast4 : ""))}
    ${ticket.tax ? row("Subtotal", ticket.tax.net, "rc-sub") + row(`${ticket.tax.name} ${ticket.tax.pct}% (incl.)`, ticket.tax.tax) : ""}
    ${row("Total", ticket.total, "rc-total")}`;

  // barcode: drawn on a canvas, turned upright on a second canvas, shown as a plain image.
  // No SVG sizing or CSS rotation, which iOS Safari kept cutting in half.
  if (window.JsBarcode){
    document.querySelectorAll(".et-barcode-img").forEach(img => {
      const flat = document.createElement("canvas");
      JsBarcode(flat, img.dataset.code, { format: "CODE128", displayValue: false, margin: 0, height: 420, width: 3, background: "transparent", lineColor: "#141008" });
      const up = document.createElement("canvas");
      up.width = flat.height;
      up.height = flat.width;
      const ctx = up.getContext("2d");
      ctx.translate(up.width, 0);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(flat, 0, 0);
      img.src = up.toDataURL("image/png");
    });
  }

  document.getElementById("printTicket").addEventListener("click", () => window.print());
  setupGift(ticket);

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

/* ---------------- testing: fresh ticket history on every deploy ----------------
   While testing, each new push to main wipes the saved ticket and restarts the
   000001 numbering. When it's time to "launch movie ticket history", set this
   to true and tickets will be kept across deploys. */
const KEEP_TICKET_HISTORY = false;

async function resetHistoryOnNewDeploy(){
  if (KEEP_TICKET_HISTORY) return;
  try{
    // GitHub Pages gives app.js a new ETag / Last-Modified on every deploy
    const res = await fetch("app.js", { method: "HEAD", cache: "no-store" });
    const version = res.headers.get("ETag") || res.headers.get("Last-Modified");
    if (!version) return;
    if (localStorage.getItem("pawnchies_build") !== version){
      ["pawnchies_ticket", "pawnchies_ticket_seq"].forEach(k => localStorage.removeItem(k));
      localStorage.setItem("pawnchies_build", version);
    }
  }catch(e){ /* offline or opened as a file: leave history alone */ }
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
  setupHoverTrailers();
  renderTeam();
  renderAbout();
  setupTabToggle();
  setupCurrencySelect();
  setupSplash();
  initMoviePage();
  initPaymentPage();
  resetHistoryOnNewDeploy().then(initTicketPage); // ticket page waits so it never flashes a wiped ticket

  // re-render once a fresh live rate arrives (first visit starts on the fallback rate)
  loadRate().then(changed => { if (changed) refreshPrices(); });
});
