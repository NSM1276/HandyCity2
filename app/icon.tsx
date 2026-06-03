import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
          border: "1.5px solid #D4AF37",
        }}
      >
        <div
          style={{
            color: "#D4AF37",
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: "-0.5px",
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
