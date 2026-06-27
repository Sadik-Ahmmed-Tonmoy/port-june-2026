'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Database, Wrench, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
}

interface SkillCategory {
  title: string;
  icon: any;
  glow: string;           // tailwind bg color for glow
  iconColor: string;
  borderAccent: string;
  skills: Skill[];
}

// ─── Data ──────────────────────────────────────────────────────────────
const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Layout,
    glow: 'rgba(99,102,241,0.12)',
    iconColor: 'text-indigo-400',
    borderAccent: 'group-hover:border-indigo-500/40',
    skills: [
      { name: 'React.js', level: 'Expert' },
      { name: 'Next.js', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'JavaScript ES6+', level: 'Expert' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'Redux Toolkit', level: 'Advanced' },
      { name: 'Framer Motion', level: 'Advanced' },
      { name: 'Ant Design', level: 'Advanced' },
      { name: 'SSR / SSG / CSR', level: 'Expert' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    glow: 'rgba(16,185,129,0.10)',
    iconColor: 'text-emerald-400',
    borderAccent: 'group-hover:border-emerald-500/40',
    skills: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'RESTful APIs', level: 'Expert' },
      { name: 'Socket.io', level: 'Advanced' },
      { name: 'BullMQ', level: 'Advanced' },
      { name: 'Next.js API Routes', level: 'Expert' },
      { name: 'Firebase', level: 'Advanced' },
      { name: 'Multer', level: 'Advanced' },
    ],
  },
  {
    title: 'Databases & Caching',
    icon: Database,
    glow: 'rgba(59,130,246,0.10)',
    iconColor: 'text-blue-400',
    borderAccent: 'group-hover:border-blue-500/40',
    skills: [
      { name: 'MongoDB', level: 'Expert' },
      { name: 'Prisma ORM', level: 'Expert' },
      { name: 'Mongoose', level: 'Expert' },
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'Redis', level: 'Advanced' },
      { name: 'Query Optimization', level: 'Advanced' },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: Wrench,
    glow: 'rgba(245,158,11,0.10)',
    iconColor: 'text-amber-400',
    borderAccent: 'group-hover:border-amber-500/40',
    skills: [
      { name: 'Git & GitHub', level: 'Expert' },
      { name: 'Vercel', level: 'Expert' },
      { name: 'Postman', level: 'Expert' },
      { name: 'Figma-to-Code', level: 'Advanced' },
      { name: 'Sharp', level: 'Advanced' },
      { name: 'Docker', level: 'Intermediate' },
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const GridPattern = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]"
  />
);

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const CHIP_VARIANTS = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' as const, delay: i * 0.03 },
  }),
};

// ─── Component ──────────────────────────────────────────────────────────────
export default function TechnicalSkills() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  // Auto-increment progress every 100ms if playing
  React.useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const intervalTime = 100; // update progress every 100ms
    const totalTime = 6000;   // 6 seconds cycle
    const increment = (intervalTime / totalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => prev + increment);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Handle category switching when progress reaches 100%
  React.useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      setActiveCategory((currentCategory) => {
        const categories = ['All', 'Frontend', 'Backend & APIs', 'Databases & Caching', 'Tools & DevOps'];
        const currentIndex = categories.indexOf(currentCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }
  }, [progress]);

  const handleTabClick = (cat: string) => {
    setActiveCategory(cat);
    setIsPlaying(false); // Pause autoplay on manual selection
    setProgress(0);
  };

  const filteredCategories = SKILLS_DATA.filter((cat) =>
    activeCategory === 'All' || cat.title === activeCategory
  );

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8  text-foreground overflow-hidden border-t border-neutral-105 dark:border-white/[0.06]">
      <GridPattern />

      {/* Ambient glow top center */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-500/10 blur-[120px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 px-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.25em] text-indigo-650 dark:text-indigo-400 uppercase"
          >
            My Expertise
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-neutral-900 dark:text-white leading-tight"
          >
            Technical{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-650 dark:text-neutral-450 font-normal leading-relaxed mt-4"
          >
            Tools and technologies I use to build scalable, production-ready web applications — from pixel-perfect UIs to real-time backend systems.
          </motion.p>
        </div>

        {/* ── Search & Filter Controls ── */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-12 sm:mb-16 bg-neutral-105/55 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.05] p-3 rounded-2xl lg:rounded-full backdrop-blur-xl max-w-5xl mx-auto">
          {/* Category Tabs & Autoplay Toggle */}
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <div className="flex flex-wrap gap-1 items-center justify-center bg-neutral-200/40 dark:bg-black/20 p-1 rounded-full border border-neutral-300/30 dark:border-white/[0.02]">
              {['All', 'Frontend', 'Backend & APIs', 'Databases & Caching', 'Tools & DevOps'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleTabClick(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 select-none",
                    activeCategory === cat
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  )}
                >
                  {cat === 'All' ? 'All Stack' : cat.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Play/Pause Button with Count Circle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Autoplay (6s interval)" : "Start Autoplay (6s interval)"}
              className="relative w-10 h-10 rounded-full flex items-center justify-center select-none bg-neutral-200/45 dark:bg-white/[0.03] border border-neutral-300/40 dark:border-white/[0.06] hover:bg-neutral-250/60 dark:hover:bg-white/[0.06] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 shadow-sm"
            >
              {/* Circular progress SVG */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                {/* Background circle track */}
                <circle
                  className="text-neutral-300/30 dark:text-white/[0.02]"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                />
                {/* Progress indicator circle */}
                {isPlaying && (
                  <circle
                    className="text-indigo-500 dark:text-indigo-400 transition-all duration-100 ease-linear"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="100.5"
                    strokeDashoffset={100.5 - (100.5 * progress) / 100}
                    strokeLinecap="round"
                    fill="none"
                    cx="18"
                    cy="18"
                    r="16"
                  />
                )}
              </svg>

              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 relative z-10" />
              ) : (
                <Play className="w-3.5 h-3.5 ml-0.5 relative z-10" />
              )}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-10 pr-8 py-2 bg-neutral-200/50 dark:bg-white/[0.03] border border-neutral-300/40 dark:border-white/[0.06] rounded-full text-xs font-medium placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-white focus:outline-none focus:border-indigo-500/50 dark:focus:border-indigo-400/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-450 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white text-xs font-bold"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* ── Categories Grid ── */}
        <motion.div
          key={activeCategory}
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className={cn(
            "grid gap-4 lg:gap-5",
            filteredCategories.length === 1 ? "grid-cols-1 max-w-2xl mx-auto" : "grid-cols-1 md:grid-cols-2"
          )}
        >
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                layout
                variants={CARD_VARIANTS}
                  whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
                  className={cn(
                    'group relative rounded-2xl p-6 sm:p-8',
                    'bg-neutral-50/80 dark:bg-white/[0.03]',
                    'border border-neutral-205 dark:border-white/[0.07]',
                    cat.borderAccent,
                    'transition-all duration-300',
                    'backdrop-blur-xl',
                  )}
                  style={{
                    boxShadow: `0 0 0 0 transparent`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px -12px ${cat.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 transparent`;
                  }}
                >
                  {/* Card inner glow on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(400px circle at 50% 0%, ${cat.glow}, transparent 70%)`,
                    }}
                  />

                  {/* Header */}
                  <div className="relative flex items-center gap-3 mb-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-200/60 dark:bg-white/[0.06] border border-neutral-300/50 dark:border-white/[0.08]"
                    >
                      <Icon className={cn('w-5 h-5', cat.iconColor)} strokeWidth={1.8} />
                    </motion.div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white tracking-tight">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5 font-medium">
                        {cat.skills.length} technologies
                      </p>
                    </div>

                    {/* Decorative count pill */}
                    <span className="ml-auto text-[10px] font-bold tracking-widest text-neutral-400 dark:text-neutral-600 uppercase">
                      {cat.skills.filter((s) => s.level === 'Expert').length} Expert
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="relative mb-6">
                    <div className="h-px bg-neutral-200 dark:bg-white/[0.06]" />
                  </div>

                  {/* Skill chips */}
                  <div className="relative flex flex-wrap gap-2">
                    {cat.skills.map((skill, i) => {
                      const matchesSearch = searchQuery === '' || 
                        skill.name.toLowerCase().includes(searchQuery.toLowerCase());

                      return (
                        <motion.span
                          key={skill.name}
                          custom={i}
                          variants={CHIP_VARIANTS}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          whileHover={{
                            scale: matchesSearch ? 1.05 : 1,
                            transition: { duration: 0.15 },
                          }}
                          className={cn(
                            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-default select-none transition-all duration-300',
                            matchesSearch 
                              ? 'bg-neutral-100 text-neutral-700 border border-neutral-200/80 dark:bg-white/[0.05] dark:text-neutral-300 dark:border-white/[0.08] hover:bg-neutral-200/85 dark:hover:bg-white/[0.09]'
                              : 'opacity-20 blur-[0.5px]',
                            matchesSearch && searchQuery !== '' && 'border-indigo-500/50 dark:border-indigo-400/50 shadow-[0_0_8px_rgba(99,102,241,0.15)] bg-indigo-500/5 dark:bg-indigo-400/5'
                          )}
                        >
                          {/* Level dot */}
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full flex-shrink-0',
                              skill.level === 'Expert'
                                ? 'bg-indigo-500 dark:bg-indigo-400'
                                : skill.level === 'Advanced'
                                ? 'bg-emerald-500 dark:bg-emerald-400'
                                : 'bg-amber-500 dark:bg-amber-400',
                            )}
                          />
                          {skill.name}
                        </motion.span>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
        </motion.div>

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-6 mt-12"
        >
          {(['Expert', 'Advanced', 'Intermediate'] as const).map((lvl) => (
            <div key={lvl} className="flex items-center gap-2">
              <span
                className={cn(
                  'w-2 h-2 rounded-full',
                  lvl === 'Expert'
                    ? 'bg-indigo-500 dark:bg-indigo-400'
                    : lvl === 'Advanced'
                    ? 'bg-emerald-500 dark:bg-emerald-400'
                    : 'bg-amber-500 dark:bg-amber-400',
                )}
              />
              <span className="text-[11px] font-medium text-neutral-450 dark:text-neutral-500">
                {lvl}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}