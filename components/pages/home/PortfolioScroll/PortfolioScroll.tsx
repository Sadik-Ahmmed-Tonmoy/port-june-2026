'use client';

import React, { JSX, useState, useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import { cn } from '@/lib/utils';
import TextAnimation from '@/components/uilayouts/scroll-text';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowUp, ArrowRight, Server, Database, Zap, Rocket,
  Code2, Globe, GitBranch, Terminal, Layers, Clock,
  Mail, ExternalLink, MapPin, Star, CheckCircle
} from 'lucide-react';
import perfectoHome from '@/assets/images/perfecto_home.png';
import { useTheme } from 'next-themes';
import MySpecializations from '../MySpecializations/MySpecializations';
import TechnicalSkills from '../TechnicalSkills/TechnicalSkills';

// ─── Types ──────────────────────────────────────────────────────────────
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
  url?: string;
  tag: string;
  highlight: string;
}

interface TimelineItem {
  period: string;
  role: string;
  company: string;
  location: string;
  points: string[];
  accent: string;
}

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
}

// ─── Data ──────────────────────────────────────────────────────────────

const STATS = [
  { value: '20+', label: 'Production Apps', icon: <Rocket className="w-4 h-4" /> },
  { value: '3+', label: 'Years Experience', icon: <Clock className="w-4 h-4" /> },
  { value: '100+', label: 'API Endpoints', icon: <Server className="w-4 h-4" /> },
  { value: '35%', label: 'Avg Perf Gain', icon: <Zap className="w-4 h-4" /> },
];

const TECH_STACK: TechItem[] = [
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', skew: 'right', invert: true },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', skew: 'left' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', skew: 'right' },
  { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', skew: 'left' },
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', skew: 'left' },
  { name: 'Redis', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', skew: 'right' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', skew: 'left' },
  { name: 'Prisma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg', skew: 'left', invert: true },
  { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', skew: 'right' },
  { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', skew: 'right' },
];

const PROJECTS: ProjectItem[] = [
  {
    title: 'KnockMyRide',
    image: 'https://i.ibb.co.com/kgRd6hG7/Gemini-Generated-Image-9hg43s9hg43s9hg4.png',
    description: "Bangladesh's first smart QR sticker system. Scan a sticker on a vehicle → instantly contact the owner. Built solo from zero to production.",
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Prisma', 'Redis', 'Sharp', 'BullMQ'],
    url: 'https://knockmyride.com',
    tag: 'Founder & Solo Dev',
    highlight: 'Live in Bangladesh',
  },
  {
    title: 'PerfectoBD',
    image: perfectoHome.src,
    description: 'Full-stack e-commerce platform with real-time inventory, role-based admin, cart & order management, and Firebase authentication.',
    tech: ['React', 'Firebase', 'Redux', 'RTK Query', 'Tailwind CSS', 'AntD'],
    url: 'https://perfectobd.com',
    tag: 'E-Commerce',
    highlight: 'Live Product',
  },
  {
    title: 'Primely Gaming',
    image: 'https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop',
    description: 'Online tournament platform with live bracket generation, player registration, dark-themed UI with smooth Framer Motion animations.',
    tech: ['React', 'Redux', 'Tailwind CSS', 'Swiper.js', 'Framer Motion', 'AntD'],
    tag: 'Gaming Platform',
    highlight: 'High-Perf UI',
  },
];

const TIMELINE: TimelineItem[] = [
  {
    period: 'Oct 2024 – Present',
    role: 'Full-Stack Developer',
    company: 'SM Technology',
    location: 'Dhaka, Bangladesh',
    accent: 'from-indigo-500 to-purple-500',
    points: [
      'Delivered 20+ full-stack applications using Next.js, Node.js, and TypeScript',
      'Architected REST APIs with MongoDB schema design, BullMQ job queues, and Redis caching',
      'Built real-time features using Socket.io and Prisma ORM',
      'Led end-to-end feature development with pixel-perfect, responsive UIs',
    ],
  },
  {
    period: 'Aug 2023 – Sep 2024',
    role: 'Frontend Developer',
    company: 'Wizard Software & Technology Bangladesh Ltd',
    location: 'Dhaka, Bangladesh',
    accent: 'from-emerald-500 to-teal-500',
    points: [
      'Developed responsive React applications integrated with REST APIs',
      'Reduced page load time by 35% via code-splitting and lazy loading',
      'Implemented reusable UI components across multiple client projects',
      'Collaborated with cross-functional teams to ship client-facing features on schedule',
    ],
  },
];

const SERVICES: ServiceItem[] = [
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'Full-Stack Web Apps',
    desc: 'End-to-end products from database schema to pixel-perfect UI — Next.js, Node.js, MongoDB, PostgreSQL.',
    tags: ['Next.js', 'REST API', 'MongoDB'],
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Real-Time Systems',
    desc: 'Live features built with Socket.io, Redis Pub/Sub, BullMQ job queues and event-driven architecture.',
    tags: ['Socket.io', 'Redis', 'BullMQ'],
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'High-Performance UIs',
    desc: 'Animated, accessible interfaces with Framer Motion, Tailwind CSS, and SSR/SSG optimization.',
    tags: ['Framer Motion', 'Tailwind', 'SSR'],
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    title: 'SaaS Architecture',
    desc: 'Multi-tenant platforms with role-based access, subscription billing, QR systems, and analytics dashboards.',
    tags: ['SaaS', 'Auth', 'Stripe'],
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: 'Database Design',
    desc: 'Prisma ORM schemas, MongoDB indexing, Redis sorted sets, and query optimization for scale.',
    tags: ['Prisma', 'Redis', 'PostgreSQL'],
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'API Development',
    desc: 'RESTful APIs with clean architecture, Zod validation, rate limiting, and Postman documentation.',
    tags: ['REST', 'Zod', 'Express'],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────

const GridOverlay = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      'absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]',
      className,
    )}
  />
);

// Stagger fade-up container
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.1 },
  }),
};

/** Tech stack card */
const TechCard = ({ name, src, skew, invert }: TechItem) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shouldInvert = invert && mounted && resolvedTheme === 'dark';

  return (
    <figure
      className={cn(
        'grid place-content-center p-4 sm:p-6 hover:scale-105 transition-transform duration-300 group',
        skew === 'left' ? '-skew-x-12' : 'skew-x-12',
      )}
    >
      <img
        src={src}
        alt={name}
        className={cn(
          'h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(99,102,241,0.5)]',
          shouldInvert && 'invert',
        )}
        loading="lazy"
      />
      <figcaption className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-2 text-center font-mono tracking-wider">
        {name}
      </figcaption>
    </figure>
  );
};

/** Animated counter on scroll into view */
const Counter = ({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center gap-1 p-4 sm:p-5 rounded-2xl bg-white/5 dark:bg-white/[0.04] border border-white/10 dark:border-white/[0.08] backdrop-blur-sm"
    >
      <span className="text-indigo-400">{icon}</span>
      <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{value}</span>
      <span className="text-[10px] sm:text-xs text-neutral-400 font-medium text-center leading-snug">{label}</span>
    </motion.div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────
export default function PortfolioScroll(): JSX.Element {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  });

  const footerLetterSpacing = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.6, 0.85, 1],
    ['2em', '0.8em', '0.05em', '0.05em', '0.8em', '2em'],
  );
  const footerTextY = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [100, 30, 0, -30, -100]);
  const footerTextOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.7, 0.85, 1], [0, 0.3, 1, 1, 0.3, 0]);
  const footerScale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.7, 0.9, 1.05, 0.9, 0.7]);
  const footerRotate = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [-4, -1.5, 0, 1.5, 4]);

  return (
    <ReactLenis root>
      <main className="bg-black w-full mx-auto">

        {/* ══════════════════════════════════════════
            SECTION 1 — SPECIALIZATIONS (unchanged slot)
        ══════════════════════════════════════════ */}
        <section
          id="intro"
          className="relative grid h-screen w-full place-content-center sticky top-0 overflow-hidden bg-neutral-50 dark:bg-slate-950 text-neutral-900 dark:text-white"
        >
          <GridOverlay />
          <div className="px-4 sm:px-8 text-center mx-auto w-full leading-[110%] tracking-tight font-semibold w-dvw">
            <MySpecializations />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — IDENTITY STATEMENT
        ══════════════════════════════════════════ */}
        <section
          id="identity"
          className="relative grid h-screen w-full place-content-center sticky top-0 overflow-hidden bg-neutral-50 dark:bg-slate-950 text-neutral-900 dark:text-white"
        >
          <GridOverlay />
          {/* Ambient orb */}
          <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none" />

          <div className="px-4 sm:px-8 text-center mx-auto w-full max-w-6xl">
            <TextAnimation
              text="Engineering Scalable Apps"
              lineAnime
              as="h2"
              classname="block text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-neutral-900 dark:text-white normal-case"
            />
            <TextAnimation
              text="Crafting Interactive UIs"
              lineAnime
              direction="right"
              as="h2"
              classname="block text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 normal-case mt-1"
            />
            <TextAnimation
              text="Architecting High-Performance Systems"
              lineAnime
              as="h2"
              classname="block text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-neutral-900 dark:text-white normal-case mt-1"
            />
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal"
            >
              Full-Stack Developer based in Dhaka · Founder of KnockMyRide · 3+ years shipping apps that real users depend on.
            </motion.p>

            {/* Inline stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-4"
            >
              {['Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Redis', 'Prisma', 'Socket.io', 'BullMQ'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-[11px] sm:text-xs font-mono rounded-full border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3 — NUMBERS / STATS
        ══════════════════════════════════════════ */}
        <section
          id="stats"
          className="relative grid h-screen w-full place-content-center sticky top-0 overflow-hidden bg-neutral-50 dark:bg-slate-950"
        >
          <GridOverlay />
          <div aria-hidden className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

          <div className="px-4 sm:px-8 text-center mx-auto w-full max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-semibold tracking-[0.3em] uppercase text-indigo-400 mb-4"
            >
              By the numbers
            </motion.p>
            <TextAnimation
              text="Proven at scale"
              lineAnime
              as="h2"
              classname="block text-4xl sm:text-6xl lg:text-7xl font-black text-neutral-900 dark:text-white normal-case tracking-tight"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto"
            >
              Real metrics from real projects — not estimates.
            </motion.p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-2 p-5 sm:p-6 rounded-2xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.07]"
                >
                  <span className="text-indigo-500 dark:text-indigo-400">{s.icon}</span>
                  <span className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">{s.value}</span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-500 font-medium text-center">{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for freelance & full-time roles
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4 — TECHNICAL SKILLS (your component)
        ══════════════════════════════════════════ */}
        <section
          id="skills"
          className="relative sticky top-0 overflow-hidden bg-neutral-50 dark:bg-slate-950 min-h-screen"
        >
          <TechnicalSkills />
        </section>

        {/* ══════════════════════════════════════════
            SECTION 5 — SERVICES / WHAT I DO
        ══════════════════════════════════════════ */}
        <section className="relative w-full py-24 sm:py-32 px-4 sm:px-8 bg-neutral-50 dark:bg-[#080808] border-t border-neutral-100 dark:border-white/[0.04]">
          <div aria-hidden className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-indigo-500/8 blur-[120px] pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-16 sm:mb-20">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-semibold tracking-[0.3em] uppercase text-indigo-400 mb-3"
              >
                What I do
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white"
              >
                Services &{' '}
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  Expertise
                </span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.07] hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-white/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 6 — TECH STACK (sticky + skewed)
        ══════════════════════════════════════════ */}
        <section className="w-full bg-slate-950 text-white overflow-hidden border-t border-white/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="sticky top-0 flex h-screen items-center justify-center order-2 lg:order-1 px-8">
              <div className="text-center lg:text-left">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[11px] font-semibold tracking-[0.3em] uppercase text-indigo-400 mb-4"
                >
                  Stack
                </motion.p>
                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[115%] tracking-tight">
                  Built with the{' '}
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    right tools
                  </span>
                </h3>
                <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-sm leading-relaxed">
                  Every technology chosen for a reason — speed, reliability, developer experience, and long-term maintainability.
                </p>
                <div className="mt-8 flex flex-col gap-2 text-sm text-neutral-400">
                  {['SSR-first with Next.js App Router', 'Type-safe end-to-end with TypeScript', 'Event-driven with BullMQ + Redis'].map((pt) => (
                    <div key={pt} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4 sm:p-8 order-1 lg:order-2">
              {TECH_STACK.map((tech) => (
                <TechCard key={tech.name} {...tech} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 7 — PROJECTS
        ══════════════════════════════════════════ */}
        <section className="w-full bg-slate-950 text-white border-t border-white/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-2 px-4 sm:px-8 py-8 lg:py-0 min-h-screen">
            {/* Project images */}
            <div className="grid gap-8 lg:gap-12 order-2 lg:order-1">
              {PROJECTS.map((project) => (
                <figure
                  key={project.title}
                  className="sticky top-8 lg:top-0 grid place-content-center lg:h-screen py-8 lg:py-0"
                >
                  <div className="relative group w-full max-w-md mx-auto">
                    {/* Tag */}
                    <div className="absolute top-3 left-3 z-10 flex gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-600/90 backdrop-blur-sm text-white">
                        {project.tag}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-sm text-white">
                        {project.highlight}
                      </span>
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-52 sm:h-72 lg:h-[420px] rounded-2xl object-cover transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[9px] sm:text-[10px] font-mono bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full text-neutral-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <figcaption className="mt-4 text-center">
                    <h4 className="text-lg sm:text-xl font-bold text-white">{project.title}</h4>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
                      {project.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                      >
                        Visit Live <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Sticky right copy */}
            <div className="sticky top-0 flex h-screen items-center justify-center order-1 lg:order-2">
              <div className="text-center lg:text-right px-4 max-w-md">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[11px] font-semibold tracking-[0.3em] uppercase text-indigo-400 mb-4"
                >
                  Featured Work
                </motion.p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[120%] tracking-tight">
                  Production-ready apps
                  <br />with{' '}
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    real users
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed">
                  Each project shipped with full auth, database design, REST APIs, and responsive UI — no templates, no shortcuts.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 justify-center lg:justify-end">
                  <a
                    href="https://knockmyride.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
                  >
                    See KnockMyRide <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/Sadik-Ahmmed-Tonmoy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-white text-sm font-semibold transition-colors"
                  >
                    <GitBranch className="w-4 h-4" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 8 — EXPERIENCE TIMELINE
        ══════════════════════════════════════════ */}
        <section className="relative w-full py-24 sm:py-32 px-4 sm:px-8 bg-neutral-50 dark:bg-[#080808] border-t border-neutral-100 dark:border-white/[0.04]">
          <div aria-hidden className="absolute top-0 left-0 w-[500px] h-[400px] rounded-full bg-emerald-500/6 blur-[140px] pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="mb-16">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-semibold tracking-[0.3em] uppercase text-indigo-400 mb-3"
              >
                Career
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white"
              >
                Work{' '}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Experience
                </span>
              </motion.h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent" />

              <div className="space-y-12 sm:space-y-16">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.company}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="relative pl-12 sm:pl-16"
                  >
                    {/* Dot */}
                    <div className={cn('absolute left-2.5 sm:left-4 top-1.5 w-3 h-3 rounded-full bg-gradient-to-br', item.accent)} />

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">{item.role}</h3>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{item.company}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-white/[0.05] px-3 py-1 rounded-full border border-neutral-200 dark:border-white/[0.07]">
                          {item.period}
                        </span>
                        <div className="flex items-center gap-1 mt-1 justify-end sm:justify-end text-neutral-400 dark:text-neutral-500">
                          <MapPin className="w-3 h-3" />
                          <span className="text-[11px]">{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mt-3">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 flex-shrink-0 mt-2" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 9 — FOUNDER SPOTLIGHT (KnockMyRide)
        ══════════════════════════════════════════ */}
        <section className="relative w-full py-24 sm:py-32 px-4 sm:px-8 bg-neutral-900 dark:bg-neutral-950 border-t border-white/[0.06] overflow-hidden">
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:54px_54px] pointer-events-none" />
          <div aria-hidden className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase text-indigo-400 mb-4"
              >
                <Star className="w-3.5 h-3.5" /> Founder Project
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight"
              >
                I built Bangladesh's first QR vehicle contact system.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-5 text-base text-neutral-400 leading-relaxed max-w-lg"
              >
                KnockMyRide lets anyone scan a QR sticker on a parked vehicle and instantly contact the owner — no app needed. Built solo from idea to production with full auth, real-time analytics, custom QR generation with brand logo overlay using Sharp, and a Prisma + MongoDB backend.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {['Next.js', 'Node.js', 'MongoDB', 'Prisma', 'Redis', 'BullMQ', 'Sharp', 'Framer Motion'].map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                    {t}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex gap-3"
              >
                <a
                  href="https://knockmyride.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
                >
                  Live Site <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>

            {/* Feature callouts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {[
                { icon: <Globe className="w-5 h-5" />, label: 'Live in Bangladesh', sub: 'First QR vehicle system in BD' },
                { icon: <Code2 className="w-5 h-5" />, label: 'Solo Built', sub: 'Architecture, dev & deployment' },
                { icon: <Database className="w-5 h-5" />, label: 'MongoDB + Prisma', sub: 'Robust schema with real-time analytics' },
                { icon: <Zap className="w-5 h-5" />, label: 'QR + Sharp', sub: 'Custom branded QR code generation' },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/30 transition-colors duration-300"
                >
                  <span className="text-indigo-400">{f.icon}</span>
                  <p className="mt-2 text-sm font-semibold text-white">{f.label}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">{f.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER — CTA + REVEAL TYPOGRAPHY
        ══════════════════════════════════════════ */}
        <footer
          ref={footerRef}
          className="relative min-h-[95vh] flex flex-col justify-between bg-neutral-950 text-neutral-50 overflow-hidden pt-24 pb-12 z-10"
        >
          {/* Grid */}
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[length:54px_54px] opacity-30 pointer-events-none" />

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start relative z-10">
            {/* Left CTA */}
            <motion.div
              className="md:col-span-7 flex flex-col items-start gap-4"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0, 0.5, 1, 1]),
                y: useTransform(scrollYProgress, [0, 0.2, 0.5], [50, 20, 0]),
              }}
            >
              <span className="text-[11px] font-bold tracking-[0.28em] text-indigo-400 uppercase">
                Let's build something extraordinary
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-xl leading-tight">
                Looking for a developer who ships and scales?
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-md">
                Open to contract work, consulting, and full-time roles. I bring production-grade code, clear communication, and a founder's bias for shipping.
              </p>

              <div className="mt-2 flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  href="mailto:workwithsadik@gmail.com"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-full shadow-md text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" /> Get In Touch
                </motion.a>
                <motion.a
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://sadik-ahmmed-portfolio.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-6 py-3 rounded-full border border-neutral-700/40 text-sm transition-colors"
                >
                  <Globe className="w-4 h-4" /> View Portfolio
                </motion.a>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 w-full max-w-lg">
                {STATS.map((s, i) => (
                  <Counter key={s.label} {...s} />
                ))}
              </div>
            </motion.div>

            {/* Right links */}
            <motion.div
              className="md:col-span-5 flex flex-col md:items-end gap-6 text-sm text-neutral-400"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0, 0.3, 1, 1]),
                y: useTransform(scrollYProgress, [0, 0.3, 0.5], [40, 20, 0]),
              }}
            >
              <div className="flex flex-col md:items-end">
                <span className="text-[11px] text-neutral-600 uppercase tracking-widest mb-2">Connect</span>
                <div className="flex gap-4 flex-wrap md:justify-end">
                  {[
                    { name: 'GitHub', href: 'https://github.com/Sadik-Ahmmed-Tonmoy' },
                    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sadik-ahmmed-tonmoy/' },
                    { name: 'Portfolio', href: 'https://sadik-ahmmed-portfolio.vercel.app' },
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 transition-colors font-medium relative py-1 group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:items-end">
                <span className="text-[11px] text-neutral-600 uppercase tracking-widest mb-1">Location</span>
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  Dhaka, Bangladesh
                </div>
              </div>

              <div className="flex flex-col md:items-end">
                <span className="text-[11px] text-neutral-600 uppercase tracking-widest mb-1">Email</span>
                <a
                  href="mailto:workwithsadik@gmail.com"
                  className="text-white font-medium hover:text-indigo-400 transition-colors"
                >
                  workwithsadik@gmail.com
                </a>
              </div>

              <div className="flex flex-col md:items-end">
                <span className="text-[11px] text-neutral-600 uppercase tracking-widest mb-1">Status</span>
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available now
                </div>
              </div>
            </motion.div>
          </div>

          {/* Massive reveal typography */}
          <div className="w-full flex justify-center mt-16 sm:mt-24 select-none overflow-hidden py-4 border-t border-neutral-900/60 relative z-10">
            <motion.h1
              style={{
                opacity: footerTextOpacity,
                scale: footerScale,
                rotate: footerRotate,
                letterSpacing: footerLetterSpacing,
                y: footerTextY,
              }}
              className="text-[8vw] sm:text-[9vw] md:text-[7.5vw] font-black uppercase leading-[0.85] tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/10 to-transparent"
            >
              Sadik Ahmmed Tonmoy
            </motion.h1>
          </div>

          {/* Sub-bar */}
          <motion.div
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-6 border-t border-neutral-900 text-[11px] text-neutral-600 z-10"
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 0.5, 1]),
              y: useTransform(scrollYProgress, [0.5, 0.7], [20, 0]),
            }}
          >
            <span>© 2026 Sadik Ahmmed Tonmoy. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Use</a>
            </div>
            <motion.button
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors bg-neutral-900/80 px-4 py-2 rounded-full border border-neutral-800 text-[11px]"
            >
              Back to Top <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </footer>
      </main>
    </ReactLenis>
  );
}