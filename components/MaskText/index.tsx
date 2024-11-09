import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface MaskTextProps {
  text: string | string[] | React.ReactElement[];
  className?: string;
  textClassName?: string;
  threshold?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const MaskText: React.FC<MaskTextProps> = ({
  text,
  className = "",
  textClassName = "",
  threshold = 0.75,
  delay = 0.075,
  duration = 0.75,
  once = true,
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
  });

  // Convert single string to array if necessary
  const phrases = Array.isArray(text) ? text : [text];

  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration,
        ease: [0.33, 1, 0.68, 1],
        delay: delay * i,
      },
    }),
  };

  return (
    <div ref={ref} className={`py-0 ${className}`}>
      {phrases.map((phrase, index) => (
        <div key={index} className="overflow-hidden relative">
          <motion.div
            custom={index}
            variants={animation}
            initial="initial"
            animate={inView ? "enter" : ""}
            className={`leading-relaxed ${textClassName}`}
          >
            {phrase}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default MaskText;
