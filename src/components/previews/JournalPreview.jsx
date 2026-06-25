"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ENTRIES = [
  {
    date: "PHASE\n01",
    title: "4-in-1 ESC Integration",
    sub: "Consolidating motor control and power distribution onto a single board — no separate ESCs.",
    tag: "Hardware",
    spec: "Reduced wiring · lower weight · cleaner power flow",
  },
  {
    date: "PHASE\n02",
    title: "Sensing & Telemetry",
    sub: "Arduino UNO reads the DHT11 and streams data over Bluetooth, independent of the flight loop.",
    tag: "Firmware",
    spec: "9600 baud · updates every 2s · HC-05 module",
  },
  {
    date: "PHASE\n03",
    title: "GPS & Return-to-Home",
    sub: "NEO-7M enables position hold, geo-tagging, and autonomous return-to-launch on signal loss.",
    tag: "Navigation",
    spec: "~2.5–5 m accuracy · UART link to F405",
  },
  {
    date: "PHASE\n04",
    title: "Calibration & Test Flights",
    sub: "Iterative tuning of ESC/sensors, addressing wind disturbance and auto-landing accuracy.",
    tag: "Testing",
    spec: "Stable hover · controlled takeoff & landing",
  },
];

export default function JournalPreview() {
  const ref = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".jrn-cursor-el", { scale: 0, duration: 0.4, ease: "back.out(3)" })
        .from(".jrn-margin-line", { scaleY: 0, transformOrigin: "top center", duration: 0.8, ease: "power2.out" }, 0)
        .from(".jrn-entry", { y: 30, opacity: 0, stagger: 0.1, duration: 0.55, ease: "power3.out" }, "-=0.2")
        .from(".jrn-bg-title h2", { x: 60, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");

      // idle float
      gsap.to(".jrn-cursor-el", {
        y: -8, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .jrn-preview {
          position: relative;
          height: 560px;
          overflow: hidden;
          background: #140d1e;
        }
        .jrn-ruled {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent, transparent 39px,
            rgba(255,255,255,0.04) 39px, rgba(255,255,255,0.04) 40px
          );
          z-index: 1;
        }
        .jrn-margin-line {
          position: absolute; top: 0; bottom: 0; left: 72px;
          width: 1px; background: rgba(198,241,53,0.15); z-index: 2;
        }
        .jrn-cursor-el {
          position: absolute; top: 48px; left: 40px; z-index: 10;
          width: 14px; height: 14px;
          border-radius: 50%;
          border: 2px solid #c6f135;
        }
        .jrn-entries {
          position: absolute; top: 40px; left: 96px; right: 40px; z-index: 10;
          display: flex; flex-direction: column;
        }
        .jrn-entry {
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: grid; grid-template-columns: 80px 1fr; gap: 16px; align-items: start;
        }
        .jrn-entry:last-child { border-bottom: none; }
        .jrn-date {
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px; letter-spacing: 0.1em;
          color: rgba(198,241,53,0.4); line-height: 1.8;
          white-space: pre-line;
        }
        .jrn-text h4 {
          font-family: var(--font-space-grotesk), sans-serif;

          font-size: 14px; font-weight: 500; color: #fff;
        }
        .jrn-text p {
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 3px;
          line-height: 1.5;
        }
        .jrn-spec {
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px; letter-spacing: 0.04em;
          color: rgba(198,241,53,0.35);
          margin-top: 4px;
        }
        .jrn-tag {
          display: inline-block; margin-top: 6px;
          padding: 2px 8px;
          background: rgba(198,241,53,0.1);
          border: 1px solid rgba(198,241,53,0.2);
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px; letter-spacing: 0.1em;
          color: #c6f135; text-transform: uppercase;
        }
        .jrn-bg-title {
          position: absolute; bottom: 32px; right: 40px; z-index: 10; text-align: right;
        }
        .jrn-bg-title h2 {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: clamp(3rem, 6vw, 5rem);
          letter-spacing: 0.02em; color: rgba(255,255,255,0.06); line-height: 1;
        }
      `}</style>
      <div className="jrn-preview" ref={ref}>
        <div className="jrn-ruled" />
        <div className="jrn-margin-line" />
        <div className="jrn-cursor-el" />
        <div className="jrn-entries">
          {ENTRIES.map((e, i) => (
            <div className="jrn-entry" key={i}>
              <div className="jrn-date">{e.date}</div>
              <div className="jrn-text">
                <h4>{e.title}</h4>
                <p>{e.sub}</p>
                <div className="jrn-spec">{e.spec}</div>
                <span className="jrn-tag">{e.tag}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="jrn-bg-title">
          <h2>Project<br />Log</h2>
        </div>
      </div>
    </>
  );
}