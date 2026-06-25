"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPECS } from "../data/constants";
import SpecIcon from "./icons/SpecIcon";

gsap.registerPlugin(ScrollTrigger);

export default function SpecsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".specs-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".specs-heading", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, y: 50, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".spec-item", { scrollTrigger: { trigger: ref.current, start: "top 65%" }, opacity: 0, y: 20, stagger: 0.05, duration: 0.45, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .specs-section { background: #06060a; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .specs-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 16px; }
        .specs-heading { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; line-height: 1.05; margin-bottom: 48px; }
        .specs-heading em { color: #ff6b35; font-style: normal; }
        .specs-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.06); }
        .spec-item { position: relative; background: #06060a; padding: 22px 20px; border-bottom: 2px solid transparent; transition: border-color 0.25s, background 0.25s; cursor: pointer; }
        .spec-item:hover { border-bottom-color: #ff6b35; background: #0a0a14; }
        .spec-label { font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.18em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 8px; }
        .spec-value { font-family: var(--font-bebas-neue, sans-serif); font-size: 1.3rem; letter-spacing: 0.04em; color: #fff; }

        .spec-card {
          position: absolute;
          bottom: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          width: 260px;
          background: #0a0a14;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          padding: 14px;
          z-index: 20;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .spec-item:hover .spec-card {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }
        .spec-card::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-top-color: rgba(255,255,255,0.1);
        }

        .spec-card-icon-box {
          width: 100%;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0d0d18, #050508);
          border: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 10px;
        }
        .spec-card-icon-box svg {
          width: 48px;
          height: 48px;
          color: rgba(255,255,255,0.85);
          transition: color 0.25s, transform 0.25s;
        }
        .spec-item:hover .spec-card-icon-box svg {
          color: #ff6b35;
          transform: scale(1.08);
        }

        .spec-card-title {
          font-family: var(--font-dm-mono, monospace);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #ff6b35;
          margin-bottom: 6px;
        }
        .spec-card-stat {
          font-family: var(--font-bebas-neue, sans-serif);
          font-size: 1rem;
          letter-spacing: 0.02em;
          color: #fff;
          margin-bottom: 6px;
        }
        .spec-card-desc {
          font-family: var(--font-dm-sans, sans-serif);
          font-size: 12.5px;
          line-height: 1.5;
          color: rgba(255,255,255,0.65);
        }

        /* edge clamping for first/last column items */
        .spec-item:first-child .spec-card,
        .spec-item:nth-child(4n+1) .spec-card { left: 0; transform: translateX(0) translateY(8px); }
        .spec-item:first-child:hover .spec-card,
        .spec-item:nth-child(4n+1):hover .spec-card { transform: translateX(0) translateY(0); }
        .spec-item:first-child .spec-card::after,
        .spec-item:nth-child(4n+1) .spec-card::after { left: 24px; transform: translateX(0); }

        .spec-item:nth-child(4n) .spec-card { left: auto; right: 0; transform: translateX(0) translateY(8px); }
        .spec-item:nth-child(4n):hover .spec-card { transform: translateX(0) translateY(0); }
        .spec-item:nth-child(4n) .spec-card::after { left: auto; right: 24px; transform: translateX(0); }

        @media (max-width: 900px) { .specs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) {
          .specs-grid { grid-template-columns: 1fr; }
          .spec-card { width: 100%; left: 0 !important; right: 0 !important; transform: translateY(8px) !important; }
          .spec-item:hover .spec-card { transform: translateY(0) !important; }
          .spec-card::after { display: none; }
        }
      `}</style>
      <section className="specs-section" ref={ref}>
        <div className="specs-label">Hardware Specifications</div>
        <h2 className="specs-heading">Every component,<br /><em>by the spec.</em></h2>
        <div className="specs-grid">
          {SPECS.map((s) => (
            <div className="spec-item" key={s.label}>
              <div className="spec-label">{s.label}</div>
              <div className="spec-value">{s.value}</div>

              {(s.icon || s.description) && (
                <div className="spec-card">
                  {s.icon && (
                    <div className="spec-card-icon-box">
                      <SpecIcon name={s.icon} />
                    </div>
                  )}
                  <div className="spec-card-title">{s.label}</div>
                  {s.stat && <div className="spec-card-stat">{s.stat}</div>}
                  {s.description && <div className="spec-card-desc">{s.description}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}