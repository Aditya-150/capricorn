"use client";
import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundImage: "url('/cursor.svg')",
        // backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent background
        backgroundBlendMode: "difference",
      }}
      className="pointer-events-none fixed h-8 w-8 bg-no-repeat bg-contain transform -translate-x-1/2 -translate-y-1/2 z-50"
    />
  );
};
