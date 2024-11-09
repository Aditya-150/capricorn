"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";

type ScrollWordRevealProps = {
  paragraph: string;
};

const ScrollWordReveal: React.FC<ScrollWordRevealProps> = ({ paragraph }) => {
  const container = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.75", "start 0.1"],
  });

  const words = paragraph.split(" ");

  return (
    <p
      ref={container}
      className="flex flex-wrap text-white text-2xl sm:text-5xl leading-none sm:max-w-5xl"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

type WordProps = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
};

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-3 mt-3">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export default ScrollWordReveal;
