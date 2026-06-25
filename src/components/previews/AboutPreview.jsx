"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const STATS = [
  { value: "6", label: "Engineers" },
  { value: "10", label: "Components" },
  { value: "3", label: "Subsystems" },
];

export default function AboutPreview() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".about-bg-text", { x: -120, duration: 1.2, ease: "power3.out" })
        .from(".about-year", { y: 80, duration: 0.8, ease: "power3.out" }, "-=0.8")
        .from(".about-card", { x: -60, duration: 0.7, ease: "power3.out" }, "-=0.6")
        .from(".about-stat", { opacity: 0, y: 12, stagger: 0.08, duration: 0.4, ease: "power2.out" }, "-=0.3")
        .from(".about-dot", { scale: 0, duration: 0.4, ease: "back.out(2)" }, "-=0.3")
        .from(".about-line", { scaleX: 0, transformOrigin: "right center", duration: 0.5, ease: "power2.out" }, "-=0.2");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .about-preview {
          position: relative;
          height: 560px;
          overflow: hidden;
          background: #f5f0e8;
        }
        .about-bg-text {
          position: absolute; top: -20px; left: -10px;
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: clamp(14rem, 28vw, 22rem);
          color: #e8e3d8; line-height: 0.85;
          white-space: nowrap; pointer-events: none; z-index: 1;
          letter-spacing: -0.02em;
        }
        .about-card {
          position: absolute; bottom: 48px; left: 60px; z-index: 10;
          background: #1a1a22; padding: 28px 32px;
          border-top: 3px solid #c6f135;
          max-width: 340px;
        }
        .about-card h3 {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 2.4rem; letter-spacing: 0.03em;
          color: #fff; margin-bottom: 8px; line-height: 1;
        }
        .about-card p {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.6;
        }
        .about-stats {
          display: flex; gap: 24px;
          margin-top: 20px; padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .about-stat {
          display: flex; flex-direction: column; gap: 2px;
        }
        .about-stat-value {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 1.8rem; color: #c6f135; line-height: 1;
        }
        .about-stat-label {
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.35); text-transform: uppercase;
        }
        .about-year {
          position: absolute; top: 40px; right: 50px; z-index: 10;
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: clamp(5rem, 10vw, 9rem);
          color: #1a1a22; letter-spacing: -0.02em; line-height: 1;
        }
        .about-dot {
          position: absolute; top: 50%; right: 200px;
          transform: translateY(-50%);
          width: 14px; height: 14px;
          border-radius: 50%; background: #c6f135; z-index: 10;
        }
        .about-line {
          position: absolute; top: 50%; right: 0;
          width: 180px; height: 1px;
          background: #1a1a22; z-index: 10;
        }
        .about-tag {
          position: absolute; bottom: 48px; right: 50px; z-index: 10;
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px; letter-spacing: 0.18em;
          color: #8a8070; text-transform: uppercase; text-align: right;
          line-height: 1.8;
        }
      `}</style>
      <div className="about-preview" ref={ref}>
        <div className="about-bg-text">SKYSENSE</div>
        <div className="about-card">
          <h3>We build<br />autonomous<br />eyes.</h3>
          <p>A wireless camera-based quadcopter for environmental monitoring — engineered around a 4-in-1 ESC with inbuilt power distribution, an F405 flight controller, NEO-7M GPS with Return-to-Home, and an independent Arduino UNO sensing unit streaming DHT11 readings over Bluetooth.</p>
          <div className="about-stats">
            {STATS.map((s) => (
              <div className="about-stat" key={s.label}>
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-year">EST<br />2025</div>
        <div className="about-dot" />
        <div className="about-line" />
        <div className="about-tag">Skysense<br />Autopilot Drone<br />End-Term Project</div>
      </div>
    </>
  );
}