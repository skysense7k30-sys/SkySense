"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SUBSYSTEMS } from "../data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectureSection({ id }) {
  const ref = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".arc2-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".arc2-heading", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, y: 50, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".arc2-card", { scrollTrigger: { trigger: ref.current, start: "top 70%" }, y: 60, opacity: 0, stagger: 0.15, duration: 0.7, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .arc2-section { background: #0a0f1e; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .arc2-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 16px; }
        .arc2-heading { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; line-height: 1.05; margin-bottom: 56px; max-width: 680px; }
        .arc2-heading em { color: #3b5bdb; font-style: normal; }
        .arc2-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: rgba(255,255,255,0.05); }
        .arc2-card { background: #0a0f1e; padding: 36px 32px; cursor: pointer; transition: background 0.25s; position: relative; }
        .arc2-card::after { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease; }
        .arc2-card.arc2-0::after { background: #3b5bdb; }
        .arc2-card.arc2-1::after { background: #1e3a8a; }
        .arc2-card.arc2-2::after { background: #5b7fff; }
        .arc2-card.open::after { transform: scaleX(1); }
        .arc2-card.open { background: #0e0e1e; }
        .arc2-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; }
        .arc2-glyph { font-size: 2.2rem; line-height: 1; transition: transform 0.3s, color 0.3s; }
        .arc2-card.open .arc2-glyph { transform: scale(1.2); }
        .arc2-num { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.14em; color: rgba(255,255,255,0.2); }
        .arc2-card-title { font-family: var(--font-bebas-neue, sans-serif); font-size: 1.6rem; letter-spacing: 0.04em; color: #fff; margin-bottom: 6px; }
        .arc2-stat-badge { display: inline-block; font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; margin-bottom: 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); }
        .arc2-card-detail { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.84rem; line-height: 1.7; color: rgba(255,255,255,0.35); margin-bottom: 16px; max-height: 0; overflow: hidden; transition: max-height 0.4s ease, opacity 0.3s; opacity: 0; }
        .arc2-card.open .arc2-card-detail { max-height: 200px; opacity: 1; }
        .arc2-components { display: flex; flex-direction: column; gap: 0; max-height: 0; overflow: hidden; transition: max-height 0.45s ease, opacity 0.35s; opacity: 0; }
        .arc2-card.open .arc2-components { max-height: 600px; opacity: 1; }
        .arc2-comp { position: relative; padding: 12px 0; border-top: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 3px; }
        .arc2-comp-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .arc2-comp-name { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.86rem; font-weight: 500; color: rgba(255,255,255,0.85); }
        .arc2-comp-role { font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.06em; color: rgba(255,255,255,0.28); }
        .arc2-hint { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.18em; color: rgba(255,255,255,0.15); text-transform: uppercase; margin-top: 24px; text-align: center; }

        @media (max-width: 860px) {
          .arc2-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="arc2-section" ref={ref} id={id}>
        <div className="arc2-label">System Architecture</div>
        <h2 className="arc2-heading">Three subsystems.<br />One <em>coordinated</em> platform.</h2>
        <div className="arc2-grid">
          {SUBSYSTEMS.map((s, i) => {
            const isOpen = active === s.id;
            return (
              <div
                key={s.id}
                className={`arc2-card arc2-${i}${isOpen ? " open" : ""}`}
                onClick={() => setActive(isOpen ? null : s.id)}
              >
                <div className="arc2-card-top">
                  <span className="arc2-glyph" style={{ color: isOpen ? s.color : "rgba(255,255,255,0.15)" }}>{s.glyph}</span>
                  <span className="arc2-num">{s.num}</span>
                </div>
                <div className="arc2-card-title">{s.label}</div>
                <div
                  className="arc2-stat-badge"
                  style={isOpen ? { background: s.color + "22", color: s.color } : {}}
                >
                  {s.stat} · {s.statLabel}
                </div>
                <div className="arc2-card-detail">{s.detail}</div>
                <div className="arc2-components">
                  {s.components.map((c) => (
                    <div key={c.name} className="arc2-comp">
                      <div className="arc2-comp-row">
                        <span className="arc2-comp-name">{c.name}</span>
                      </div>
                      <span className="arc2-comp-role">{c.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="arc2-hint">↑ Tap a subsystem to expand component detail</div>
      </section>
    </>
  );
}
