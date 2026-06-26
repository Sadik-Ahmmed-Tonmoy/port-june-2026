'use client';

import React from 'react';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiTailwindcss,
  SiPrisma,
  SiSocketdotio,
} from 'react-icons/si';

// ─── Types ──────────────────────────────────────────────────────────────
interface Skill {
  id: string;
  name: string;
  icon: React.ReactNode;
  delay: number;
}

interface IconContainerProps {
  icon: React.ReactNode;
  text: string;
  delay?: number;
}

// ─── Skills data (Theme-aware Icon Colors) ──────────────────────────────
const SKILLS: Skill[] = [
  { id: 'react', name: 'React', icon: <SiReact className="h-7 w-7 text-sky-500 dark:text-sky-400 transition-colors" />, delay: 0.2 },
  { id: 'nextjs', name: 'Next.js', icon: <SiNextdotjs className="h-7 w-7 text-neutral-900 dark:text-white transition-colors" />, delay: 0.4 },
  { id: 'nodejs', name: 'Node.js', icon: <SiNodedotjs className="h-7 w-7 text-green-600 dark:text-green-400 transition-colors" />, delay: 0.3 },
  { id: 'typescript', name: 'TypeScript', icon: <SiTypescript className="h-7 w-7 text-blue-600 dark:text-blue-400 transition-colors" />, delay: 0.5 },
  { id: 'mongodb', name: 'MongoDB', icon: <SiMongodb className="h-7 w-7 text-emerald-600 dark:text-emerald-400 transition-colors" />, delay: 0.6 },
  { id: 'postgresql', name: 'PostgreSQL', icon: <SiPostgresql className="h-7 w-7 text-sky-700 dark:text-sky-500 transition-colors" />, delay: 0.7 },
  { id: 'redis', name: 'Redis', icon: <SiRedis className="h-7 w-7 text-red-600 dark:text-red-500 transition-colors" />, delay: 0.8 },
  { id: 'tailwind', name: 'Tailwind CSS', icon: <SiTailwindcss className="h-7 w-7 text-cyan-500 dark:text-cyan-400 transition-colors" />, delay: 0.9 },
  { id: 'prisma', name: 'Prisma', icon: <SiPrisma className="h-7 w-7 text-indigo-600 dark:text-indigo-400 transition-colors" />, delay: 1.0 },
  { id: 'socketio', name: 'Socket.io', icon: <SiSocketdotio className="h-7 w-7 text-neutral-600 dark:text-neutral-400 transition-colors" />, delay: 1.1 },
  
];

// ─── Sub‑components ────────────────────────────────────────────────────

/** Circular radar layer */
const Circle = ({ className, idx, ...rest }: any) => (
  <motion.div
    {...rest}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: idx * 0.1, duration: 0.2 }}
    className={twMerge(
      'absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200',
      className
    )}
  />
);

/** Animated radar sweep */
const RadarSweep = () => (
  <div
    style={{ transformOrigin: 'right center' }}
    className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[400px] items-end justify-center overflow-hidden bg-transparent"
  >
    <div className="relative z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-sky-600 to-transparent" />
  </div>
);

/** Main radar component */
export const Radar = ({ className }: { className?: string }) => {
  const circles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className={twMerge('relative flex h-20 w-20 items-center justify-center rounded-full', className)}>
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 10s linear infinite;
        }
      `}</style>
      <RadarSweep />
      {circles.map((idx) => (
        <Circle
          key={idx}
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            border: `1px solid rgba(71, 85, 105, ${1 - (idx + 1) * 0.1})`,
          }}
          idx={idx}
        />
      ))}
    </div>
  );
};

/** Individual skill icon with label and continuous 3D float */
const IconContainer = ({ icon, text, delay = 0 }: IconContainerProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className="relative z-50 flex flex-col items-center justify-center space-y-2 group"
  >
    {/* Continuous floating animation wrapper */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 2, // stagger the floating phase
      }}
      className="flex flex-col items-center justify-center space-y-2"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 shadow-sm dark:shadow-inner backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-300 dark:group-hover:border-neutral-700">
        {icon}
      </div>
      <div className="hidden rounded-md px-2 py-0.5 md:block transition-all duration-300">
        <span className="text-center text-[10px] font-mono font-medium tracking-widest text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors uppercase">
          {text}
        </span>
      </div>
    </motion.div>
  </motion.div>
);

// ─── Main component ────────────────────────────────────────────────────

export default function TechRadar() {
  // Split skills into three rows (for layout)
  const row1 = SKILLS.slice(0, 4);
  const row2 = SKILLS.slice(4, 7);
  const row3 = SKILLS.slice(7, 10);

  return (
    <section className="relative flex h-full w-full items-center justify-center px-4">
      <div className="relative flex h-80 w-full max-w-2xl flex-col items-center justify-center space-y-6 overflow-visible">
        {/* Row 1 */}
        <div className="flex w-full items-center justify-center gap-6 md:justify-between md:gap-0 relative z-20">
          {row1.map((skill) => (
            <IconContainer key={skill.id} icon={skill.icon} text={skill.name} delay={skill.delay} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-full max-w-sm items-center justify-center gap-6 md:justify-between md:gap-0 relative z-20">
          {row2.map((skill) => (
            <IconContainer key={skill.id} icon={skill.icon} text={skill.name} delay={skill.delay} />
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex w-full items-center justify-center gap-6 md:justify-between md:gap-0 relative z-20">
          {row3.map((skill) => (
            <IconContainer key={skill.id} icon={skill.icon} text={skill.name} delay={skill.delay} />
          ))}
        </div>

        {/* Radar overlay */}
        <Radar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
      </div>
    </section>
  );
}