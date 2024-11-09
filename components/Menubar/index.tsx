"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import LinkWithHover from "../LinkWithHover";

type MenuItem = {
  text: string;
  href: string;
};

type MenuItemProps = MenuItem & {
  variants: Variants; // Framer motion variants type
  whileHover: { scale: number };
  whileTap: { scale: number };
};

type MenubarProps = {
  items: MenuItem[];
};

const MenuItem: React.FC<MenuItemProps> = ({ text, href }) => (
  <motion.a
    href={href}
    rel="noopener noreferrer"
    variants={itemVariants}
    className="flex items-center px-6 py-3 text-gray-700 hover:text-white hover:bg-dark group transition-colors"
  >
    <span className="font-medium group-hover:scale-105">{text}</span>
  </motion.a>
);

const menuVariants: Variants = {
  open: {
    scale: 1,
    opacity: 1,
    originX: 2,
    originY: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      staggerDirection: 1,
      when: "beforeChildren",
    },
  },
  closed: {
    scale: 0,
    opacity: 0,
    originX: 2,
    originY: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

const Menubar: React.FC<MenubarProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed sm:bottom-10 sm:right-10 right-5 bottom-5 z-50 p-2 ${isOpen ? "rounded-tl-lg rounded-br-lg": "rounded-lg"} mix-blend-difference bg-white shadow-md hover:shadow-lg transition-all duration-500 linear`}
      >
        <motion.div animate={isOpen ? "open" : "closed"} initial={false}>
          {isOpen ? <XIcon /> : <MenuIcon />}
        </motion.div>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
        />
      )}
      <motion.nav
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="fixed sm:bottom-10 sm:right-10 right-5 bottom-5 h-96 w-64 bg-white rounded-lg shadow-xl z-40 flex flex-col pb-16 space-y-2 overflow-hidden"
      >
        {items.map((item, index) => (
          <MenuItem
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={index}
            {...item}
          />
        ))}
        <motion.div
          variants={itemVariants}
          className="flex absolute bottom-0 left-0 px-6 space-x-3 pb-4"
        >
          <LinkWithHover href="" className="text-xl" color="rgb(59 130 246)">
            Li
          </LinkWithHover>
          <LinkWithHover href="" className="text-xl" color="rgb(236 72 153)">
            In
          </LinkWithHover>
          <LinkWithHover href="" className="text-xl">
            Be
          </LinkWithHover>
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default Menubar;
