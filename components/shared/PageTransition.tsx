"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Kreiraj grid od kockica
  const tiles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <AnimatePresence mode="wait">
      <div style={{ position: "relative" }}>
        {/* Grid overlay - kockice koje se pojavljuju */}
        <motion.div
          key={`overlay-${pathname}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          {tiles.map((tile) => (
            <motion.div
              key={tile}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: 0.5,
                delay: tile * 0.01,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background: "linear-gradient(135deg, #2a9df4 0%, #1576b8 100%)",
                transformOrigin: "top",
              }}
            />
          ))}
        </motion.div>

        {/* Glavni sadržaj */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
