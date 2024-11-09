"use client";
import React, { useEffect, useRef } from "react";
import ScrollWordReveal from "../ScrollWordReveal";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

export const About = () => {
  const imageVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const content =
    "Capricorn Technologies is a team of passionate designers and developers dedicated to crafting unique, high-performance websites and applications. We combine innovative design principles, the latest technology, and a client-centric approach to create solutions that don’t just look great but drive results. Our mission is to deliver digital experiences that make a lasting impact in today’s fast-paced world.";

  return (
    <div className="bg-dark text-white overflow-hidden" ref={ref} id="about">
      <div className="max-w-7xl mx-auto py-20 relative font-serif 2xl:px-0 px-6">
        <h2 className="font-light font-sans italic xl:text-right text-left max-xl:mb-4">About Us</h2>
        <ScrollWordReveal paragraph={content} />
        <motion.div
          exit="exit"
          initial="hidden"
          variants={imageVariants}
          animate={controls}
          className="absolute top-10 -right-20 hidden xl:block hover:-right-64 hover:top-20 transition-all duration-500 ease-in-out"
        >
          <Image
            src="/about.png"
            alt="logo"
            width={600}
            height={600}
            priority
          />
        </motion.div>
      </div>
    </div>
  );
};
