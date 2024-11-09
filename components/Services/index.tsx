"use client";
import React from "react";
import {
  BlendIcon,
  FolderCodeIcon,
  DraftingCompassIcon,
  UserSearchIcon,
} from "lucide-react";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const services = [
  {
    id: 1,
    title: "UI UX Design",
    description:
      "Our expert UI/UX designers craft intuitive and visually appealing digital experiences. From wireframes to pixel-perfect designs, we transform your ideas into reality.",
    icon: <BlendIcon color="#d1d5db" />,
    src: "/img1.webp",
  },
  {
    id: 2,
    title: "Web Development",
    description:
      "We can give powerful web-based solutions for our customers. We are using the latest technologies in programming. Our coders are highly qualified and experienced. They have experience in handling complex web applications. Please check our Web Development portfolio.",
    icon: <FolderCodeIcon color="#d1d5db" />,
    src: "/img2.webp",
  },
  {
    id: 3,
    title: "Branding",
    description:
      "We have Graphics Designers with more than 15 years experience. Our designers have experience in designing logos, brochures, newsletters, banners, flyers etc.. Please check our Web Designing Portfolio, Banners, Newsletters and Print Media Designs.",
    icon: <DraftingCompassIcon color="#d1d5db" />,
    src: "/img3.webp",
  },
  {
    id: 4,
    title: "Dedicated Employee",
    description:
      "Hire programmers and designers for your projects. They will work in your projects from our office. Pick your right employee from a group of candidates with different qualification, skill set and experience level. We can provide PHP Programmers, App Developers, Designers and Search Engine Optimizers. Enquire about your offshore employee here.",
    icon: <UserSearchIcon color="#d1d5db" />,
    src: "/img4.webp",
  },
];

interface CardProps {
  i: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  src: string;
}

export const Services = () => {
  const container = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
  return (
    <div className="bg-dark" ref={container} id="services">
      <div className="mx-auto max-w-7xl py-20 px-6 2xl:px-0 relative">
        <div className="w-full flex justify-between items-end">
          <h2 className="font-serif text-white text-4xl">
            What <span className="italic">W</span>e{" "}
            <span className="italic">Offer</span>
          </h2>
          <h3 className="text-white italic font-light">Services</h3>
        </div>
        {services.map((service, i) => {
          return (
            <Card
              key={`p_${i}`}
              i={i}
              {...service}
            />
          );
        })}
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  icon,
  src
}) => {
  const container = useRef<HTMLDivElement>(null);


  return (
    <div
      ref={container}
      className=" h-screen flex items-center justify-center sticky top-0 text-white"
    >
      <motion.div
        style={{ top: `calc(-5vh + ${i * 50}px)` }}
        className="border-t-2 border-gray-600 flex flex-col relative -top-1/4 h-[500px] w-full px-4 sm:px-12 pt-3 origin-top bg-dark"
      >
        <div className="inline-flex items-center w-full justify-between">
          {icon}
          <h2 className="text-lg">{title}</h2>
        </div>
        <div className="flex h-full w-full sm:mt-12 mt-8 justify-between items-start sm:flex-row flex-col">
          <div className="sm:w-2/5 w-full">
            <p className="italic font-light lg:text-xl text-sm">{description}</p>
          </div>
          <Image src={src} alt={title} width={500} height={500} priority className="sm:w-2/5 w-full"/>
        </div>
      </motion.div>
    </div>
  );
};
