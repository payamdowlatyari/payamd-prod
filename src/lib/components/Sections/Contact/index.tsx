import { useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useWillChange,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowForwardIcon, ArrowUpIcon } from "@chakra-ui/icons";
import Social from "../Title/Social";
import Link from "next/link";
import ParallaxText from "../../motion/ParallaxText";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const willChange = useWillChange();

  const ref2 = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref2 });
  const y = useTransform(scrollYProgress, [0.7, 1], [-250, 0]);

  return (
    <motion.section
      id="contact"
      style={{
        willChange,
        display: "flex",
        alignItems: "center",
        paddingTop: "5em",
      }}
      layoutScroll
      ref={ref}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            ref={ref2}
            style={{
              padding: "1em",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "baseline",
              width: "100vw",
              minHeight: "50vh",
            }}
          >
            <motion.div style={{ y }}>
              <motion.h2>Portfolio</motion.h2>
              <Link href="/projects" className="underlined underlinedThick">
                my recent projects
                <ArrowForwardIcon />
              </Link>
            </motion.div>

            {/* <motion.div 
                style={{ 
                  padding: '1em',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.8,
                  }}
                  >
             
              <motion.div>
              <motion.h3>Get in Touch</motion.h3>
              <motion.a 
                className="underlined underlinedThick"
                href="mailto:pdowlatyari@gmail.com"
                target="_blank"
              >
                pdowlatyari@gmail.com
              </motion.a>  
              
              </motion.div>
              <motion.a
                className="underlined underlinedThick"
                href="https://payamd-blog.vercel.app/"
                target="_blank"
              >
                Check out my Blog
              </motion.a> 
            </motion.div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
