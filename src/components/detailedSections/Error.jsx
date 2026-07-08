"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "#080809",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        color: "rgba(255,255,255,0.6)",
        fontFamily: "sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.95rem" }}>
        Something went wrong loading this page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "0.5px solid rgba(255,255,255,0.14)",
          borderRadius: "2px",
          color: "rgba(255,255,255,0.85)",
          padding: "10px 22px",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        Try again
      </button>
    </div>
  );
}