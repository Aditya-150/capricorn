import Link from "next/link";
import React from "react";
import {cn} from "@/lib/utils";


interface LinkWithHoverProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const LinkWithHover: React.FC<LinkWithHoverProps> = ({ href, children, className, color="black" }) => {
  return (
    <Link
      href={href}
      className={cn(
        `relative group inline-block text-[${color}] hover:text-[${color}]/90 transition-colors duration-300`,
        className
      )}
      style={{color}}
    >
      {children}
      <span className={`absolute left-0 bottom-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} style={{backgroundColor: color}}></span>
    </Link>
  );
};

export default LinkWithHover;
