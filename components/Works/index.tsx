"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "BEYOND CLEANING GROUP",
    src: "/proj1.jpg",
    color: "#ADD8E6",
    category: ["Web Development"],
    description:
      "Beyond Cleaning Group is a cleaning service from Gold Coast, Australia. We did a WordPress site for them. Later we installed and customized some plugins as per their requirements. We are doing site updation for them regularly.",
  },
  {
    title: "101SCRIPTS",
    src: "/proj2.jpg",
    color: "#00FF00",
    category: ["UI/UX ", "Development"],
    description:
      "It is a collection of useful scripts. Custom PHP code was used for this site. Registered users can download scripts from this website. Scripts are listed in different categories. For SEO purpose, we did a ‘Tag cloud’ for them.",
  },
  {
    title: "LELINDA",
    src: "/proj3.jpg",
    color: "#8C8C8C",
    category: ["UI/UX ", "Branding", "Development"],
    description:
      "Lelinda is a home stay in fortkochi, India. Their requirement was a basic site with their details. We did it core PHP with an admin section to manage their photo-gallery, main content, etc.",
  },
  {
    title: "BOOKSTORE",
    src: "/proj4.jpg",
    color: "#FFA500",
    category: ["UI/UX ", "Branding", "Development"],
    description:
      "Bookstore is the online presence of an old book sale shop. The client asked for an easy to use shopping cart with an attractive design. We did the site in  woo-commerce.",
  },
];

const Works = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Get the relative position within the viewport
    setMousePosition({
      x: e.clientX - 200,
      y: e.clientY - 100, // Offset upward by 100px
    });
  };

  return (
    <div className="bg-background" id="works">

    <div
      className="max-w-7xl mx-auto py-20 relative 2xl:px-0 px-6"
      onMouseMove={handleMouseMove}
    >
      <h2 className="text-5xl font-serif mb-8">
        <span className="italic">Selected</span> Works
      </h2>

      <div className="relative">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
            className="flex sm:flex-row flex-col max-sm:gap-2 group w-full justify-between items-start py-6 px-6 border-t border-dark transition-all duration-300 cursor-pointer last:border-b"
          >
            <h2 className="text-2xl m-0 font-light transition-all duration-300 group-hover:-translate-x-2 basis-1/5 group-hover:opacity-50">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-start justify-center gap-2 basis-1/5">
              {project.category.map((cat, index) => (
                <div
                  key={index}
                  className="flex items-center border px-3 py-2 border-dark rounded-full group-hover:bg-dark group-hover:text-white transition-all duration-300"
                >
                  <p className="text-sm whitespace-nowrap font-serif italic">
                    {cat}
                  </p>
                </div>
              ))}
            </div>
            <p className="basis-3/5 transition-all duration-300 group-hover:translate-x-2">
              {project.description}
            </p>
          </div>
        ))}

        <AnimatePresence>
          {hoveredProject !== null && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="fixed pointer-events-none z-50"
                style={{
                  left: mousePosition.x,
                  top: mousePosition.y,
                  transform: "translate(-50%, -50%)",
                  width: "400px",
                  aspectRatio: "16/9",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden"
                  style={{ backgroundColor: projects[hoveredProject].color }}
                >
                  <Image
                    src={projects[hoveredProject].src}
                    alt={projects[hoveredProject].title}
                    className="h-auto object-cover"
                    width={200}
                    height={200}
                  />
                </div>
              </motion.div>

              {/* <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed w-10 h-10 rounded-full bg-blue-600 pointer-events-none z-50"
                style={{
                  left: mousePosition.x,
                  top: mousePosition.y + 160,
                  transform: "translate(-50%, -50%)",
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed px-4 py-2 rounded-md bg-blue-600 text-white pointer-events-none z-50 text-sm"
                style={{
                  left: mousePosition.x + 20,
                  top: mousePosition.y + 160,
                  transform: "translate(-50%, -50%)",
                }}
              >
                View
              </motion.div> */}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
};

export default Works;
