import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
          border: "8px solid #D4AF37",
        }}
      >
        <div
          style={{
            color: "#D4AF37",
            fontSize: 78,
            fontWeight: 900,
            letterSpacing: "-3px",
            fontFamily: "sans-serif",
          }}
        >
          H2
        </div>
      </div>
    ),
    { ...size }
  );
}
