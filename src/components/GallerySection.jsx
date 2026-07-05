"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-label", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 16,
        duration: 0.5,
      });

      gsap.from(".gallery-heading", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".gallery-video-frame", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
        opacity: 0,
        scale: 0.97,
        duration: 0.7,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .gallery-section {
          background: #0a0f1e;
          padding: clamp(4rem, 8vw, 7rem)
                   clamp(1.5rem, 6vw, 6rem);
        }

        .gallery-label {
          font-family: var(--font-dm-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.24em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .gallery-heading {
          font-family: var(--font-bebas-neue, sans-serif);
          font-size: clamp(2.4rem, 5vw, 4rem);
          color: #fff;
          line-height: 1.05;
          margin-bottom: 40px;
        }

        .gallery-heading em {
          color: #3b5bdb;
          font-style: normal;
        }

        .gallery-video-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          overflow: hidden;
          margin-bottom: 56px;
          border: 1px solid rgba(59,91,219,0.12);
        }

        .gallery-video-frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .gallery-video-fade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(0,0,0,0.35) 0%,
              rgba(0,0,0,0) 22%,
              rgba(0,0,0,0) 70%,
              rgba(0,0,0,0.45) 100%
            );
          z-index: 1;
          pointer-events: none;
        }

        .gallery-corner {
          position: absolute;
          width: 22px;
          height: 22px;
          border: 2px solid #3b5bdb;
          opacity: 0.55;
          z-index: 2;
          pointer-events: none;
        }

        .gallery-corner.tl {
          top: 14px;
          left: 14px;
          border-right: none;
          border-bottom: none;
        }

        .gallery-corner.tr {
          top: 14px;
          right: 14px;
          border-left: none;
          border-bottom: none;
        }

        .gallery-corner.bl {
          bottom: 14px;
          left: 14px;
          border-right: none;
          border-top: none;
        }

        .gallery-corner.br {
          bottom: 14px;
          right: 14px;
          border-left: none;
          border-top: none;
        }

        .gallery-video-badge {
          position: absolute;
          top: 18px;
          left: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-dm-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          background: rgba(0,0,0,0.45);
          padding: 6px 10px;
          backdrop-filter: blur(4px);
          z-index: 2;
          pointer-events: none;
        }

        .gallery-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3b5bdb;
          animation: gallery-pulse 1.6s ease-in-out infinite;
        }

        @keyframes gallery-pulse {
          0%,100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: .35;
            transform: scale(.8);
          }
        }
      `}</style>

      <section
        className="gallery-section"
        ref={ref}
        id = "gallery"
      >
        <div className="gallery-label">
          Project Gallery
        </div>

        <h2 className="gallery-heading">
          The build,
          <br />
          <em>documented.</em>
        </h2>

        <div className="gallery-video-frame">
          <iframe
            src="https://drive.google.com/file/d/1ZVnUdnerkqX_SofaLidiZ_UQfh7_lb8N/preview?autoplay=1"
            allow="autoplay; fullscreen"
            loading="lazy"
          />

          <div className="gallery-video-fade" />

          <div className="gallery-corner tl" />
          <div className="gallery-corner tr" />
          <div className="gallery-corner bl" />
          <div className="gallery-corner br" />

          <div className="gallery-video-badge">
            <span className="gallery-live-dot" />
            Build Footage
          </div>
        </div>
      </section>
    </>
  );
}