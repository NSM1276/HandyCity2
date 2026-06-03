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
          overflow: "hidden",
        }}
      >
        {/* Gold glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />
        {/* Gold glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Top gold accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, #D4AF37, #F0D878, #D4AF37, transparent)" }} />

        {/* Left content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingLeft: 80,
            paddingRight: 60,
            flex: 1,
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1.5px solid rgba(212,175,55,0.5)",
              borderRadius: 50,
              padding: "8px 20px",
              marginBottom: 28,
              background: "rgba(212,175,55,0.08)",
            }}
          >
            <div style={{ color: "#D4AF37", fontSize: 15, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
              Express Reparatur · Wien Meidling
            </div>
          </div>

          {/* Main title */}
          <div
            style={{
              color: "white",
              fontSize: 80,
              fontWeight: 900,
              letterSpacing: "-3px",
              lineHeight: 1.05,
              marginBottom: 8,
            }}
          >
            Handy City 2
          </div>

          {/* Gold subtitle */}
          <div
            style={{
              color: "#D4AF37",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 1,
              marginBottom: 36,
            }}
          >
            Reparatur · Ankauf · Verkauf · Zubehör
          </div>

          {/* Service chips */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["Display", "Akku", "Ladebuchse", "Kamera", "Rückglas"].map((s) => (
              <div
                key={s}
                style={{
                  background: "#161616",
                  border: "1px solid #2a2a2a",
                  borderRadius: 50,
                  padding: "9px 22px",
                  color: "#d4d4d4",
                  fontSize: 18,
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Right: gold H2 badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 80,
            gap: 16,
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 180,
              height: 180,
              borderRadius: 40,
              background: "linear-gradient(135deg, #1a1a1a, #0A0A0A)",
              border: "2px solid #D4AF37",
              boxShadow: "0 0 60px rgba(212,175,55,0.25)",
            }}
          >
            <div style={{ color: "#D4AF37", fontSize: 72, fontWeight: 900, letterSpacing: "-3px" }}>
              H2
            </div>
          </div>
          <div style={{ color: "#666", fontSize: 16, textAlign: "center", letterSpacing: 0.5 }}>
            Meidlinger Hauptstraße 72
          </div>
          <div style={{ color: "#D4AF37", fontSize: 17, fontWeight: 700, letterSpacing: 1 }}>
            1120 Wien
          </div>
        </div>

        {/* Bottom gold line */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
      </div>
    ),
    { ...size }
  );
}
