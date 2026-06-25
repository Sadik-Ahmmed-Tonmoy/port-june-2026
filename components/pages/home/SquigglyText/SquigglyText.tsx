"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { Cover } from "@/components/ui/cover";
import { 
  Sparkles, 
  Coffee, 
  Zap, 
  Heart, 
  Terminal,
  ArrowUpRight,
  Clock,
  Brain,
  Cpu
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────
type AnimationVariants = {
  hidden: {
    opacity: number;
    y: number;
    scale: number;
  };
  visible: {
    opacity: number;
    y: number;
    scale: number;
    transition: {
      duration: number;
      ease: [number, number, number, number];
    };
  };
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const floatingVariants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [0, -10, 0, 10, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function SquigglyTextOut() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 sm:px-6 text-center select-none transition-colors duration-300 py-12"
    >
      {/* ── Cursor Glow ── */}
      <motion.div
        className="fixed pointer-events-none z-40 w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2), transparent 70%)',
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
      />

      {/* ── Ambient Glowing Orbs ── */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-50 dark:opacity-40 blur-[100px]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-10 w-64 h-64 bg-amber-400/30 dark:bg-amber-500/20 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, -30, 30, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-10 w-72 h-72 bg-rose-400/30 dark:bg-rose-500/20 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 10, -10, 0],
            y: [0, 10, -10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 left-1/4 w-56 h-56 bg-indigo-400/30 dark:bg-indigo-500/20 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -15, 15, 0],
            y: [0, 15, -15, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-emerald-400/20 dark:bg-emerald-500/15 rounded-full"
        />
      </div>

      {/* ── Upper Section: Core Portfolio Statement ── */}
      <motion.div variants={itemVariants} className="w-full relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-50/80 dark:bg-amber-950/30 backdrop-blur-md text-xs font-medium text-amber-600 dark:text-amber-300 mb-6">
          <Sparkles className="size-3" />
          <span>Creative Development</span>
          <Zap className="size-3" />
        </div>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
          Build amazing websites <br className="hidden sm:inline" /> at{" "}
          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Cover className="text-white dark:text-white font-black  px-1">warp speed</Cover>
          </motion.span>
        </h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto"
        >
          Crafting exceptional digital experiences with modern technologies
        </motion.p>
      </motion.div>

      {/* ── Minimalism Dot Divider ── */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 my-8 sm:my-10 relative z-10"
      >
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-neutral-300 dark:to-neutral-700" />
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="h-2 w-2 rounded-full bg-rose-400 dark:bg-rose-500"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="h-2 w-2 rounded-full bg-indigo-400 dark:bg-indigo-500"
        />
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-neutral-300 dark:to-neutral-700" />
      </motion.div>

      {/* ── Lower Section: Apple-style Glassmorphism Callout Card ── */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 w-full max-w-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={floatingVariants.animate}
          initial={floatingVariants.initial}
          className="relative w-full rounded-3xl border border-neutral-200/50 dark:border-neutral-800/40 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/50 p-6 sm:p-8 overflow-hidden group"
        >
          {/* Animated Gradient Border */}
          <motion.div
            animate={{
              opacity: isHovered ? [0.3, 0.8, 0.3] : 0.2,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-indigo-500/20 blur-xl"
          />

          {/* Spotlight gradient highlight */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.5 : 0.1,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-rose-500/10 pointer-events-none"
          />

          {/* Technical Subheading with animated terminal icon */}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <Terminal className="size-3 text-amber-500" />
            <p className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
              // Pipeline Query
            </p>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-amber-400 rounded-sm"
            />
          </motion.div>

          {/* Main interactive wobbly heading */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 leading-snug">
            How many{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="inline-block"
            >
              <SquigglyText
                stepDuration={90}
                scale={[3, 5]}
                className="text-amber-500 dark:text-amber-400 font-extrabold inline-block"
              >
                cups of coffee
              </SquigglyText>
            </motion.span>{" "}
            is{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="inline-block"
            >
              <SquigglyText
                stepDuration={90}
                scale={4}
                className="text-rose-500 dark:text-rose-400 font-extrabold inline-block"
              >
                too many
              </SquigglyText>
            </motion.span>{" "}
            cups of coffee?
          </h3>

          {/* Animated Coffee Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 flex items-center justify-center gap-3"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Coffee className="size-5 text-amber-500" />
            </motion.div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + num * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center"
                >
                  <span className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
                    {num}
                  </span>
                  {num < 5 && (
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="mx-0.5 text-neutral-300 dark:text-neutral-600"
                    >
                      ·
                    </motion.span>
                  )}
                </motion.div>
              ))}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-lg font-bold text-amber-500"
              >
                ☕
              </motion.span>
            </div>
          </motion.div>

          {/* Subtext description with animated emoji */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-3 leading-relaxed flex items-center justify-center gap-2"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              😄
            </motion.span>
            Asking for a friend... and my sleep schedule.
            <motion.span
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              😴
            </motion.span>
          </motion.p>

          {/* Technical indicator footer with animated icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 flex justify-center items-center gap-3 text-base text-neutral-500 dark:text-neutral-400"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                ☕️
              </motion.span>
              <span className="text-[10px] font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400">
                SLEEP.STATUS:
              </span>
              <motion.span
                animate={{
                  color: ['#f59e0b', '#ef4444', '#f59e0b'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-[10px] font-mono font-bold text-amber-500"
              >
                COMPROMISED
              </motion.span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 transition-colors duration-300 text-[10px] font-medium"
            >
              <Brain className="size-3" />
              <span>Think</span>
              <ArrowUpRight className="size-3" />
            </motion.button>
          </motion.div>

          {/* Hover effect sparkles */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="size-4 text-amber-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ── Bottom Decorative Element ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex items-center gap-3 text-[10px] text-neutral-400 dark:text-neutral-600 font-mono"
      >
        <Heart className="size-3 text-rose-400" />
        <span>Crafted with</span>
        <motion.span
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-rose-400"
        >
          ❤
        </motion.span>
        <span>and</span>
        <Cpu className="size-3 text-indigo-400" />
        <span>in Dhaka</span>
        <Clock className="size-3 text-neutral-400" />
      </motion.div>
    </motion.div>
  );
}