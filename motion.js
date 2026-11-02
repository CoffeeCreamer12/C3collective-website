// Subtle scroll/entrance animations using Motion (motion.dev), loaded from CDN (no build step)
import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@14.9.0/+esm";

window.__c3motion = true;
const root = document.documentElement;
if (root.classList.contains("motion-ready")) {
  const ease = [0.22, 1, 0.36, 1];

  // Hero: staggered entrance of eyebrow, headline, lede, buttons; logo fades/scales in
  animate(".hero-inner > div:first-child > *", { opacity: [0, 1], y: [18, 0] },
    { duration: 0.6, delay: stagger(0.09, { startDelay: 0.1 }), ease });
  animate(".lockup", { opacity: [0, 1], scale: [0.94, 1] }, { duration: 0.8, delay: 0.35, ease });

  // Section headings/intros and card groups fade + slide up as they scroll into view
  const groups = [
    [".promise-inner", null],
    [".services", ".service-card"],
    [".process", ".step"],
    [".pricing", ".price-card"],
    [".story", null],
    [".faq", ".faq-item"],
    [".contact", null],
  ];
  groups.forEach(([section, items]) => {
    document.querySelectorAll(section).forEach((sec) => {
      const kids = items ? Array.from(sec.querySelectorAll(items)) : [];
      const heads = Array.from(sec.querySelectorAll(".eyebrow, .section-title, h2"))
        .filter((h) => !kids.some((k) => k.contains(h)));
      const targets = kids.length ? [...heads, ...kids] : [sec];
      targets.forEach((t) => t.setAttribute("data-reveal", ""));
      inView(sec, () => {
        animate(targets, { opacity: [0, 1], y: [24, 0] },
          { duration: 0.55, delay: stagger(0.07), ease });
      }, { amount: 0.15 });
    });
  });

  // Film sprocket strips drift gently, like film moving through a gate
  animate(".sprockets span", { x: [0, -36] }, { duration: 3, repeat: Infinity, ease: "linear" });
}
