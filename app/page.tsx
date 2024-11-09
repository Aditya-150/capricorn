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
  const [showContent, setShowContent] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const loader = useRef<HTMLDivElement | null>(null);
  const path = useRef<SVGPathElement | null>(null);
  const initialCurve = 200;
  const duration = 600;
  let start: number | undefined;

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
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
    const height = dimensions.height + 200; 
    path.current.setAttributeNS(
      null,
      "d",
      `
      M0 0
      L${width} 0
      L${width} ${height}
      Q${width / 2} ${height - curve} 0 ${height}
      L0 0
      `
    );
  };

  const animate = (timestamp: number) => {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    const newCurve = easeOutQuad(elapsed, initialCurve, -200, duration);
    setPath(newCurve);

    if (loader.current) {
      const newPosition = easeOutQuad(
        elapsed,
        0,
        -(dimensions.height + 200),
        duration
      );
      loader.current.style.transform = `translateY(${newPosition}px)`;
    }

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      setIsLoading(false);
      if (loader.current) {
        loader.current.style.display = "none";
      }
    }
  };

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    document.body.style.overflow = "hidden";
    setPath(initialCurve);

    setTimeout(() => {
      requestAnimationFrame(animate);
      setShowContent(true);
    }, 500);

    return () => {
      document.body.style.overflow = "";
    };
  }, [dimensions]);

  if (!dimensions.width || !dimensions.height) {
    return null;
  }

  return (
    <ReactLenis root className="overflow-x-hidden min-h-screen flex flex-col">
      <main className="flex-grow relative">
        {showContent && <Hero />}
        <div
          className={`transition-opacity duration-700 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <About />
          <Works />
          <Services />
          <Testimonies />
          <Contact />
          <Footer />
          <Menubar items={items} />
        </div>

        <div
          ref={loader}
          className="fixed inset-0 w-full bg-[#1E1E1E] z-50"
          style={{
            height: `${dimensions.height + 200}px`,
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height + 200}`}
          >
            <path ref={path} fill="#1E1E1E" stroke="#1E1E1E" strokeWidth="1" />
          </svg>
        </div>
      </main>
    </ReactLenis>
  );
}
