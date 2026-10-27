/* =====================================================================
   MOVIE DATA — edit this array to add/remove movies.
   id must be unique and lowercase (m1, m2, m3...). Code shown on site
   is just id.toUpperCase(), so "m1" displays as "M1".
   slotsLeft is just a display number — edit it directly, or compute it
   from the seat map if you want it to be fully accurate.
   ===================================================================== */
const MOVIES = [
  {
    id: "m1",
    tag: null,
    poster: "https://scontent.fkul8-4.fna.fbcdn.net/v/t39.30808-6/486179701_1692592554716839_3399243460494560933_n.jpg", // ⚠️ Facebook CDN link, will expire — replace with your own hosted image
    times: ["6:30 PM", "9:00 PM"],
    slotsLeft: 14
  },
  {
    id: "m2",
    tag: "IMAX",
    poster: "https://lh4.googleusercontent.com/proxy/xDKkfqmF-3BLvdANTkqoFD9HOYzCZ2GLG1iIUQlzf5nOh9NM5sN5Yb8rh7KAHoHxJ2la6YIpn4CqbCwjZU7rLtsI250",
    times: ["TBA"],
    slotsLeft: 32
  },
  {
    id: "m3",
    tag: null,
    poster: "https://upload.wikimedia.org/wikipedia/en/e/e5/GOAT_poster.jpg",
    times: ["7:00 PM", "9:30 PM"],
    slotsLeft: 6
  },
  {
    id: "m4",
    tag: "IMAX",
    poster: "https://upload.wikimedia.org/wikipedia/en/c/c0/Heart_Eyes_%282025%29_poster.jpg",
    times: ["6:00 PM", "8:30 PM"],
    slotsLeft: 21
  }
];

const SPOTLIGHT_ID = "m1";
const HALL_NAME = "Grand Kawaii Hall 1";

/* Swap these paths once you have real photos. Put images in /assets. */
const TEAM = [
  { name: "Irfan", role: "Co-founder", photo: "assets/pich.jpg" },
  { name: "Kyshies", role: "Owner", photo: "assets/partner.jpg" },
  { name: "Plushkins & Meowchkins", role: "Snackies Inspector", photo: "assets/plushkins.jpg" }
];

const ABOUT_COPY = `
  <p>[testing]</p>
`;

/* 9 rows, G→O, so K sits exactly in the middle row.
   12 seats per row, so 6 & 7 sit exactly in the middle columns. */
const SEAT_ROWS = ["G", "H", "I", "J", "K", "L", "M", "N", "O"];
const SEATS_PER_ROW = 12;
const RESERVED_SEAT = "K6";      // Pich's permanent seat
const SWEETHEART_SEATS = ["K6", "K7"]; // the two middle seats, styled as a pair

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

function buildSeatStatus(movieId){
  const rand = seededRandom(movieId);
  const status = {}; // "A1" -> "taken" | "reserved" | "open"
  SEAT_ROWS.forEach(row => {
    for (let n = 1; n <= SEATS_PER_ROW; n++){
      const id = row + n;
      if (id === RESERVED_SEAT) status[id] = "reserved";
      else status[id] = rand() < 0.22 ? "taken" : "open";
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
      <img src="${m.poster}" alt="${m.id.toUpperCase()} poster" loading="lazy">
      <div class="code">${m.id.toUpperCase()}${m.tag ? " · " + m.tag : ""}</div>
      <div class="${slotsClass(m.slotsLeft)}">${m.slotsLeft} slots left</div>
    </a>
  `).join("");
}

function renderSpotlight(){
  const el = document.getElementById("spotlight");
  if (!el) return;
  const m = getMovie(SPOTLIGHT_ID) || MOVIES[0];
  el.innerHTML = `
    <img src="${m.poster}" alt="${m.id.toUpperCase()} poster" loading="lazy">
    <div>
      <span class="tag">THIS WEEK</span>
      <h3>${m.id.toUpperCase()}${m.tag ? " · " + m.tag : ""}</h3>
      <p>${HALL_NAME} · ${m.times.join(" / ")} · ${m.slotsLeft} slots left</p>
    </div>`;
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

/* ---------------- corner mascot ---------------- */
function setupMascot(){
  // mascot div is static HTML + CSS animation, nothing to wire up here,
  // this function exists so each page can opt in/out by including the div.
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

  document.getElementById("detailPoster").src = movie.poster;
  document.getElementById("detailCode").textContent = movie.id.toUpperCase() + (movie.tag ? " · " + movie.tag : "");
  document.getElementById("detailSlots").textContent = `${movie.slotsLeft} slots left · ${HALL_NAME}`;

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

  // seat map
  let chosenSeat = null;
  const status = buildSeatStatus(movie.id);
  const seatMap = document.getElementById("seatMap");
  seatMap.innerHTML = SEAT_ROWS.map(row => `
    <div class="seat-row">
      <span class="row-label">${row}</span>
      ${Array.from({length: SEATS_PER_ROW}, (_, i) => {
        const id = row + (i + 1);
        const s = status[id];
        const sweetheart = SWEETHEART_SEATS.includes(id) ? " sweetheart" : "";
        const label = s === "reserved" ? "P" : (i + 1);
        return `<button class="seat ${s}${sweetheart}" data-seat="${id}" ${s !== "open" ? "disabled" : ""}>${label}</button>`;
      }).join("")}
    </div>
  `).join("");
  seatMap.querySelectorAll(".seat.open").forEach(btn => {
    btn.addEventListener("click", () => {
      seatMap.querySelectorAll(".seat.selected").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      chosenSeat = btn.dataset.seat;
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
    if (chosenTime && chosenSeat){
      summary.textContent = `${movie.id.toUpperCase()} · ${chosenTime} · Seat ${chosenSeat}`;
      btn.disabled = false;
    } else {
      summary.textContent = "Pick a showtime and a seat to continue";
      btn.disabled = true;
    }
  }
  updateCta();

  document.getElementById("ctaButton").addEventListener("click", () => {
    if (!chosenTime || !chosenSeat) return;
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
      movieCode: movie.id.toUpperCase() + (movie.tag ? " · " + movie.tag : ""),
      time: chosenTime,
      seat: chosenSeat,
      hall: HALL_NAME
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

  document.getElementById("paySummaryMovie").textContent = booking.movieCode;
  document.getElementById("paySummaryDetails").textContent = `${booking.time} · Seat ${booking.seat} · ${booking.hall}`;

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
    if (method === "cash"){
      cardFields.style.display = "none";
      payAmount.textContent = "Pay RM 0.00 (Free)";
    } else {
      cardFields.style.display = "block";
      payAmount.textContent = "Pay with Kawaii Bank";
    }
    validateForm();
  }
  methodInputs.forEach(r => r.addEventListener("change", refreshMethod));

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

  payBtn.addEventListener("click", () => {
    payBtn.disabled = true;
    payBtn.textContent = "Processing…";
    setTimeout(() => {
      const method = currentMethod();
      const ticket = {
        movieCode: booking.movieCode,
        time: booking.time,
        seat: booking.seat,
        hall: booking.hall,
        payMethod: method === "cash" ? "Cash (Free)" : "Kawaii Bank",
        cardLast4: method === "cash" ? null : cardNumber.value.replace(/\D/g, "").slice(-4),
        ticketNo: Math.random().toString(36).slice(2, 8).toUpperCase(),
        issued: new Date().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
      };
      localStorage.setItem("pawnchies_ticket", JSON.stringify(ticket));
      localStorage.removeItem("pawnchies_booking");
      location.href = "ticket.html";
    }, 900);
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
  document.getElementById("ticketMovie").textContent = ticket.movieCode;
  document.getElementById("ticketTime").textContent = ticket.time;
  document.getElementById("ticketSeat").textContent = ticket.seat;
  document.getElementById("ticketHall").textContent = ticket.hall;
  document.getElementById("ticketNo").textContent = ticket.ticketNo;
  document.getElementById("ticketDate").textContent = ticket.issued;
  document.getElementById("ticketPayMethod").textContent = ticket.payMethod +
    (ticket.cardLast4 ? ` ····${ticket.cardLast4}` : "");

  document.getElementById("printTicket").addEventListener("click", () => window.print());

  // QR code should be workies
  if (window.QRCode){
    new QRCode(document.getElementById("qrCode"), {
      text: `PAWNCHINEMA | ${ticket.movieCode} | ${ticket.time} | Seat ${ticket.seat} | Ticket ${ticket.ticketNo}`,
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
  renderSpotlight();
  renderBrowseRow();
  renderTeam();
  renderAbout();
  setupTabToggle();
  setupSplash();
  initMoviePage();
  initPaymentPage();
  initTicketPage();
});
