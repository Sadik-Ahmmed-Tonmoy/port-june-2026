'use client';

import React from 'react';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const textRevealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const, // Apple-style custom ease out
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ScrollTextAnimation() {
  const headlineWords = "Building full‑stack solutions that connect the world.".split(" ");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col space-y-6 max-w-xl text-left select-none relative z-10"
    >
      {/* Mono Badge */}
      <motion.div variants={badgeVariants} className="inline-flex">
        <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase border border-neutral-200 dark:border-neutral-800/80 rounded-full px-3 py-1 bg-neutral-100/50 dark:bg-neutral-900/30">
          Core Expertise
        </span>
      </motion.div>

      {/* Main Apple Headline (Word-by-word staggered reveal) */}
      <motion.div className="flex flex-wrap gap-x-2 gap-y-1">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              variants={textRevealVariants}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </h2>
      </motion.div>

      {/* Sub-headline */}
      <motion.div variants={textRevealVariants}>
        <p className="text-base sm:text-lg font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Crafting high‑performance web applications using robust modern paradigms, reactive architectures, and optimized data layers.
        </p>
      </motion.div>

      {/* Highlight/Project Badge */}
      <motion.div variants={textRevealVariants} className="pt-4">
        <div className="relative pl-4 py-1 group overflow-hidden">
          {/* Animated left border */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            className="absolute left-0 top-0 w-0.5 bg-neutral-300 dark:bg-neutral-700 group-hover:bg-amber-500 dark:group-hover:bg-amber-400 transition-colors duration-300"
          />
          <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Featured System
          </p>
          <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-1">
            KnockMyRide — Bangladesh's first QR vehicle contact network.
          </h4>
        </div>
      </motion.div>
    </motion.div>
  );
}