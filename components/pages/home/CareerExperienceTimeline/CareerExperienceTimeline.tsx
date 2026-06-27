'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Calendar, Award, BookOpen, Briefcase } from 'lucide-react';
import { FaUserGraduate, FaReact, FaLaptopCode } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

// ─── Types ──────────────────────────────────────────────────────────────
export interface TimelineItemType {
  id: number;
  type: 'education' | 'training' | 'work';
  date: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  color: string;
  techStack: string[];
}

// ─── Data ──────────────────────────────────────────────────────────────
const TIMELINE_DATA: TimelineItemType[] = [
  {
    id: 1,
    type: 'education',
    date: '2018 - 2022',
    title: 'Bachelor of Business Administration (BBA)',
    subtitle: 'Stamford University Bangladesh',
    description: 'Specialization in Marketing with strong academic performance',
    details: ['Specialization: Marketing', 'Academic Achievement: CGPA 3.46'],
    icon: <FaUserGraduate className="w-5 h-5" />,
    color: 'from-purple-500 to-indigo-600',
    techStack: ['Marketing', 'Business Analysis', 'Strategic Planning'],
  },
  {
    id: 2,
    type: 'work',
    date: 'Aug 2023 - Sep 2024',
    title: 'Frontend Developer',
    subtitle: 'Wizard Software & Technology Bangladesh Ltd',
    description: 'Developed dynamic and responsive web applications while collaborating with senior developers',
    details: ['Front-end & Back-end Development', 'Team Collaboration', 'Responsive Web Applications'],
    icon: <FaReact className="w-5 h-5" />,
    color: 'from-blue-500 to-cyan-600',
    techStack: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'GitHub'],
  },
  {
    id: 3,
    type: 'work',
    date: 'Oct 2024 - Present',
    title: 'Full Stack Developer',
    subtitle: 'SM Technology',
    description: 'Currently developing and maintaining high-performance web applications',
    details: ['Full Stack Development', 'Web Application Maintenance', 'Performance Optimization'],
    icon: <FaLaptopCode className="w-5 h-5" />,
    color: 'from-orange-500 to-red-600',
    techStack: [
      'JavaScript',
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'Next.js',
      'Prisma',
      'RESTful APIs',
      'Git',
      'GitHub',
      'Agile Methodologies',
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────

/** Grid background pattern overlay */
const GridOverlay = () => (
  <div
    className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] opacity-75 dark:opacity-15 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
    aria-hidden="true"
  />
);

/** Hexagonal Node with Pulsing Effect */
const HexNode = ({ icon, color }: { icon: React.ReactNode; color: string }) => (
  <div className="relative w-12 h-12 flex items-center justify-center group">
    {/* Glowing background ring */}
    <div className={cn("absolute inset-0 bg-gradient-to-tr rounded-xl rotate-45 scale-75 opacity-20 blur-sm", color)} />
    
    {/* Node spinning indicator outer dash ring */}
    <motion.svg 
      viewBox="0 0 100 100" 
      className="absolute inset-0 w-full h-full stroke-indigo-500/20 fill-none stroke-[2px]"
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    >
      <polygon points="50,3 93,25 93,75 50,97 7,75 7,25" strokeDasharray="10 5" />
    </motion.svg>

    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-white dark:fill-slate-950 stroke-neutral-300 dark:stroke-neutral-700 group-hover:stroke-indigo-600 dark:group-hover:stroke-indigo-400 transition-colors duration-300">
      <polygon points="50,3 93,25 93,75 50,97 7,75 7,25" />
    </svg>
    
    <div className="relative z-10 text-neutral-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
      {icon}
    </div>
  </div>
);

/** Type badge container */
const TypeBadge = ({ type }: { type: 'education' | 'training' | 'work' }) => {
  const styles = {
    education: { label: 'Education', icon: <BookOpen className="w-3 h-3 text-purple-600 dark:text-purple-400" />, bg: 'bg-purple-100/50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/30' },
    training: { label: 'Training', icon: <Award className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />, bg: 'bg-emerald-100/50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/30' },
    work: { label: 'Work Experience', icon: <Briefcase className="w-3 h-3 text-sky-655 dark:text-sky-400" />, bg: 'bg-sky-100/50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/30' },
  };

  const current = styles[type];

  return (
    <span className={cn("inline-flex items-center gap-1 border px-2 py-0.5 rounded text-[10px] font-medium font-mono uppercase tracking-wider", current.bg)}>
      {current.icon}
      {current.label}
    </span>
  );
};

/** Bento-style Card with clean CSS hover transitions */
const TiltCard = ({ children, color, isLeft }: { children: React.ReactNode; color: string; isLeft: boolean }) => {
  return (
    <div
      className="relative group bg-neutral-100/60 dark:bg-neutral-900/35 border border-neutral-200 dark:border-neutral-850 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-lg dark:shadow-2xl hover:border-neutral-350 dark:hover:border-neutral-700/60 transition-all duration-300 overflow-hidden hover:scale-[1.01]"
    >
      {/* Colored Top accent edge */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-85",
        color
      )} />

      {/* Colored Side accent edge */}
      <div className={cn(
        "absolute top-0 bottom-0 w-[2px] bg-gradient-to-b opacity-85",
        color,
        isLeft ? "left-0" : "left-0 lg:left-auto lg:right-0"
      )} />

      {children}
    </div>
  );
};
 
interface TimelineCardProps {
  entry: TimelineItemType;
  isLeft: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ entry, isLeft }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 70 }}
      className={cn(
        "flex w-full mb-12 lg:mb-16 justify-start items-center relative group",
        isLeft ? "lg:justify-start" : "lg:justify-end"
      )}
    >
      {/* Centered Node (Left-aligned on mobile) */}
      <div className="absolute left-4 lg:left-1/2 top-4 lg:-translate-x-1/2 z-20">
        <HexNode icon={entry.icon} color={entry.color} />
      </div>

      {/* Card Content wrapper */}
      <div className={cn(
        "w-full pl-16 lg:pl-0 lg:w-[47.5%]",
        isLeft ? "lg:pr-10" : "lg:pl-10"
      )}>
        <TiltCard color={entry.color} isLeft={isLeft}>
          
          {/* Card content structure */}
          <div className="flex flex-col space-y-5 relative z-10">
            
            {/* Top Section: Header details */}
            <div className="flex flex-col space-y-3 pb-4 border-b border-neutral-250 dark:border-neutral-800/60">
              
              {/* Type & Date */}
              <div className="flex flex-wrap gap-2 items-center">
                <TypeBadge type={entry.type} />
                <span className="flex items-center gap-1 bg-neutral-200/50 dark:bg-neutral-800/40 border border-neutral-300 dark:border-neutral-700/50 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-600 dark:text-neutral-400">
                  <Calendar className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                  {entry.date}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight group-hover:text-indigo-650 group-hover:dark:text-indigo-300 transition-colors duration-350">
                  {entry.title}
                </h3>
                <h4 className={cn("text-xs sm:text-sm sm:text-base font-bold bg-gradient-to-r bg-clip-text text-transparent mt-1 inline-block", entry.color)}>
                  {entry.subtitle}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                {entry.description}
              </p>
            </div>

            {/* Bottom Section: Accomplishments & Tech */}
            <div className="flex flex-col space-y-4">
              
              {/* Key Bullet Details */}
              <div className="space-y-2.5">
                {entry.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-750 dark:text-neutral-300 leading-relaxed font-normal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 mt-1.5 shrink-0" />
                    <p>{detail}</p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-250 dark:border-neutral-800/60">
                {entry.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] sm:text-[10px] font-mono font-semibold bg-neutral-200/50 dark:bg-white/5 border border-neutral-300 dark:border-white/5 px-2.5 py-0.5 rounded text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-300 dark:hover:bg-white/10 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </TiltCard>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────

export default function CareerExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom scroll tracking for visual line fill effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const fillY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-background text-foreground py-20 px-4 sm:px-8 overflow-hidden z-10 border-t border-neutral-200 dark:border-neutral-900"
    >
      <GridOverlay />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24 px-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.25em] text-indigo-655 dark:text-indigo-400 uppercase"
          >
            My Track Record
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-neutral-900 dark:text-white leading-tight"
          >
            Career & Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed mt-4"
          >
            A timeline of my formal academic qualifications, professional trainings, and industrial experiences in full-stack engineering.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Main vertical central track background line */}
          <div className="absolute left-10 lg:left-1/2 top-6 bottom-6 w-px bg-neutral-200 dark:bg-neutral-800 z-10" />

          {/* Glowing fill line animated on scroll */}
          <motion.div 
            style={{ height: fillY }}
            className="absolute left-10 lg:left-1/2 top-6 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)] origin-top"
          />

          {/* Traveling signal dots for futuristic data-flow animation */}
          <div className="absolute left-10 lg:left-1/2 top-6 bottom-6 w-px pointer-events-none z-15 overflow-hidden">
            <motion.div
              animate={{ y: ['-10%', '110%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[3px] -translate-x-[1px] h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee]"
            />
            <motion.div
              animate={{ y: ['-10%', '110%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 2 }}
              className="absolute w-[3px] -translate-x-[1px] h-20 bg-gradient-to-b from-transparent via-purple-400 to-transparent shadow-[0_0_8px_#c084fc]"
            />
          </div>

          {/* Render cards */}
          {TIMELINE_DATA.map((entry, index) => {
            const isLeft = index % 2 === 0;
            return (
              <TimelineCard
                key={entry.id}
                entry={entry}
                isLeft={isLeft}
              />
            );
          })}

        </div>

      </div>
    </section>
  );
}
