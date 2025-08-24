"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import { ReactLenis } from "lenis/react";
import Copy from "@/components/Copy";
import { initMenu } from "@/lib/menu";
import { initGsapLenisAnimations } from "@/lib/animations";
import "./globals.css";

// ----------------- TEAM SECTION -----------------
function TeamSection({ title, members }) {
  const containerRef = useRef(null);
  const profileImagesContainerRef = useRef(null);
  const profileImagesRef = useRef([]);
  const nameElementsRef = useRef([]);
  const nameHeadingsRef = useRef([]);
  const descElementsRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(SplitText);

    const profileImagesContainer = profileImagesContainerRef.current;
    const profileImages = (profileImagesRef.current || []).filter(Boolean);
    const nameElements = nameElementsRef.current || [];
    const nameHeadings = nameHeadingsRef.current || [];
    const descElements = descElementsRef.current || [];

    // SplitText sur les titres
    nameHeadings.forEach((heading) => {
      const split = new SplitText(heading, { type: "chars" });
      split.chars.forEach((char) => char.classList.add("letter"));
    });

    if (nameElements[0]) {
      const defaultLetters = nameElements[0].querySelectorAll(".letter");
      gsap.set(defaultLetters, { y: "100%" });

      // Cacher toutes les descriptions
      descElements.forEach((desc) => {
        gsap.set(desc, { autoAlpha: 0, y: 20 });
      });

      const handlers = [];

      profileImages.forEach((img, index) => {
        const correspondingName = nameElements[index + 1];
        if (!correspondingName) return;

        const letters = correspondingName.querySelectorAll(".letter");
        const correspondingDesc = descElements[index + 1];

        const animateIn = () => {
          gsap.to(img, { width: 160, height: 160, duration: 0.5, ease: "power4.out" });
          gsap.to(letters, {
            y: "-100%",
            ease: "power4.out",
            duration: 0.75,
            stagger: { each: 0.025, from: "center" },
          });
          if (correspondingDesc) {
            gsap.to(correspondingDesc, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power4.out" });
          }
        };

        const animateOut = () => {
          gsap.to(img, { width: 110, height: 110, duration: 0.5, ease: "power4.out" });
          gsap.to(letters, {
            y: "100%",
            ease: "power4.out",
            duration: 0.75,
            stagger: { each: 0.025, from: "center" },
          });
          if (correspondingDesc) {
            gsap.to(correspondingDesc, { autoAlpha: 0, y: 20, duration: 0.5, ease: "power4.out" });
          }
        };

        const touchHandler = () => {
          animateIn();
          setTimeout(animateOut, 1500);
        };

        img.addEventListener("mouseenter", animateIn);
        img.addEventListener("mouseleave", animateOut);
        img.addEventListener("touchstart", touchHandler);

        handlers.push({ el: img, animateIn, animateOut, touchHandler });
      });

      // Animations sur le titre par défaut
      const defaultIn = () => {
        gsap.to(defaultLetters, {
          y: "0%",
          ease: "power4.out",
          duration: 0.75,
          stagger: { each: 0.025, from: "center" },
        });
      };
      const defaultOut = () => {
        gsap.to(defaultLetters, {
          y: "100%",
          ease: "power4.out",
          duration: 0.75,
          stagger: { each: 0.025, from: "center" },
        });
      };
      const defaultTouch = () => {
        defaultIn();
        setTimeout(defaultOut, 1500);
      };

      if (profileImagesContainer) {
        profileImagesContainer.addEventListener("mouseenter", defaultIn);
        profileImagesContainer.addEventListener("mouseleave", defaultOut);
        profileImagesContainer.addEventListener("touchstart", defaultTouch);
      }

      // Cleanup
      return () => {
        handlers.forEach((h) => {
          h.el.removeEventListener("mouseenter", h.animateIn);
          h.el.removeEventListener("mouseleave", h.animateOut);
          h.el.removeEventListener("touchstart", h.touchHandler);
        });
        if (profileImagesContainer) {
          profileImagesContainer.removeEventListener("mouseenter", defaultIn);
          profileImagesContainer.removeEventListener("mouseleave", defaultOut);
          profileImagesContainer.removeEventListener("touchstart", defaultTouch);
        }
      };
    }
  }, []);

  return (
    <section className="team" ref={containerRef}>
      <div className="profile-images" ref={profileImagesContainerRef}>
        {members.map((member, idx) => (
          <div key={member.img + "-" + member.name} className="img" ref={(el) => (profileImagesRef.current[idx] = el)}>
            <Image src={`/assets-trombi/img${member.img}.jpeg`} alt={member.name} width={110} height={110} priority={idx < 4} />
          </div>
        ))}
      </div>

      <div className="profile-names">
        <div className="name default" ref={(el) => (nameElementsRef.current[0] = el)}>
          <h1 ref={(el) => (nameHeadingsRef.current[0] = el)}>{title}</h1>
        </div>

        {members.map((member, idx) => (
          <div key={member.name + "-" + member.img} className="name" ref={(el) => (nameElementsRef.current[idx + 1] = el)}>
            <h1 ref={(el) => (nameHeadingsRef.current[idx + 1] = el)}>{member.name}</h1>
            <p
              className="description"
              ref={(el) => (descElementsRef.current[idx + 1] = el)}
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              {member.desc || ""}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----------------- PAGE -----------------
export default function Page() {
  useEffect(() => {
    initMenu();
    initGsapLenisAnimations();
  }, []);

  return (
    <ReactLenis root>
      {/* MENU BURGER */}
      <div className="menu-toggle">
        <div className="toggle-icon">
          <span>+</span>
        </div>
      </div>

      <div className="menu">
        <div className="menu-link">
          <Link href="/">Accueil</Link>
          <span className="red">+</span>
        </div>
        <div className="menu-link">
          <a href="#evenements">Événements</a>
          <span>+</span>
        </div>
        <div className="menu-link">
          <Link href="/trombinoscope">Trombinoscope</Link>
          <span>+</span>
        </div>
        <div className="menu-link">
          <Link href="/pages/contact">Contact</Link>
          <span>+</span>
        </div>
        <div className="menu-link">
          <Link href="/location">Location</Link>
          <span>+</span>
        </div>
      </div>

      {/* HERO */}
      <div className="container" id="home">
        <div className="header">
          <div className="hero-logo">
            <Link href="/">Gourm’Edhec</Link>
          </div>
        </div>
        <div className="hero-copy">
          <Copy>
            <p>Association culinaire de l'EDHEC.</p>
          </Copy>
        </div>
      </div>

      {/* SECTION PRESENTATION ASSOCIATION */}
      <div className="article" id="hero-article">

        <div className="article-copy">
          <div className="article-title">
            <p><a href="#">Gourm’Edhec</a></p>
            <span>Association culinaire de l'EDHEC</span>
          </div>
          <div className="article-text">
            <Copy>
              <p>Notre mission est de régaler les étudiants de l'EDHEC.</p>
              <p>
                Nous organisons des événements variés : compétitions culinaires, goûters, afterworks,
                traiteur, rencontres gastronomiques avec des alumni…
              </p>
              <p>Nous proposons aussi des locations de planchas et appareils à raclette à petits prix.</p>
            </Copy>
          </div>
        </div>
      </div>

      {/* TROMBINOSCOPE */}
      <main>
        <TeamSection
          title="Logistique"
          members={[
            { img: 10, name: "Mathieu", desc: "Responsable logistique" },
            { img: 8, name: "Arnaud", desc: "Gestion des stocks" },
            { img: 9, name: "Ethan", desc: "Coordinateur équipe" },
            { img: 11, name: "Maxime", desc: "Transport & livraison" },
            { img: 6, name: "Quentin", desc: "Support terrain" },
          ]}
        />

        <TeamSection
          title="Spons"
          members={[
            { img: 13, name: "Andrea", desc: "Relations partenaires" },
            { img: 12, name: "Alexis", desc: "Gestion sponsoring" },
            { img: 14, name: "Cécile", desc: "Communication externe" },
            { img: 15, name: "Louis", desc: "Événements" },
            { img: 16, name: "Simon", desc: "Relations publiques" },
            { img: 17, name: "Victor", desc: "Développement réseau" },
          ]}
        />

        <TeamSection
          title="Kom-Kréa"
          members={[
            { img: 7, name: "Zena", desc: "Amerigo Vespucci, né le 9 mars 1454 …" },
            { img: 1, name: "Alice", desc: "Contenu & rédaction" },
            { img: 2, name: "Dorian", desc: "Gestion projets" },
            { img: 3, name: "Manon", desc: "Marketing digital" },
            { img: 4, name: "Maurine", desc: "Community management" },
            { img: 5, name: "Oscar", desc: "Support technique" },
            { img: 6, name: "Quentin", desc: "Coordinateur" },
          ]}
        />

        <TeamSection
          title="RSO"
          members={[
            { img: 8, name: "Arnaud", desc: "Responsable RSO" },
            { img: 4, name: "Maurine", desc: "Chargée RSO" },
            { img: 7, name: "Zena", desc: "Animateur RSO" },
            { img: 14, name: "Cécile", desc: "Chargée de projet RSO" },
            { img: 16, name: "Simon", desc: "Coordinateur RSO" },
          ]}
        />
      </main>

      {/* FOOTER */}
      <footer>
        <p>&copy; Gourm'Edhec 2025</p>
        <p id="address">24 Av. Gustave Delory, 59100 Roubaix</p>
        <p>
          <a href="https://www.instagram.com/gourmedhec_asso/" target="_blank">Instagram</a>
        </p>
      </footer>
    </ReactLenis>
  );
}
