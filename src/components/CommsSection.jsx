"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMMS } from "../data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function CommsSection() {
  const ref = useRef(null);
  const barRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".comms-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".comms-heading", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, y: 50, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".comms-row", { scrollTrigger: { trigger: ref.current, start: "top 70%" }, opacity: 0, x: -24, stagger: 0.1, duration: 0.55, ease: "power2.out" });
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.fromTo(bar,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left", duration: 0.7, ease: "power3.out", delay: 0.2 + i * 0.08, scrollTrigger: { trigger: ref.current, start: "top 70%" } }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .comms-section { background: #0a0f1e; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .comms-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 16px; }
        .comms-heading { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; line-height: 1.05; margin-bottom: 48px; }
        .comms-heading em { color: #ff6b35; font-style: normal; }
        .comms-table { display: flex; flex-direction: column; gap: 1px; }
        .comms-header { display: grid; grid-template-columns: 90px 1fr 100px 160px; gap: 16px; padding: 0 0 12px; font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.2); }
        .comms-row { display: grid; grid-template-columns: 90px 1fr 100px 160px; gap: 16px; align-items: center; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.05); }
        .comms-proto { font-family: var(--font-bebas-neue, sans-serif); font-size: 1.3rem; letter-spacing: 0.04em; }
        .comms-medium { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.88rem; color: rgba(255,255,255,0.5); }
        .comms-range { font-family: var(--font-dm-mono, monospace); font-size: 10.5px; letter-spacing: 0.06em; color: rgba(255,255,255,0.35); }
        .comms-bar-wrap { height: 3px; background: rgba(255,255,255,0.06); position: relative; }
        .comms-bar { position: absolute; top: 0; left: 0; height: 100%; }
        @media (max-width: 640px) {
          .comms-header { display: none; }
          .comms-row { grid-template-columns: 70px 1fr; gap: 10px; }
          .comms-range, .comms-bar-wrap { display: none; }
        }
      `}</style>
      <section className="comms-section" ref={ref}>
        <div className="comms-label">Communication Protocols</div>
        <h2 className="comms-heading">Five channels.<br /><em>Zero guesswork.</em></h2>
        <div className="comms-table">
          <div className="comms-header">
            <span>Protocol</span><span>Medium</span><span>Range</span><span>Coverage</span>
          </div>
          {COMMS.map((c, i) => (
            <div className="comms-row" key={c.proto}>
              <span className="comms-proto" style={{ color: c.color }}>{c.proto}</span>
              <span className="comms-medium">{c.medium}</span>
              <span className="comms-range">{c.range}</span>
              <div className="comms-bar-wrap">
                <div className="comms-bar" ref={(el) => (barRefs.current[i] = el)} style={{ width: `${c.pct}%`, background: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
