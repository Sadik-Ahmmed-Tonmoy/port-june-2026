"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { AnimatedBeam, Circle, Icons } from "@/components/uilayouts/animated-beam";
import { cn } from "@/lib/utils";
import { FaLaptopCode, FaDatabase } from "react-icons/fa6";
import { GitBranch } from "lucide-react";

export default function AnimatedBeamPipelineShowcase({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Left Column Nodes
  const laptopRef = useRef<HTMLDivElement>(null);
  const gitRef = useRef<HTMLDivElement>(null);

  // Central Node
  const compilerRef = useRef<HTMLDivElement>(null);

  // Right Column Nodes
  const vercelRef = useRef<HTMLDivElement>(null);
  const dbRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden py-24 sm:py-32 border-y border-neutral-200/60 dark:border-neutral-900/60 bg-neutral-50 dark:bg-black transition-colors duration-500",
        className
      )}
    >
      {/* Apple-style Cyber Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#161617_1px,transparent_1px),linear-gradient(to_bottom,#161617_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-40" />

      {/* Futuristic Soft Light Glares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:from-blue-500/5 dark:to-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse duration-[10s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Apple-inspired typography header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 uppercase mb-4"
          >
            Workflow & Pipelines
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 leading-tight"
          >
            Designed for speed. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Built for scale.
            </span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl font-medium text-neutral-500 dark:text-neutral-400 mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            An advanced, real-time visualization of my full-stack integration. Commits compile via Next.js, sync with MongoDB, and optimize using Claude AI.
          </motion.p>
        </div>

        {/* Nodes Workspace Grid */}
        <div className="flex h-full w-full flex-row items-stretch justify-between gap-6 sm:gap-16 md:gap-28 lg:gap-36 relative z-10 py-10">

          {/* Left Column: Input Environment */}
          <div className="flex flex-col justify-center gap-16 sm:gap-20">
            {/* Local Dev Node */}
            <div className="flex flex-col items-center gap-2">
              <Circle
                ref={laptopRef}
                className="size-14 sm:size-16 bg-white/95 dark:bg-neutral-900/95 border-neutral-200/80 dark:border-neutral-800/80 text-blue-600 dark:text-blue-400 shadow-xl shadow-blue-500/5 hover:scale-105 transition-transform"
              >
                <FaLaptopCode className="size-6 sm:size-7" />
              </Circle>
              <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Local Dev
              </span>
            </div>

            {/* Git Gateway Node */}
            <div className="flex flex-col items-center gap-2">
              <Circle
                ref={gitRef}
                className="size-14 sm:size-16 bg-white/95 dark:bg-neutral-900/95 border-neutral-200/80 dark:border-neutral-800/80 text-amber-600 dark:text-amber-500 shadow-xl shadow-amber-500/5 hover:scale-105 transition-transform"
              >
                <GitBranch className="size-6 sm:size-7" />
              </Circle>
              <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Git Commit
              </span>
            </div>
          </div>

          {/* Central Column: Cloud Compilation Server */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 25px 0px rgba(59, 130, 246, 0.08)",
                    "0 0 45px 5px rgba(59, 130, 246, 0.22)",
                    "0 0 25px 0px rgba(59, 130, 246, 0.08)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-full"
              >
                <Circle
                  ref={compilerRef}
                  className="size-20 sm:size-24 bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white border border-neutral-200 dark:border-neutral-800 shadow-2xl relative p-5 hover:scale-105 transition-transform"
                >
                  <Icons.nextjs />
                </Circle>
              </motion.div>
              <div className="text-center">
                <span className="text-[11px] font-mono font-bold text-neutral-950 dark:text-neutral-50 block uppercase tracking-widest">
                  NextJS Engine
                </span>
                <span className="text-[9px] font-mono text-emerald-500 dark:text-emerald-400 font-bold block animate-pulse">
                  ● ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Deployment Endpoints */}
          <div className="flex flex-col justify-center gap-12 sm:gap-16">

            {/* Production Site (Vercel) */}
            <div className="flex flex-col items-center gap-2">
              <Circle
                ref={vercelRef}
                className="size-14 sm:size-16 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-black dark:text-white shadow-xl shadow-black/10 dark:shadow-white/5 hover:scale-105 transition-transform"
              >
                <svg viewBox="0 0 24 24" className="size-5 sm:size-6 fill-black dark:fill-white">
                  <path d="M24 22.525H0L12 1.475L24 22.525Z" />
                </svg>
              </Circle>
              <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Production
              </span>
            </div>

            {/* Database Storage (MongoDB) */}
            <div className="flex flex-col items-center gap-2">
              <Circle
                ref={dbRef}
                className="size-14 sm:size-16 bg-white/95 dark:bg-neutral-900/95 border-neutral-200/80 dark:border-neutral-800/80 text-emerald-600 dark:text-emerald-500 shadow-xl shadow-emerald-500/5 hover:scale-105 transition-transform"
              >
                <FaDatabase className="size-5 sm:size-6" />
              </Circle>
              <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Database
              </span>
            </div>

            {/* AI Optimizer (Claude AI) */}
            <div className="flex flex-col items-center gap-2">
              <Circle
                ref={aiRef}
                className="size-14 sm:size-16 bg-white/95 dark:bg-neutral-900/95 border-neutral-200/80 dark:border-neutral-800/80 text-neutral-900 dark:text-white shadow-xl shadow-amber-500/5 p-3 hover:scale-105 transition-transform"
              >
                <Icons.claude />
              </Circle>
              <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Claude AI
              </span>
            </div>

          </div>
        </div>

        {/* Animated Connecting Beams */}
        {/* Laptop Dev -> Next.js Compiler */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={laptopRef}
          toRef={compilerRef}
          duration={2.5}
          pathColor="#3b82f6"
          pathWidth={1.5}
          className="opacity-75 dark:opacity-60"
        />

        {/* Git Commit Gateway -> Next.js Compiler */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={gitRef}
          toRef={compilerRef}
          duration={2.5}
          pathColor="#f59e0b"
          pathWidth={1.5}
          className="opacity-75 dark:opacity-60"
        />

        {/* Next.js Compiler -> Vercel Host */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={compilerRef}
          toRef={vercelRef}
          duration={3.5}
          curvature={-18}
          pathColor="#10b981"
          pathWidth={2}
          className="opacity-80 dark:opacity-70"
        />

        {/* Next.js Compiler -> MongoDB Cloud Database */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={compilerRef}
          toRef={dbRef}
          duration={3.5}
          curvature={0}
          pathColor="#10b981"
          pathWidth={2}
          className="opacity-80 dark:opacity-70"
        />

        {/* Next.js Compiler -> Claude AI Optimization Engine */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={compilerRef}
          toRef={aiRef}
          duration={3.5}
          curvature={18}
          pathColor="#8b5cf6"
          pathWidth={2}
          className="opacity-80 dark:opacity-70"
        />
      </div>
    </section>
  );
}
