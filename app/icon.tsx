import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#E30000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: 900,
            letterSpacing: "-0.5px",
            fontFamily: "sans-serif",
          }}
        >
          HC
        </div>
      </div>
    ),
    { ...size }
  );
}
