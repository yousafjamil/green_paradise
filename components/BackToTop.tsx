"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function BackToTop({ label }: { label: string }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 700));
  return (
    <AnimatePresence>
      {show && (
        <motion.button type="button" aria-label={label} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.7, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.7, y: 10 }} whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }}
          className="fixed bottom-[5.75rem] end-4 z-30 sm:bottom-24 sm:end-6 flex size-11 items-center justify-center rounded-full border border-line bg-white text-forest shadow-md">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
