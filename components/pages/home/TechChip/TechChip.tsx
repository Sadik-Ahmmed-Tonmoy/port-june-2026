"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Code2, Database, Globe, Layers, Sparkles, Terminal, Play, Pause } from "lucide-react";

// --- Types ---
type CoreTech = {
  name: string;
  level: number; // 1-100
};

type SectorData = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colorClass: string; // Tailwinds colors for glow
  accentColor: string; // Hex or CSS color
  description: string;
  details: string[];
  techs: CoreTech[];
};

// --- Data ---
const SECTORS: SectorData[] = [
  {
    id: "frontend",
    title: "FE-1 UI Engine",
    subtitle: "Visual & Creative Center",
    icon: <Code2 className="size-6" />,
    colorClass: "from-indigo-500 to-cyan-400",
    accentColor: "#6366f1",
    description: "Visual Processing Unit: Architecting high-fidelity, interactive, and responsive user interfaces that bridge human intent and browser graphics.",
    details: [
      "Next.js App Router (SSR/SSG Hybrid Rendering)",
      "React 19 & TypeScript Strict Mode integration",
      "Redux / RTK Query state management engines",
      "Tailwind CSS & Framer Motion styling and transitions"
    ],
    techs: [
      { name: "Next.js", level: 95 },
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Redux / RTK Query", level: 90 }
    ]
  },
  {
    id: "backend",
    title: "BE-3 Logic Core",
    subtitle: "Analytical & Logic Core",
    icon: <Terminal className="size-6" />,
    colorClass: "from-emerald-500 to-teal-400",
    accentColor: "#10b981",
    description: "Reasoning & Analytical Logic: Compiling complex business requirements, backend state transitions, secure API gateways, and asynchronous tasks.",
    details: [
      "Node.js & Express.js server environments",
      "Prisma & Mongoose Object-Relational Mappings",
      "BullMQ & Redis background job worker pipelines",
      "Real-time systems (Socket.io) and secure REST APIs"
    ],
    techs: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 90 },
      { name: "Socket.io", level: 85 },
      { name: "BullMQ / Redis", level: 85 }
    ]
  },
  {
    id: "database",
    title: "DB-X Memory Bank",
    subtitle: "Knowledge Retention",
    icon: <Database className="size-6" />,
    colorClass: "from-amber-500 to-orange-400",
    accentColor: "#f59e0b",
    description: "Memory Retention & Knowledge Storage: Structuring persistent schemas, relational integrity, low-latency document stores, and cache distribution.",
    details: [
      "MongoDB document schemas and PostgreSQL relational architectures",
      "Prisma ORM for typesafe migrations and query compilation",
      "Redis caching (Sorted Sets, Pub/Sub messaging)",
      "Database indexing and query execution plan optimizations"
    ],
    techs: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Prisma ORM", level: 90 },
      { name: "Query Optimization", level: 85 }
    ]
  },
  {
    id: "devops",
    title: "DO-4 Reflex Sync",
    subtitle: "Deployment & Infrastructure Reflexes",
    icon: <Globe className="size-6" />,
    colorClass: "from-pink-500 to-rose-400",
    accentColor: "#ec4899",
    description: "System Sync & Automation Reflexes: Configuring containerized environments, cloud infrastructure pipelines, and edge CDN distribution for maximum uptime.",
    details: [
      "Git version control & GitHub workflow pipelines",
      "Vercel Edge Network & Firebase hosting configurations",
      "Postman API testing & debugging pipelines",
      "Figma-to-Code conversions and Sharp image optimization"
    ],
    techs: [
      { name: "Vercel / Git", level: 90 },
      { name: "Firebase", level: 85 },
      { name: "Postman", level: 88 },
      { name: "Figma-to-Code", level: 85 }
    ]
  }
];

// ─── Progress Bar Component for Auto Scan ─────────────────────────────────────
const ProgressBar = ({
  duration = 6000,
  isActive,
  isPaused,
  onComplete,
}: {
  duration?: number;
  isActive: boolean;
  isPaused: boolean;
  onComplete: () => void;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    const tickRate = 50;
    const timer = setInterval(() => {
      if (isPaused) return;
      setProgress((prev) => prev + tickRate);
    }, tickRate);

    return () => clearInterval(timer);
  }, [isActive, isPaused]);

  useEffect(() => {
    if (progress >= duration) {
      onComplete();
      setProgress(0);
    }
  }, [progress, duration, onComplete]);

  if (!isActive) return null;

  return (
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-200/20 dark:bg-neutral-850/40 overflow-hidden rounded-t-3xl z-30 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style={{ width: `${Math.min((progress / duration) * 100, 100)}%` }}
        transition={{ ease: "linear" }}
      />
    </div>
  );
};

export default function TechChip() {
  const [activeSector, setActiveSector] = useState<SectorData>(SECTORS[0]);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  // Helper to rotate to the next sector
  const triggerNextSector = () => {
    setActiveSector((curr) => {
      const idx = SECTORS.findIndex((s) => s.id === curr.id);
      const nextIdx = (idx + 1) % SECTORS.length;
      return SECTORS[nextIdx];
    });
  };

  return (
    <section className="relative py-10 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden">

      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 dark:bg-purple-500/8 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-10 relative z-10 flex flex-col items-center">
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-6"
        >
          <Sparkles className="size-3 text-indigo-500 animate-pulse" />
          How My Brain Works
        </motion.div> */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6"
        >
          Inside My Mind:
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            S1 Brain Processor
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
        >
          An interactive schematic of my technical neural pathways. Click on the sectors of my brain or watch them scan automatically to inspect mental architecture.
        </motion.p>
      </div>

      {/* Interactive Section */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10"

      >

        {/* Left Column: The 3D/Silicon Chip */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <div className="relative p-6 sm:p-10 rounded-[3rem] border border-neutral-200/50 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/20 backdrop-blur-xl shadow-2xl">

            {/* Silicon Chip Motherboard grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[length:20px_20px] rounded-[3rem]" />

            {/* Chip Shell */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-[2.5rem] bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-2 border-neutral-700/50 dark:border-neutral-800/80 group">

              {/* Outer pins details */}
              <div className="absolute -inset-1 border border-dashed border-neutral-600/30 rounded-[2.75rem] pointer-events-none" />

              {/* Silicon Chip Inner Grids */}
              <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full w-full">

                {/* FE Quadrant */}
                <button
                  onClick={() => setActiveSector(SECTORS[0])}
                  onMouseEnter={() => setHoveredSector("frontend")}
                  onMouseLeave={() => setHoveredSector(null)}
                  className={`relative rounded-tl-[1.5rem] rounded-br-[0.5rem] p-4 flex flex-col justify-between transition-all duration-300 overflow-hidden border ${
                    activeSector.id === "frontend"
                      ? "bg-neutral-850 dark:bg-neutral-900/90 border-indigo-500/80 shadow-[0_0_15px_rgba(99,102,241,0.25),_inset_0_0_20px_rgba(99,102,241,0.15)] scale-[1.01]"
                      : "bg-neutral-900/50 dark:bg-neutral-950/40 border-neutral-750/30 hover:border-indigo-500/30"
                  }`}
                >
                  {activeSector.id === "frontend" && (
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-indigo-500 rounded-br-md shadow-[0_0_10px_rgba(99,102,241,0.8)] z-20 pointer-events-none animate-pulse" />
                  )}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500">FE-1</span>
                    <Code2 className={`size-5 transition-all duration-300 ${
                      activeSector.id === "frontend" 
                        ? "text-indigo-400 scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" 
                        : "text-neutral-500"
                    }`} />
                  </div>
                  <span className={`text-left font-bold text-sm sm:text-base tracking-tight transition-all duration-300 ${
                    activeSector.id === "frontend" 
                      ? "text-indigo-400 drop-shadow-[0_0_4px_rgba(99,102,241,0.4)]" 
                      : "text-neutral-400 hover:text-neutral-300"
                  }`}>FRONTEND</span>
                  {/* Subtle Corner Glow */}
                  {hoveredSector === "frontend" && (
                    <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none" />
                  )}
                </button>

                {/* BE Quadrant */}
                <button
                  onClick={() => setActiveSector(SECTORS[1])}
                  onMouseEnter={() => setHoveredSector("backend")}
                  onMouseLeave={() => setHoveredSector(null)}
                  className={`relative rounded-tr-[1.5rem] rounded-bl-[0.5rem] p-4 flex flex-col justify-between transition-all duration-300 overflow-hidden border ${
                    activeSector.id === "backend"
                      ? "bg-neutral-850 dark:bg-neutral-900/90 border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.25),_inset_0_0_20px_rgba(16,185,129,0.15)] scale-[1.01]"
                      : "bg-neutral-900/50 dark:bg-neutral-950/40 border-neutral-750/30 hover:border-emerald-500/30"
                  }`}
                >
                  {activeSector.id === "backend" && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-bl-md shadow-[0_0_10px_rgba(16,185,129,0.8)] z-20 pointer-events-none animate-pulse" />
                  )}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500">BE-3</span>
                    <Terminal className={`size-5 transition-all duration-300 ${
                      activeSector.id === "backend" 
                        ? "text-emerald-400 scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" 
                        : "text-neutral-500"
                    }`} />
                  </div>
                  <span className={`text-left font-bold text-sm sm:text-base tracking-tight transition-all duration-300 ${
                    activeSector.id === "backend" 
                      ? "text-emerald-400 drop-shadow-[0_0_4px_rgba(16,185,129,0.4)]" 
                      : "text-neutral-400 hover:text-neutral-300"
                  }`}>BACKEND</span>
                  {hoveredSector === "backend" && (
                    <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
                  )}
                </button>

                {/* DB Quadrant */}
                <button
                  onClick={() => setActiveSector(SECTORS[2])}
                  onMouseEnter={() => setHoveredSector("database")}
                  onMouseLeave={() => setHoveredSector(null)}
                  className={`relative rounded-bl-[1.5rem] rounded-tr-[0.5rem] p-4 flex flex-col justify-between transition-all duration-300 overflow-hidden border ${
                    activeSector.id === "database"
                      ? "bg-neutral-850 dark:bg-neutral-900/90 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.25),_inset_0_0_20px_rgba(245,158,11,0.15)] scale-[1.01]"
                      : "bg-neutral-900/50 dark:bg-neutral-950/40 border-neutral-750/30 hover:border-amber-500/30"
                  }`}
                >
                  {activeSector.id === "database" && (
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-amber-500 rounded-tr-md shadow-[0_0_10px_rgba(245,158,11,0.8)] z-20 pointer-events-none animate-pulse" />
                  )}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500">DB-X</span>
                    <Database className={`size-5 transition-all duration-300 ${
                      activeSector.id === "database" 
                        ? "text-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" 
                        : "text-neutral-500"
                    }`} />
                  </div>
                  <span className={`text-left font-bold text-sm sm:text-base tracking-tight transition-all duration-300 ${
                    activeSector.id === "database" 
                      ? "text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.4)]" 
                      : "text-neutral-400 hover:text-neutral-300"
                  }`}>DATABASE</span>
                  {hoveredSector === "database" && (
                    <div className="absolute inset-0 bg-amber-500/5 pointer-events-none" />
                  )}
                </button>

                {/* DO Quadrant */}
                <button
                  onClick={() => setActiveSector(SECTORS[3])}
                  onMouseEnter={() => setHoveredSector("devops")}
                  onMouseLeave={() => setHoveredSector(null)}
                  className={`relative rounded-br-[1.5rem] rounded-tl-[0.5rem] p-4 flex flex-col justify-between transition-all duration-300 overflow-hidden border ${
                    activeSector.id === "devops"
                      ? "bg-neutral-850 dark:bg-neutral-900/90 border-pink-500/80 shadow-[0_0_15px_rgba(236,72,153,0.25),_inset_0_0_20px_rgba(236,72,153,0.15)] scale-[1.01]"
                      : "bg-neutral-900/50 dark:bg-neutral-950/40 border-neutral-750/30 hover:border-pink-500/30"
                  }`}
                >
                  {activeSector.id === "devops" && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-pink-500 rounded-tl-md shadow-[0_0_10px_rgba(236,72,153,0.8)] z-20 pointer-events-none animate-pulse" />
                  )}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500">DO-4</span>
                    <Globe className={`size-5 transition-all duration-300 ${
                      activeSector.id === "devops" 
                        ? "text-pink-400 scale-110 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" 
                        : "text-neutral-500"
                    }`} />
                  </div>
                  <span className={`text-left font-bold text-sm sm:text-base tracking-tight transition-all duration-300 ${
                    activeSector.id === "devops" 
                      ? "text-pink-400 drop-shadow-[0_0_4px_rgba(236,72,153,0.4)]" 
                      : "text-neutral-400 hover:text-neutral-300"
                  }`}>DEVOPS</span>
                  {hoveredSector === "devops" && (
                    <div className="absolute inset-0 bg-pink-500/5 pointer-events-none" />
                  )}
                </button>

              </div>

              {/* Core Chip Center Element ("S1") */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-2xl border border-neutral-700 shadow-xl flex items-center justify-center p-1.5 pointer-events-none">
                <div className="relative w-full h-full rounded-xl bg-neutral-950 flex flex-col items-center justify-center border border-neutral-800 overflow-hidden">

                  {/* Glowing background behind S1 */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${activeSector.colorClass} opacity-10 transition-opacity duration-500`} />

                  <span className="text-xl font-bold tracking-tight text-white z-10">S1</span>
                  <span className="text-[8px] font-mono tracking-widest text-neutral-500 z-10">BRAIN</span>

                  {/* Core Pulsing indicator */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-1 w-8 h-1 rounded-full bg-indigo-500/40 blur-xs"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Spec sheet specifications (Apple inspired) */}
        <div onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)} className="lg:col-span-6 relative flex flex-col justify-start min-h-[480px] p-8 sm:p-10 rounded-[2.5rem] border border-neutral-200/40 dark:border-neutral-800/80 bg-white/45 dark:bg-neutral-900/10 backdrop-blur-md shadow-2xl overflow-hidden">

          {/* Progress Bar Loader line on top of the card */}
          <ProgressBar
            isActive={true}
            isPaused={isHovered || isAutoplayPaused}
            onComplete={triggerNextSector}
          />

          {/* Controller Header with Pause/Play */}
          <div className="flex items-center justify-between border-b border-neutral-200/20 dark:border-neutral-800/50 pb-4 mb-6 z-10">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase flex items-center gap-1.5 font-bold">
              <Cpu className="size-3.5 animate-pulse text-indigo-500" />
              Cognitive Scan: {isHovered || isAutoplayPaused ? "PAUSED (Paused Or Hovered)" : "ACTIVE (Playing)"}
            </span>
            <button
              onClick={() => setIsAutoplayPaused((prev) => !prev)}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100/50 hover:bg-neutral-200/50 dark:bg-neutral-900/50 dark:hover:bg-neutral-800/50 text-neutral-500 hover:text-neutral-850 dark:text-neutral-400 dark:hover:text-white transition-colors shadow-sm cursor-pointer border border-neutral-200/20 dark:border-neutral-800/30"
              title={isAutoplayPaused ? "Resume Scan" : "Pause Scan"}
            >
              {isAutoplayPaused ? (
                <Play className="size-3 fill-current" />
              ) : (
                <Pause className="size-3 fill-current" />
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Tag / Icon Header */}
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-tr ${activeSector.colorClass} text-white shadow-lg`}>
                  {activeSector.icon}
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                    {activeSector.title}
                  </span>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                    {activeSector.subtitle}
                  </h3>
                </div>
              </div>

              {/* Description paragraph */}
              <p className="text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed text-[16px]">
                {activeSector.description}
              </p>

              {/* Tech Specs detailed bullets */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-wider block">
                  ARCHITECTURE SPECIFICATIONS
                </span>
                <ul className="space-y-2">
                  {activeSector.details.map((detail, index) => (
                    <motion.li
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      key={index}
                      className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium"
                    >
                      <span className="text-indigo-500 mr-1 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-indigo-500" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Tech Progress Bar charts */}
              <div className="space-y-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/80">
                <span className="text-xs font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-wider block">
                  PERFORMANCE RATINGS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeSector.techs.map((tech) => (
                    <div key={tech.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-neutral-700 dark:text-neutral-300">{tech.name}</span>
                        <span className="text-neutral-450 dark:text-neutral-550 font-mono">{tech.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${tech.level}%` }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          className={`h-full bg-gradient-to-r ${activeSector.colorClass}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}
