"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAM, FUTURE } from "../data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".foot-content > *", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        opacity: 0, y: 30, stagger: 0.12, duration: 0.65, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .foot-section { background: #0a0f1e; padding: clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem); position: relative; overflow: hidden; }
        .foot-section::before { content: "SKYSENSE"; position: absolute; font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(8rem, 20vw, 18rem); color: rgba(255,255,255,0.015); top: 50%; left: 50%; transform: translate(-50%, -50%); white-space: nowrap; letter-spacing: 0.05em; pointer-events: none; user-select: none; }
        .foot-content { position: relative; z-index: 2; }
        .foot-body { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(2rem, 5vw, 5rem); align-items: start; margin-bottom: 64px; }
        .foot-h2 { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(3rem, 7vw, 6rem); color: #fff; line-height: 1.0; margin-bottom: 20px; }
        .foot-h2 em { color: #c6f135; font-style: normal; }
        .foot-sub { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,0.35); margin-bottom: 24px; max-width: 480px; }
        .foot-future-label { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 16px; }
        .foot-future-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0; }
        .foot-future-list li { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.06em; color: rgba(255,255,255,0.4); padding: 12px 0 12px 18px; border-bottom: 1px solid rgba(255,255,255,0.05); position: relative; }
        .foot-future-list li::before { content: "→"; position: absolute; left: 0; color: #7b6cff; }
        .foot-future-list li:last-child { border-bottom: none; }
        .foot-divider { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 32px; }
        .foot-meta { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .foot-meta-text { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.14em; color: rgba(255,255,255,0.15); text-transform: uppercase; }
        .foot-team-grid { display: flex; flex-wrap: wrap; gap: 4px 16px; }
        .foot-team-member { font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); text-transform: uppercase; }
        @media (max-width: 760px) { .foot-body { grid-template-columns: 1fr; } .foot-meta { flex-direction: column; align-items: flex-start; } }
      `}</style>
      <section className="foot-section" ref={ref}>
        <div className="foot-content">
          <div className="foot-body">
            <div>
              <h2 className="foot-h2">Built for the<br /><em>field.</em></h2>
              <p className="foot-sub">
                Skysense is a fully autonomous quadcopter platform combining F405 flight control, GPS navigation, environmental sensing, and live wireless video — engineered for compact deployment in remote terrain with autopilot Mission Planning and Return-to-Home.
              </p>
            </div>
            <div>
              <div className="foot-future-label">Future Enhancements</div>
              <ul className="foot-future-list">
                {FUTURE.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </div>
          <div className="foot-divider" />
          <div className="foot-meta">
            <div className="foot-meta-text">Skysense · F405 · ESP32-CAM · NEO-7M GPS · DHT11 · HC-05 · FlySky i6</div>
            <div className="foot-team-grid">
              {TEAM.map((m) => (
                <span key={m.reg} className="foot-team-member">
                  {m.name} <span style={{ opacity: 0.5 }}>{m.reg}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
