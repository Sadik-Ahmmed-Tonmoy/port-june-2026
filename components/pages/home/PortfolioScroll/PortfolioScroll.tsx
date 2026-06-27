'use client';

import React, { JSX, useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { cn } from '@/lib/utils';
import TextAnimation from '@/components/uilayouts/scroll-text';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, Code, Database, Server, Zap, Users, Rocket, GitBranch } from 'lucide-react';
import { useRef } from 'react';
import perfectoHome from '@/assets/images/perfecto_home.png';
import { useTheme } from 'next-themes';
import MySpecializations from '../MySpecializations/MySpecializations';

// ─── Types ──────────────────────────────────────────────────────────────
interface SectionData {
  id: string;
  bg: string;
  textColor: string;
  title: React.ReactNode;
  subTitle?: string;
  stats?: { label: string; value: string; icon: React.ReactNode }[];
}

interface TechItem {
  name: string;
  src: string;
  skew?: 'left' | 'right';
  invert?: boolean;
}

interface ProjectItem {
  title: string;
  image: string;
  description: string;
  tech: string[];
}

// ─── Content Data ──────────────────────────────────────────────────────
const SECTIONS: SectionData[] = [
  {
    id: 'intro',
    bg: 'bg-neutral-50 dark:bg-slate-950',
    textColor: 'text-neutral-900 dark:text-white',
    title: <MySpecializations />,
  },
  {
    id: 'stats',
    bg: 'bg-neutral-200 dark:bg-neutral-900',
    textColor: 'text-neutral-900 dark:text-white',
    title: (
      <>
        <TextAnimation text="3+ years of experience" lineAnime classname="inline-block text-3xl sm:text-5xl lg:text-7xl" />
        <br />
        <TextAnimation text="20+ production apps shipped" lineAnime direction="right" classname="inline-block text-3xl sm:text-5xl lg:text-7xl" />
        <br />
        <TextAnimation text="1.2M+ database queries optimized" lineAnime classname="inline-block text-sm sm:text-lg" />
      </>
    ),
  },
  {
    id: 'projects-highlight',
    bg: 'bg-neutral-50 dark:bg-slate-950',
    textColor: 'text-neutral-900 dark:text-white',
    title: (
      <>
        <TextAnimation
          text="KnockMyRide · PerfectoBD · Primely Gaming"
          letterAnime
          classname="text-transparent bg-clip-text bg-gradient-to-r from-indigo-550 via-purple-550 to-pink-550 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 text-2xl sm:text-4xl lg:text-6xl"
        />
        <br />
        <span className="text-xl sm:text-3xl text-neutral-600 dark:text-neutral-400 block mt-2">real‑world projects with real impact</span>
      </>
    ),
  },
];

const TECH_STACK: TechItem[] = [
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', skew: 'right', invert: true },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', skew: 'left' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', skew: 'right' },
  { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', skew: 'left' },
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', skew: 'left' },
  { name: 'Redis', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', skew: 'right' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', skew: 'left' },
  { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', skew: 'right' },
  { name: 'Prisma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg', skew: 'left' },
  { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', skew: 'right' },
];

const PROJECTS: ProjectItem[] = [
  {
    title: 'KnockMyRide',
    image: 'https://i.ibb.co.com/kgRd6hG7/Gemini-Generated-Image-9hg43s9hg43s9hg4.png',
    description: "Bangladesh's first smart QR sticker system for instant vehicle owner contact",
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Prisma', 'Redis', 'Sharp']
  },
  {
    title: 'PerfectoBD',
    image: perfectoHome.src,
    description: 'Full-stack e-commerce platform with admin dashboard and real-time inventory',
    tech: ['React', 'Firebase', 'Redux', 'RTK Query', 'Tailwind CSS', 'AntD']
  },
  {
    title: 'Primely Gaming',
    image: 'https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop',
    description: 'Online tournament platform with brackets, player registration, and live results',
    tech: ['React', 'Redux', 'Tailwind CSS', 'Swiper.js', 'Framer Motion']
  },
];

// ─── Helper Components ─────────────────────────────────────────────────

/** Grid pattern overlay (reusable) */
const GridOverlay = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]',
      className
    )}
    aria-hidden="true"
  />
);

/** Sticky section with centered content and grid overlay */
const StickySection = ({
  id,
  bg,
  textColor,
  title,
  subTitle,
  stats,
}: SectionData) => (
  <section
    id={id}
    className={cn(
      'relative grid h-screen w-full place-content-center sticky top-0 overflow-hidden',
      bg,
      textColor
    )}
  >
    <GridOverlay />
    <div className="px-4 sm:px-8 text-center mx-auto">
      <div className="leading-[110%] tracking-tight font-semibold">
        {title}
      </div>
      {subTitle && <p className="mt-4 text-base sm:text-lg text-neutral-500 dark:text-neutral-400">{subTitle}</p>}
      {stats && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="bg-neutral-200/50 dark:bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 backdrop-blur-sm border border-neutral-300 dark:border-white/10">
              <div className="flex items-center justify-center gap-2 text-indigo-650 dark:text-indigo-400">
                {stat.icon}
                <span className="text-xl sm:text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

/** Tech stack card with skew */
const TechCard = ({ name, src, skew, invert }: TechItem) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const shouldInvert = invert && mounted && resolvedTheme === 'dark';

  return (
    <figure
      className={cn(
        'grid place-content-center p-4 sm:p-6 hover:scale-105 transition-transform duration-300',
        skew === 'left' ? '-skew-x-12' : 'skew-x-12'
      )}
    >
      <img
        src={src}
        alt={name}
        className={cn('h-20 w-20 sm:h-32 sm:w-32 object-contain transition-all duration-300', shouldInvert && 'invert')}
        loading="lazy"
      />
      <figcaption className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 text-center font-mono">
        {name}
      </figcaption>
    </figure>
  );
};

// ─── Main Component ────────────────────────────────────────────────────

export default function PortfolioScroll(): JSX.Element {
  const footerRef = useRef<HTMLElement>(null);
  const [footerGridBg, setFooterGridBg] = useState('');

  // Use framer-motion's useScroll for scroll-based animations
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  // Letter spacing: spreads out when scrolling in, centers when in view, spreads out when scrolling out
  const footerLetterSpacing = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.6, 0.85, 1],
    ['2em', '0.8em', '0.05em', '0.05em', '0.8em', '2em']
  );

  // Y position: letters come from sides to center
  const footerTextY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [100, 30, 0, -30, -100]
  );

  // Opacity: fade in and out
  const footerTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.7, 0.85, 1],
    [0, 0.3, 1, 1, 0.3, 0]
  );

  // Scale: letters scale up and down
  const footerScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.7, 0.9, 1.1, 0.9, 0.7]
  );

  // Rotate: subtle rotation effect
  const footerRotate = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [-5, -2, 0, 2, 5]
  );

  const handleFooterMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Update spotlight effect
    setFooterGridBg(`radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.03) 0%, transparent 60%)`);
  };

  // Split text into individual letters for animation
  const nameText = "Sadik Ahmmed Tonmoy";
  const letters = nameText.split('');

  // Stats data with icons
  const statsData = [
    { label: "Projects", value: "20+", icon: <Rocket className="w-4 h-4" /> },
    { label: "API Endpoints", value: "100+", icon: <Server className="w-4 h-4" /> },
    { label: "Database Queries", value: "1.2M", icon: <Database className="w-4 h-4" /> },
    { label: "Performance Gain", value: "35%", icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <ReactLenis root>
      <main className="bg-black w-full mx-auto">
        {/* ── Sticky sections ── */}
        {SECTIONS.map((section) => (
          <StickySection key={section.id} {...section} />
        ))}

        {/* ── Tech Stack (sticky + skewed icons) ── */}
        <section className="w-full bg-slate-950 text-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="sticky top-0 flex h-screen items-center justify-center order-2 lg:order-1">
              <h3 className="px-4 sm:px-8 text-center text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[120%] tracking-tight">
                My Tech <br /> Stack
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 p-4 sm:p-8 order-1 lg:order-2">
              {TECH_STACK.map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Project Showcase (sticky images + text) ── */}
        <section className="w-full bg-slate-950 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 px-4 sm:px-8 py-8 lg:py-0 min-h-screen">
            <div className="grid gap-8 lg:gap-12 order-2 lg:order-1">
              {PROJECTS.map((project) => (
                <figure key={project.title} className="sticky top-8 lg:top-0 grid place-content-center lg:h-screen py-8 lg:py-0">
                  <div className="relative group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full max-w-md mx-auto h-48 sm:h-64 lg:h-96 rounded-lg sm:rounded-xl object-cover transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                          <span key={tech} className="text-[8px] sm:text-[10px] font-mono bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full text-neutral-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <figcaption className="mt-3 sm:mt-4 text-center">
                    <h4 className="text-lg sm:text-xl font-bold text-white">{project.title}</h4>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-sm mx-auto">{project.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="sticky top-0 flex h-screen items-center justify-center order-1 lg:order-2">
              <div className="text-center lg:text-right px-4">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-[120%] tracking-tight">
                  Production‑ready <br /> apps with <br />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    real users
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 mt-4 max-w-sm mx-auto lg:ml-auto">
                  Built with modern tech stacks, deployed at scale, and making a difference.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: PREMIUM INTERACTIVE FOOTER ── */}
        <footer
          ref={footerRef}
          onMouseMove={handleFooterMouseMove}
          className="relative min-h-[90vh] flex flex-col justify-between bg-neutral-950 text-neutral-50 overflow-hidden pt-24 pb-12 z-10"
        >
          {/* Pointer Spotlight grid overlay */}
          <motion.div
            style={{ background: footerGridBg }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[length:54px_54px] opacity-40 pointer-events-none"
          />

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end relative z-10">
            <motion.div
              className="md:col-span-7 flex flex-col items-start gap-3 md:gap-4"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0, 0.5, 1, 1]),
                y: useTransform(scrollYProgress, [0, 0.2, 0.5], [50, 20, 0])
              }}
            >
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-indigo-400 uppercase">
                LET'S BUILD SOMETHING EXTRAORDINARY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-lg leading-tight">
                Looking for a developer who pushes the limits?
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-md mt-2">
                Let's talk about contract work, consulting, or full-time roles. I'm ready to ship code that scales and users adore.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
                <motion.a
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:workwithsadik@gmail.com"
                  className="bg-indigo-600 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-indigo-500 shadow-md text-xs sm:text-sm"
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="bg-neutral-800 text-white font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-neutral-700 text-xs sm:text-sm border border-neutral-700/30"
                >
                  Download Resume
                </motion.a>
              </div>

              {/* Quick stats in footer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-md">
                {statsData.map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-2 sm:p-3 backdrop-blur-sm border border-white/5">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-indigo-400">
                      {stat.icon}
                      <span className="text-sm sm:text-base font-bold">{stat.value}</span>
                    </div>
                    <p className="text-[8px] sm:text-[10px] text-neutral-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-5 flex flex-col md:items-end gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-400 font-normal"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0, 0.3, 1, 1]),
                y: useTransform(scrollYProgress, [0, 0.3, 0.5], [40, 20, 0])
              }}
            >
              <div className="flex flex-col md:items-end w-full">
                <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider">Social Platforms</span>
                <div className="mt-2 flex gap-3 sm:gap-4 flex-wrap">
                  {[
                    { name: 'GitHub', href: 'https://github.com/Sadik-Ahmmed-Tonmoy' },
                    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sadik-ahmmed-tonmoy/' },
                    { name: 'Twitter', href: 'https://x.com/' },
                    { name: 'Portfolio', href: '#' }
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 transition-colors font-medium relative py-1 group text-xs sm:text-sm"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:items-end w-full">
                <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider">Location</span>
                <span className="mt-1 text-white font-medium text-sm sm:text-base">Dhaka, Bangladesh</span>
              </div>

              <div className="flex flex-col md:items-end w-full">
                <span className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider">Contact</span>
                <a href="mailto:workwithsadik@gmail.com" className="text-white font-medium text-sm sm:text-base hover:text-indigo-400 transition-colors">
                  workwithsadik@gmail.com
                </a>
              </div>
            </motion.div>
          </div>

          {/* Massive Reveal Typography - Individual Letter Animation */}
          <div className="w-full flex justify-center mt-16 sm:mt-20 select-none overflow-hidden py-4 border-t border-neutral-900/50 relative z-10">
            <motion.div
              style={{
                opacity: footerTextOpacity,
                scale: footerScale,
                rotate: footerRotate,
              }}
              className="flex flex-wrap justify-center gap-0.5 sm:gap-1 md:gap-2"
            >
              {letters.map((letter, index) => {
                // Calculate individual letter offset based on position
                const letterX = useTransform(
                  scrollYProgress,
                  [0, 0.2, 0.5, 0.8, 1],
                  [
                    // Start: letters spread out
                    index < 6 ? -200 - (index * 20) : 200 + ((index - 6) * 20),
                    // Coming in
                    index < 6 ? -80 - (index * 10) : 80 + ((index - 6) * 10),
                    // Center
                    0,
                    // Going out
                    index < 6 ? 80 + (index * 10) : -80 - ((index - 6) * 10),
                    // End: spread out
                    index < 6 ? 200 + (index * 20) : -200 - ((index - 6) * 20),
                  ]
                );

                // Individual letter rotation
                const letterRotate = useTransform(
                  scrollYProgress,
                  [0, 0.3, 0.5, 0.7, 1],
                  [
                    index % 2 === 0 ? 15 : -15,
                    index % 2 === 0 ? 5 : -5,
                    0,
                    index % 2 === 0 ? -5 : 5,
                    index % 2 === 0 ? -15 : 15,
                  ]
                );

                // Individual letter opacity with delay based on index
                const letterOpacity = useTransform(
                  scrollYProgress,
                  [0, 0.1 + (index * 0.01), 0.4, 0.7, 0.9 + (index * 0.01), 1],
                  [0, 0, 1, 1, 0, 0]
                );

                return (
                  <motion.span
                    key={index}
                    style={{
                      x: letterX,
                      rotate: letterRotate,
                      opacity: letterOpacity,
                      display: 'inline-block',
                    }}
                    className={cn(
                      "text-[8vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-black uppercase leading-[0.8] tracking-tighter",
                      "text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/10 to-transparent"
                    )}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      damping: 20,
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>

          {/* Footer Sub-bar */}
          <motion.div
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-8 border-t border-neutral-900 text-[10px] sm:text-xs text-neutral-500 z-10"
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 0.5, 1]),
              y: useTransform(scrollYProgress, [0.5, 0.7], [20, 0])
            }}
          >
            <span>&copy; 2026 Sadik Ahmmed Tonmoy. All rights reserved.</span>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Use</a>
            </div>
            <motion.button
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors bg-neutral-900/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-neutral-800 text-[10px] sm:text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </motion.button>
          </motion.div>
        </footer>
      </main>
    </ReactLenis>
  );
}