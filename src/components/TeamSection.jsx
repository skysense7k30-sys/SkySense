"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAM } from "../data/constants";

gsap.registerPlugin(ScrollTrigger);

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function RailTag({ member, position }) {
  return (
    <div className={`rail-tag rail-tag--${position}`}>
      <span className="rail-badge">{initials(member.name)}</span>
      <span className="rail-name">{member.name}</span>
    </div>
  );
}

export default function TeamCredits({ id }) {
  const ref = useRef(null);

  const drone = TEAM.filter((m) => m.team === "drone");
  const web = TEAM.filter((m) => m.team === "web");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rail-tag--top", {
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        opacity: 0,
        y: -14,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.from(".rail-tag--bottom", {
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        opacity: 0,
        y: 14,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.from(".rail-line", {
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        scaleX: 0,
        duration: 0.9,
        ease: "power3.inOut",
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
          overflow: hidden;
        }
        .credits-title-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 48px;
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

        /* ---- Flight rail ---- */
        .flight-rail {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .rail-endpoint {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-dm-mono, monospace);
          font-size: 11px;
          color: #5eb4ff;
          background: #0a0f1e;
          border: 1px solid rgba(94, 180, 255, 0.35);
          z-index: 2;
        }
        .rail-endpoint--start { left: -13px; }
        .rail-endpoint--end { right: -13px; }

        .rail-row {
          display: flex;
          flex-wrap: wrap;
          column-gap: clamp(1.5rem, 4vw, 3.25rem);
          row-gap: 22px;
          padding-left: 40px;
          padding-right: 40px;
        }
        .rail-row--top {
          align-items: flex-end;
          padding-bottom: 26px;
        }
        .rail-row--bottom {
          align-items: flex-start;
          padding-top: 26px;
        }

        .rail-line {
          position: relative;
          height: 1px;
          margin: 0 14px;
          transform-origin: left center;
          background-image: repeating-linear-gradient(
            90deg,
            rgba(94, 180, 255, 0.45) 0px,
            rgba(94, 180, 255, 0.45) 1px,
            transparent 1px,
            transparent 9px
          );
        }

        .rail-axis {
          position: absolute;
          top: 50%;
          writing-mode: vertical-rl;
          transform: translateY(-50%) rotate(180deg);
          font-family: var(--font-dm-mono, monospace);
          font-size: 8.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          white-space: nowrap;
        }
        .rail-axis--top { top: 26%; }
        .rail-axis--bottom { top: 74%; }

        .rail-tag {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .rail-tag--top { flex-direction: column-reverse; }

        .rail-tag::after {
          content: "";
          position: absolute;
          left: 50%;
          width: 1px;
          height: 24px;
          background: linear-gradient(
            to bottom,
            rgba(94, 180, 255, 0.5),
            rgba(94, 180, 255, 0)
          );
        }
        .rail-tag--top::after {
          bottom: -24px;
        }
        .rail-tag--bottom::after {
          top: -24px;
          background: linear-gradient(
            to top,
            rgba(94, 180, 255, 0.5),
            rgba(94, 180, 255, 0)
          );
        }
        .rail-tag::before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #5eb4ff;
          box-shadow: 0 0 0 3px rgba(94, 180, 255, 0.15);
        }
        .rail-tag--top::before { bottom: -26px; }
        .rail-tag--bottom::before { top: -26px; }

        .rail-badge {
          font-family: var(--font-dm-mono, monospace);
          font-size: 9.5px;
          letter-spacing: 0.04em;
          color: #5eb4ff;
          width: 26px;
          height: 26px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(94, 180, 255, 0.3);
          background: rgba(94, 180, 255, 0.06);
          flex-shrink: 0;
        }
        .rail-name {
          font-family: var(--font-dm-mono, monospace);
          font-size: 10.5px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          white-space: nowrap;
        }

        @media (max-width: 700px) {
          .rail-row {
            padding-left: 0;
            padding-right: 0;
            justify-content: flex-start;
          }
          .rail-axis { display: none; }
          .rail-endpoint { display: none; }
          .rail-line { margin: 0; }
        }
      `}</style>
      <section className="credits-section" ref={ref} id={id}>
        <div className="credits-title-row">
          <span className="credits-title">Project Credits</span>
          <span className="credits-subtitle">Two Crews, One Flight Path</span>
        </div>

        <div className="flight-rail">
          <div className="rail-row rail-row--top">
            {drone.map((m) => (
              <RailTag key={m.name} member={m} position="top" />
            ))}
          </div>

          <div className="rail-line">
            <span className="rail-endpoint rail-endpoint--start">✈</span>
            <span className="rail-axis rail-axis--top">Airframe &amp; Systems</span>
            <span className="rail-axis rail-axis--bottom">Ground Control</span>
            <span className="rail-endpoint rail-endpoint--end">{"{ }"}</span>
          </div>

          <div className="rail-row rail-row--bottom">
            {web.map((m) => (
              <RailTag key={m.name} member={m} position="bottom" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}