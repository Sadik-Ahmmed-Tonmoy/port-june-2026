'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
import { HiDocumentText } from 'react-icons/hi';

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

// ─── Skills data ────────────────────────────────────────────────────────
const SKILLS: Skill[] = [
  { id: 'react', name: 'React', icon: <SiReact className="h-8 w-8 text-sky-400" />, delay: 0.2 },
  { id: 'nextjs', name: 'Next.js', icon: <SiNextdotjs className="h-8 w-8 text-white" />, delay: 0.4 },
  { id: 'nodejs', name: 'Node.js', icon: <SiNodedotjs className="h-8 w-8 text-green-400" />, delay: 0.3 },
  { id: 'typescript', name: 'TypeScript', icon: <SiTypescript className="h-8 w-8 text-blue-500" />, delay: 0.5 },
  { id: 'mongodb', name: 'MongoDB', icon: <SiMongodb className="h-8 w-8 text-green-500" />, delay: 0.6 },
  { id: 'postgresql', name: 'PostgreSQL', icon: <SiPostgresql className="h-8 w-8 text-sky-600" />, delay: 0.7 },
  { id: 'redis', name: 'Redis', icon: <SiRedis className="h-8 w-8 text-red-500" />, delay: 0.8 },
  { id: 'tailwind', name: 'Tailwind CSS', icon: <SiTailwindcss className="h-8 w-8 text-cyan-400" />, delay: 0.9 },
  { id: 'prisma', name: 'Prisma', icon: <SiPrisma className="h-8 w-8 text-indigo-400" />, delay: 1.0 },
  { id: 'socketio', name: 'Socket.io', icon: <SiSocketdotio className="h-8 w-8 text-gray-400" />, delay: 1.1 },
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

/** Individual skill icon with label */
const IconContainer = ({ icon, text, delay = 0 }: IconContainerProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2, delay }}
    className="relative z-50 flex flex-col items-center justify-center space-y-2"
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/80 shadow-inner backdrop-blur-sm">
      {icon}
    </div>
    <div className="hidden rounded-md px-2 py-1 md:block">
      <span className="text-center text-xs font-medium text-slate-400">{text}</span>
    </div>
  </motion.div>
);

// ─── Main component ────────────────────────────────────────────────────

export default function TechRadar() {
  // Split skills into three rows (for layout)
  const row1 = SKILLS.slice(0, 4);
  const row2 = SKILLS.slice(4, 7);
  const row3 = SKILLS.slice(7, 10);

  return (
    <section className="relative flex h-full w-full items-end justify-start bg-black/40 px-4 ">
      <div className="relative flex h-96 w-full max-w-4xl flex-col items-center justify-center space-y-6 overflow-hidden">
        {/* Row 1 */}
        <div className="flex w-full items-center justify-center gap-6 md:justify-between md:gap-0">
          {row1.map((skill) => (
            <IconContainer key={skill.id} icon={skill.icon} text={skill.name} delay={skill.delay} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-full max-w-md items-center justify-center gap-6 md:justify-between md:gap-0">
          {row2.map((skill) => (
            <IconContainer key={skill.id} icon={skill.icon} text={skill.name} delay={skill.delay} />
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex w-full items-center justify-center gap-6 md:justify-between md:gap-0">
          {row3.map((skill) => (
            <IconContainer key={skill.id} icon={skill.icon} text={skill.name} delay={skill.delay} />
          ))}
        </div>

        {/* Radar overlay */}
        <Radar className="absolute -bottom-12" />
        <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>
    </section>
  );
}