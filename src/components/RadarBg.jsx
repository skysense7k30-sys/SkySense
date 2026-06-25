"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BLIPS = [
  { cx: 55, cy: 38 },
  { cx: 72, cy: 60 },
  { cx: 33, cy: 65 },
  { cx: 62, cy: 78 },
  { cx: 42, cy: 50 },
];

export default function RadarBg() {
  const sweepRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    gsap.to(sweepRef.current, {
      rotation: 360, duration: 6, repeat: -1, ease: "none", transformOrigin: "50% 50%",
    });
    dotsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1.4, duration: 0.4, ease: "power2.out", repeat: -1, yoyo: true, delay: i * 0.9 + 0.3, repeatDelay: 5.6 }
      );
    });
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12, pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="sweep-grad" x1="50%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#c6f135" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c6f135" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[10, 22, 34, 46].map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#c6f135" strokeWidth="0.25" strokeDasharray="1 2" />
      ))}
      <line x1="50" y1="4" x2="50" y2="96" stroke="#c6f135" strokeWidth="0.18" />
      <line x1="4" y1="50" x2="96" y2="50" stroke="#c6f135" strokeWidth="0.18" />
      <g ref={sweepRef} style={{ transformOrigin: "50px 50px" }}>
        <path d="M50 50 L96 50 A46 46 0 0 1 93 37 Z" fill="url(#sweep-grad)" />
      </g>
      {BLIPS.map((b, i) => (
        <circle
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          cx={b.cx}
          cy={b.cy}
          r="1.2"
          fill="#c6f135"
          style={{ opacity: 0 }}
        />
      ))}
      <circle cx="50" cy="50" r="2" fill="#c6f135" opacity="0.6" />
    </svg>
  );
}
