"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function WorkPreview() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".wc", { y: 80, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out" })
        .from(".work-title h2", { y: 60, skewY: 4, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(".work-title p", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
        .to(".work-bar", { width: "100%", duration: 1.2, ease: "power2.inOut" }, "-=0.6");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .work-preview {
          position: relative;
          height: 560px;
          overflow: hidden;
          background: #0c0c0f;
        }
        .work-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 2px;
        }
        .wc {
          background: #111116;
          position: relative;
          overflow: hidden;
        }
        .wc:nth-child(1) { grid-column: 1/3; grid-row: 1/2; }
        .wc:nth-child(2) { grid-column: 3/4; grid-row: 1/3; background: #c6f135; }
        .wc:nth-child(3) { grid-column: 1/2; grid-row: 2/3; background: #1a1a22; }
        .wc:nth-child(4) { grid-column: 2/3; grid-row: 2/3; }
        .wc-accent {
          position: absolute; bottom: 0; left: 0;
          width: 100%; height: 3px; background: #c6f135;
        }
        .wc-num {
          position: absolute; top: 18px; left: 20px;
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 64px; color: rgba(255,255,255,0.06); line-height: 1;
        }
        .wc-tag {
          position: absolute; bottom: 40px; left: 20px; right: 20px;
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px; letter-spacing: 0.12em;
          color: #555; text-transform: uppercase;
        }
        .wc-detail {
          position: absolute; bottom: 24px; left: 20px; right: 20px;
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px; letter-spacing: 0.04em;
          color: rgba(255,255,255,0.18); text-transform: none;
          line-height: 1.5;
        }
        .wc:nth-child(2) .wc-tag { color: #0c0c0f; }
        .wc:nth-child(2) .wc-detail { color: rgba(12,12,15,0.45); }
        .wc:nth-child(2) .wc-num { color: rgba(0,0,0,0.12); }
        .work-title {
          position: absolute;
          bottom: clamp(2rem, 4vw, 3rem);
          left: clamp(1.5rem, 3vw, 2.5rem);
          z-index: 10;
        }
        .work-title h2 {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: clamp(4rem, 7vw, 6rem);
          letter-spacing: 0.02em; line-height: 0.9; color: #fff;
        }
        .work-title p {
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px; letter-spacing: 0.18em;
          color: #c6f135; text-transform: uppercase; margin-top: 8px;
        }
        .work-counter {
          position: absolute; top: 28px; right: 28px; z-index: 10;
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 80px; color: #c6f135; line-height: 1; opacity: 0.15;
        }
        .work-ticker {
          position: absolute; right: 0; top: 50%; transform: translateY(-50%);
          writing-mode: vertical-rl; text-orientation: mixed;
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px; letter-spacing: 0.2em;
          color: #c6f135; text-transform: uppercase;
          padding-right: 14px; z-index: 10; opacity: 0.5;
        }
        .work-bar {
          position: absolute; bottom: 0; left: 0;
          height: 2px; background: #c6f135; width: 0; z-index: 10;
        }
      `}</style>
      <div className="work-preview" ref={ref}>
        <div className="work-grid">
          <div className="wc">
            <div className="wc-num">01</div>
            <div className="wc-tag">Flight &amp; Power Control</div>
            <div className="wc-detail">F405 FC · 4-in-1 ESC + PDB · Brushless Motors · Li-Po Battery</div>
            <div className="wc-accent" />
          </div>
          <div className="wc">
            <div className="wc-num">02</div>
            <div className="wc-tag">Sensing &amp; Comms</div>
            <div className="wc-detail">Arduino UNO · DHT11 · HC-05 Bluetooth · independent of flight loop</div>
          </div>
          <div className="wc">
            <div className="wc-num">03</div>
            <div className="wc-tag">GPS Navigation</div>
            <div className="wc-detail">NEO-7M · UART · position hold · return-to-home</div>
          </div>
          <div className="wc">
            <div className="wc-num">04</div>
            <div className="wc-tag">Live Camera Feed</div>
            <div className="wc-detail">ESP32-CAM · OV2640 · MJPEG over Wi-Fi · /stream endpoint</div>
            <div className="wc-accent" />
          </div>
        </div>
        <div className="work-title">
          <h2>Core<br />Systems</h2>
          <p>3 Subsystems · 1 Platform</p>
        </div>
        <div className="work-counter">03</div>
        <div className="work-ticker">drone systems</div>
        <div className="work-bar" />
      </div>
    </>
  );
}