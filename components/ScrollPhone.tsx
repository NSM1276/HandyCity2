"use client";

import { useEffect, useRef } from "react";

export default function ScrollPhone() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.load();

    function onScroll() {
      if (!video || !container) return;
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      if (video.duration) {
        video.currentTime = progress * video.duration;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[280vh] bg-[#0A0A0A]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Professionelle Reparatur
        </p>
        <video
          ref={videoRef}
          src="/phone-assembly.mp4"
          muted
          playsInline
          preload="auto"
          className="h-[65vmin] w-[65vmin] max-h-[520px] max-w-[520px] rounded-3xl object-cover"
        />
        <p className="text-sm text-neutral-500">Scroll weiter ↓</p>
      </div>
    </div>
  );
}
