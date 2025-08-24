"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import Link from "next/link";
import { initGsapLenisAnimations } from "@/lib/animations"; 
import { initMenu } from "@/lib/menu"; 

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "contact@gourmedhec.fr";

  useEffect(() => {
    // Initialise le menu burger
    initMenu();

    // Initialise les animations Lenis + GSAP
    const ctx = initGsapLenisAnimations();
    return () => ctx?.revert?.();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ReactLenis root>
      {/* MENU BURGER */}
      <div className="menu-toggle">
        <div className="toggle-icon">
          <span>+</span>
        </div>
      </div>

      <div className="menu">
        <div className="menu-link"><Link href="/">Accueil</Link><span className="red">+</span></div>
        <div className="menu-link"><a href="/#evenements">Événements</a><span>+</span></div>
        <div className="menu-link"><Link href="/trombinoscope">Trombinoscope</Link><span>+</span></div>
        <div className="menu-link"><Link href="/pages/contact">Contact</Link><span>+</span></div>
        <div className="menu-link"><Link href="/location">Location</Link><span>+</span></div>
      </div>

      {/* TITRE SOBRE */}
      <div className="container" id="contact">
        <div className="header">
          <div className="hero-logo"><Link href="/">Gourm’Edhec</Link></div>
        </div>

        <div className="contact-content">
          <h2>Nous contacter</h2>
          
          <div style={{ margin: "1rem 0" }}>
            <button
              onClick={handleCopyEmail}
              style={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                border: "1px solid #000",
                borderRadius: "4px",
                background: copied ? "#4caf50" : "#fff",
                color: copied ? "#fff" : "#000",
              }}
            >
              {copied ? "Email copié !" : email}
            </button>
          </div>

          <div style={{ display: "flex", gap: "10rem", marginTop: "10rem" }}>
            <a href="https://www.instagram.com/gourmedhec_asso/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/icons/instagram.svg" alt="Instagram" width={32} height={32} />
            </a>
            <a href="https://www.facebook.com/gourmedhec" target="_blank" rel="noopener noreferrer">
              <img src="/assets/icons/facebook.svg" alt="Facebook" width={32} height={32} />
            </a>
            <a href="https://www.linkedin.com/company/gourmedhec" target="_blank" rel="noopener noreferrer">
              <img src="/assets/icons/linkedin.svg" alt="LinkedIn" width={32} height={32} />
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <p>&copy; Gourm'Edhec 2025</p>
        <p id="address">24 Av. Gustave Delory, 59100 Roubaix</p>
        <p>
          <a href="https://www.instagram.com/gourmedhec_asso/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </p>
      </footer>
    </ReactLenis>
  );
}
