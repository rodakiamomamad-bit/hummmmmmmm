const startBtn = document.getElementById("startBtn");
const question = document.getElementById("question");
const modal = document.getElementById("modal");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

startBtn.addEventListener("click", () => {
  document.querySelector(".letter").scrollIntoView({ behavior: "smooth" });
});

function showMessage(icon, title, message) {
  modalIcon.textContent = icon;
  modalTitle.textContent = title;
  modalText.textContent = message;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}
function closeMessage() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("yesBtn").addEventListener("click", () => {
  showMessage("💗", "پس با هم آروم شروع کنیم؟", "خیلی خوشحالم که این فرصت رو بهمون می‌دی. مهم‌تر از هر چیزی اینه که با هم راحت و صادق باشیم.");
});
document.getElementById("laterBtn").addEventListener("click", () => {
  showMessage("🌙", "حتماً، با خیال راحت فکر کن", "هیچ عجله‌ای نیست. هر وقت خودت آماده بودی و دلت خواست، بهم بگو. ممنون که صادق بودی.");
});
document.getElementById("closeModal").addEventListener("click", closeMessage);
document.getElementById("modalOk").addEventListener("click", closeMessage);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeMessage();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMessage();
});


// Scroll reveals: sections gently enter as they come into view.
document.querySelectorAll(".section, .letter-card, footer").forEach((el) => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
}

// A few slow floating hearts add atmosphere without covering the text.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reducedMotion) {
  const heartSymbols = ["♥", "♡", "✦"];
  function makeFloatingHeart() {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${5 + Math.random() * 90}%`;
    heart.style.setProperty("--duration", `${8 + Math.random() * 6}s`);
    heart.style.setProperty("--size", `${12 + Math.random() * 13}px`);
    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
  window.setInterval(makeFloatingHeart, 1500);
}

// Small sparkle burst after a choice, kept subtle and short.
function sparkleBurst() {
  if (reducedMotion) return;
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("span");
    particle.className = "float-heart";
    particle.textContent = i % 3 === 0 ? "✦" : "♥";
    particle.style.left = `${35 + Math.random() * 30}%`;
    particle.style.bottom = `${25 + Math.random() * 15}%`;
    particle.style.setProperty("--duration", `${2.2 + Math.random() * 1.2}s`);
    particle.style.setProperty("--size", `${10 + Math.random() * 12}px`);
    document.body.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove(), { once: true });
  }
}
const yesButton = document.getElementById("yesBtn");
const laterButton = document.getElementById("laterBtn");
yesButton.addEventListener("click", sparkleBurst);
laterButton.addEventListener("click", sparkleBurst);


document.getElementById("noBtn").addEventListener("click", () => {
  showMessage(
    "🤍",
    "ممنون که صادق بودی",
    "می‌فهمم و به احساست و تصمیمت احترام می‌ذارم. لازم نیست خودت رو مجبور به چیزی کنی. ممنون که جواب واقعی‌ات رو گفتی؛ امیدوارم دوستی‌مون هم با آرامش و احترام ادامه پیدا کنه."
  );
});


// A gentle optional easter egg in the "no" response.
const secretTrigger = document.getElementById("secretTrigger");
const secretMessage = document.getElementById("secretMessage");
document.getElementById("noBtn").addEventListener("click", () => {
  secretTrigger.hidden = false;
  secretMessage.hidden = true;
});
secretTrigger.addEventListener("click", () => {
  secretMessage.hidden = false;
  secretTrigger.textContent = "پیام مخفی باز شد 💗";
});
