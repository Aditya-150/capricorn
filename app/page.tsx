"use client";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import Menubar from "@/components/Menubar";
import { Services } from "@/components/Services";
import { Testimonies } from "@/components/Testimonies";
import Works from "@/components/Works";
import { ReactLenis } from "lenis/react";
import { useRef, useEffect, useState } from "react";

const items = [
  { text: "home", href: "" },
  { text: "about", href: "#about" },
  { text: "works", href: "#works" },
  { text: "services", href: "#services" },
  { text: "contact", href: "#contact" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const loader = useRef<HTMLDivElement | null>(null);
  const path = useRef<SVGPathElement | null>(null);
  const initialCurve = 400;
  const duration = 1000;

  // Handle window dimensions on client side
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight + 400,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const easeOutQuad = (
    time: number,
    start: number,
    end: number,
    duration: number
  ): number => {
    return -end * (time /= duration) * (time - 2) + start;
  };

  const setPath = (curve: number) => {
    if (!path.current || !dimensions.width || !dimensions.height) return;

    const width = dimensions.width;
    const height = dimensions.height;

    path.current.setAttributeNS(
      null,
      "d",
      `
      M0 0
      L${width} 0
      L${width} ${height - curve}
      C${width * 0.75} ${height - curve * 0.5} ${width * 0.25} ${
        height - curve * 0.5
      } 0 ${height - curve}
      L0 0
      `
    );
  };

  const animate = (timestamp: number) => {
    if (!loader.current || !dimensions.height) return;

    const start = loader.current.dataset.startTime
      ? parseInt(loader.current.dataset.startTime)
      : timestamp;

    if (!loader.current.dataset.startTime) {
      loader.current.dataset.startTime = start.toString();
    }

    const elapsed = timestamp - start;
    const newCurve = easeOutQuad(elapsed, initialCurve, -400, duration);
    setPath(newCurve);

    const newTop = easeOutQuad(elapsed, 0, -dimensions.height, duration);
    loader.current.style.transform = `translateY(${newTop}px)`;

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      loader.current.style.visibility = "hidden";
      finishLoading();
    }
  };

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    setPath(initialCurve);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);

    return () => {
      document.body.style.overflow = "";
    };
  }, [dimensions]);

  const finishLoading = () => {
    setIsLoading(false);
    document.body.style.overflow = "";

    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  if (!dimensions.width || !dimensions.height) {
    return null; // Return null on initial server-side render
  }

  return (
    <ReactLenis root className="overflow-x-hidden min-h-screen flex flex-col">
      <main className="flex-grow relative">
        <div
          className={`transition-all duration-700 ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{
            pointerEvents: contentVisible ? "auto" : "none",
          }}
        >
          {!isLoading && (
            <>
              <Hero />
              <About />
              <Works />
              <Services />
              <Testimonies />
              <Contact />
              <Footer />
              <Menubar items={items} />
            </>
          )}
        </div>

        <div
          ref={loader}
          className="fixed inset-0 w-full bg-[#1E1E1E] z-50"
          style={{
            height: `${dimensions.height}px`,
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          >
            <path ref={path} fill="#1E1E1E" strokeWidth="0" />
          </svg>
        </div>
      </main>
    </ReactLenis>
  );
}
