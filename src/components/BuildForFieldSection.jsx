"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BuildForFieldSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bff-h2", {
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
        y: 40, opacity: 0, duration: 0.75, ease: "power3.out",
      });
      gsap.from(".bff-sub", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 24, opacity: 0, duration: 0.65, ease: "power2.out", delay: 0.1,
      });
      gsap.from(".bff-tag", {
        scrollTrigger: { trigger: ref.current, start: "top 65%" },
        opacity: 0, y: 14, stagger: 0.06, duration: 0.5, ease: "power2.out", delay: 0.25,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const TAGS = ["F405 Flight Control", "GPS Navigation", "Environmental Sensing", "Live Wireless Video"];

  return (
    <>
      <style>{`
        .bff-section { background: #0a0f1e; padding: clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem); position: relative; overflow: hidden; }
        .bff-section::before { content: "SKYSENSE"; position: absolute; font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(8rem, 20vw, 18rem); color: rgba(255,255,255,0.015); top: 50%; left: 50%; transform: translate(-50%, -50%); white-space: nowrap; letter-spacing: 0.05em; pointer-events: none; user-select: none; }
        .bff-content { position: relative; z-index: 2; max-width: 760px; }
        .bff-h2 { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(3rem, 7vw, 6rem); color: #fff; line-height: 1.0; margin-bottom: 24px; }
        .bff-h2 em { color: #3b5bdb; font-style: normal; }
        .bff-sub { font-family: var(--font-space-grotesk, sans-serif); font-size: 1rem; line-height: 1.85; color: rgba(255,255,255,0.4); margin-bottom: 32px; max-width: 520px; }
        .bff-tags { display: flex; flex-wrap: wrap; gap: 10px; }
        .bff-tag { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.5); border: 1px solid rgba(59,91,219,0.25); padding: 8px 14px; position: relative; }
        .bff-tag::before { content: "·"; color: #3b5bdb; margin-right: 8px; }
      `}</style>
      <section className="bff-section" ref={ref}>
        <div className="bff-content">
          <h2 className="bff-h2">Built for the<br /><em>field.</em></h2>
          <p className="bff-sub">
            Skysense is a fully autonomous quadcopter platform combining F405 flight control, GPS navigation, environmental sensing, and live wireless video — engineered for compact deployment in remote terrain with autopilot Mission Planning and Return-to-Home.
          </p>
          <div className="bff-tags">
            {TAGS.map((t) => (
              <span key={t} className="bff-tag">{t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}