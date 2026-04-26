"use client";
import { useCallback } from "react";

const PALETTE_COLORS = [
  "#ffdf64", "#ffdf64", "#ffdf64",
  "#c9ad3e", "#6e7271", "#a8abaa", "#ffffff",
];

export function useConfetti() {
  const fire = useCallback((count = 55) => {
    if (typeof window === "undefined") return;
    const container = document.getElementById("confetti-container");
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const color = PALETTE_COLORS[Math.floor(Math.random() * PALETTE_COLORS.length)];
      const size = 6 + Math.random() * 8;
      const duration = 1500 + Math.random() * 1500;
      const delay = Math.random() * 600;
      el.style.cssText = `
        position:absolute;left:${Math.random() * 100}%;top:-20px;
        width:${size}px;height:${size}px;background:${color};
        border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
        animation:confFall ${duration}ms linear ${delay}ms forwards;
        pointer-events:none;
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), duration + delay + 100);
    }
  }, []);
  return { fire };
}
