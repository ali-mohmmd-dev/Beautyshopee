"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxImage({ children, className = "", speed = 0.12 }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 -top-[12%] h-[124%] w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
