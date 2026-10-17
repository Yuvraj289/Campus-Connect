// ============================================
// CampusConnect — Homepage Logic
// Renders events, colleges, ticker, filters, search
// Currently reads from local mock data (data/events.json).
// Swap `loadData()` for a Supabase/Firebase fetch later.
// ============================================

const CATEGORY_LABELS = {
  fest: "Fest",
  mun: "MUN",
  hackathon: "Hackathon",
  workshop: "Workshop",
  cultural: "Cultural",
};

let allEvents = [];
let allColleges = [];
let activeCategory = "all";
let activeQuery = "";

async function loadData() {
  const res = await fetch("data/events.json");
  const data = await res.json();
  allEvents = data.events;
  allColleges = data.colleges;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function setTodayDate() {
  const today = new Date();
  const formatted = today.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  document.getElementById("todayDate").textContent = formatted;
}

function renderTicker() {
  const track = document.getElementById("tickerTrack");
  // Duplicate the list once so the CSS marquee loop is seamless
  const items = [...allColleges, ...allColleges]
    .map((c) => `<span>●</span>${c.name}`)
    .join("<span style=\"margin: 0 22px; opacity: 0.4;\">/</span>");
  track.innerHTML = items;
}

function renderFeatured() {
  const featured = allEvents.find((e) => e.featured);
  const section = document.getElementById("featuredSection");
  if (!featured) { section.hidden = true; return; }

  section.innerHTML = `
    <div class="featured__text">
      <span class="featured__eyebrow">Top Story — ${CATEGORY_LABELS[featured.category]}</span>
      <h2 class="featured__title">${featured.title}</h2>
      <p class="featured__desc">${featured.description}</p>
      <div class="featured__meta">
        <span><strong>${featured.college}</strong></span>
        <span>${formatDate(featured.date)}</span>
        <span>${featured.venue}</span>
      </div>
      <a class="featured__link" href="${featured.registrationLink}">Register Now →</a>
    </div>
    <div class="featured__visual">
      <span class="featured__visual-label">${featured.college}</span>
    </div>
  `;
}

function renderColleges() {
  const grid = document.getElementById("collegesGrid");
  grid.innerHTML = allColleges.map((c) => `
    <div class="college-chip">
      ${c.verified ? '<span class="college-chip__verified" title="Verified"></span>' : ""}
      ${c.name}
      <span class="college-chip__city">${c.city}</span>
    </div>
  `).join("");
}

function getFilteredEvents() {
  return allEvents.filter((e) => {
    const matchesCategory = activeCategory === "all" || e.category === activeCategory;
    const q = activeQuery.trim().toLowerCase();
    const matchesQuery = !q ||
      e.title.toLowerCase().includes(q) ||
      e.college.toLowerCase().includes(q) ||
      CATEGORY_LABELS[e.category].toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

function renderListings() {
  const events = getFilteredEvents().filter((e) => !e.featured);
  const grid = document.getElementById("listingsGrid");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("resultCount");

  count.textContent = `${events.length} event${events.length === 1 ? "" : "s"}`;

  if (events.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = events.map((e) => `
    <article class="event-card">
      <span class="event-card__tag">${CATEGORY_LABELS[e.category]}</span>
      <h3 class="event-card__title">${e.title}</h3>
      <p class="event-card__college">${e.college} · ${e.venue}</p>
      <div class="event-card__footer">
        <span>${formatDate(e.date)}</span>
        <span>Details →</span>
      </div>
    </article>
  `).join("");
}

function attachEvents() {
  document.getElementById("categoryFilters").addEventListener("click", (ev) => {
    const btn = ev.target.closest(".filter-pill");
    if (!btn) return;
    activeCategory = btn.dataset.category;
    document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderListings();
  });

  document.getElementById("searchForm").addEventListener("submit", (ev) => {
    ev.preventDefault();
    activeQuery = document.getElementById("searchInput").value;
    renderListings();
  });

  document.getElementById("searchInput").addEventListener("input", (ev) => {
    activeQuery = ev.target.value;
    renderListings();
  });

  document.getElementById("submitEventBtn").addEventListener("click", (ev) => {
    ev.preventDefault();
    alert("Submit-an-event form goes here — Phase 1 build target.");
  });
}

async function init() {
  setTodayDate();
  await loadData();
  renderTicker();
  renderFeatured();
  renderListings();
  renderColleges();
  attachEvents();
}

init();
