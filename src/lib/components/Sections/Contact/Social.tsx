import { FaLinkedinIn, FaXTwitter, FaGithub, FaMedium } from "react-icons/fa6";

import { FloatingDock } from "../../motion/FloatingDock";

export function Social() {
  const links = [
    {
      title: "LinkedIn",
      icon: <FaLinkedinIn className="h-full w-full text-neutral-300" />,
      href: "https://www.linkedin.com/in/payamdowlatyari/",
    },
    {
      title: "Twitter",
      icon: <FaXTwitter className="h-full w-full text-neutral-300" />,
      href: "https://x.com/payamyam",
    },
    {
      title: "GitHub",
      icon: <FaGithub className="h-full w-full text-neutral-300" />,
      href: "https://github.com/payamdowlatyari",
    },
    {
      title: "Medium",
      icon: <FaMedium className="h-full w-full text-neutral-300" />,
      href: "https://medium.com/@pdowlatyari",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-8 social">
      <h3 className="text-xl uppercase text-neutral-300">Follow Me On</h3>
      <FloatingDock items={links} />
    </div>
  );
}
