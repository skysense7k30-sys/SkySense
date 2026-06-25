"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TELEMETRY } from "../data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function TelemetrySection() {
  const ref = useRef(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tele-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".tele-heading", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, y: 50, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".tele-cell", { scrollTrigger: { trigger: ref.current, start: "top 65%" }, opacity: 0, scale: 0.92, stagger: 0.08, duration: 0.55, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  const jitter = (base, range) => (parseFloat(base) + (Math.random() - 0.5) * range).toFixed(1);
  const live = { "Temp Read": jitter(28, 2.5), Humidity: jitter(62, 5) };

  return (
    <>
      <style>{`
        .tele-section { background: #0a0f1e; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .tele-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 16px; }
        .tele-heading { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; line-height: 1.05; margin-bottom: 48px; }
        .tele-heading em { color: #c6f135; font-style: normal; }
        .tele-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: rgba(255,255,255,0.05); margin-bottom: 24px; }
        .tele-cell { background: #0a0f1e; padding: 28px 26px; position: relative; overflow: hidden; }
        .tele-cell::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: var(--cell-color); }
        .tele-cell-icon { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 18px; display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.25); }
        .tele-cell-icon .dot { width: 6px; height: 6px; border-radius: 50%; animation: pulse-dot 2s ease-in-out infinite; }
        @keyframes pulse-dot { 0%,100% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        .tele-val { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 4.5vw, 3.6rem); line-height: 1; display: flex; align-items: baseline; gap: 6px; }
        .tele-unit { font-family: var(--font-dm-mono, monospace); font-size: 0.9rem; opacity: 0.5; }
        .tele-bar-wrap { margin-top: 16px; height: 2px; background: rgba(255,255,255,0.06); position: relative; overflow: hidden; }
        .tele-bar { position: absolute; top: 0; left: 0; height: 100%; transition: width 0.8s ease; }
        .tele-note { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.14em; color: rgba(255,255,255,0.15); text-transform: uppercase; text-align: center; }
        .tele-note em { color: #c6f135; font-style: normal; animation: blink 1.6s step-end infinite; }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 860px) { .tele-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .tele-grid { grid-template-columns: 1fr; } }
      `}</style>
      <section className="tele-section" ref={ref}>
        <div className="tele-label">Live Telemetry · Simulated</div>
        <h2 className="tele-heading">Field data,<br /><em>read in real time.</em></h2>
        <div className="tele-grid">
          {TELEMETRY.map((t) => {
            const displayVal =
              t.label === "Temp Read" ? live["Temp Read"] :
              t.label === "Humidity"  ? live["Humidity"]  : t.value;
            const barPct =
              t.label === "Temp Read"    ? Math.min(100, (parseFloat(displayVal) / 50) * 100) :
              t.label === "Humidity"     ? parseFloat(displayVal) :
              t.label === "BT Range"     ? 10 :
              t.label === "GPS Accuracy" ? 50 :
              t.label === "RC Range"     ? 80 : 40;
            return (
              <div className="tele-cell" key={t.label} style={{ "--cell-color": t.color }}>
                <div className="tele-cell-icon">
                  <span className="dot" style={{ background: t.color }} />
                  {t.label}
                </div>
                <div className="tele-val" style={{ color: t.color }}>
                  {displayVal}<span className="tele-unit">{t.unit}</span>
                </div>
                <div className="tele-bar-wrap">
                  <div className="tele-bar" style={{ width: `${barPct}%`, background: t.color }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="tele-note">
          Temp &amp; humidity refresh every <em>2 s</em> · DHT11 on D2 · 9600 baud via HC-05
        </div>
      </section>
    </>
  );
}
