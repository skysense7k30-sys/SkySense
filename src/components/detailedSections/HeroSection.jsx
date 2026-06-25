"use client";

import { useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroModel = dynamic(() => import("./HeroModel"), {
  ssr: false,
  loading: () => null,
});

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  const sceneRef = useRef(null);

  const handleSceneReady = useCallback(() => {
    const el = sceneRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.setAttribute("data-visible", "true");
      });
    });
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "#080809",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        .scene-layer {
          opacity: 0;
          transition: opacity 2.4s ease-out 0.4s;
        }
        .scene-layer[data-visible="true"] {
          opacity: 1;
        }

        .hero-cta-primary {
          all: unset;
          box-sizing: border-box;
          display: inline-block;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.025em;
          color: rgba(255, 255, 255, 0.88);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          padding: 13px 30px;
          border: 0.5px solid rgba(255, 255, 255, 0.14);
          border-radius: 2px;
          cursor: pointer;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.08) inset,
            0 12px 32px -8px rgba(0, 0, 0, 0.4);
          transition: background 0.4s, border-color 0.4s, color 0.4s, box-shadow 0.4s;
        }
        .hero-cta-primary:hover {
          background: rgba(255, 255, 255, 0.13);
          border-color: rgba(255, 255, 255, 0.22);
          color: rgba(255, 255, 255, 0.96);
        }

        .hero-cta-ghost {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.025em;
          color: rgba(255, 255, 255, 0.28);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: color 0.5s;
        }
        .hero-cta-ghost:hover {
          color: rgba(255, 255, 255, 0.62);
        }

        .hero-scroll-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px 6px 12px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 0.5px solid rgba(255, 255, 255, 0.07);
          border-radius: 100px;
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset;
        }
      `}</style>

      {/* ── 3D scene — full bleed ─────────────────────────────────────────── */}
      <div
        ref={sceneRef}
        className="scene-layer"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      >
        <HeroModel onReady={handleSceneReady} />
      </div>

      {/* ── Vignettes — top, bottom only; no left panel ───────────────────── */}
      <div aria-hidden style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 120% 100% at 50% 50%, transparent 35%, rgba(8,8,9,0.55) 100%)", pointerEvents:"none", zIndex:2 }} />
      <div aria-hidden style={{ position:"absolute", top:0, left:0, right:0, height:"18%", background:"linear-gradient(to bottom, #080809 0%, transparent 100%)", pointerEvents:"none", zIndex:2 }} />
      <div aria-hidden style={{ position:"absolute", bottom:0, left:0, right:0, height:"20%", background:"linear-gradient(to top, rgba(8,8,9,0.8) 0%, transparent 100%)", pointerEvents:"none", zIndex:2 }} />

      {/* ── Top-right: subheading ─────────────────────────────────────────── */}
      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.8 }}
        style={{
          position: "absolute",
          top: "clamp(4rem, 8vw, 7rem)",
          right: "clamp(1.5rem, 5vw, 5rem)",
          zIndex: 4,
          margin: 0,
          maxWidth: "240px",
          textAlign: "right",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "clamp(0.8rem, 0.95vw, 0.9rem)",
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.32)",
          fontWeight: 400,
          letterSpacing: "0.008em",
        }}
      >
        An autonomous quadcopter built to sense temperature and humidity, stream live video, and navigate on its own.
      </motion.p>

      {/* ── Bottom-left: headline + CTAs + scroll ────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(3rem, 6vw, 5.5rem)",
          left: "clamp(12rem, 5vw, 5rem)",
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          fontFamily: "'Instrument Sans', sans-serif",
          maxWidth: "680px",
        }}
      >
        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          style={{
            margin: 0,
            fontSize: "clamp(3.6rem, 7vw, 7.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.046em",
            lineHeight: 0.96,
            color: "rgba(255,255,255,0.93)",
          }}
        >
          Skies that
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.22)" }}>
            sense
          </em>
          <br />
          everything.
        </motion.h1>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.45 }}
          style={{ display: "flex", alignItems: "center", gap: "2.2rem", flexWrap: "wrap" }}
        >
          <button type="button" className="hero-cta-primary">
            Explore Skysense
          </button>
          <button type="button" className="hero-cta-ghost">
            See it in action&nbsp;→
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.9 }}
        >
          <div className="hero-scroll-pill">
            <div
              style={{
                width: "1px",
                height: "28px",
                background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18))",
              }}
            />
            <span
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.16)",
              }}
            >
              Scroll
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}