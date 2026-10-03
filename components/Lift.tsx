"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Card wrapper: rises on hover, presses on tap. */
export default function Lift({ children, className = "h-full" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} whileHover={{ y: -8 }} whileTap={{ scale: 0.985 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
      {children}
    </motion.div>
  );
}
