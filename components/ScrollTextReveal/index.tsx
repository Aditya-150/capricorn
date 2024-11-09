import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
const ScrollTextReveal = ({
  text,
  scrollYProgress,
  index,
  total,
}: {
  text: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) => {
  // Calculate the reveal progress for this specific line
  const startProgress = index / total;
    // const endProgress = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.1],
    [0, 1]
  );

  const x = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.1],
    [50, 0]
  );

  return (
    <motion.div
      style={{
        opacity,
        x,
      }}
      className="text-3xl font-bold text-gray-800"
    >
      {text}
    </motion.div>
  );
};

export default ScrollTextReveal;
