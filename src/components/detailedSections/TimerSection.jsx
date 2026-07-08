"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const HeroModel = dynamic(() => import("./HeroModel2"), {
  ssr: false,
  loading: () => null,
});

// Structural animations matching the industrial dashboard theme
const panelSlideIn = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const viewPortReveal = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

const telemetryFade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.6 },
  },
};

const telemetryItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function getTimeLeft(target) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff <= 0,
  };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

// Rapid flash animation for numbers when they change
function DashboardDigit({ value }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0.3, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0.3, filter: "blur(2px)" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function DashboardSegment({ value, label }) {
  const str = pad(value);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
      <span
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        {label}
      </span>
      <div
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 0.95,
          color: "#ffffff",
          display: "flex",
          gap: "2px",
        }}
      >
        {str.split("").map((ch, i) => (
          <DashboardDigit key={i} value={ch} />
        ))}
      </div>
    </div>
  );
}

// Infinite horizontal-scrolling marquee band
function InfiniteMarquee({ text = "SKYSENSE", repeat = 8 }) {
  const items = Array.from({ length: repeat });
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "1rem 0",
        zIndex: 5,
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 18s linear infinite;
        }
        .marquee-track span {
          font-family: 'Instrument Sans', sans-serif;
          font-size: clamp(1.4rem, 3.5vw, 2.6rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.08);
          -webkit-text-stroke: 1px rgba(255,255,255,0.25);
          padding: 0 2rem;
          white-space: nowrap;
        }
      `}</style>
      <div className="marquee-track">
        {items.map((_, i) => (
          <span key={`a-${i}`}>{text}</span>
        ))}
        {items.map((_, i) => (
          <span key={`b-${i}`}>{text}</span>
        ))}
      </div>
    </div>
  );
}

// Replace with your actual Cloudinary-hosted audio URL, e.g.
// "https://res.cloudinary.com/<cloud_name>/video/upload/v.../ambient-track.mp3"
// (Cloudinary serves audio files under the "video" resource type.)
const BG_MUSIC_URL =
  "https://res.cloudinary.com/nkbnbi5p/video/upload/v1783496436/Aerial_torque_2_qsvzks.mp3";

// One-shot flash-then-reveal animation shown the instant the countdown
// hits zero: a quick white flash, followed by "Welcome to SkySense"
// scaling/fading in over a dark overlay, then the whole thing dissolves.
function WelcomeFlash() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.4, times: [0, 0.05, 0.85, 1], ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#060913",
        pointerEvents: "none",
      }}
    >
      {/* Sharp white flash on entry */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background: "#ffffff",
        }}
      />
      <motion.h1
        initial={{ opacity: 0, scale: 0.85, letterSpacing: "0.05em" }}
        animate={{ opacity: 1, scale: 1, letterSpacing: "-0.02em" }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(2rem, 6vw, 4.5rem)",
          color: "#ffffff",
          margin: 0,
          textAlign: "center",
          padding: "0 1rem",
        }}
      >
        Welcome to SkySense
      </motion.h1>
    </motion.div>
  );
}

export default function TimerSection({ id, targetDate = "2026-07-16T18:00:00" }) {
  const sceneRef = useRef(null);
  const audioRef = useRef(null);
  const target = useRef(new Date(targetDate));
  const [time, setTime] = useState(null);
  const [muted, setMuted] = useState(false);

  const handleSceneReady = useCallback(() => {
    const el = sceneRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.setAttribute("data-visible", "true");
      });
    });
  }, []);

  useEffect(() => {
    setTime(getTimeLeft(target.current));
    const interval = setInterval(() => {
      setTime(getTimeLeft(target.current));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Every major browser blocks sound-on autoplay until the user has
  // interacted with the page. Start muted + looping immediately, then
  // unmute either via the toggle button or on the visitor's first
  // click/keypress anywhere on the page.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1;
    audio.loop = true;

    const tryPlay = () => audio.play().catch(() => {});
    tryPlay();

    const unlockOnGesture = () => {
      tryPlay();
      window.removeEventListener("pointerdown", unlockOnGesture);
      window.removeEventListener("keydown", unlockOnGesture);
    };
    window.addEventListener("pointerdown", unlockOnGesture);
    window.addEventListener("keydown", unlockOnGesture);

    return () => {
      window.removeEventListener("pointerdown", unlockOnGesture);
      window.removeEventListener("keydown", unlockOnGesture);
    };
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      const audio = audioRef.current;
      if (audio) {
        audio.muted = next;
        if (!next) audio.play().catch(() => {});
      }
      return next;
    });
  }, []);

  const display = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

  // Fire the welcome flash exactly once, the moment the countdown hits zero.
  const [showWelcomeFlash, setShowWelcomeFlash] = useState(false);
  const hasFlashedRef = useRef(false);

  useEffect(() => {
    if (display.done && !hasFlashedRef.current) {
      hasFlashedRef.current = true;
      setShowWelcomeFlash(true);
      const timer = setTimeout(() => setShowWelcomeFlash(false), 2400);
      return () => clearTimeout(timer);
    }
  }, [display.done]);

  return (
    <section
      id={id}
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "#060913",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(1.5rem, 4vw, 3rem)",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        .scene-container {
          opacity: 0;
          transform: scale(0.96);
          transition: opacity 2s ease-out 0.2s, transform 2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
          pointer-events: none;
        }
        .scene-container[data-visible="true"] {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      {/* Looping Cloudinary background audio (see BG_MUSIC_URL above) */}
      <audio ref={audioRef} src={BG_MUSIC_URL} loop muted={muted} preload="auto" />

      {/* One-time "Welcome to SkySense" flash, shown when countdown hits 0 */}
      <AnimatePresence>{showWelcomeFlash && <WelcomeFlash key="welcome-flash" />}</AnimatePresence>


      {/* ── HEADER TELEMETRY STRIP ──────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          paddingBottom: "1.5rem",
          zIndex: 10,
          fontFamily: "'Instrument Sans', sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: display.done ? "#10b981" : "#f59e0b",
              boxShadow: display.done ? "0 0 12px #10b981" : "0 0 12px #f59e0b",
            }}
          />
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>
            {display.done ? "System: Operational" : "System: Countdown Mode"}
          </div>
        </div>

        <button
          type="button"
          onClick={toggleMute}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "3px",
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "0.4rem 0.75rem",
            cursor: "pointer",
          }}
          aria-pressed={!muted}
          aria-label={muted ? "Unmute background audio" : "Mute background audio"}
        >
          {muted ? "🔇 Audio Off" : "🔊 Audio On"}
        </button>
      </div>

      {/* ── MAIN ASYMMETRIC CONTENT GRID ────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          flexGrow: 1,
          alignItems: "center",
          gap: "3rem",
          margin: "2rem 0",
          zIndex: 5,
        }}
        className="main-layout-grid"
      >
        <style>{`
          .main-layout-grid {
            grid-template-columns: 1.2fr 1fr;
          }
          @media (max-width: 960px) {
            .main-layout-grid {
              grid-template-columns: 1fr;
            }
            .model-viewport-wrapper {
              height: 40svh !important;
            }
          }
        `}</style>

        {/* Left Column: Bold Industrial Counter & Caption */}
        <motion.div variants={panelSlideIn} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h2 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 500, color: "#fff", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {display.done ? "SkySense Active." : "Next Gen Flight Telemetry."}
            </h2>
          </div>

          {/* Grid of counter blocks */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem 0" }}>
            <DashboardSegment value={display.days} label="Days" />
            <DashboardSegment value={display.hours} label="Hrs" />
            <DashboardSegment value={display.minutes} label="Min" />
            <DashboardSegment value={display.seconds} label="Sec" />
          </div>

          <p style={{ margin: 0, fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255,255,255,0.45)", maxWidth: "600px" }}>
            {display.done
              ? "The platform has fully synchronized. Real-time sensory fields, remote asset mapping, and spatial coordination tools are now live."
              : "This website serves as the official landing page for our self-built drone project, showcasing its design, development journey, and core capabilities. Built entirely by our team, the drone reflects our passion for innovation, engineering, and problem-solving. Here, you'll find insights into the technologies we used, the challenges we overcame, and the features that make our drone unique. The website highlights our vision, technical achievements, and the dedication behind transforming an idea into a fully functional aerial system."}
          </p>
        </motion.div>

        {/* Right Column: Framed Viewport for the 3D Model */}
        <motion.div
          variants={viewPortReveal}
          initial="hidden"
          animate="show"
          className="model-viewport-wrapper"
          style={{
            position: "relative",
            height: "55svh",
            background: "linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {/* Tech Reticles/Crosshairs Overlay */}
          <div style={{ position: "absolute", top: "12px", left: "12px", width: "8px", height: "8px", borderTop: "1px solid rgba(255,255,255,0.3)", borderLeft: "1px solid rgba(255,255,255,0.3)", pointerEvents: "none", zIndex: 3 }} />
          <div style={{ position: "absolute", top: "12px", right: "12px", width: "8px", height: "8px", borderTop: "1px solid rgba(255,255,255,0.3)", borderRight: "1px solid rgba(255,255,255,0.3)", pointerEvents: "none", zIndex: 3 }} />
          <div style={{ position: "absolute", bottom: "12px", left: "12px", width: "8px", height: "8px", borderBottom: "1px solid rgba(255,255,255,0.3)", borderLeft: "1px solid rgba(255,255,255,0.3)", pointerEvents: "none", zIndex: 3 }} />
          <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "8px", height: "8px", borderBottom: "1px solid rgba(255,255,255,0.3)", borderRight: "1px solid rgba(255,255,255,0.3)", pointerEvents: "none", zIndex: 3 }} />

          <div style={{ position: "absolute", bottom: "12px", left: "30px", fontFamily: "'Instrument Sans', sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", zIndex: 3, textTransform: "uppercase" }}>
            M_MODEL // SCALE 1.0
          </div>

          <div
            ref={sceneRef}
            className="scene-container"
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
            }}
          >
            <HeroModel onReady={handleSceneReady} />
          </div>

          {/* Subtle vignette localized purely inside the viewport framework */}
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, transparent 20%, rgba(10,10,12,0.6) 100%)", pointerEvents: "none", zIndex: 2 }} />
        </motion.div>
      </div>

      {/* ── INFINITE SKYSENSE MARQUEE ───────────────────────────────────── */}
      <InfiniteMarquee text="SKYSENSE" />

      {/* ── FOOTER DATA READOUTS ────────────────────────────────────────── */}
      <motion.div
        variants={telemetryFade}
        initial="hidden"
        animate="show"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          rowGap: "1rem",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "1.5rem",
          marginTop: "1.5rem",
          zIndex: 10,
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        <motion.div variants={telemetryItem}>
          Target Integration: <span style={{ color: "#fff", marginLeft: "4px" }}>16 JULY 18:00 HRS</span>
        </motion.div>
        <motion.div variants={telemetryItem}>
          Staged Array: <span style={{ color: "#fff", marginLeft: "4px" }}>04/04 MODULES READY</span>
        </motion.div>
        <motion.div variants={telemetryItem} style={{ color: "rgba(255,255,255,0.2)" }}>
          ©2026 SKYSENSE INC.
        </motion.div>
      </motion.div>
    </section>
  );
}