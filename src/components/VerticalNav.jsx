"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import WorkPreview     from "./previews/WorkPreview";
import AboutPreview    from "./previews/AboutPreview";
import ServicesPreview from "./previews/ServicesPreview";
import JournalPreview  from "./previews/JournalPreview";
import ContactPreview  from "./previews/ContactPreview";

const NAV_ITEMS = [
  { id: "work",     label: "Work",     href: "#work",     Preview: WorkPreview     },
  { id: "about",    label: "About",    href: "#about",    Preview: AboutPreview    },
  { id: "services", label: "Services", href: "#services", Preview: ServicesPreview },
  { id: "journal",  label: "Journal",  href: "#journal",  Preview: JournalPreview  },
  { id: "contact",  label: "Contact",  href: "#contact",  Preview: ContactPreview  },
];

// Stretches whatever preview component is inside to fill the screen,
// overriding the fixed height the components set on themselves.
function FullscreenWrapper({ children }) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        // Force the direct child (the preview root div) to fill completely
      }}>
        <style>{`
          .fs-override > * {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
        `}</style>
        <div className="fs-override" style={{ position: "absolute", inset: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function VerticalNav() {
  const [active,  setActive]  = useState("work");
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{`
        .nav-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 100px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.03em;
          text-decoration: none;
          cursor: pointer;
          overflow: hidden;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(16px) saturate(140%);
          -webkit-backdrop-filter: blur(16px) saturate(140%);
          border: 0.5px solid rgba(255,255,255,0.08);
          box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset;
          color: rgba(255,255,255,0.3);
          transition: color 0.35s ease, background 0.35s ease,
                      border-color 0.35s ease, letter-spacing 0.35s ease;
          user-select: none;
          white-space: nowrap;
        }
        .nav-pill:hover {
          background: rgba(140,80,255,0.08);
          border-color: rgba(160,100,255,0.2);
          color: rgba(255,255,255,0.92);
          letter-spacing: 0.055em;
        }
        .nav-pill[data-active="true"] {
          background: rgba(140,80,255,0.1);
          border-color: rgba(160,100,255,0.25);
          color: rgba(255,255,255,0.95);
          font-weight: 500;
          box-shadow: 0 0 0 1px rgba(140,80,255,0.12) inset,
                      0 0 20px rgba(100,60,255,0.08);
        }
        .nav-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(140,100,255,0.35);
          flex-shrink: 0;
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .nav-pill:hover .nav-dot {
          background: rgba(180,130,255,1);
          box-shadow: 0 0 8px rgba(160,80,255,0.9), 0 0 20px rgba(120,60,255,0.4);
          transform: scale(1.5);
        }
        .nav-pill[data-active="true"] .nav-dot {
          background: rgba(200,160,255,1);
          box-shadow: 0 0 10px rgba(180,100,255,1), 0 0 28px rgba(120,60,255,0.6);
        }
        .nav-index {
          font-size: 10px;
          color: rgba(255,255,255,0.12);
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          letter-spacing: 0.04em;
          margin-left: auto;
          padding-left: 10px;
          transition: color 0.3s ease;
        }
        .nav-pill:hover .nav-index { color: rgba(160,120,255,0.45); }
      `}</style>

      {/* ── Fullscreen preview ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {hovered && (
          <motion.div
            key={hovered.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            <FullscreenWrapper>
              <hovered.Preview />
            </FullscreenWrapper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Menu pill ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          position: "fixed", top: "24px", left: "20px", zIndex: 50,
          display: "flex", alignItems: "center", gap: "8px",
        }}
      >
        <div style={{
          width: "7px", height: "7px", borderRadius: "50%",
          background: "rgba(255,255,255,0.85)", flexShrink: 0,
        }} />
        <a href="#" className="nav-pill" style={{ padding: "7px 16px", fontSize: "12px" }}>
          Menu
        </a>
      </motion.div>

      {/* ── Pill stack ─────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        style={{
          position: "fixed",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        {NAV_ITEMS.map((navItem, i) => (
          <motion.a
            key={navItem.id}
            href={navItem.href}
            className="nav-pill"
            data-active={active === navItem.id ? "true" : undefined}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActive(navItem.id)}
            onMouseEnter={() => setHovered(navItem)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="nav-dot" />
            {navItem.label}
            <span className="nav-index">0{i + 1}</span>
          </motion.a>
        ))}
      </motion.nav>
    </>
  );
}