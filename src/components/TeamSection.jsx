"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TEAM } from "../data/constants";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function TeamCredits({ id }) {
  const ref = useRef(null);
  const router = useRouter();

  const drone = TEAM.filter((m) => m.team === "drone");
  const web = TEAM.filter((m) => m.team === "web");

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop & Tablet: Chronological Tree Growth Timeline
      mm.add("(min-width: 701px)", () => {
        // Enforce clean starting states to prevent flashes on load
        gsap.set([".main-trunk-line", ".leaf-connector"], { scaleY: 0, transformOrigin: "center top" });
        gsap.set(".branch-line-left", { scaleX: 0, transformOrigin: "right center" });
        gsap.set(".branch-line-right", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".runway-centerline", { scaleX: 0, transformOrigin: "center center" });
        gsap.set(".tree-root", { opacity: 0, y: -20 });
        gsap.set(".member-card", { opacity: 0, y: 15 });

        // Master Timeline tied to a single scroll trigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%", // Triggers slightly sooner for a smoother look
            toggleActions: "play none none none",
          }
        });

        tl.to(".runway-centerline", {
          scaleX: 1,
          duration: 1.0,
          ease: "power3.inOut"
        })
        .to(".tree-root", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.2)",
          stagger: 0.15
        }, "-=0.5") // Overlap slightly with runway for fluid motion
        .to(".main-trunk-line", {
          scaleY: 1,
          duration: 0.4,
          ease: "power2.inOut",
          stagger: 0.1
        }, "-=0.2")
        .to(".branch-line-left, .branch-line-right", {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.04
        }, "-=0.1")
        .to(".leaf-connector", {
          scaleY: 1,
          duration: 0.3,
          ease: "power2.inOut",
          stagger: 0.03
        }, "-=0.2")
        .to(".member-card", {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.04
        }, "-=0.2");
      });

      // Mobile Stack Fallback Configuration
      mm.add("(max-width: 700px)", () => {
        gsap.set([".tree-root", ".member-card"], { opacity: 0 });
        
        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });

        tlMobile.fromTo(".tree-root", 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
        )
        .fromTo(".member-card", 
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
          "-=0.2"
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* 1. Section Workspace Setup */
        .credits-section {
          background: #060913;
          padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 6rem);
          border-top: 1px solid rgba(94, 180, 255, 0.08);
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .credits-section::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 400px;
          
          pointer-events: none;
        }

        /* 2. Header Architecture */
        .credits-title-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: clamp(40px, 8vw, 70px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding-bottom: 16px;
          gap: 15px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .credits-title {
          font-family: var(--font-dm-mono, monospace);
          font-size: clamp(10px, 1.5vw, 12px);
          letter-spacing: 0.25em;
          color: #ffffff;
          text-transform: uppercase;
          font-weight: 600;
        }

        .credits-subtitle {
          font-family: var(--font-dm-mono, monospace);
          font-size: clamp(9px, 1.2vw, 10px);
          letter-spacing: 0.15em;
          color: #5eb4ff;
          opacity: 0.7;
          text-transform: uppercase;
        }

        .flight-deck-layout {
          display: flex;
          flex-direction: column;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        /* 3. Tree System Architecture */
        .vertical-tree-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .tree-root {
          z-index: 5;
          background: #060913;
          border: 1px solid rgba(94, 180, 255, 0.3);
          padding: 12px 24px;
          border-radius: 6px;
          backdrop-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          min-width: 220px;
          text-align: center;
          flex-shrink: 0;
        }

        .team-role {
          font-family: var(--font-dm-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #5eb4ff;
          margin: 0;
          font-weight: bold;
        }

        .main-trunk-line {
          width: 1px;
          height: 35px;
          background: rgba(94, 180, 255, 0.35);
          flex-shrink: 0;
        }

        .tree-branch-wrapper {
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 100%;
          gap: 24px;
        }

        .tree-leaf {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding-top: 35px;
        }

        .branch-line-left {
          position: absolute;
          top: 0;
          right: 50%;
          width: calc(50% + 12px);
          height: 1px;
          background: rgba(94, 180, 255, 0.35);
        }

        .branch-line-right {
          position: absolute;
          top: 0;
          left: 50%;
          width: calc(50% + 12px);
          height: 1px;
          background: rgba(94, 180, 255, 0.35);
        }

        .leaf-connector {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 35px;
          background: rgba(94, 180, 255, 0.35);
        }

        /* 4. Separator Runway Design */
        .center-runway {
          position: relative;
          width: 100%;
          height: 32px;
          background: rgba(255, 255, 255, 0.01);
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
          border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          padding: 0 20px;
          border-radius: 4px;
          margin: 15px 0;
        }

        .runway-lights {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
          display: flex;
          justify-content: space-between;
          padding: 0 40px;
          align-items: center;
        }
        .runway-lights::before, .runway-lights::after {
          content: "";
          width: 4px;
          height: 4px;
          background: #00ff66;
          border-radius: 50%;
          box-shadow: 0 0 8px #00ff66;
        }
        .runway-lights::after { background: #ff3333; box-shadow: 0 0 8px #ff3333; }

        .runway-centerline {
          position: absolute;
          left: 80px;
          right: 80px;
          top: 50%;
          height: 2px;
          transform: translateY(-50%);
          background-image: repeating-linear-gradient(
            90deg,
            rgba(94, 180, 255, 0.4) 0px,
            rgba(94, 180, 255, 0.4) 20px,
            transparent 20px,
            transparent 40px
          );
        }

        .runway-markings {
          font-family: var(--font-dm-mono, monospace);
          font-size: 11px;
          font-weight: 800;
          color: rgba(94, 180, 255, 0.5);
          position: absolute;
          letter-spacing: 0.1em;
        }
        .runway-markings--left { left: 45px; }
        .runway-markings--right { right: 45px; }

        /* 5. Sub-Node Member Cards */
        .member-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 6px 16px 6px 6px;
          border-radius: 30px;
          transition: all 0.25s ease;
          
          z-index: 2;
        }

        .member-card:hover {
          background: rgba(94, 180, 255, 0.06);
          border-color: rgba(94, 180, 255, 0.3);
          transform: translateY(-4px); /* Swapped from 4px to -4px to drift naturally upward */
        }

        .member-badge {
          font-family: var(--font-dm-mono, monospace);
          font-size: 10px;
          font-weight: bold;
          color: #5eb4ff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(94, 180, 255, 0.25);
          background: #060913;
          flex-shrink: 0;
        }

        .member-card:hover .member-badge {
          border-color: #5eb4ff;
          background: rgba(94, 180, 255, 0.15);
        }

        .member-name {
          font-family: var(--font-dm-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
        }
        .member-card:hover .member-name { color: #ffffff; }

        @media (max-width: 700px) {
          .credits-title-row { flex-direction: column; align-items: flex-start; }
          .credits-subtitle { text-align: left; }
          .flight-deck-layout { gap: 30px; }
          .vertical-tree-container { align-items: flex-start; }
          .tree-root { width: 100%; text-align: left; }
          
          .main-trunk-line, .branch-line-left, .branch-line-right, .leaf-connector { 
            display: none !important; 
          }
          
          .tree-branch-wrapper { 
            flex-direction: column; 
            align-items: flex-start; 
            gap: 12px; 
            width: 100%;
          }
          
          .tree-leaf { padding-top: 0; width: 100%; align-items: flex-start; }
          .member-card { width: 100%; }
          .member-card:hover { transform: translateX(4px); }
          .center-runway { height: 20px; padding: 0; margin: 10px 0; }
          .runway-markings, .runway-lights { display: none; }
          .runway-centerline { left: 10px; right: 10px; }
        }
      `}</style>

      <section className="credits-section" ref={ref} id={id}>
        <div className="credits-title-row">
          <span className="credits-title">Project Credits</span>
          <span className="credits-subtitle">THE BRAINCHILD OF SEVEN VISIONARIES, FORGED TO REDEFINE THE FUTURE.</span>
        </div>

        <div className="flight-deck-layout">
          
          {/* DRONE TEAM VERTICAL TREE */}
          <div className="vertical-tree-container">
            <div className="tree-root">
              <p className="team-role">Airframe &amp; SkySense Systems</p>
            </div>
            <div className="main-trunk-line"></div>
            
            <div className="tree-branch-wrapper">
              {drone.map((m, index) => (
                <div key={m.name} className="tree-leaf">
                  {index !== 0 && <div className="branch-line-left"></div>}
                  {index !== drone.length - 1 && <div className="branch-line-right"></div>}
                  
                  <div className="leaf-connector"></div>
                  <div className="member-card">
                    
                    <span className="member-name">{m.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTRAL AIRFIELD RUNWAY DIVIDER */}
          <div className="center-runway">
            <span className="runway-markings runway-markings--left">L-09</span>
            <div className="runway-centerline"></div>
            <div className="runway-lights"></div>
            <span className="runway-markings runway-markings--right">R-27</span>
          </div>

          {/* WEB TEAM VERTICAL TREE */}
          <div className="vertical-tree-container">
            <div className="tree-root">
              <p className="team-role">Web Platform</p>
            </div>
            <div className="main-trunk-line"></div>
            
            <div className="tree-branch-wrapper">
              {web.map((m, index) => (
                <div key={m.name} className="tree-leaf">
                  {index !== 0 && <div className="branch-line-left"></div>}
                  {index !== web.length - 1 && <div className="branch-line-right"></div>}
                  
                  <div className="leaf-connector"></div>
                  <div 
                    className="member-card"
                    onClick={() => router.push("https://github.com/noblepaul995")}
                    style={{ cursor: "pointer" }}
                  >
                    
                    <span className="member-name">{m.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}