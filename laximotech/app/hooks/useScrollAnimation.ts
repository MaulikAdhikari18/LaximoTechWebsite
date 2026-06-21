"use client";
import { useEffect } from "react";

/**
 * Adds IntersectionObserver to all .lx-animate and .lx-stagger elements.
 * When an element enters the viewport, "visible" class is added → CSS animates it.
 * Call this hook once in each page component.
 */
export function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll(".lx-animate, .lx-stagger");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}