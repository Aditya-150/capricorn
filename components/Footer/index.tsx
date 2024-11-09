import Image from "next/image";
import LinkWithHover from "../LinkWithHover";

export default function Footer() {
  return (
    <div
      className="relative h-[800px] min-h-screen"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
        <div className="h-[800px] sticky top-[calc(100vh-800px)]">
          <Content />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="bg-zinc-200 pt-32 pb-12 px-6 h-full w-full flex flex-col justify-between">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="flex justify-between items-end">
      {/* <h1 className="text-[14vw] leading-[0.8] mt-10">Sticky Footer</h1> */}
      <Image className="sm:w-96" src="Text_Logo.svg" alt="logo" width={180} height={38}/>
      <p className="font-serif">©2024</p>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex lg:flex-row flex-col shrink-0 justify-between items-start w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 gap-20">
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 uppercase text-gray-600">Sections</h3>
          <LinkWithHover href="/">Home</LinkWithHover>
          <LinkWithHover href="#about">About</LinkWithHover>
          <LinkWithHover href="#works">Works</LinkWithHover>
          <LinkWithHover href="#services">Services</LinkWithHover>
          <LinkWithHover href="#contact">Contact Us</LinkWithHover>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 uppercase text-gray-600">Socials</h3>
          <LinkWithHover href="/">LinkedIn</LinkWithHover>
          <LinkWithHover href="/">X</LinkWithHover>
          <LinkWithHover href="/">Instagram</LinkWithHover>
          <LinkWithHover href="/">Behance</LinkWithHover>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="mb-2 uppercase text-gray-600">More</h3>
          <LinkWithHover href="/">Privacy Policy</LinkWithHover>
          <LinkWithHover href="/">Terms of Use</LinkWithHover>
          <LinkWithHover href="/">Careers</LinkWithHover>
        </div>
      </div>
      <div className="max-lg:mt-20 group lg:text-right text-left">
        <p className="text-gray-600 uppercase mb-2">Ping Us At</p>
        <LinkWithHover
          href="mailto:hello@capricorntechnologies.co.in"
          className="sm:text-3xl text-xl font-serif"
          color="#1E1E1E"
        >
          hello@capricorntechnologies.co.in
        </LinkWithHover>
      </div>
    </div>
  );
};
