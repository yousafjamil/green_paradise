"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const tags = { div: motion.div, li: motion.li, section: motion.section } as const;

/** Fades and lifts content into place once, when it scrolls into view. */
export default function Reveal({ children, delay = 0, className = "", as = "div", y = 28 }: { children: ReactNode; delay?: number; className?: string; as?: keyof typeof tags; y?: number }) {
  const Tag = tags[as];
  return (
    <Tag className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: delay / 1000 }}>
      {children}
    </Tag>
  );
}
