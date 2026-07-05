"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TABS = {
  esp32: {
    label: "ESP32-CAM Firmware",
    color: "#3b5bdb",
    summary: "Initializes OV2640 camera, connects to Wi-Fi, and hosts an MJPEG HTTP streaming server on port 80. Live feed accessible via browser at http://ESP32-IP/ or http://ESP32-IP/stream.",
    libraries: ["esp_camera.h", "WiFi.h", "esp_http_server.h"],
    keyFunctions: [
      { name: "setup()", desc: "Init serial · Connect Wi-Fi · Configure camera GPIO · Start HTTP server" },
      { name: "stream_handler()", desc: "Captures OV2640 JPEG frames · Streams as HTTP multipart response" },
      { name: "startCameraServer()", desc: "Registers /stream endpoint on port 80 · Runs in background" },
      { name: "loop()", desc: "Minimal — streaming handled by HTTP server task" },
    ],
    output: "Live MJPEG stream → Web browser on smartphone or PC",
  },
  arduino: {
    label: "Arduino UNO Firmware",
    color: "#5b7fff",
    summary: "Reads temperature and humidity from DHT11 sensor every 2 seconds and transmits data over Serial to HC-05 Bluetooth module at 9600 baud for wireless ground-station monitoring.",
    libraries: ["DHT.h"],
    keyFunctions: [
      { name: "setup()", desc: "Serial.begin(9600) · dht.begin() — matches HC-05 default baud" },
      { name: "loop()", desc: "dht.readHumidity() · dht.readTemperature() · error check · Serial.print · delay(2000)" },
    ],
    output: "Temperature: 28 °C | Humidity: 62 % — printed every 2s via Bluetooth",
  },
};

export default function SoftwareSection({id}) {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState("esp32");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sw-label", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 0, y: 16, duration: 0.5 });
      gsap.from(".sw-heading", { scrollTrigger: { trigger: ref.current, start: "top 75%" }, y: 50, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".sw-panel", { scrollTrigger: { trigger: ref.current, start: "top 65%" }, opacity: 0, y: 30, duration: 0.65, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  const tab = TABS[activeTab];

  return (
    <>
      <style>{`
        .sw-section { background: #0a0f1e; padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem); }
        .sw-label { font-family: var(--font-dm-mono, monospace); font-size: 11px; letter-spacing: 0.24em; color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 16px; }
        .sw-heading { font-family: var(--font-bebas-neue, sans-serif); font-size: clamp(2.4rem, 5vw, 4rem); color: #fff; line-height: 1.05; margin-bottom: 36px; }
        .sw-heading em { color: #3b5bdb; font-style: normal; }
        .sw-tabs { display: flex; gap: 2px; margin-bottom: 32px; }
        .sw-tab { font-family: var(--font-dm-mono, monospace); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; padding: 10px 20px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: rgba(255,255,255,0.3); cursor: pointer; transition: all 0.2s; }
        .sw-tab.active { color: #06060a; background: var(--tab-color); border-color: var(--tab-color); }
        .sw-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: rgba(255,255,255,0.05); }
        .sw-panel-left, .sw-panel-right { background: #0a0f1e; padding: 32px; }
        .sw-section-title { font-family: var(--font-dm-mono, monospace); font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.2); margin-bottom: 16px; }
        .sw-summary { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.9rem; line-height: 1.8; color: rgba(255,255,255,0.45); margin-bottom: 24px; }
        .sw-libs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
        .sw-lib { font-family: var(--font-dm-mono, monospace); font-size: 10px; letter-spacing: 0.12em; padding: 5px 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); }
        .sw-output-box { background: #060810; border: 1px solid rgba(255,255,255,0.06); padding: 16px 18px; margin-top: 16px; }
        .sw-output-label { font-family: var(--font-dm-mono, monospace); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.2); margin-bottom: 8px; }
        .sw-output-text { font-family: var(--font-dm-mono, monospace); font-size: 11.5px; letter-spacing: 0.06em; color: #3b5bdb; }
        .sw-fn-list { display: flex; flex-direction: column; gap: 0; }
        .sw-fn-item { padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .sw-fn-item:last-child { border-bottom: none; }
        .sw-fn-name { font-family: var(--font-dm-mono, monospace); font-size: 12px; letter-spacing: 0.06em; margin-bottom: 5px; }
        .sw-fn-desc { font-family: var(--font-space-grotesk, sans-serif); font-size: 0.84rem; line-height: 1.65; color: rgba(255,255,255,0.35); }
        @media (max-width: 800px) { .sw-panel { grid-template-columns: 1fr; } }
      `}</style>
      <section className="sw-section" ref={ref} id={id}>
        <div className="sw-label">Software Implementation</div>
        <h2 className="sw-heading">Modular firmware,<br /><em>stable by design.</em></h2>
        <div className="sw-tabs">
          {Object.entries(TABS).map(([key, t]) => (
            <button
              key={key}
              className={`sw-tab${activeTab === key ? " active" : ""}`}
              style={{ "--tab-color": t.color }}
              onClick={() => setActiveTab(key)}
            >
              {t.label.split(" ")[0]}
            </button>
          ))}
        </div>
        <div className="sw-panel">
          <div className="sw-panel-left">
            <div className="sw-section-title">Overview</div>
            <div className="sw-summary">{tab.summary}</div>
            <div className="sw-section-title">Libraries Used</div>
            <div className="sw-libs">
              {tab.libraries.map((l) => (
                <span key={l} className="sw-lib" style={{ borderColor: tab.color + "44", color: tab.color }}>{l}</span>
              ))}
            </div>
            <div className="sw-output-box">
              <div className="sw-output-label">→ Output</div>
              <div className="sw-output-text" style={{ color: tab.color }}>{tab.output}</div>
            </div>
          </div>
          <div className="sw-panel-right">
            <div className="sw-section-title">Key Functions</div>
            <div className="sw-fn-list">
              {tab.keyFunctions.map((fn) => (
                <div key={fn.name} className="sw-fn-item">
                  <div className="sw-fn-name" style={{ color: tab.color }}>{fn.name}</div>
                  <div className="sw-fn-desc">{fn.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}