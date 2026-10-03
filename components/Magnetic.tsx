"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

/** Nudges its child toward the mouse pointer. Mouse only; touch and keyboard are unaffected. */
export default function Magnetic({ children, strength = 0.22, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 }), sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.div style={{ x: sx, y: sy }} className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}
