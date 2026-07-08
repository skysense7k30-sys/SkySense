"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, AlertTriangle, Cpu, Gauge, Terminal, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Problem", href: "#problem", icon: AlertTriangle },
  { label: "Architecture", href: "#architecture", icon: Cpu },
  { label: "Specs", href: "#specs", icon: Gauge },
  { label: "Software", href: "#software", icon: Terminal },
  { label: "Team", href: "#team", icon: Users },
];

export default function Footer() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".foot-content > *", {
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        opacity: 0, y: 16, stagger: 0.1, duration: 0.5, ease: "power2.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .foot-section {
          background: #0a0f1e;
          padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 6vw, 6rem);
        }
        .foot-content { position: relative; z-index: 2; }

        .foot-nav {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(1.25rem, 3vw, 2.25rem);
          padding-bottom: 22px;
          margin-bottom: 22px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .foot-nav-link {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-dm-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .foot-nav-link:hover { color: #5eb4ff; }
        .foot-nav-link svg {
          width: 13px;
          height: 13px;
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }
        .foot-nav-link:hover svg { opacity: 1; }

        .foot-divider { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 20px; }

        .foot-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .foot-meta-text {
          font-family: var(--font-dm-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.15);
          text-transform: uppercase;
        }
        .foot-copy {
          font-family: var(--font-dm-mono, monospace);
          font-size: 9.5px;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
        }

        @media (max-width: 760px) {
          .foot-meta { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
      <section className="foot-section" ref={ref}>
        <div className="foot-content">
          <nav className="foot-nav">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <a key={href} href={href} className="foot-nav-link">
                <Icon />
                {label}
              </a>
            ))}
          </nav>
          <div className="foot-divider" />
          <div className="foot-meta">
            <div className="foot-meta-text">
              Skysense
            </div>
            <div className="foot-copy">© {new Date().getFullYear()} Skysense. All rights reserved.</div>
          </div>
        </div>
      </section>
    </>
  );
}