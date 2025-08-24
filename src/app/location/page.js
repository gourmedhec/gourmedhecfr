"use client";

import { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import Link from "next/link";
import { initGsapLenisAnimations } from "@/lib/animations"; 
import { initMenu } from "@/lib/menu"; 
import Copy from "@/components/Copy";

export default function Location() {
  useEffect(() => {
    // init menu
    initMenu();

    // init animations (Lenis + GSAP)
    const ctx = initGsapLenisAnimations();
    return () => ctx?.revert?.();
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
          <a href="/#evenements">Événements</a>
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

      {/* TITRE SOBRE */}
      <div className="container" id="location">
        <div className="header">
          <div className="hero-logo">
            <Link href="/">Gourm’Edhec</Link>
          </div>
        </div>

        <div className="hero-copy">
            <br></br>
          <div className="article-text">
            <Copy>
                <p>
                LOCATION EXCLUSIVE AUX EDHECs : Appareils à raclette et plancha</p>
                </Copy>
                </div>
            <h3>5€ pour 48h</h3>
          <h3></h3>
          <div className="article-text">
                <Copy>
                  <p>
Contactez-nous par message privé sur Instagram pour discuter des modalités
                  </p>
                </Copy>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
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
