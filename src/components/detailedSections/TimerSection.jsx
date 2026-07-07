"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

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

// One rolling digit — old value slides up/fades out, new value slides in from below.
function Digit({ value }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: "0.62em",
        height: "1em",
        overflow: "hidden",
        verticalAlign: "top",
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "0.7em", opacity: 0 }}
          animate={{ y: "0em", opacity: 1 }}
          exit={{ y: "-0.7em", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", left: 0, right: 0 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Segment({ value, label }) {
  const str = pad(value);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
      <div
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "clamp(3.2rem, 8vw, 8rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "rgba(255,255,255,0.96)",
          display: "flex",
        }}
      >
        {str.split("").map((ch, i) => (
          <Digit key={i} value={ch} />
        ))}
      </div>
      <span
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function TimerSection({ id, targetDate = "2026-09-01T09:00:00" }) {
  const sceneRef = useRef(null);
  const target = useRef(new Date(targetDate));
  // Start as null on both server and first client render so the two match
  // exactly. The real, time-dependent value is only ever computed on the
  // client, inside useEffect, after hydration has already completed.
  const [time, setTime] = useState(null);

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

  const display = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

  return (
    <section
      id={id}
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "#080809",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        .scene-layer {
          opacity: 0;
          transition: opacity 2.4s ease-out 0.4s;
        }
        .scene-layer[data-visible="true"] {
          opacity: 1;
        }
      `}</style>

      {/* ── 3D scene — full bleed, same drone model as hero ───────────────── */}
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

      {/* ── Vignettes — darken the scene so bold timer stays readable ─────── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 120% 100% at 50% 50%, rgba(8,8,9,0.25) 30%, rgba(8,8,9,0.7) 100%)", pointerEvents: "none", zIndex: 2 }} />
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: "18%", background: "linear-gradient(to bottom, #080809 0%, transparent 100%)", pointerEvents: "none", zIndex: 2 }} />
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "20%", background: "linear-gradient(to top, rgba(8,8,9,0.8) 0%, transparent 100%)", pointerEvents: "none", zIndex: 2 }} />

      {/* ── Eyebrow label ──────────────────────────────────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
        style={{
          position: "absolute",
          top: "clamp(2rem, 5vw, 3.5rem)",
          left: 0,
          right: 0,
          zIndex: 4,
          textAlign: "center",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
        }}
      >
        {display.done ? "Mission Live" : "Countdown to Launch"}
      </motion.div>

      {/* ── Centered bold timer, drone visible through/behind it ──────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "clamp(1.2rem, 3.5vw, 3rem)",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "0 1.5rem",
          }}
        >
          <Segment value={display.days} label="Days" />
          <Segment value={display.hours} label="Hours" />
          <Segment value={display.minutes} label="Min" />
          <Segment value={display.seconds} label="Sec" />
        </motion.div>
      </div>

      {/* ── Bottom caption ─────────────────────────────────────────────────── */}
      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.9 }}
        style={{
          position: "absolute",
          bottom: "clamp(2.5rem, 6vw, 4rem)",
          left: 0,
          right: 0,
          zIndex: 4,
          margin: 0,
          textAlign: "center",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "clamp(0.8rem, 0.95vw, 0.9rem)",
          color: "rgba(255,255,255,0.32)",
        }}
      >
        {display.done
          ? "SkySense has taken flight."
          : "Autonomous navigation, live sensing, and real-time video — counting down to first flight."}
      </motion.p>
    </section>
  );
}