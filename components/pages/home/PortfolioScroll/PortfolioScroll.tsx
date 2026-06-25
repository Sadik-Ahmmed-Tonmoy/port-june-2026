'use client';

import React, { JSX, useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { cn } from '@/lib/utils';
import TextAnimation from '@/components/uilayouts/scroll-text';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useRef } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────
interface SectionData {
  id: string;
  bg: string;
  textColor: string;
  title: React.ReactNode;
  subTitle?: string;
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
}

// ─── Content Data ──────────────────────────────────────────────────────
const SECTIONS: SectionData[] = [
  {
    id: 'intro',
    bg: 'bg-slate-950',
    textColor: 'text-white',
    title: (
      <>
        Full‑Stack Developer <br />
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Next.js · Node.js · TypeScript
        </span>
      </>
    ),
    subTitle: 'Scroll to explore my work 👇',
  },
  {
    id: 'stats',
    bg: 'bg-neutral-300',
    textColor: 'text-black',
    title: (
      <>
        <TextAnimation text="3+ years of experience" lineAnime classname="inline-block" />
        <br />
        <TextAnimation text="20+ production apps shipped" lineAnime direction="right" classname="inline-block" />
      </>
    ),
  },
  {
    id: 'projects-highlight',
    bg: 'bg-slate-950',
    textColor: 'text-white',
    title: (
      <>
        <TextAnimation
          text="KnockMyRide · PerfectoBD · Primely Gaming"
          letterAnime
          classname="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
        />
        <br />
        <span className="text-3xl text-neutral-400">real‑world projects, real impact</span>
      </>
    ),
  },
];

const TECH_STACK: TechItem[] = [
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', skew: 'left' },
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', skew: 'right', invert: true },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', skew: 'left' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', skew: 'right' },
];

const PROJECTS: ProjectItem[] = [
  { title: 'KnockMyRide', image: 'https://images.unsplash.com/photo-1718183120769-ece47f31045b?w=500&auto=format&fit=crop' },
  { title: 'PerfectoBD', image: 'https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop' },
  { title: 'Primely Gaming', image: 'https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop' },
];

// ─── Helper Components ─────────────────────────────────────────────────

/** Grid pattern overlay (reusable) */
const GridOverlay = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[length:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]',
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
    <div className="px-8 text-center">
      <div className="text-5xl font-semibold leading-[120%] tracking-tight 2xl:text-7xl">{title}</div>
      {subTitle && <p className="mt-4 text-lg text-neutral-400">{subTitle}</p>}
    </div>
  </section>
);

/** Tech stack card with skew */
const TechCard = ({ name, src, skew, invert }: TechItem) => (
  <figure
    className={cn(
      'grid place-content-center',
      skew === 'left' ? '-skew-x-12' : 'skew-x-12'
    )}
  >
    <img
      src={src}
      alt={name}
      className={cn('h-32 w-32 object-contain', invert && 'invert')}
      loading="lazy"
    />
  </figure>
);

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
  const nameText = "Sadik Ahmmed";
  const letters = nameText.split('');

  return (
    <ReactLenis root>
      <main className="bg-black max-w- mx-auto">
        {/* ── Sticky sections ── */}
        {SECTIONS.map((section) => (
          <StickySection key={section.id} {...section} />
        ))}

        {/* ── Tech Stack (sticky + skewed icons) ── */}
        <section className="w-full bg-slate-950 text-white overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="sticky top-0 flex h-screen items-center justify-center">
              <h3 className="px-8 text-center text-5xl font-semibold leading-[120%] tracking-tight 2xl:text-7xl">
                My Tech <br /> Stack
              </h3>
            </div>
            <div className="grid gap-2">
              {TECH_STACK.map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Project Showcase (sticky images + text) ── */}
        <section className="w-full bg-slate-950 text-white">
          <div className="grid grid-cols-2 px-8">
            <div className="grid gap-2">
              {PROJECTS.map((project) => (
                <figure key={project.title} className="sticky top-0 grid h-screen place-content-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-96 w-96 rounded-md object-cover transition-all duration-300"
                    loading="lazy"
                  />
                  <figcaption className="mt-2 text-center text-sm text-neutral-400">
                    {project.title}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="sticky top-0 grid h-screen place-content-center">
              <h3 className="text-right text-4xl font-medium leading-[120%] tracking-tight">
                Production‑ready <br /> apps with <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  real users
                </span>
              </h3>
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

          <div className="w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-end relative z-10">
            <motion.div 
              className="md:col-span-7 flex flex-col items-start gap-4"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0, 0.5, 1, 1]),
                y: useTransform(scrollYProgress, [0, 0.2, 0.5], [50, 20, 0])
              }}
            >
              <span className="text-xs font-bold tracking-[0.25em] text-indigo-400 uppercase">
                LET'S BUILD SOMETHING EXTRAORDINARY
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-lg leading-tight">
                Looking for a developer who pushes the limits?
              </h2>
              <p className="text-neutral-400 font-normal leading-relaxed max-w-md mt-2">
                Let's talk about contract work, consulting, or full-time roles. I'm ready to ship code that scales and users adore.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:sadik.ahmmed.tonmoy@gmail.com"
                  className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-full hover:bg-indigo-500 shadow-md text-sm"
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="bg-neutral-800 text-white font-bold px-6 py-3 rounded-full hover:bg-neutral-700 text-sm border border-neutral-700/30"
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>

            <motion.div 
              className="md:col-span-5 flex flex-col md:items-end gap-6 text-sm text-neutral-400 font-normal"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0, 0.3, 1, 1]),
                y: useTransform(scrollYProgress, [0, 0.3, 0.5], [40, 20, 0])
              }}
            >
              <div className="flex flex-col md:items-end">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">Social Platforms</span>
                <div className="mt-2 flex gap-4">
                  {['GitHub', 'LinkedIn', 'Twitter'].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="hover:text-indigo-400 transition-colors font-medium relative py-1 group"
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:items-end">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">Location</span>
                <span className="mt-1 text-white font-medium">Dhaka, Bangladesh</span>
              </div>
            </motion.div>
          </div>

          {/* Massive Reveal Typography - Individual Letter Animation */}
          <div className="w-full flex justify-center mt-20 select-none overflow-hidden py-4 border-t border-neutral-900/50 relative z-10">
            <motion.div
              style={{
                opacity: footerTextOpacity,
                scale: footerScale,
                rotate: footerRotate,
              }}
              className="flex flex-wrap justify-center gap-1 md:gap-2"
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
                      "text-[12vw] md:text-[10vw] lg:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter",
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
            className="w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t border-neutral-900 text-xs text-neutral-500 z-10"
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 0.5, 1]),
              y: useTransform(scrollYProgress, [0.5, 0.7], [20, 0])
            }}
          >
            <span>&copy; 2026 Sadik Ahmmed. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Use</a>
            </div>
            <motion.button
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors bg-neutral-900/80 px-3 py-2 rounded-full border border-neutral-800"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </footer>
      </main>
    </ReactLenis>
  );
}