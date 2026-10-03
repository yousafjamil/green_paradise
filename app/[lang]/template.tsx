"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

// A template re-mounts on every navigation, which gives each page a soft entrance.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}
