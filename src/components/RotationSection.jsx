"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MotorDiagram3D from "./MotorDiagram3D";

gsap.registerPlugin(ScrollTrigger);

const RULES = [
  "All 4 equal speed → Hover",
  "All increase → Ascend · All decrease → Descend",
  "Rear faster, front slower → Move Forward",
  "Front faster, rear slower → Move Backward",
  "CW motors faster → Yaw Right",
  "CCW motors faster → Yaw Left",
  "Right faster, left slower → Roll Left",
];

export default function RotationSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rot-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".rot-heading", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, y: 50, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".rot-canvas-wrap", { scrollTrigger: { trigger: ref.current, start: "top 70%" }, opacity: 0, scale: 0.9, duration: 0.7, ease: "power2.out" });
      gsap.from(".rot-rules li", { scrollTrigger: { trigger: ref.current, start: "top 65%" }, opacity: 0, x: 20, stagger: 0.07, duration: 0.5, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .rot-section { background: #06060a; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .rot-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 16px; }
        .rot-heading { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; line-height: 1.05; margin-bottom: 48px; }
        .rot-heading em { color: #3b5bdb; font-style: normal; }
        .rot-body { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 5rem); align-items: center; }
        .rot-canvas-wrap { aspect-ratio: 1; max-width: 420px; margin: 0 auto; position: relative; background: radial-gradient(ellipse at center, rgba(30,58,138,0.06) 0%, transparent 70%); }
        .rot-legend { display: flex; gap: 20px; margin-bottom: 16px; flex-wrap: wrap; }
        .rot-legend-item { display: flex; align-items: center; gap: 6px; font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .rot-legend-dot { width: 8px; height: 8px; border-radius: 50%; }
        .rot-rules { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0; }
        .rot-rules li { font-family: var(--font-dm-mono, monospace); font-size: 11.5px; letter-spacing: 0.04em; color: rgba(255,255,255,0.45); padding: 14px 0 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); position: relative; }
        .rot-rules li::before { content: "›"; position: absolute; left: 0; color: #3b5bdb; }
        .rot-rules li:last-child { border-bottom: none; }
        @media (max-width: 760px) { .rot-body { grid-template-columns: 1fr; } }
      `}</style>
      <section className="rot-section" ref={ref}>
        <div className="rot-label">Motor Dynamics</div>
        <h2 className="rot-heading">4 motors.<br /><em>Infinite control.</em></h2>
        <div className="rot-body">
          <div>
            <div className="rot-legend">
              <div className="rot-legend-item">
                <div className="rot-legend-dot" style={{ background: "#3b5bdb" }} />CCW (FL + RR)
              </div>
              <div className="rot-legend-item">
                <div className="rot-legend-dot" style={{ background: "#1e3a8a" }} />CW (FR + RL)
              </div>
            </div>
            <div className="rot-canvas-wrap">
              <MotorDiagram3D />
            </div>
          </div>
          <ul className="rot-rules">
            {RULES.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}