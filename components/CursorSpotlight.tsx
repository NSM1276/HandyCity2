"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x, y } = pos.current;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 500);
      g.addColorStop(0,    "rgba(212,175,55,0.09)");
      g.addColorStop(0.4,  "rgba(212,175,55,0.035)");
      g.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current!);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
