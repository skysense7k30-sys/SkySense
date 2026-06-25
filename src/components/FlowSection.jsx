"use client";
import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FLOW_STEPS } from "../data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function FlowSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".flow-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".flow-heading", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, y: 50, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".flow-node", { scrollTrigger: { trigger: ref.current, start: "top 68%" }, opacity: 0, y: 30, stagger: 0.12, duration: 0.55, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .flow-section { background: #06060a; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); overflow: hidden; }
        .flow-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 16px; }
        .flow-heading { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; line-height: 1.05; margin-bottom: 60px; }
        .flow-heading em { color: #7b6cff; font-style: normal; }
        .flow-track { display: flex; align-items: stretch; gap: 0; overflow-x: auto; padding-bottom: 8px; }
        .flow-node { flex: 1; min-width: 150px; position: relative; }
        .flow-node-inner { background: #0e0e18; border: 1px solid rgba(255,255,255,0.07); padding: 24px 20px; height: 100%; position: relative; transition: border-color 0.25s, background 0.25s; }
        .flow-node-inner:hover { border-color: rgba(123,108,255,0.4); background: #111122; }
        .flow-idx { font-family: var(--font-dm-mono, monospace); font-size: 9px; letter-spacing: 0.2em; color: rgba(255,255,255,0.2); text-transform: uppercase; margin-bottom: 14px; }
        .flow-node-label { font-family: var(--font-bebas-neue, sans-serif); font-size: 1.25rem; color: #fff; letter-spacing: 0.04em; margin-bottom: 8px; }
        .flow-node-desc { font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.06em; color: rgba(255,255,255,0.3); line-height: 1.6; }
        .flow-arrow { display: flex; align-items: center; padding: 0 4px; position: relative; top: -4px; }
        .flow-line { height: 1px; width: 28px; background: linear-gradient(90deg, #7b6cff, rgba(123,108,255,0.2)); }
        .flow-chevron { color: #7b6cff; font-size: 14px; line-height: 1; }
        .flow-node:first-child .flow-node-inner::before { content: ""; position: absolute; top: 0; left: 0; bottom: 0; width: 3px; background: #c6f135; }
        .flow-node:last-child .flow-node-inner::after { content: ""; position: absolute; top: 0; right: 0; bottom: 0; width: 3px; background: #7b6cff; }
      `}</style>
      <section className="flow-section" ref={ref}>
        <div className="flow-label">Power &amp; Data Flow</div>
        <h2 className="flow-heading">From battery to<br /><em>your screen.</em></h2>
        <div className="flow-track">
          {FLOW_STEPS.map((step, i) => (
            <Fragment key={step.id}>
              <div className="flow-node">
                <div className="flow-node-inner">
                  <div className="flow-idx">Step {String(i + 1).padStart(2, "0")}</div>
                  <div className="flow-node-label">{step.label}</div>
                  <div className="flow-node-desc">{step.desc}</div>
                </div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <div className="flow-arrow">
                  <div className="flow-line" />
                  <div className="flow-chevron">›</div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </section>
    </>
  );
}