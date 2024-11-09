import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  containerRef: React.RefObject<HTMLElement>;
};

export default function GradientCursorFollower({ containerRef }: Props) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const container = containerRef.current;

    if (!cursor || !container) return;

    // Set initial position
    gsap.set(cursor, {
      x: container.offsetWidth / 2,
      y: container.offsetHeight / 2,
      scale: 0,
      transformOrigin: "center center",
    });

    const onMouseMove = (e: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      gsap.to(cursor, {
        x,
        y,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className="absolute size-64 pointer-events-none rounded-full"
      style={{
        background:
          "linear-gradient(to right, rgba(245, 137, 92, 1), rgba(179, 78, 204, 1))",
        filter: "blur(40px)",
        transform: "translate(-50%, -50%)",
        willChange: "transform",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
}
