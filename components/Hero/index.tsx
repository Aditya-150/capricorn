"use client";
import { motion } from "framer-motion";
// import Link from 'next/link';
import React from "react";
import { CalendarClockIcon } from "lucide-react";
import { Navbar } from "../Navbar";
import GradientCursorFollower from "../GradientCursorFollower";
import MaskText from "../MaskText";

export const Hero = () => {
  // const text = [<p>hi</p>, <p>hi</p>, <p>hi</p>];
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="bg-background" ref={containerRef}>
      <GradientCursorFollower containerRef={containerRef} />
      <div className="max-w-7xl mx-auto flex flex-col justify-start items-start xl:px-0 px-6 w-full pt-12 h-[100vh]">
        <Navbar />

        {/* <h1 className="font-serif text-4xl sm:text-7xl text-dark sm:mt-48 mt-12">
          Where Vision Meets Precision: Crafting the{" "}
          <span className="italic">Future of Digital Experiences.</span>
        </h1> */}
        <MaskText
          text={[
            <p key="line1" className="text-3xl sm:text-6xl">
              Where Vision Meets Precision: Crafting the
            </p>,
            <p key="line2" className="italic text-4xl sm:text-7xl">
              Future of Digital Experiences.
            </p>,
          ]}
          className="sm:mt-48 mt-12"
          textClassName="text-lg font-serif text-4xl sm:text-7xl text-dark"
        />
        <p className="mt-6 font-serif text-lg sm:text-2xl text-dark">
          Here we transform ideas into digital realities that{" "}
          <span className="font-bold">captivate</span>,{" "}
          <span className="font-bold">inspire</span>, and{" "}
          <span className="font-bold">engage</span>.
        </p>
        <motion.button
          className="relative px-4 sm:px-6 mt-4 py-3 sm:py-4 sm:text-base text-sm font-normal border-2 border-black rounded-full overflow-hidden flex flex-row gap-x-2 items-center"
          whileHover="hover"
          initial="initial"
        >
          <CalendarClockIcon className="sm:size-4 size-3" />
          Book a Call with Us
          <motion.div
            className="absolute inset-0 bg-black/30"
            variants={{
              initial: { y: "0%" },
              hover: { y: "100%" },
            }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            className="absolute inset-0 bg-black/60"
            variants={{
              initial: { y: "0%" },
              hover: { y: "100%" },
            }}
            transition={{ duration: 0.2, delay: 0.1 }}
          />
          <motion.div
            className="absolute inset-0 bg-black flex items-center justify-center text-white gap-x-2"
            variants={{
              initial: { y: "0%" },
              hover: { y: "100%" },
            }}
            transition={{ duration: 0.15, delay: 0.2 }}
          >
            <CalendarClockIcon className="sm:size-4 size-3" />
            Book a Call with Us
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};
