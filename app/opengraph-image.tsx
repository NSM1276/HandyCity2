import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top red bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#E30000",
          }}
        />

        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(227,0,0,0.18) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#E30000",
            borderRadius: 20,
            width: 88,
            height: 88,
            marginBottom: 44,
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: "-1px",
            }}
          >
            HC
          </div>
        </div>

        {/* Location tag */}
        <div
          style={{
            color: "#E30000",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          Wien Meidling · 1120
        </div>

        {/* Title */}
        <div
          style={{
            color: "white",
            fontSize: 80,
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 24,
            letterSpacing: "-2px",
          }}
        >
          Handy City 2
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#a3a3a3",
            fontSize: 30,
            marginBottom: 52,
            lineHeight: 1.4,
          }}
        >
          Express Reparatur · Ankauf · Verkauf · Zubehör
        </div>

        {/* Service chips */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {["Display", "Akku", "Ladebuchse", "Kamera", "Rückglas"].map((s) => (
            <div
              key={s}
              style={{
                background: "#1a1a1a",
                border: "1.5px solid #2a2a2a",
                borderRadius: 50,
                padding: "12px 28px",
                color: "#e5e5e5",
                fontSize: 20,
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Address bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            right: 90,
            color: "#555",
            fontSize: 18,
          }}
        >
          Meidlinger Hauptstraße 72 · 1120 Wien
        </div>
      </div>
    ),
    { ...size }
  );
}
