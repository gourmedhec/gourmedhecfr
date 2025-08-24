"use client";

import { useEffect } from "react";
import Copy from "@/components/Copy";
import { ReactLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { initGsapLenisAnimations } from "@/lib/animations"; // animations séparées
import { initMenu } from "@/lib/menu"; // menu séparé

export default function Home() {
  useEffect(() => {
    // Initialise le menu burger
    initMenu();

    // Background observer pour la section #evenements
    const evenementSection = document.querySelector("#evenements");
    const toggleSpan = document.querySelector(".menu-toggle .toggle-icon span");

    if (!evenementSection || !toggleSpan) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.style.background = "#0f0f0f";
            toggleSpan.style.color = "#8b0000";
          } else {
            document.body.style.background = "#8b0000";
            toggleSpan.style.color = "#0f0f0f";
          }
        });
      },
      { threshold: 0.5 }
    );

    document.body.style.transition = "background 0.5s ease";
    toggleSpan.style.transition = "color 0.5s ease";

    observer.observe(evenementSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Initialise les animations Lenis + GSAP
    const ctx = initGsapLenisAnimations();

    // Cleanup : enlève toutes les anims quand on quitte la page
    return () => {
      if (ctx && ctx.revert) {
        ctx.revert();
      }
    };
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


      </div>

      {/* ARTICLE 1 */}
      <div className="article" id="hero-article">
        <div className="article-img" id="article-img-1">
          <Image src="/assets/home/hero.jpg" alt="hero" width={1200} height={800} />
        </div>
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

            <div className="article-link">
              <a href="#evenements">Nos événements</a>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLES 2+3 : Fourch’Edhec et Toqu’Edhec */}
      <div className="article-row">
        <div className="article-col">
          <div className="article" id="hero-article">
            <section className="clients-imgs">
              <div className="row">
                <div className="img img-4"></div>
              </div>
            </section>
            <div className="article-copy">
              <div className="article-title">
                <p><a href="pages/work.html">Fourch’Edhec</a></p>
                <h2>Nouveauté de Gourm'Edhec — Lille & Paris</h2>
              </div>
              <div className="article-text">
                <Copy>
                  <p>
                    Créer du lien autour de la table. Comment ? En réunissant étudiants et alumni autour d’une
                    bonne table pour partager bien plus qu’un repas : des parcours inspirants, des conseils précieux
                    et des échanges authentiques.
                  </p>
                </Copy>
              </div>
            </div>
          </div>
        </div>

        <div className="article-col">
          <div className="article" id="hero-article">
            <div className="article-img" id="article-img-3">
              <Image src="/assets/home/article-2.jpg" alt="Toqu’Edhec" width={1200} height={800} />
            </div>
            <section id="evenements">
              <div className="article-copy">
                <div className="article-title">
                  <p><a href="pages/about.html">Toqu’EDHEC</a></p>
                  <h2>Notre événement phare — CMA</h2>
                </div>
                <div className="article-text">
                  <p>
                    Chaque année, nous organisons le plus grand concours culinaire étudiant des Hauts-de-France. Il
                    réunit huit grandes écoles de tous horizons…
                  </p>
                  <section className="clients-imgs">
                    <div className="row">
                      <div className="img img-4"></div>
                    </div>
                  </section>
                  <div className="article-link">
                    <a href="pages/about.html">Learn More</a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

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
