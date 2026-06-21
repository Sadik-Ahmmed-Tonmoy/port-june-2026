'use client';

import React, { JSX } from 'react';
import { ReactLenis } from 'lenis/react';
import { cn } from '@/lib/utils';
import TextAnimation from '@/components/uilayouts/scroll-text';

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

        {/* ── Footer ── */}
        <footer className="bg-slate-950 group">
          <h4 className="translate-y-20 text-center text-[16vw] font-semibold uppercase leading-[100%] text-transparent transition-all duration-300 ease-linear group-hover:translate-y-4 bg-gradient-to-r from-neutral-400 to-neutral-800 bg-clip-text">
            Sadik Ahmmed
          </h4>
          <div className="relative z-10 mt-4 grid h-40 place-content-center rounded-t-full bg-black text-2xl">
            Thanks for scrolling 🚀
          </div>
        </footer>
      </main>
    </ReactLenis>
  );
}