"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SERVICES = [
  {
    num: "01",
    title: "Temperature & Humidity",
    sub: "DHT11 · Arduino UNO · Real-time readings",
    detail: "Updates every 2 seconds, transmitted over Bluetooth to a paired phone or laptop.",
  },
  {
    num: "02",
    title: "Live Video Streaming",
    sub: "ESP32-CAM · OV2640 · Wi-Fi",
    detail: "MJPEG stream hosted over HTTP, viewable in any browser at the drone's IP address.",
  },
  {
    num: "03",
    title: "GPS & Navigation",
    sub: "NEO-7M · UART · Return-to-Home",
    detail: "~2.5–5 m horizontal accuracy, enabling position hold, geo-tagging, and RTH.",
  },
  {
    num: "04",
    title: "Mission Planning",
    sub: "Calibration · Flight modes · Telemetry",
    detail: "Mission Planner configures ESC/sensor calibration, Stabilize/RTL/Loiter modes, and live status.",
  },
];

export default function ServicesPreview() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".svc-title-block", { x: 80, duration: 0.6, ease: "power3.out" })
        .to(".svc-highlight", { height: "100%", duration: 0.8, ease: "power2.inOut" }, "-=0.3")
        .from(".svc-item", { x: -40, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out" }, "-=0.5");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .svc-preview {
          position: relative;
          height: 560px;
          overflow: hidden;
          background: #0a0f1e;
        }
        .svc-grid {
          position: absolute; inset: 0;
          display: grid; grid-template-columns: 40px 1fr;
        }
        .svc-rail {
          background: #c6f135;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding-bottom: 24px; gap: 6px;
        }
        .svc-rail-text {
          writing-mode: vertical-rl; text-orientation: mixed;
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px; letter-spacing: 0.2em;
          color: #0a0f1e; text-transform: uppercase;
        }
        .svc-body {
          position: relative; padding: 40px 40px 40px 48px;
        }
        .svc-title-block {
          position: absolute; top: 0; right: 0;
          background: #c6f135; padding: 16px 24px;
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 1.8rem; color: #0a0f1e;
          letter-spacing: 0.03em; line-height: 1;
        }
        .svc-highlight {
          position: absolute; top: 0; right: 0;
          background: #c6f135; width: 3px; height: 0;
          z-index: 5;
        }
        .svc-item {
          display: flex; align-items: flex-start; gap: 24px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .svc-item:last-child { border-bottom: none; }
        .svc-num {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 2rem; color: #c6f135; line-height: 1; min-width: 40px; margin-top: 2px;
        }
        .svc-info { flex: 1; }
        .svc-info h4 {
          font-family: var(--font-space-grotesk), sans-serif;

          font-size: 16px; font-weight: 600;
          letter-spacing: 0.04em; color: #fff; text-transform: uppercase;
        }
        .svc-info p {
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 4px;
        }
        .svc-detail {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 11px; line-height: 1.6;
          color: rgba(255,255,255,0.22);
          margin-top: 6px; max-width: 380px;
        }
        .svc-arrow {
          margin-left: auto; font-size: 18px;
          color: rgba(198,241,53,0.3); align-self: center;
        }
      `}</style>
      <div className="svc-preview" ref={ref}>
        <div className="svc-grid">
          <div className="svc-rail">
            <span className="svc-rail-text">What it does</span>
          </div>
          <div className="svc-body">
            <div className="svc-title-block">KEY<br />FEATURES</div>
            <div className="svc-highlight" />
            {SERVICES.map((s) => (
              <div className="svc-item" key={s.num}>
                <div className="svc-num">{s.num}</div>
                <div className="svc-info">
                  <h4>{s.title}</h4>
                  <p>{s.sub}</p>
                  <p className="svc-detail">{s.detail}</p>
                </div>
                <span className="svc-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}