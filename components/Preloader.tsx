"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), 1800);
    const goneTimer = setTimeout(() => setPhase("gone"), 2400);
    return () => { clearTimeout(fadeTimer); clearTimeout(goneTimer); };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: phase === "fading" ? "none" : "all",
      }}
    >
      {/* Glow ring */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,113,227,0.10) 0%, transparent 70%)",
          animation: "preloader-pulse 2s ease-in-out infinite",
        }}
      />

      {/* Logo container */}
      <div
        style={{
          position: "relative",
          animation: "preloader-rise 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards",
          opacity: 0,
        }}
      >
        <Image
          src="/logo.png"
          alt="Chomly Gadgets KE-Deals"
          width={360}
          height={152}
          className="w-[300px] md:w-[360px] h-auto object-contain"
          priority
        />
      </div>

      {/* Progress bar */}
      <div
        style={{
          marginTop: 40,
          width: 180,
          height: 3,
          borderRadius: 99,
          background: "rgba(0,113,227,0.12)",
          overflow: "hidden",
          animation: "preloader-bar-appear 0.4s 0.5s ease both",
          opacity: 0,
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 99,
            background: "linear-gradient(90deg, #0071E3, #0051B3)",
            animation: "preloader-fill 1.2s 0.5s cubic-bezier(0.4,0,0.2,1) forwards",
            width: 0,
          }}
        />
      </div>

      {/* Tagline */}
      <p
        style={{
          marginTop: 20,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#6E6E73",
          fontWeight: 600,
          animation: "preloader-rise 0.6s 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
          opacity: 0,
        }}
      >
        Premium Tech. Better Deals.
      </p>

      <style>{`
        @keyframes preloader-rise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes preloader-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50%       { transform: scale(1.15); opacity: 1; }
        }
        @keyframes preloader-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes preloader-bar-appear {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
