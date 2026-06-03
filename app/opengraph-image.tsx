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
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow — centered */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 800,
            background:
              "radial-gradient(circle, rgba(227,0,0,0.15) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Top + bottom border lines */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "#E30000" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#1a1a1a" }} />

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            zIndex: 1,
          }}
        >
          {/* Big HC badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#E30000",
              borderRadius: 28,
              width: 120,
              height: 120,
              marginBottom: 32,
            }}
          >
            <div style={{ color: "white", fontSize: 52, fontWeight: 900, letterSpacing: "-2px" }}>
              HC
            </div>
          </div>

          {/* Shop name */}
          <div
            style={{
              color: "white",
              fontSize: 86,
              fontWeight: 900,
              letterSpacing: "-3px",
              lineHeight: 1,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Handy City 2
          </div>

          {/* Location */}
          <div
            style={{
              color: "#E30000",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 5,
              textTransform: "uppercase",
              marginBottom: 36,
            }}
          >
            Wien Meidling · 1120
          </div>

          {/* Service chips */}
          <div style={{ display: "flex", gap: 14 }}>
            {["Display", "Akku", "Ladebuchse", "Kamera", "Rückglas"].map((s) => (
              <div
                key={s}
                style={{
                  background: "#161616",
                  border: "1.5px solid #2a2a2a",
                  borderRadius: 50,
                  padding: "10px 24px",
                  color: "#d4d4d4",
                  fontSize: 19,
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Address bottom center */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "#444",
            fontSize: 17,
          }}
        >
          Meidlinger Hauptstraße 72 · 1120 Wien
        </div>
      </div>
    ),
    { ...size }
  );
}
