"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROADMAP = [
  {
    code: "WP-01",
    title: "AI-Powered Flight Planning",
    desc: "Automatically generate the safest and most efficient flight routes.",
    tag: "Next Up",
    status: "active",
    offset: -18,
    span: "wide",
    icon: "route",
  },
  {
    code: "WP-02",
    title: "Real-Time Drone Tracking",
    desc: "Live GPS tracking with mission monitoring and location updates.",
    tag: "In Design",
    status: "progress",
    offset: 30,
    span: "narrow",
    icon: "beacon",
  },
  {
    code: "WP-03",
    title: "Autonomous Mission Execution",
    desc: "Enable waypoint-based autonomous flights with minimal human intervention.",
    tag: "Planned",
    status: "queued",
    offset: -8,
    span: "wide",
    icon: "drone",
  },
  {
    code: "WP-04",
    title: "3D Mapping & Digital Twin",
    desc: "Create accurate 3D terrain models and digital twins for inspection and surveying.",
    tag: "Planned",
    status: "queued",
    offset: 44,
    span: "narrow",
    icon: "layers",
  },
  {
    code: "WP-05",
    title: "Cloud Analytics & Fleet Management",
    desc: "Store flight data securely, analyze mission performance, and manage multiple drones from one dashboard.",
    tag: "Horizon",
    status: "horizon",
    offset: -24,
    span: "wide",
    icon: "cloud",
  },
];

const ICONS = {
  route: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="6" cy="24" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="26" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="16" r="1.6" fill="currentColor" />
      <path d="M8 22.5L16.5 17M17.5 15L24 9.5" stroke="currentColor" strokeWidth="1.4" strokeDasharray="1 3.4" strokeLinecap="round" />
    </svg>
  ),
  beacon: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="14" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 20V27" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 25.5H21.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 9.5C6.5 12.5 6.5 15.5 9 18.5M23 9.5C25.5 12.5 25.5 15.5 23 18.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
    </svg>
  ),
  drone: (
    <svg viewBox="0 0 32 32" fill="none">
      <rect x="13.4" y="13.4" width="5.2" height="5.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13.4 13.4L7 7M18.6 13.4L25 7M13.4 18.6L7 25M18.6 18.6L25 25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="25" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="7" cy="25" r="2.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="25" cy="25" r="2.2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M16 7L27 13L16 19L5 13L16 7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M5 18.5L16 24.5L27 18.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M10.5 21.5C7.8 21.5 5.8 19.5 5.8 17C5.8 14.7 7.4 12.9 9.5 12.6C10 9.9 12.4 8 15.2 8C18.2 8 20.7 10.2 21 13.1C23.4 13.5 25.2 15.5 25.2 18C25.2 20 23.6 21.5 21.5 21.5H10.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 25L14.5 22M16 25L18.5 21.5M20 25L22 22.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
};

const Corners = () => (
  <>
    <span className="fe-corner fe-corner-tl" />
    <span className="fe-corner fe-corner-tr" />
    <span className="fe-corner fe-corner-bl" />
    <span className="fe-corner fe-corner-br" />
  </>
);

export default function FutureEnhancementsSection() {
  const ref = useRef(null);
  const lineRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fe-label", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        opacity: 0, y: 16, duration: 0.5,
      });
      gsap.from(".fe-heading", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 50, opacity: 0, duration: 0.7, ease: "power3.out",
      });
      gsap.from(".fe-sub", {
        scrollTrigger: { trigger: ref.current, start: "top 72%" },
        y: 24, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.1,
      });

      // Scroll-driven line fill running the length of the track
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 65%",
            end: "bottom 85%",
            scrub: 0.6,
          },
        }
      );

      // Each node: card sweeps in from its side as it enters view
      gsap.utils.toArray(".fe-node").forEach((node) => {
        const card = node.querySelector(".fe-card");
        const fromRight = node.classList.contains("fe-node-right");
        gsap.from(card, {
          opacity: 0,
          x: fromRight ? 36 : -36,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 80%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .fe-section { background: #06060a; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .fe-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 16px; }
        .fe-heading { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; line-height: 1.05; margin-bottom: 18px; max-width: 760px; }
        .fe-heading em { color: #3b5bdb; font-style: normal; }
        .fe-sub { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,0.4); max-width: 540px; margin-bottom: 84px; }

        /* ---- Asymmetric center-spine timeline ---- */
        .fe-track { position: relative; max-width: 980px; margin: 0 auto; }

        .fe-spine { position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; background: rgba(255,255,255,0.06); transform: translateX(-50%); overflow: hidden; }
        .fe-line { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, #3b5bdb, #1e3a8a); transform-origin: top; }

        .fe-node { position: relative; display: grid; grid-template-columns: 1fr 60px 1fr; align-items: start; margin-bottom: 30px; }
        .fe-node:last-child { margin-bottom: 0; }

        .fe-node-center { position: relative; display: flex; justify-content: center; padding-top: 6px; }
        .fe-dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.1); z-index: 2; }

        .fe-node-left .fe-card-slot { grid-column: 1; display: flex; justify-content: flex-end; }
        .fe-node-left .fe-node-center { grid-column: 2; }
        .fe-node-left .fe-spacer { grid-column: 3; }

        .fe-node-right .fe-spacer { grid-column: 1; }
        .fe-node-right .fe-node-center { grid-column: 2; }
        .fe-node-right .fe-card-slot { grid-column: 3; display: flex; justify-content: flex-start; }

        /* ---- Waypoint card ---- */
        .fe-card {
          --fe-accent: #3b5bdb;
          background:
            linear-gradient(0deg, rgba(59,91,219,0.05), rgba(59,91,219,0.05)),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 22px),
            #0a0a12;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 22px 24px 24px;
          position: relative;
          overflow: hidden;
          width: 100%;
          transition: border-color 0.25s ease, background-color 0.25s ease;
        }
        .fe-node-left .fe-card { max-width: 380px; }
        .fe-node-right .fe-card { max-width: 300px; }
        .fe-card.fe-wide { max-width: 420px; }
        .fe-card.fe-narrow { max-width: 280px; }

        .fe-card:hover { border-color: rgba(59,91,219,0.35); }

        /* corner reticle marks */
        .fe-corner { position: absolute; width: 9px; height: 9px; border: 1px solid var(--fe-accent); opacity: 0.35; transition: opacity 0.25s ease, width 0.25s ease, height 0.25s ease; }
        .fe-corner-tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .fe-corner-tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
        .fe-corner-bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
        .fe-corner-br { bottom: -1px; right: -1px; border-left: none; border-top: none; }
        .fe-card:hover .fe-corner { opacity: 0.9; width: 13px; height: 13px; }

        .fe-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 16px; }

        .fe-code { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.16em; color: rgba(255,255,255,0.3); }

        .fe-tag { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-dm-mono, monospace); font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.55); white-space: nowrap; }
        .fe-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--fe-accent); flex-shrink: 0; }
        .fe-tag-dot.is-active { box-shadow: 0 0 0 3px rgba(59,91,219,0.18); }
        .fe-tag-dot.is-queued,
        .fe-tag-dot.is-horizon { background: rgba(255,255,255,0.28); }

        .fe-icon { width: 30px; height: 30px; color: var(--fe-accent); opacity: 0.85; margin-bottom: 14px; }
        .fe-icon svg { width: 100%; height: 100%; }

        .fe-title { font-family: var(--font-bebas-neue, sans-serif); font-size: 1.5rem; letter-spacing: 0.03em; color: #fff; margin-bottom: 8px; }
        .fe-desc { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.88rem; line-height: 1.7; color: rgba(255,255,255,0.42); }

        .fe-signal { display: flex; gap: 3px; margin-top: 18px; }
        .fe-signal span { height: 3px; flex: 1; background: rgba(255,255,255,0.08); }
        .fe-signal span.is-filled { background: var(--fe-accent); opacity: 0.5; }

        @media (max-width: 760px) {
          .fe-track { max-width: 100%; }
          .fe-node, .fe-node-left, .fe-node-right { grid-template-columns: 32px 1fr !important; }
          .fe-node-left .fe-node-center, .fe-node-right .fe-node-center { grid-column: 1 !important; padding-top: 4px; }
          .fe-node-left .fe-card-slot, .fe-node-right .fe-card-slot { grid-column: 2 !important; justify-content: flex-start !important; }
          .fe-node-left .fe-spacer, .fe-node-right .fe-spacer { display: none; }
          .fe-spine { left: 16px; }
          .fe-node-left .fe-card, .fe-node-right .fe-card, .fe-card.fe-wide, .fe-card.fe-narrow { max-width: 100%; }
        }
      `}</style>
      <section className="fe-section" ref={ref}>
        <div className="fe-label">Roadmap</div>
        <h2 className="fe-heading">The next chapter<br /><em>is already in motion.</em></h2>
        <p className="fe-sub">
          Skysense doesn't stop at one build. Here's what's queued up to push the platform from a working prototype into a full autonomous fleet system.
        </p>

        <div className="fe-track" ref={trackRef}>
          <div className="fe-spine">
            <div className="fe-line" ref={lineRef} />
          </div>
          {ROADMAP.map((item, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            const filled = ROADMAP.length - i;
            return (
              <div
                className={`fe-node fe-node-${side}`}
                key={item.title}
                style={{ transform: `translateY(${item.offset}px)` }}
              >
                <div className="fe-spacer" />
                <div className="fe-node-center">
                  <div className="fe-dot" />
                </div>
                <div className="fe-card-slot">
                  <div className={`fe-card fe-${item.span}`}>
                    <Corners />
                    <div className="fe-card-top">
                      <span className="fe-code">{item.code}</span>
                      <span className="fe-tag">
                        <span className={`fe-tag-dot is-${item.status}`} />
                        {item.tag}
                      </span>
                    </div>
                    <div className="fe-icon">{ICONS[item.icon]}</div>
                    <div className="fe-title">{item.title}</div>
                    <div className="fe-desc">{item.desc}</div>
                    <div className="fe-signal">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <span key={s} className={s < filled ? "is-filled" : ""} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}