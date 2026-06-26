'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Code2, Cpu, Database, Sparkles, Server, Terminal, Zap, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────────
interface Specialization {
  id: number;
  title: string;
  focus: string[];
  description: string;
  icon: React.ReactNode;
  accent: string;
  glowColor: string;
  iconAnimation: any;
}

// ─── Data ──────────────────────────────────────────────────────────────
const SPECIALIZATIONS_DATA: Specialization[] = [
  {
    id: 1,
    title: 'Full-Stack Web Apps',
    focus: ['Next.js', 'React', 'Node.js', 'TypeScript'],
    description: 'Building modern client-side portals and highly performant server runtimes with modular codebase systems and strict type safety.',
    icon: <Code2 className="w-6 h-6 text-indigo-400" />,
    accent: 'from-indigo-500 via-purple-500 to-pink-500',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    iconAnimation: {
      hover: { scale: 1.1, rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }
    }
  },
  {
    id: 2,
    title: 'SaaS & Product Architecture',
    focus: ['Authentication', 'RBAC Dashboards', 'API Pipelines'],
    description: 'Designing cloud network layouts, robust multi-role dashboards, automated payment routes, and dynamic transactional SaaS networks.',
    icon: <Cpu className="w-6 h-6 text-orange-400" />,
    accent: 'from-orange-500 via-red-500 to-rose-600',
    glowColor: 'rgba(249, 115, 22, 0.15)',
    iconAnimation: {
      hover: { y: [0, -4, 0], transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } }
    }
  },
  {
    id: 3,
    title: 'Database & Performance Caching',
    focus: ['Prisma / ORM', 'PostgreSQL / Mongo', 'Redis Caching'],
    description: 'Optimizing index patterns, restructuring schemas, scaling backend queries, and deploying Redis caching layers for sub-100ms response times.',
    icon: <Database className="w-6 h-6 text-emerald-400" />,
    accent: 'from-emerald-500 via-teal-500 to-cyan-600',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    iconAnimation: {
      hover: { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8], transition: { duration: 1, repeat: Infinity } }
    }
  },
  {
    id: 4,
    title: 'Interactive UI/UX & Motion',
    focus: ['Framer Motion', 'Micro-interactions', 'Glassmorphism'],
    description: 'Engineering responsive CSS grids, spring-based component transitions, pointer-glow spotlights, and animations that make layouts feel alive.',
    icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
    accent: 'from-cyan-500 via-blue-500 to-indigo-600',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    iconAnimation: {
      hover: { rotate: 90, scale: 1.1, transition: { duration: 0.5, ease: 'easeInOut' } }
    }
  },
];

// ─── Sub-components ───────────────────────────────────────────────────

/** Grid background pattern overlay */
const GridOverlay = () => (
  <div
    className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[length:40px_40px] opacity-15 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
    aria-hidden="true"
  />
);

/** 3D Tilt Card with cursor tracking spotlight */
const SpecCard = ({ spec }: { spec: Specialization }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Transform values for 3D card tilt
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 120, damping: 25 });

  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates from 0 to 1
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width);
    y.set(mouseY / height);

    // Spotlight positions inside card
    setSpotlightPos({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: '1000px',
        boxShadow: `0 10px 30px -15px ${spec.glowColor}`
      }}
      className="relative group bg-neutral-900/35 border border-neutral-850 rounded-3xl p-6 sm:p-8 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-neutral-750/60 shadow-2xl flex flex-col justify-between min-h-[360px]"
    >
      {/* Top Accent Edge */}
      <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-80", spec.accent)} />

      {/* Hover Spotlight Glow */}
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(circle 200px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.03), transparent 80%)`,
          }}
        />
      )}

      {/* Subtle corner glow in the card's backdrop */}
      <div className={cn(
        "absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-tr opacity-[0.04] transition-opacity duration-500 blur-xl pointer-events-none",
        spec.accent
      )} />

      {/* Top: Icon & Title & Description */}
      <div className="relative z-10 space-y-4">
        
        {/* Animated Icon wrapper */}
        <motion.div 
          variants={spec.iconAnimation}
          animate={isHovered ? 'hover' : 'initial'}
          className="p-3 bg-neutral-850/80 rounded-2xl border border-neutral-750 text-neutral-400 w-fit"
        >
          {spec.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight group-hover:text-indigo-200 transition-colors duration-300">
          {spec.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
          {spec.description}
        </p>

      </div>

      {/* Bottom: Focus items list */}
      <div className="relative z-10 pt-5 mt-5 border-t border-neutral-800/80 flex flex-wrap gap-1.5">
        {spec.focus.map((item) => (
          <span
            key={item}
            className="text-[9px] font-mono font-semibold bg-white/5 border border-white/5 px-2.5 py-0.5 rounded text-neutral-400 hover:text-white transition-colors duration-250"
          >
            {item}
          </span>
        ))}
      </div>

    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────

export default function MySpecializations() {
  return (
    <section className="relative w-full bg-black text-white py-20 px-4 sm:px-8 overflow-hidden z-10 border-t border-neutral-900">
      <GridOverlay />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 px-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.25em] text-indigo-400 uppercase"
          >
            Areas of Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-white leading-tight"
          >
            My Specializations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed mt-4"
          >
            Key developer domains where I deliver robust, scalable, and optimized software solutions.
          </motion.p>
        </div>

        {/* Bento/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALIZATIONS_DATA.map((spec) => (
            <SpecCard key={spec.id} spec={spec} />
          ))}
        </div>

      </div>
    </section>
  );
}
