"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAM } from "../data/constants";

gsap.registerPlugin(ScrollTrigger);

function CrewColumn({ label, tag, icon, members }) {
  return (
    <div className="crew-col">
      <div className="crew-head">
        <span className="crew-icon">{icon}</span>
        <div>
          <div className="crew-label">{label}</div>
          <div className="crew-tag">{tag}</div>
        </div>
      </div>
      <div className="crew-list">
        {members.map((m, i) => (
          <div key={m.reg} className="credit-row">
            <span className="credit-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="credit-name">{m.name}</span>
            {/* <span className="credit-leader" /> */}
            {/* <span className="credit-reg">{m.reg}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamCredits({ id }) {
  const ref = useRef(null);

  const drone = TEAM.filter((m) => m.team === "drone");
  const web = TEAM.filter((m) => m.team === "web");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".credit-row", {
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
        opacity: 0, x: -8, stagger: 0.04, duration: 0.4, ease: "power2.out",
      });
      gsap.from(".crew-head", {
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
        opacity: 0, y: 10, duration: 0.5, ease: "power2.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .credits-section {
          background: #0a0f1e;
          padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 6rem);
          border-top: 1px solid rgba(255,255,255,0.06);
          position: relative;
        }
        .credits-title-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 28px;
        }
        .credits-title {
          font-family: var(--font-dm-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.85);
          text-transform: uppercase;
        }
        .credits-subtitle {
          font-family: var(--font-dm-mono, monospace);
          font-size: 9px;
          letter-spacing: 0.12em;
          color: rgba(94, 180, 255, 0.5);
          text-transform: uppercase;
        }

        .crew-grid {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: clamp(1.5rem, 4vw, 3rem);
          position: relative;
        }
        .crew-seam {
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(94, 180, 255, 0.2) 15%,
            rgba(94, 180, 255, 0.2) 85%,
            transparent
          );
        }

        .crew-col { min-width: 0; }

        .crew-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .crew-icon {
          font-family: var(--font-dm-mono, monospace);
          font-size: 14px;
          color: #5eb4ff;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(94, 180, 255, 0.3);
          border-radius: 4px;
          background: rgba(94, 180, 255, 0.06);
        }
        .crew-label {
          font-family: var(--font-dm-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
        }
        .crew-tag {
          font-family: var(--font-dm-mono, monospace);
          font-size: 8.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-top: 2px;
        }

        .credit-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .credit-index {
          font-family: var(--font-dm-mono, monospace);
          font-size: 9px;
          color: rgba(94, 180, 255, 0.4);
          width: 18px;
          flex-shrink: 0;
        }
        .credit-name {
          font-family: var(--font-dm-mono, monospace);
          font-size: 10.5px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          white-space: nowrap;
        }
        .credit-leader {
          flex: 1;
          border-bottom: 1px dotted rgba(255,255,255,0.1);
          transform: translateY(-3px);
        }
        .credit-reg {
          font-family: var(--font-dm-mono, monospace);
          font-size: 9px;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.28);
          white-space: nowrap;
        }

        @media (max-width: 700px) {
          .crew-grid { grid-template-columns: 1fr; gap: 2rem; }
          .crew-seam { display: none; }
        }
      `}</style>
      <section className="credits-section" ref={ref} id={id}>
        <div className="credits-title-row">
          <span className="credits-title">Project Credits</span>
          <span className="credits-subtitle">Two Crews, One Crash Landing</span>
        </div>
        <div className="crew-grid">
          <CrewColumn
            label="Airframe & Systems"
            tag="Hardware · Flight · Firmware"
            icon="✈"
            members={drone}
          />
          <div className="crew-seam" />
          <CrewColumn
            label="Ground Control"
            tag="Web · Design · Deployment"
            icon="{ }"
            members={web}
          />
        </div>
      </section>
    </>
  );
}