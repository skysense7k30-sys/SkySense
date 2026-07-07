"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHANNELS = [
  { val: "EMAIL", desc: "contact@skysense.dev" },
  { val: "GITHUB", desc: "/skysense-project" },
  { val: "STATUS", desc: "Actively maintained" },
  { val: "< 24h", desc: "Typical response" },
];

export default function ContactSection({ id }) {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cnt2-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".cnt2-stat", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, opacity: 0, y: 40, stagger: 0.12, duration: 0.6, ease: "power3.out" });
      gsap.from(".cnt2-text", { scrollTrigger: { trigger: ref.current, start: "top 70%" }, opacity: 0, x: -30, duration: 0.7, ease: "power2.out" });
      gsap.from(".cnt2-card", { scrollTrigger: { trigger: ref.current, start: "top 65%" }, opacity: 0, x: 40, duration: 0.7, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    try {
        const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setSent(true);
    } catch (err) {
        console.error(err);
        // surface err.message to the user however fits your UI
    }
    }

  return (
    <>
      <style>{`
        .cnt2-section { background: #06060a; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .cnt2-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 40px; }
        .cnt2-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.06); margin-bottom: 64px; }
        .cnt2-stat { background: #06060a; padding: 28px 24px; border-top: 2px solid transparent; transition: border-color 0.3s; }
        .cnt2-stat:hover { border-top-color: #3b5bdb; }
        .cnt2-stat .val { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(1.6rem, 3vw, 2.4rem); color: #3b5bdb; line-height: 1; display: block; margin-bottom: 6px; letter-spacing: 0.02em; }
        .cnt2-stat .desc { font-family: var(--font-dm-mono, monospace); font-size: 10.5px; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); text-transform: uppercase; word-break: break-word; }
        .cnt2-body { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(2rem, 5vw, 5rem); align-items: start; }
        .cnt2-h2 { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 4.5vw, 4rem); line-height: 1.05; color: #fff; margin-bottom: 20px; }
        .cnt2-h2 em { color: rgba(255,255,255,0.22); font-style: normal; }
        .cnt2-p { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.95rem; line-height: 1.85; color: rgba(255,255,255,0.4); }
        .cnt2-p + .cnt2-p { margin-top: 14px; }

        .cnt2-signal { margin-top: 28px; display: flex; align-items: center; gap: 10px; }
        .cnt2-dot { width: 7px; height: 7px; border-radius: 50%; background: #3b5bdb; box-shadow: 0 0 0 3px rgba(59,91,219,0.18); animation: cnt2-pulse 1.8s ease-in-out infinite; }
        @keyframes cnt2-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        .cnt2-signal-text { font-family: var(--font-dm-mono, monospace); font-size: 10.5px; letter-spacing: 0.16em; color: rgba(255,255,255,0.35); text-transform: uppercase; }

        .cnt2-card { background: #0e0e18; border: 1px solid rgba(59,91,219,0.12); padding: 32px; position: relative; overflow: hidden; }
        .cnt2-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #3b5bdb, #1e3a8a); }
        .cnt2-card-label { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.2em; color: #3b5bdb; text-transform: uppercase; margin-bottom: 16px; }
        .cnt2-card h3 { font-family: var(--font-bebas-neue, sans-serif); font-size: 2rem; color: #fff; letter-spacing: 0.03em; margin-bottom: 20px; }

        .cnt2-field { margin-bottom: 18px; }
        .cnt2-field label { display: block; font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.18em; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 8px; }
        .cnt2-field input,
        .cnt2-field textarea {
          width: 100%; background: #06060a; border: 1px solid rgba(255,255,255,0.1);
          color: #fff; font-family: var(--font-space-grotesk, sans-serif); font-size: 0.9rem;
          padding: 12px 14px; outline: none; transition: border-color 0.25s, background 0.25s;
          border-radius: 0;
        }
        .cnt2-field textarea { resize: vertical; min-height: 96px; }
        .cnt2-field input::placeholder,
        .cnt2-field textarea::placeholder { color: rgba(255,255,255,0.2); }
        .cnt2-field input:focus,
        .cnt2-field textarea:focus { border-color: #3b5bdb; background: #0a0a12; }

        .cnt2-submit {
          width: 100%; margin-top: 6px; background: #3b5bdb; border: none; color: #fff;
          font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.2em;
          text-transform: uppercase; padding: 15px 20px; cursor: pointer; transition: background 0.25s, transform 0.15s;
        }
        .cnt2-submit:hover { background: #4c6ef5; }
        .cnt2-submit:active { transform: scale(0.98); }

        .cnt2-sent { display: flex; align-items: center; gap: 10px; padding: 15px 4px; }
        .cnt2-sent .cnt2-dot { animation: none; opacity: 1; }
        .cnt2-sent-text { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.16em; color: #3b5bdb; text-transform: uppercase; }

        @media (max-width: 860px) { .cnt2-stats-row { grid-template-columns: repeat(2, 1fr); } .cnt2-body { grid-template-columns: 1fr; } }
      `}</style>
      <section className="cnt2-section" ref={ref} id={id}>
        <div className="cnt2-label">Contact &amp; Uplink</div>
        <div className="cnt2-stats-row">
          {CHANNELS.map((c) => (
            <div className="cnt2-stat" key={c.val}>
              <span className="val">{c.val}</span>
              <span className="desc">{c.desc}</span>
            </div>
          ))}
        </div>
        <div className="cnt2-body">
          <div className="cnt2-text">
            <h2 className="cnt2-h2">Got a mission<br />in <em>mind?</em></h2>
            <p className="cnt2-p">Whether it's a question about the build, a collaboration idea, or a bug report from the field — reach out. Skysense is an open, evolving platform and every message gets read.</p>
            <p className="cnt2-p">For technical issues, include your flight controller firmware and telemetry link status if relevant — it speeds things up.</p>
            <div className="cnt2-signal">
              <span className="cnt2-dot" />
              <span className="cnt2-signal-text">Channel open — awaiting transmission</span>
            </div>
          </div>
          <div className="cnt2-card">
            <div className="cnt2-card-label">Send a Message</div>
            <h3>Establish<br />Contact.</h3>
            {sent ? (
              <div className="cnt2-sent">
                <span className="cnt2-dot" />
                <span className="cnt2-sent-text">Message received. Standing by to reply.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="cnt2-field">
                  <label htmlFor="cnt2-name">Name</label>
                  <input id="cnt2-name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="cnt2-field">
                  <label htmlFor="cnt2-email">Email</label>
                  <input id="cnt2-email" name="email" type="email" placeholder="you@domain.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="cnt2-field">
                  <label htmlFor="cnt2-message">Message</label>
                  <textarea id="cnt2-message" name="message" placeholder="What's on your mind?" value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="cnt2-submit">Transmit</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}