/* =====================================================================
   MOVIE DATA — edit this array to add/remove movies.
   id must be unique and lowercase (m1, m2, m3...). Code shown on site
   is just id.toUpperCase(), so "m1" displays as "M1".
   slotsLeft is just a display number — edit it directly, or compute it
   from the seat map if you want it to be fully accurate.
   hall must be one of the HALLS keys below.
   ===================================================================== */
const SHOW_TITLES = false; // true = show film names instead of M1, M2...

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
  { id: "m1", title: "Burning", year: 2018, hall: "h1", times: ["6:30 PM", "9:30 PM"], slotsLeft: 14,
    poster: "https://image.tmdb.org/t/p/w500/kXiF80o74fE9gf3Utf9moAI7ar0.jpg",
    overview: "A part-time courier runs into a girl from his old neighbourhood, who asks him to feed her cat while she travels. When she comes back with a wealthy, enigmatic man and then disappears, his suspicion grows." },
  { id: "m2", title: "Bodies Bodies Bodies", year: 2022, hall: "h2", times: ["7:00 PM", "9:15 PM"], slotsLeft: 32,
    poster: "https://image.tmdb.org/t/p/w500/hSuTjDmqRdy7Dii8ymnF2WILTeP.jpg",
    overview: "A group of wealthy twenty-somethings throw a hurricane party at a remote mansion and play a murder game. When one of them turns up dead, paranoia and accusations take over the night." },
  { id: "m3", title: "Your Name", year: 2016, hall: "h1", times: ["6:00 PM", "8:30 PM"], slotsLeft: 6,
    poster: "https://image.tmdb.org/t/p/w500/vfJFJPepRKapMd5G2ro7klIRysq.jpg",
    overview: "A country girl in Japan and a boy in Tokyo start swapping bodies in their sleep. As they learn each other's lives through notes, they try to find each other, and a bigger secret comes out." },
  { id: "m4", title: "Wolfwalkers", year: 2020, hall: "imax", times: ["5:30 PM", "8:00 PM"], slotsLeft: 21,
    poster: "https://image.tmdb.org/t/p/w500/vqGiNbdc2sDwsnivMMYzwAoSSu6.jpg",
    overview: "In 17th-century Ireland, a young apprentice hunter arrives with her father to wipe out the last wolf pack. In the forest she befriends a free-spirited girl who can turn into a wolf." },
  { id: "m5", title: "Parasite", year: 2019, hall: "h1", times: ["7:30 PM", "10:00 PM"], slotsLeft: 9,
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    overview: "A struggling family gets themselves hired by a wealthy household one by one, posing as unrelated and qualified workers. Things go wrong as the two families' lives get tangled together." },
  { id: "m6", title: "Hit Man", year: 2024, hall: "h2", times: ["6:45 PM", "9:15 PM"], slotsLeft: 27,
    poster: "https://image.tmdb.org/t/p/w500/oil3EZwKFp3CWxZnfGfGglesvm9.jpg",
    overview: "A mild-mannered professor moonlights as a fake hit man in police stings. He falls for a client who wants her husband dead, and the line between his act and reality starts to blur." },
  { id: "m7", title: "Novocaine", year: 2025, hall: "imax", times: ["7:15 PM", "9:45 PM"], slotsLeft: 18,
    poster: "https://image.tmdb.org/t/p/w500/xmMHGz9dVRaMY6rRAlEX4W0Wdhm.jpg",
    overview: "A bank assistant manager who can't feel physical pain is pulled into a robbery when the girl he likes is taken hostage. He turns his condition into his advantage." },
  { id: "m8", title: "Companion", year: 2025, hall: "h1", times: ["6:15 PM", "8:45 PM"], slotsLeft: 11,
    poster: "https://image.tmdb.org/t/p/w500/oCoTgC3UyWGfyQ9thE10ulWR7bn.jpg",
    overview: "Iris heads to a lake house with her boyfriend and his friends for a weekend away, and finds out something about their relationship that she was never meant to know." },
  { id: "m9", title: "Strange Darling", year: 2024, hall: "h2", times: ["8:00 PM", "10:15 PM"], slotsLeft: 24,
    poster: "https://image.tmdb.org/t/p/w500/kWNCRgt3ocv19bYO0sk7TRuZuFY.jpg",
    overview: "A one-night stand turns into a night of violence, told out of order in six chapters." },
  { id: "m10", title: "Heretic", year: 2024, hall: "imax", times: ["7:45 PM", "10:00 PM"], slotsLeft: 5,
    poster: "https://image.tmdb.org/t/p/w500/fr96XzlzsONrQrGfdLMiwtQjott.jpg",
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
  return m.poster ? `<img src="${m.poster}" alt="${m.id.toUpperCase()} poster" loading="lazy">` : `<div class="poster-ph"></div>`;
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

  scrollBox.addEventListener("scroll", () => {
    const atBottom = scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 8;
    if (atBottom){
      agreeCheck.disabled = false;
      scrollHint.style.display = "none";
    }
  });
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
      agreeCheck.checked = false;
      agreeCheck.disabled = true;
      tncConfirm.disabled = true;
      scrollHint.style.display = "block";
      modal.classList.add("open");
      return;
    }
    proceedToTicket();
  });

  function proceedToTicket(){
    // this is a *booking draft* — not the final ticket yet, money.html
    // adds the payment method and turns it into the real ticket
    const booking = {
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

  function validateForm(){
    const method = currentMethod();
    if (method === "cash"){
      payBtn.disabled = false;
      return;
    }
    const numOk = cardNumber.value.replace(/\D/g, "").length === 16;
    const expOk = /^\d{2}\/\d{2}$/.test(cardExpiry.value);
    const cvvOk = cardCvv.value.length === 3;
    payBtn.disabled = !(numOk && expOk && cvvOk);
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
    setTimeout(() => {
      const src = okayBlob ? URL.createObjectURL(okayBlob) : OKAY_GIF;
      loader.innerHTML = `<img class="splash-okay" src="${src}" alt=""><p>Payment done!</p>`;
      payBtn.textContent = "Paid!";
      setTimeout(issueTicket, OKAY_GIF_MS);
    }, 2600);

    function issueTicket(){
      const method = currentMethod();
      const ticket = {
        movieCode: booking.movieCode,
        time: booking.time,
        seats: seats,
        hall: booking.hall,
        total: formatPrice(method === "cash" ? 0 : totalMyr), // frozen in the currency paid
        payMethod: method === "cash" ? "Cash (Free)" : "Kawaii Bank",
        cardLast4: method === "cash" ? null : cardNumber.value.replace(/\D/g, "").slice(-4),
        ticketNo: Math.random().toString(36).slice(2, 8).toUpperCase(),
        issued: new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
      };
      localStorage.setItem("pawnchies_ticket", JSON.stringify(ticket));
      localStorage.removeItem("pawnchies_booking");
      location.href = "ticket.html";
    }
  });
}

/* ---------------- ticket / receipt page (ticket.html) ---------------- */
function initTicketPage(){
  const root = document.getElementById("ticketRoot");
  if (!root) return;
  let ticket;
  try{
    ticket = JSON.parse(localStorage.getItem("pawnchies_ticket"));
  }catch(e){ ticket = null; }
  if (!ticket){
    location.href = "index.html";
    return;
  }
  const seats = ticket.seats || [ticket.seat]; // tickets from before multi-seat
  const ADMIT = ["ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT"];
  document.getElementById("ticketAdmit").textContent = `PAWNCHINEMA · ADMIT ${ADMIT[seats.length - 1] || seats.length}`;
  document.getElementById("ticketMovie").textContent = ticket.movieCode;
  document.getElementById("ticketTime").textContent = ticket.time;
  document.getElementById("ticketSeatLabel").textContent = seats.length > 1 ? "Seats" : "Seat";
  document.getElementById("ticketSeat").textContent = seats.join(", ");
  document.getElementById("ticketHall").textContent = ticket.hall;
  document.getElementById("ticketTotal").textContent = ticket.total || "—";
  document.getElementById("ticketNo").textContent = ticket.ticketNo;
  document.getElementById("ticketDate").textContent = ticket.issued;
  document.getElementById("ticketPayMethod").textContent = ticket.payMethod +
    (ticket.cardLast4 ? ` ····${ticket.cardLast4}` : "");

  document.getElementById("printTicket").addEventListener("click", () => window.print());

  // QR code should be workies
  if (window.QRCode){
    new QRCode(document.getElementById("qrCode"), {
      text: `PAWNCHINEMA | ${ticket.movieCode} | ${ticket.time} | Seats ${seats.join(" ")} | Ticket ${ticket.ticketNo}`,
      width: 140,
      height: 140,
      colorDark: "#141008",
      colorLight: "#ffffff"
    });
  }

  // "send receipt" — SIMULATED ONLY. This does not actually send an email;
  // there's no backend here to do that. It just shows what the flow would
  // feel like. Wire up something like EmailJS later for a real send.
  const sendBtn = document.getElementById("sendReceiptBtn");
  const emailInput = document.getElementById("receiptEmail");
  const sendStatus = document.getElementById("sendStatus");
  sendBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    if (!email || !email.includes("@")){
      sendStatus.textContent = "Enter a valid email first.";
      sendStatus.style.color = "var(--danger)";
      return;
    }
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending…";
    setTimeout(() => {
      sendStatus.style.color = "var(--good)";
      sendStatus.textContent = `Receipt sent to ${email}`;
      sendBtn.disabled = false;
      sendBtn.textContent = "Send receipt";
    }, 1000);
  });
}

/* ---------------- boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  applyCachedRate();
  priceRenderers.push(renderSpotlight, renderBrowseRow);
  renderSpotlight();
  renderBrowseRow();
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
