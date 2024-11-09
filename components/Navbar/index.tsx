import React from "react";
import Image from "next/image";
import LinkWithHover from "../LinkWithHover";

export const Navbar = () => {
  return (
    <div className="flex flex-row w-full justify-between items-start sm:items-center">
      <Image src="/Text_Logo.svg" alt="logo" width={180} height={38} priority />
      <nav>
        <ul className="font-serif flex flex-col sm:flex-row sm:gap-4 gap-1">
          <li>
            <LinkWithHover href="#about">about</LinkWithHover>
          </li>
          <li>
            <LinkWithHover href="#works">works</LinkWithHover>
          </li>
          <li>
            <LinkWithHover href="#services">services</LinkWithHover>
          </li>
          <li>
            <LinkWithHover href="#contact">contact</LinkWithHover>
          </li>
        </ul>
      </nav>
    </div>
  );
};
