"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { val: "3×", desc: "Integrated subsystems" },
  { val: "360°", desc: "Aerial coverage" },
  { val: "±2.5m", desc: "GPS accuracy" },
  { val: "LIVE", desc: "Video + sensor stream" },
];

const OBJECTIVES = [
  "Autonomous GPS-based navigation & RTH",
  "Live environmental sensing via DHT11 + Bluetooth",
  "Real-time MJPEG video stream via ESP32-CAM",
  "Manual override via FlySky i6 RC system",
  "Mission Planner integration for waypoint missions",
];

export default function ProblemSection({ id }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prb2-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".prb2-stat", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, opacity: 0, y: 40, stagger: 0.12, duration: 0.6, ease: "power3.out" });
      gsap.from(".prb2-text", { scrollTrigger: { trigger: ref.current, start: "top 70%" }, opacity: 0, x: -30, duration: 0.7, ease: "power2.out" });
      gsap.from(".prb2-card", { scrollTrigger: { trigger: ref.current, start: "top 65%" }, opacity: 0, x: 40, duration: 0.7, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .prb2-section { background: #06060a; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .prb2-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 40px; }
        .prb2-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.06); margin-bottom: 64px; }
        .prb2-stat { background: #06060a; padding: 28px 24px; border-top: 2px solid transparent; transition: border-color 0.3s; }
        .prb2-stat:hover { border-top-color: #3b5bdb; }
        .prb2-stat .val { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.2rem, 4vw, 3.5rem); color: #3b5bdb; line-height: 1; display: block; margin-bottom: 6px; }
        .prb2-stat .desc { font-family: var(--font-dm-mono, monospace); font-size: 10.5px; letter-spacing: 0.14em; color: rgba(255,255,255,0.3); text-transform: uppercase; }
        .prb2-body { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(2rem, 5vw, 5rem); align-items: start; }
        .prb2-h2 { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 4.5vw, 4rem); line-height: 1.05; color: #fff; margin-bottom: 20px; }
        .prb2-h2 em { color: rgba(255,255,255,0.22); font-style: normal; }
        .prb2-p { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.95rem; line-height: 1.85; color: rgba(255,255,255,0.4); }
        .prb2-p + .prb2-p { margin-top: 14px; }
        .prb2-card { background: #0e0e18; border: 1px solid rgba(59,91,219,0.12); padding: 32px; position: relative; overflow: hidden; }
        .prb2-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #3b5bdb, #1e3a8a); }
        .prb2-card-label { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.2em; color: #3b5bdb; text-transform: uppercase; margin-bottom: 16px; }
        .prb2-card h3 { font-family: var(--font-bebas-neue, sans-serif); font-size: 2rem; color: #fff; letter-spacing: 0.03em; margin-bottom: 14px; }
        .prb2-card p { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.9rem; line-height: 1.75; color: rgba(255,255,255,0.45); }
        .prb2-objectives { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 10px; }
        .prb2-obj-item { display: flex; gap: 10px; align-items: flex-start; }
        .prb2-obj-bullet { color: #3b5bdb; font-family: var(--font-dm-mono, monospace); font-size: 12px; flex-shrink: 0; margin-top: 2px; }
        .prb2-obj-text { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.08em; line-height: 1.6; color: rgba(255,255,255,0.35); text-transform: uppercase; }
        @media (max-width: 860px) { .prb2-stats-row { grid-template-columns: repeat(2, 1fr); } .prb2-body { grid-template-columns: 1fr; } }
      `}</style>
      <section className="prb2-section" ref={ref} id={id}>
        <div className="prb2-label">Problem &amp; Motivation</div>
        <div className="prb2-stats-row">
          {STATS.map((s) => (
            <div className="prb2-stat" key={s.val}>
              <span className="val">{s.val}</span>
              <span className="desc">{s.desc}</span>
            </div>
          ))}
        </div>
        <div className="prb2-body">
          <div className="prb2-text">
            <h2 className="prb2-h2">Manual monitoring<br />doesn't <em>scale</em> to<br />remote terrain.</h2>
            <p className="prb2-p">Environmental monitoring still depends on fixed stations and manual collection — limiting coverage, responsiveness, and safety in hazardous zones. In remote, large-area, or physically dangerous environments, traditional methods become inefficient, time-consuming, and unsafe for human operators.</p>
            <p className="prb2-p">Skysense replaces ground-based constraints with autonomous aerial reach — a single platform combining flight, sensing, and vision into a coordinated monitoring system deployable without infrastructure.</p>
          </div>
          <div className="prb2-card">
            <div className="prb2-card-label">Solution</div>
            <h3>One Platform.<br />Three Capabilities.</h3>
            <p>Autonomous GPS navigation, real-time DHT11 environmental sensing over Bluetooth, and live ESP32-CAM video streaming — all coordinated through a compact F405 flight controller stack running ArduPilot/Betaflight.</p>
            <div className="prb2-objectives">
              {OBJECTIVES.map((o) => (
                <div key={o} className="prb2-obj-item">
                  <span className="prb2-obj-bullet">›</span>
                  <span className="prb2-obj-text">{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}