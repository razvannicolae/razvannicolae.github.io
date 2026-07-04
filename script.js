// Theme toggle with localStorage + system preference
(function () {
  const root = document.documentElement;
  const KEY = "theme";

  const meta = document.getElementById("theme-color");
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0b0e15" : "#eef1f8");
    }
  }

  const saved = localStorage.getItem(KEY);
  if (saved) {
    apply(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    apply("dark");
  } else {
    apply("light");
  }

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      localStorage.setItem(KEY, next);
    });
  }
})();

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal-on-scroll for sections
(function () {
  const targets = document.querySelectorAll(".section, .hero");
  targets.forEach((el) => el.setAttribute("data-reveal", ""));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  targets.forEach((el) => observer.observe(el));
})();
