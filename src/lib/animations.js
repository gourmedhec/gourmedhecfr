// src/lib/animations.js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export function initGsapLenisAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // --- LENIS ---
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // --- ClipPaths ---
  const initialClipPaths = [
    "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
    "polygon(33% 0%, 33% 0%, 33% 0%, 33% 0%)",
    "polygon(66% 0%, 66% 0%, 66% 0%, 66% 0%)",
    "polygon(0% 33%, 0% 33%, 0% 33%, 0% 33%)",
    "polygon(33% 33%, 33% 33%, 33% 33%, 33% 33%)",
    "polygon(66% 33%, 66% 33%, 66% 33%, 66% 33%)",
    "polygon(0% 66%, 0% 66%, 0% 66%, 0% 66%)",
    "polygon(33% 66%, 33% 66%, 33% 66%, 33% 66%)",
    "polygon(66% 66%, 66% 66%, 66% 66%, 66% 66%)",
  ];

  const finalClipPaths = [
    "polygon(0% 0%, 33.5% 0%, 33.5% 33%, 0% 33.5%)",
    "polygon(33% 0%, 66.5% 0%, 66.5% 33%, 33% 33.5%)",
    "polygon(66% 0%, 100% 0%, 100% 33%, 66% 33.5%)",
    "polygon(0% 33%, 33.5% 33%, 33.5% 66%, 0% 66.5%)",
    "polygon(33% 33%, 66.5% 33%, 66.5% 66%, 33% 66.5%)",
    "polygon(66% 33%, 100% 33%, 100% 66%, 66% 66.5%)",
    "polygon(0% 66%, 33.5% 66%, 33.5% 100%, 0% 100%)",
    "polygon(33% 66%, 66.5% 66%, 66.5% 100%, 33% 100%)",
    "polygon(66% 66%, 100% 66%, 100% 100%, 66% 100%)",
  ];

  // --- Create Masks ---
  const imgs = document.querySelectorAll(".img");
  imgs.forEach((img) => {
    // éviter de recréer les masks si déjà présents
    if (img.querySelector(".mask")) return;

    for (let i = 1; i <= 9; i++) {
      const mask = document.createElement("div");
      mask.classList.add("mask", `m-${i}`);
      img.appendChild(mask);
    }
  });

  // --- Animation ---
  const triggers = []; // on stocke les ScrollTriggers pour cleanup

  const rows = gsap.utils.toArray(".row");
  rows.forEach((row) => {
    const imgs = row.querySelectorAll(".img");

    imgs.forEach((img) => {
      const masks = img.querySelectorAll(".mask");

      masks.forEach((mask, index) => {
        gsap.set(mask, {
          clipPath: initialClipPaths[index],
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 90%",
          end: "top 20%",
          scrub: true,
        },
      });

      triggers.push(tl.scrollTrigger);

      const animationOrder = [
        [".m-1"],
        [".m-2", ".m-4"],
        [".m-3", ".m-5", ".m-7"],
        [".m-6", ".m-8"],
        [".m-9"],
      ];

      animationOrder.forEach((targets, index) => {
        tl.to(
          targets.map((cls) => img.querySelector(cls)),
          {
            clipPath: (i, el) => finalClipPaths[Array.from(masks).indexOf(el)],
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          index * 0.125
        );
      });
    });
  });

  // --- retourne les instances pour cleanup
  return {
    lenis,
    triggers,
  };
}

// fonction pour tout détruire
export function cleanupGsapLenisAnimations({ lenis, triggers }) {
  if (lenis) {
    lenis.destroy();
  }
  if (triggers) {
    triggers.forEach((t) => t.kill());
  }
  ScrollTrigger.kill(); // supprime tout ce qui reste

  // 🔥 supprimer tous les masks recréés
  const masks = document.querySelectorAll(".mask");
  masks.forEach((mask) => mask.remove());
}
