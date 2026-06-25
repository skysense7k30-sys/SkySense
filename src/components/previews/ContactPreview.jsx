"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FIELDS = [
  { label: "Your Name" },
  { label: "Email Address" },
  { label: "Inquiry Type" },
];

export default function ContactPreview() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".cnt-left h2",   { y: 60, skewY: 3, duration: 0.8, ease: "power3.out" })
        .from(".cnt-left p",    { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .from(".cnt-field",     { x: 30, opacity: 0, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.4")
        .to(".cnt-cta",         { x: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .from(".cnt-corner-decor", { scale: 0, transformOrigin: "top right", duration: 0.4, ease: "back.out(2)" }, "-=0.6");
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .cnt-preview {
          position: relative;
          height: 560px;
          overflow: hidden;
          background: #0d0d0d;
        }
        .cnt-split {
          position: absolute; inset: 0;
          display: grid; grid-template-columns: 55% 45%;
        }
        .cnt-left {
          background: #0d0d0d;
          padding: 48px;
          display: flex; flex-direction: column; justify-content: flex-end;
          border-right: 2px solid #c6f135;
          overflow: hidden;
        }
        .cnt-left h2 {
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: clamp(4rem, 8vw, 7rem);
          letter-spacing: -0.01em; line-height: 0.9; color: #fff;
        }
        .cnt-left h2 em { color: #c6f135; font-style: normal; }
        .cnt-left p {
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.14em;
          color: #444; text-transform: uppercase; margin-top: 16px;
        }
        .cnt-right {
          background: #161616;
          padding: 40px 36px;
          display: flex; flex-direction: column; justify-content: center; gap: 0;
        }
        .cnt-field {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 16px 0;
          overflow: hidden;
        }
        .cnt-field label {
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px; letter-spacing: 0.2em;
          color: rgba(198,241,53,0.5); text-transform: uppercase;
          display: block; margin-bottom: 4px;
        }
        .cnt-field-value {
          font-family: var(--font-space-grotesk), sans-serif;

          font-size: 14px; color: rgba(255,255,255,0.15);
        }
        .cnt-cta {
          margin-top: 24px;
          padding: 14px 24px;
          background: #c6f135; border: none; cursor: pointer;
          font-family: var(--font-bebas-neue), sans-serif;
          font-size: 1.2rem; letter-spacing: 0.1em;
          color: #0d0d0d;
          display: flex; align-items: center; justify-content: space-between;
          width: 100%;
          transform: translateX(100%);
        }
        .cnt-corner-decor {
          position: absolute; top: 0; right: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 0 80px 80px 0;
          border-color: transparent #c6f135 transparent transparent;
          z-index: 10;
        }
        .cnt-email {
          position: absolute; bottom: 32px; left: 48px; z-index: 10;
          font-family: 'DM Mono', monospace;
          font-size: 11px; letter-spacing: 0.1em;
          color: rgba(198,241,53,0.25);
        }
      `}</style>
      <div className="cnt-preview" ref={ref}>
        <div className="cnt-split">
          <div className="cnt-left">
            <h2>Let's<br /><em>take</em><br />flight.</h2>
            <p>Open for collaboration &amp; demo requests</p>
          </div>
          <div className="cnt-right">
            {FIELDS.map((f) => (
              <div className="cnt-field" key={f.label}>
                <label>{f.label}</label>
                <div className="cnt-field-value">_</div>
              </div>
            ))}
            <button className="cnt-cta">Get In Touch <span>→</span></button>
          </div>
        </div>
        <div className="cnt-corner-decor" />
        <div className="cnt-email">hello@skysense.dev</div>
      </div>
    </>
  );
}