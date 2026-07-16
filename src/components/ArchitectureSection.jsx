"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Script from "next/script";
import { SUBSYSTEMS } from "../data/constants";

gsap.registerPlugin(ScrollTrigger);

function ModelPanel({ src, label, anchorEl, cardIndex }) {
  const [style, setStyle] = useState({});
  const panelRef = useRef(null);

  useEffect(() => {
    if (!anchorEl) return;

    const PANEL_W = 150;
    const GAP = 16;

    const rect = anchorEl.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const vw = window.innerWidth;

    const top = rect.top + scrollY + rect.height / 2;

    // Flip to left for rightmost card or if not enough room on right
    const spaceRight = vw - rect.right;
    const flipLeft = cardIndex === 2 || spaceRight < PANEL_W + GAP + 16;

    const left = flipLeft
      ? rect.left + scrollX - GAP - PANEL_W
      : rect.right + scrollX + GAP;

    setStyle({
      position: "absolute",
      top,
      left,
      transform: "translateY(-50%)",
      width: PANEL_W,
      background: "#06060c",
      border: "1px solid rgba(255,255,255,0.12)",
      boxShadow: "0 16px 40px rgba(0,0,0,0.55)",
      zIndex: 9999,
      pointerEvents: "auto",
      cursor: "default",
      animation: flipLeft ? "arc2-panel-in-left 0.18s ease" : "arc2-panel-in 0.18s ease",
    });
  }, [anchorEl, cardIndex]);

  if (!anchorEl) return null;

  return createPortal(
    <div ref={panelRef} style={style}>
      <div style={{ width: "100%", height: 130, background: "radial-gradient(circle at 50% 40%, #14182a, #06060c)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <model-viewer
          src={src}
          auto-rotate
          auto-rotate-delay="0"
          rotation-per-second="30deg"
          disable-zoom
          disable-pan
          shadow-intensity="1"
          exposure="0.9"
          loading="eager"
          style={{ width: "100%", height: "100%", "--poster-color": "transparent" }}
        >
          <div slot="poster" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: "8.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", textAlign: "center", padding: 8 }}>
            Loading...
          </div>
        </model-viewer>
      </div>
      <div style={{ padding: "8px 10px", fontFamily: "monospace", fontSize: "8.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
        {label}
      </div>
    </div>,
    document.body
  );
}

export default function ArchitectureSection({ id }) {
  const ref = useRef(null);
  const [active, setActive] = useState(null);
  const [hoveredComp, setHoveredComp] = useState(null); // { key, el, cardIndex }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".arc2-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".arc2-heading", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, y: 50, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".arc2-card", { scrollTrigger: { trigger: ref.current, start: "top 70%" }, y: 60, opacity: 0, stagger: 0.15, duration: 0.7, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />
      <style>{`
        @keyframes arc2-panel-in {
          from { opacity: 0; transform: translateY(-50%) translateX(-6px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes arc2-panel-in-left {
          from { opacity: 0; transform: translateY(-50%) translateX(6px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }

        .arc2-section { background: #0a0f1e; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .arc2-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 16px; }
        .arc2-heading { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; line-height: 1.05; margin-bottom: 56px; max-width: 680px; }
        .arc2-heading em { color: #3b5bdb; font-style: normal; }
        .arc2-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: rgba(255,255,255,0.05); }
        .arc2-card { background: #0a0f1e; padding: 36px 32px; cursor: pointer; transition: background 0.25s; position: relative; }
        .arc2-card::after { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease; }
        .arc2-card.arc2-0::after { background: #3b5bdb; }
        .arc2-card.arc2-1::after { background: #1e3a8a; }
        .arc2-card.arc2-2::after { background: #5b7fff; }
        .arc2-card.open::after { transform: scaleX(1); }
        .arc2-card.open { background: #0e0e1e; }
        .arc2-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; }
        .arc2-glyph { font-size: 2.2rem; line-height: 1; transition: transform 0.3s, color 0.3s; }
        .arc2-card.open .arc2-glyph { transform: scale(1.2); }
        .arc2-num { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.14em; color: rgba(255,255,255,0.2); }
        .arc2-card-title { font-family: var(--font-bebas-neue, sans-serif); font-size: 1.6rem; letter-spacing: 0.04em; color: #fff; margin-bottom: 6px; }
        .arc2-stat-badge { display: inline-block; font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; margin-bottom: 12px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); }
        .arc2-card-detail { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.84rem; line-height: 1.7; color: rgba(255,255,255,0.35); margin-bottom: 16px; max-height: 0; overflow: hidden; transition: max-height 0.4s ease, opacity 0.3s; opacity: 0; }
        .arc2-card.open .arc2-card-detail { max-height: 200px; opacity: 1; }
        .arc2-components { display: flex; flex-direction: column; gap: 0; max-height: 0; overflow: hidden; transition: max-height 0.45s ease, opacity 0.35s; opacity: 0; }
        .arc2-card.open .arc2-components { max-height: 600px; opacity: 1; }
        .arc2-comp { position: relative; padding: 12px 0; border-top: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 3px; transition: padding-left 0.2s; }
        .arc2-comp.has-model { cursor: pointer; }
        .arc2-comp.has-model:hover { padding-left: 8px; }
        .arc2-comp-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .arc2-comp-name { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.86rem; font-weight: 500; color: rgba(255,255,255,0.85); }
        .arc2-comp-role { font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.06em; color: rgba(255,255,255,0.28); }
        .arc2-comp-cube { font-size: 11px; color: rgba(255,255,255,0.2); transition: color 0.2s, transform 0.2s; flex-shrink: 0; }
        .arc2-comp.has-model:hover .arc2-comp-cube { color: #3b5bdb; transform: rotate(15deg); }
        .arc2-hint { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.18em; color: rgba(255,255,255,0.15); text-transform: uppercase; margin-top: 24px; text-align: center; }

        @media (max-width: 860px) {
          .arc2-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="arc2-section" ref={ref} id={id}>
        <div className="arc2-label">System Architecture</div>
        <h2 className="arc2-heading">Three subsystems.<br />One <em>coordinated</em> platform.</h2>
        <div className="arc2-grid">
          {SUBSYSTEMS.map((s, i) => {
            const isOpen = active === s.id;
            return (
              <div
                key={s.id}
                className={`arc2-card arc2-${i}${isOpen ? " open" : ""}`}
                onClick={() => setActive(isOpen ? null : s.id)}
              >
                <div className="arc2-card-top">
                  <span className="arc2-glyph" style={{ color: isOpen ? s.color : "rgba(255,255,255,0.15)" }}>{s.glyph}</span>
                  <span className="arc2-num">{s.num}</span>
                </div>
                <div className="arc2-card-title">{s.label}</div>
                <div
                  className="arc2-stat-badge"
                  style={isOpen ? { background: s.color + "22", color: s.color } : {}}
                >
                  {s.stat} · {s.statLabel}
                </div>
                <div className="arc2-card-detail">{s.detail}</div>
                <div className="arc2-components">
                  {s.components.map((c, ci) => {
                    const key = `${s.id}-${ci}`;
                    const isHovered = hoveredComp?.key === key;
                    return (
                      <div
                        key={c.name}
                        className={`arc2-comp${c.model ? " has-model" : ""}`}
                        onMouseEnter={(e) => {
                          if (c.model) {
                            setHoveredComp({ key, el: e.currentTarget, cardIndex: i });
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) {
                            setHoveredComp(null);
                          }
                        }}
                      >
                        <div className="arc2-comp-row">
                          <span className="arc2-comp-name">{c.name}</span>
                          {c.model && <span className="arc2-comp-cube">◇</span>}
                        </div>
                        <span className="arc2-comp-role">{c.role}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="arc2-hint">↑ Tap a subsystem to expand component detail</div>
      </section>

      {/* Portal-rendered panel — completely outside card DOM, never clipped */}
      {hoveredComp && (() => {
        const allComps = SUBSYSTEMS.flatMap(s => s.components);
        const [subsystemId, ci] = hoveredComp.key.split("-");
        const subsystem = SUBSYSTEMS.find(s => s.id === subsystemId);
        const comp = subsystem?.components[parseInt(ci)];
        if (!comp?.model) return null;
        return (
          <ModelPanel
            src={comp.model}
            label={comp.name}
            anchorEl={hoveredComp.el}
            cardIndex={hoveredComp.cardIndex}
          />
        );
      })()}
    </>
  );
}
