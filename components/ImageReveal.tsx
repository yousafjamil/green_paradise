"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Wipes an image in from the top while it settles from a slight zoom. */
export default function ImageReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}>
      <motion.div className="size-full" initial={{ scale: 1.18 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
