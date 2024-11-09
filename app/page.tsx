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
  const loader = useRef<HTMLDivElement | null>(null);
  const path = useRef<SVGPathElement | null>(null);
  const initialCurve = 400;
  const duration = 1000;
  let start: number | undefined;

  useEffect(() => {
    setPath(initialCurve);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const animate = (timestamp: number) => {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    const newCurve = easeOutQuad(elapsed, initialCurve, -400, duration);
    setPath(newCurve);

    if (loader.current) {
      const newTop = easeOutQuad(elapsed, 0, -loaderHeight(), duration);
      loader.current.style.transform = `translateY(${newTop}px)`;
    }

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      if (loader.current) {
        loader.current.style.visibility = "hidden";
      }
      finishLoading();
    }
  };

  const finishLoading = () => {
    setIsLoading(false);
    document.body.style.overflow = "";

    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  const easeOutQuad = (
    time: number,
    start: number,
    end: number,
    duration: number
  ): number => {
    return -end * (time /= duration) * (time - 2) + start;
  };

  const loaderHeight = (): number => {
    return window.innerHeight + 400;
  };

  const setPath = (curve: number) => {
    const width = window.innerWidth;
    const height = loaderHeight();
    if (path.current) {
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
    }
  };

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
            height: `${loaderHeight()}px`,
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox={`0 0 ${window.innerWidth} ${loaderHeight()}`}
          >
            <path ref={path} fill="#1E1E1E" strokeWidth="0" />
          </svg>
        </div>
      </main>
    </ReactLenis>
  );
}
