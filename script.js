const demoNewsItems = [
  {
    category: "football",
    label: "UMUPIRA W'AMAGURU",
    title: "Impano nshya zigaragaje mu mupira w'amaguru",
    description: "Abanyeshuri bakomeje kwerekana ubuhanga n'ubwitange mu marushanwa y'umupira w'amaguru.",
    image_url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80",
    created_at: new Date().toISOString(),
  },
  {
    category: "volleyball",
    label: "VOLLEYBALL",
    title: "Volleyball yigisha ubufatanye n'ikinyabupfura",
    description: "Imyitozo ihuriza hamwe abanyeshuri, ikabafasha gukorera hamwe no kwigirira icyizere.",
    image_url: "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=900&q=80",
    created_at: new Date().toISOString(),
  },
  {
    category: "basketball",
    label: "BASKETBALL",
    title: "Basketball n'ahazaza h'impano z'abato",
    description: "Uko gukina basketball bifasha urubyiruko guteza imbere impano n'ubushobozi bwabo.",
    image_url: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=80",
    created_at: new Date().toISOString(),
  },
  {
    category: "school",
    label: "UBUZIMA BW'ISHURI",
    title: "Impamvu buri munyeshuri yakwitabira siporo",
    description: "Siporo yubaka ubuzima bwiza, ubuyobozi, ubucuti n'ubushobozi bwo gukorera hamwe.",
    image_url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80",
    created_at: new Date().toISOString(),
  },
];

const categoryLabels = {
  football: "UMUPIRA W'AMAGURU",
  volleyball: "VOLLEYBALL",
  basketball: "BASKETBALL",
  athletics: "IMIKINO NGORORAMUBIRI",
  school: "UBUZIMA BW'ISHURI",
};
const newsGrid = document.querySelector("#news-grid");
const competitionList = document.querySelector("#competition-list");
const supabaseConfig = window.OPSS_SUPABASE_CONFIG;
const supabaseReady = Boolean(
  window.supabase?.createClient &&
    supabaseConfig?.url &&
    supabaseConfig?.anonKey &&
    !supabaseConfig.url.includes("YOUR_PROJECT")
);
const supabaseClient = supabaseReady
  ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey)
  : null;

let newsItems = [];

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function renderNews(filter = "all") {
  const visibleItems = filter === "all"
    ? newsItems
    : newsItems.filter((item) => item.category === filter);
  if (!visibleItems.length) {
    newsGrid.innerHTML = '<div class="empty-news">Nta makuru ari muri iki cyiciro ubu. Ongera ugerageze nyuma.</div>';
    return;
  }

  newsGrid.innerHTML = visibleItems.map((item) => {
    const title = escapeHtml(item.title);
    const image = escapeHtml(item.image_url || "");
    const label = escapeHtml(item.label || categoryLabels[item.category] || "AMAKURU");
    const date = item.created_at
      ? new Intl.DateTimeFormat("rw-RW", { dateStyle: "medium" }).format(new Date(item.created_at))
      : "AMAKURU YA SIPORO";
    return `
      <article class="news-card">
        <div class="news-image">
          ${image ? `<img src="${image}" alt="${title}" loading="lazy" />` : ""}
          <span class="category-tag">${label}</span>
        </div>
        <div class="news-copy">
          <span class="news-meta">${escapeHtml(date)}</span>
          <h3>${title}</h3>
          <p>${escapeHtml(item.description)}</p>
        </div>
      </article>
    `;
  }).join("");
}

function renderCompetitions(competitions) {
  if (!competitions.length) {
    competitionList.innerHTML = '<div class="competition-empty">Nta marushanwa mashya arashyirwa hano. Ongera uze kureba amakuru mashya.</div>';
    return;
  }

  competitionList.innerHTML = competitions.map((competition) => {
    const eventDate = new Date(`${competition.event_date}T12:00:00`);
    const day = new Intl.DateTimeFormat("rw-RW", { day: "2-digit" }).format(eventDate);
    const month = new Intl.DateTimeFormat("rw-RW", { month: "short" }).format(eventDate).toUpperCase();
    return `
      <article class="competition-item">
        <div class="competition-date">${escapeHtml(day)}<small>${escapeHtml(month)}</small></div>
        <div class="competition-info"><strong>${escapeHtml(competition.name)}</strong><span>${escapeHtml(competition.details)}</span></div>
        <span class="competition-type">${escapeHtml(competition.sport)}</span>
      </article>
    `;
  }).join("");
}

async function loadPublishedContent() {
  const newsStatus = document.querySelector("#news-status");
  if (!supabaseReady) {
    newsItems = demoNewsItems;
    renderNews();
    renderCompetitions([]);
    newsStatus.textContent = "Aya ni amakuru y’icyitegererezo. Shyiraho Supabase kugira ngo agaragaremo ayashyizweho n’ubuyobozi.";
    document.querySelector("#contact-note").textContent = "Shyiraho Supabase kugira ngo ubutumwa bugere ku buyobozi.";
    return;
  }

  newsStatus.textContent = "Amakuru arimo kuzanwa...";
  try {
    const [{ data: news, error: newsError }, { data: competitions, error: competitionsError }] = await Promise.all([
      supabaseClient.from("news").select("id, category, label, title, description, image_url, created_at").eq("published", true).order("created_at", { ascending: false }),
      supabaseClient.from("competitions").select("id, name, details, sport, event_date").eq("published", true).order("event_date", { ascending: true }),
    ]);
    if (newsError) throw newsError;
    if (competitionsError) throw competitionsError;
    newsItems = news || [];
    renderNews();
    renderCompetitions(competitions || []);
    newsStatus.textContent = newsItems.length
      ? "Amakuru yatangajwe n’ubuyobozi bwa OPSS Nyanza."
      : "Nta nkuru yatangajwe ubu. Ongera uze kureba nyuma.";
  } catch (error) {
    newsItems = [];
    renderNews();
    renderCompetitions([]);
    newsStatus.textContent = "Amakuru ntiyabonetse. Reba niba Supabase yashyizweho neza cyangwa ugerageze nyuma.";
    console.error("Could not load OPSS Nyanza public content:", error);
  }
}

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-chip.selected")?.classList.remove("selected");
    button.classList.add("selected");
    renderNews(button.dataset.filter);
  });
});

document.querySelectorAll("[data-sport-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    const filter = link.dataset.sportFilter;
    document.querySelector(".filter-chip.selected")?.classList.remove("selected");
    document.querySelector(`[data-filter="${filter}"]`)?.classList.add("selected");
    renderNews(filter);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  });
});

document.querySelector("#contact-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const message = {
    name: formData.get("name").trim(),
    category: formData.get("category"),
    message: formData.get("message").trim(),
  };
  const feedback = document.querySelector("#form-feedback");
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  feedback.textContent = "Ubutumwa burimo koherezwa...";

  if (!supabaseReady) {
    feedback.textContent = "Ubutumwa ntibwoherejwe. Ubuyobozi bugomba kubanza gushyiraho Supabase.";
    submitButton.disabled = false;
    return;
  }

  const { error } = await supabaseClient.from("contact_messages").insert(message);
  if (error) {
    feedback.textContent = "Ubutumwa ntibwoherejwe. Ongera ugerageze nyuma.";
    console.error("Could not send OPSS Nyanza contact message:", error);
    submitButton.disabled = false;
    return;
  }

  feedback.textContent = "Ubutumwa bwoherejwe ku buyobozi bwa OPSS Nyanza. Murakoze!";
  form.reset();
  submitButton.disabled = false;
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderCompetitions([]);
loadPublishedContent();
