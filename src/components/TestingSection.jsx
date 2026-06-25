"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHALLENGES } from "../data/constants";

gsap.registerPlugin(ScrollTrigger);

const RESULTS = [
  { label: "Flight Stability", status: "Passed", note: "Both manual and autonomous modes — stable hover confirmed" },
  { label: "GPS RTH", status: "Passed", note: "Accurate return-to-home execution after signal loss test" },
  { label: "Sensor Isolation", status: "Passed", note: "DHT11 data captured without affecting FC loop timing" },
  { label: "Landing Accuracy", status: "Tuned", note: "GPS drift mitigated via descent rate and failsafe tuning" },
];

export default function TestingSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".test-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".test-heading", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, y: 50, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".test-result-card", { scrollTrigger: { trigger: ref.current, start: "top 68%" }, opacity: 0, y: 30, stagger: 0.1, duration: 0.55, ease: "power2.out" });
      gsap.from(".challenge-card", { scrollTrigger: { trigger: ref.current, start: "top 60%" }, opacity: 0, x: -30, stagger: 0.1, duration: 0.55, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .test-section { background: #06060a; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .test-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 16px; }
        .test-heading { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; line-height: 1.05; margin-bottom: 48px; }
        .test-heading em { color: #c6f135; font-style: normal; }
        .test-results-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; background: rgba(255,255,255,0.05); margin-bottom: 48px; }
        .test-result-card { background: #06060a; padding: 26px 22px; border-top: 2px solid transparent; transition: border-color 0.25s; }
        .test-result-card:hover { border-top-color: #c6f135; }
        .test-result-status { font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 10px; }
        .test-result-label { font-family: var(--font-bebas-neue, sans-serif); font-size: 1.3rem; color: #fff; margin-bottom: 8px; }
        .test-result-note { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.84rem; line-height: 1.65; color: rgba(255,255,255,0.32); }
        .challenges-heading { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 24px; }
        .challenges-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: rgba(255,255,255,0.05); }
        .challenge-card { background: #06060a; padding: 30px 28px; border-left: 2px solid rgba(255,255,255,0.06); transition: border-left-color 0.25s; }
        .challenge-card:hover { border-left-color: #7b6cff; }
        .challenge-icon { font-size: 1.8rem; margin-bottom: 16px; display: block; }
        .challenge-title { font-family: var(--font-bebas-neue, sans-serif); font-size: 1.4rem; color: #fff; margin-bottom: 10px; }
        .challenge-desc { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.88rem; line-height: 1.75; color: rgba(255,255,255,0.38); }
        @media (max-width: 900px) { .test-results-grid { grid-template-columns: repeat(2, 1fr); } .challenges-grid { grid-template-columns: 1fr; } }
      `}</style>
      <section className="test-section" ref={ref}>
        <div className="test-label">Autopilot &amp; Testing Results</div>
        <h2 className="test-heading">Precision in motion.<br /><em>Intelligence in control.</em></h2>
        <div className="test-results-grid">
          {RESULTS.map((r) => (
            <div key={r.label} className="test-result-card">
              <div className="test-result-status" style={{ color: r.status === "Passed" ? "#c6f135" : "#ff6b35" }}>
                {r.status === "Passed" ? "✓" : "◎"} {r.status}
              </div>
              <div className="test-result-label">{r.label}</div>
              <div className="test-result-note">{r.note}</div>
            </div>
          ))}
        </div>
        <div className="challenges-heading">Development Challenges &amp; Resolutions</div>
        <div className="challenges-grid">
          {CHALLENGES.map((c) => (
            <div key={c.title} className="challenge-card">
              <span className="challenge-icon">{c.icon}</span>
              <div className="challenge-title">{c.title}</div>
              <div className="challenge-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
