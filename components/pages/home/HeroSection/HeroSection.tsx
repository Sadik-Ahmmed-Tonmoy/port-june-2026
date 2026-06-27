"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Mail,
  Terminal,
  Coffee,
  ArrowRight,
  Sparkles,
  MapPin,
  Zap,
  Code2,
  Star,
  Rocket,
  Circle,
  Square,
  Triangle,
  Play,
  Pause
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";

import dp from '@/assets/images/DP.jpg'

// ─── Types ────────────────────────────────────────────────────────────────────
interface TechPill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TECH_STACK: TechPill[] = [
  { name: "Next.js", icon: <Code2 className="w-3 h-3" />, color: "hover:border-indigo-500/60 hover:text-indigo-400" },
  { name: "TypeScript", icon: <Code2 className="w-3 h-3" />, color: "hover:border-blue-500/60 hover:text-blue-400" },
  { name: "React", icon: <Code2 className="w-3 h-3" />, color: "hover:border-cyan-400/60 hover:text-cyan-400" },
  { name: "Node.js", icon: <Code2 className="w-3 h-3" />, color: "hover:border-green-500/60 hover:text-green-400" },
  { name: "MongoDB", icon: <Code2 className="w-3 h-3" />, color: "hover:border-emerald-500/60 hover:text-emerald-400" },
  { name: "Docker", icon: <Code2 className="w-3 h-3" />, color: "hover:border-sky-500/60 hover:text-sky-400" },
];

const COFFEE_PHRASES = [
  "Compiling coffee into code… ☕",
  "Sleep schedule: undefined",
  "Fueled by caffeine and curiosity.",
  "Bug squashed. Cup poured. Repeat.",
  "Next.js compiler speed +20% 🚀",
  "npm install --save caffeine",
  "Recursion is just typing with coffee.",
  "Error 418: I'm a teapot, but I want coffee!",
];

const SOCIAL_LINKS: SocialLink[] = [
  { icon: <FaGithub className="size-4" />, href: "https://github.com/Sadik-Ahmmed-Tonmoy", label: "GitHub" },
  { icon: <FaLinkedin className="size-4" />, href: "https://www.linkedin.com/in/sadik-ahmmed-tonmoy/", label: "LinkedIn" },
  { icon: <Mail className="size-4" />, href: "mailto:workwithsadik@gmail.com", label: "Email" },
];

// ─── Floating Particles Component ────────────────────────────────────────────
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-indigo-500/20 dark:bg-indigo-400/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0, -20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ─── Floating Shapes Component ──────────────────────────────────────────────
const FloatingShapes = () => {
  const shapes = [
    { Icon: Star, color: "text-yellow-500/20", size: 20, x: 10, y: 20, duration: 15 },
    { Icon: Square, color: "text-blue-500/20", size: 16, x: 85, y: 30, duration: 18 },
    { Icon: Circle, color: "text-pink-500/20", size: 14, x: 15, y: 70, duration: 12 },
    { Icon: Triangle, color: "text-green-500/20", size: 18, x: 90, y: 75, duration: 20 },
    { Icon: Rocket, color: "text-purple-500/20", size: 22, x: 50, y: 10, duration: 16 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -40, 0, 40, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <shape.Icon className={`${shape.color} w-${shape.size / 4} h-${shape.size / 4}`} />
        </motion.div>
      ))}
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated word-split headline with Apple-style timing */
const SplitWords = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => (
  <span className={className} aria-label={text}>
    {text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        initial={{ y: "120%", opacity: 0, rotateX: 10 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{
          duration: 0.8,
          delay: delay + i * 0.08,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="inline-block mr-[0.15em]"
      >
        {word}
      </motion.span>
    ))}
  </span>
);

/** Shimmer line with Apple-style gradient */
const ShimmerLine = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ originX: 0 }}
    className="h-px w-full bg-gradient-to-r from-indigo-500/40 via-purple-500/20 to-transparent"
  />
);

/** Floating terminal card with Apple-inspired design */
const TerminalCard = ({
  coffeeCount,
  onBrew,
  showCoffeeMsg,
  coffeeMessage,
}: {
  coffeeCount: number;
  onBrew: () => void;
  showCoffeeMsg: boolean;
  coffeeMessage: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 100, damping: 20 });
  const scale = useSpring(1, { stiffness: 100, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
    scale.set(1.02);
  };
  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  const lines = [
    { label: "name", value: '"Sadik Ahmmed Tonmoy"', color: "text-indigo-400" },
    { label: "role", value: '"Full-Stack Developer"', color: "text-emerald-400" },
    { label: "location", value: '"Dhaka, Bangladesh"', color: "text-neutral-600 dark:text-neutral-400" },
    { label: "experience", value: '"3+ Years"', color: "text-amber-400" },
    { label: "status", value: '"OPEN TO WORK"', color: "text-emerald-400" },
  ];

  // Typing effect for terminal
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  useEffect(() => {
    const allLines = [
      '// developer profile',
      'const developer = {',
      ...lines.map(l => `  ${l.label}: ${l.value},`),
      '};'
    ];

    let currentLine = 0;
    let currentChar = 0;
    let output: string[] = [];

    const interval = setInterval(() => {
      if (currentLine < allLines.length) {
        const line = allLines[currentLine];
        if (currentChar < line.length) {
          if (currentChar === 0) {
            output.push('');
          }
          output[output.length - 1] += line[currentChar];
          currentChar++;
          setDisplayLines([...output]);
        } else {
          currentLine++;
          currentChar = 0;
        }
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: "1000px"
      }}
      className="relative w-full max-w-md rounded-2xl border border-neutral-200/30 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-2xl shadow-2xl shadow-black/5 dark:shadow-black/60 overflow-hidden group"
    >
      {/* Pulsing border glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Top edge shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Window chrome - Apple style */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200/20 dark:border-neutral-800/50 bg-white/40 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-rose-500/80"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-amber-500/80"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </div>
        <div className="font-mono text-[10px] text-neutral-500 dark:text-neutral-500 flex items-center gap-1.5">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Terminal className="size-3" />
          </motion.div>
          <span>sadik@portfolio</span>
        </div>
        <div className="w-14 flex justify-end">
          <motion.span
            className="text-[10px] font-mono text-indigo-400/60 tracking-widest"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            v2.0
          </motion.span>
        </div>
      </div>

      {/* Terminal body with typing effect */}
      <div className="p-6 font-mono text-xs leading-relaxed space-y-4 min-h-[340px]">
        <div className="space-y-1">
          {displayLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="text-neutral-600 dark:text-neutral-400 text-[11px]"
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/\/\/.*/, '<span class="text-neutral-400 dark:text-neutral-600">$&</span>')
                  .replace(/const/, '<span class="text-purple-400">const</span>')
                  .replace(/developer/, '<span class="text-blue-400">developer</span>')
                  .replace(/name:/, '<span class="text-neutral-500">name:</span>')
                  .replace(/"Sadik Ahmmed Tonmoy"/, '<span class="text-indigo-400">"Sadik Ahmmed Tonmoy"</span>')
                  .replace(/role:/, '<span class="text-neutral-500">role:</span>')
                  .replace(/"Full-Stack Developer"/, '<span class="text-emerald-400">"Full-Stack Developer"</span>')
                  .replace(/location:/, '<span class="text-neutral-500">location:</span>')
                  .replace(/"Dhaka, Bangladesh"/, '<span class="text-neutral-600 dark:text-neutral-400">"Dhaka, Bangladesh"</span>')
                  .replace(/experience:/, '<span class="text-neutral-500">experience:</span>')
                  .replace(/"3\+ Years"/, '<span class="text-amber-400">"3+ Years"</span>')
                  .replace(/status:/, '<span class="text-neutral-500">status:</span>')
                  .replace(/"OPEN TO WORK"/, '<span class="text-emerald-400">"OPEN TO WORK"</span>')
              }}
            />
          ))}
          {displayLines.length < 8 && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-indigo-400/60 ml-1"
            />
          )}
        </div>

        {displayLines.length >= 8 && (
          <>
            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="border-t border-neutral-200/20 dark:border-neutral-800/50"
            />

            {/* Coffee counter widget */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-neutral-400 dark:text-neutral-600 text-[10px] mb-2">// fuel level</p>
              <div className="flex items-center justify-between gap-4 bg-white/40 dark:bg-white/[0.02] rounded-xl p-3.5 border border-neutral-200/20 dark:border-neutral-800/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: [0, -8, 8, -4, 0] }}
                      transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
                    >
                      <Coffee className="size-4 text-amber-500" />
                    </motion.span>
                    <motion.span
                      className="font-bold text-neutral-900 dark:text-white text-sm"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      key={coffeeCount}
                    >
                      {coffeeCount} cups
                    </motion.span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBrew}
                  className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-lg shadow-indigo-900/30 cursor-pointer"
                >
                  <Zap className="size-3" />
                  Brew
                </motion.button>
              </div>

              {/* Coffee phrase */}
              <div className="h-6 mt-2 overflow-hidden">
                <AnimatePresence mode="wait">
                  {showCoffeeMsg && (
                    <motion.p
                      key={coffeeMessage}
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="text-[10px] text-amber-500/80 italic text-center font-medium"
                    >
                      {coffeeMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Status bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="border-t border-neutral-200/20 dark:border-neutral-800/50 pt-3 flex items-center justify-between text-[9px] text-neutral-400 dark:text-neutral-600"
            >
              <span className="flex items-center gap-1.5">
                <motion.span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                SYSTEM ACTIVE
              </span>
              <motion.span
                className="flex items-center gap-1 text-indigo-500/60"
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <MapPin className="size-2.5" />
                Dhaka, BD
              </motion.span>
            </motion.div>
          </>
        )}
      </div>

      {/* Corner glow on hover */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-indigo-600/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
};

/** Profile Photo Card with Apple-inspired ID styling */
const ProfilePhotoCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 100, damping: 20 });
  const scale = useSpring(1, { stiffness: 100, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
    scale.set(1.02);
  };
  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: "1000px"
      }}
      className="relative w-full max-w-md h-[468px] rounded-2xl border border-neutral-200/30 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden group flex flex-col justify-end"
    >
      {/* Profile Image fills the card */}
      <div className="absolute inset-0 z-0">
        <Image
          src={dp}
          alt="Sadik Ahmmed Tonmoy Profile Photo"
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          priority
        />
        {/* Apple-style gradient dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />
      </div>

      {/* Floating Sparkles tag */}
      <div className="absolute top-5 right-5 z-20 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 text-white text-[10px] font-bold tracking-wider font-mono">
        <Sparkles className="size-3 text-amber-400 animate-pulse" />
        <span>CREATIVE DEV</span>
      </div>

      {/* Info Card Content */}
      <div className="relative z-20 p-8 space-y-4 text-white text-left">
        <div className="space-y-1">
          <h3 className="text-3xl font-extrabold tracking-tight">Sadik Ahmmed Tonmoy</h3>
          <p className="text-xs text-neutral-300 font-medium flex items-center gap-1.5">
            <MapPin className="size-3.5 text-indigo-400" /> Dhaka, Bangladesh
          </p>
        </div>

        <p className="text-xs text-neutral-200 leading-relaxed font-medium">
          Full-stack engineer crafting production-grade products, SaaS webapps, and animated interactive layouts.
        </p>

        {/* Small tags grid */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {["Next.js", "TypeScript", "Node.js", "Docker"].map((tag) => (
            <span key={tag} className="text-[10px] font-mono font-semibold bg-white/15 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Progress Bar Component for Tab Autoplay ─────────────────────────────────
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
      const resetTimer = window.setTimeout(() => setProgress(0), 0);
      return () => clearTimeout(resetTimer);
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
    <motion.div
      className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
      style={{ width: `${Math.min((progress / duration) * 100, 100)}%` }}
      layoutId="active-tab-progress"
      transition={{ ease: "linear" }}
    />
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const [coffeeCount, setCoffeeCount] = useState(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("portfolio_coffee_count") : null;
      return saved ? parseInt(saved, 10) : 12;
    } catch {
      return 12;
    }
  });
  const [coffeeMessage, setCoffeeMessage] = useState("");
  const [showCoffeeMsg, setShowCoffeeMsg] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<"terminal" | "profile">("profile");
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  // Persist coffee across sessions (writes happen on brew)

  // Mouse tracking for cursor glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBrew = () => {
    const next = coffeeCount + 1;
    setCoffeeCount(next);
    localStorage.setItem("portfolio_coffee_count", next.toString());
    const phrase = COFFEE_PHRASES[Math.floor(Math.random() * COFFEE_PHRASES.length)];
    setCoffeeMessage(phrase);
    setShowCoffeeMsg(true);
  };

  useEffect(() => {
    if (!showCoffeeMsg) return;
    const t = setTimeout(() => setShowCoffeeMsg(false), 3500);
    return () => clearTimeout(t);
  }, [showCoffeeMsg, coffeeMessage]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-50 dark:bg-transparent py-20 px-6 md:px-10 lg:px-16">

      {/* ── Floating Particles ── */}
      <FloatingParticles />
      <FloatingShapes />

      {/* ── Cursor Glow ── */}
      <motion.div
        className="fixed pointer-events-none z-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)',
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
        }}
      />

      {/* ── Ambient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.2, 0.15] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-900/10 dark:bg-indigo-900/20 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[15%] -right-[5%] w-[55vw] h-[55vw] rounded-full bg-purple-900/10 dark:bg-purple-900/15 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 4 }}
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] rounded-full bg-pink-900/5 dark:bg-pink-900/8 blur-[100px]"
        />
      </div>

      {/* ── Grid overlay with animated opacity ── */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[length:60px_60px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* ── Layout ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* ─── Left Column ──────────────────────────────────────── */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-start">

          {/* Availability badge with pulse */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-50/80 dark:bg-indigo-950/30 backdrop-blur-md text-xs font-medium text-indigo-600 dark:text-indigo-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for collaborations
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="size-3 text-amber-400" />
            </motion.span>
          </motion.div>

          {/* Headline - Apple inspired */}
          <div className="mt-8 overflow-hidden">
            <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-bold tracking-[-0.04em] text-neutral-900 dark:text-white leading-[0.95]">
              <span className="block overflow-hidden">
                <SplitWords text="Hi, I'm" delay={0.1} />
              </span>
              <span className="block overflow-hidden mt-2">
                <SplitWords
                  text="Sadik Ahmmed."
                  delay={0.2}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                />
              </span>
            </h1>
          </div>

          {/* Subtitle with shimmer */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-[clamp(1.1rem,2.5vw,1.8rem)] font-medium text-neutral-600 dark:text-neutral-400 tracking-tight"
          >
            Full-Stack Developer · Next.js · TypeScript
          </motion.p>

          {/* Shimmer separator */}
          <div className="mt-8 w-full max-w-lg">
            <ShimmerLine delay={0.7} />
          </div>

          {/* Bio with hover glow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-[clamp(0.9rem,1.4vw,1.05rem)] text-neutral-600 dark:text-neutral-400 leading-relaxed group"
          >
            Full-stack engineer
            <span className="text-neutral-900 dark:text-white font-medium relative inline-block">

              <motion.span
                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-indigo-500 to-transparent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </span>
            {" "}and founder of{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-medium relative inline-block">
              KnockMyRide
              <motion.span
                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-indigo-500 to-transparent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </span>
            {" "}— Bangladesh's first QR vehicle contact SaaS.
            I craft production-grade systems with modern technologies, from Prisma schema to animated UI.
          </motion.p>

          {/* Tech pills with stagger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-2 max-w-"
          >
            {TECH_STACK.map((tech, i) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.95 + i * 0.06,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.08,
                  y: -3,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200/30 dark:border-neutral-800/50 bg-white/60 dark:bg-white/5 backdrop-blur-sm text-xs font-medium text-neutral-600 dark:text-neutral-400 transition-all duration-300 shadow-sm hover:shadow-md cursor-default ${tech.color}`}
              >
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {tech.icon}
                </motion.span>
                {tech.name}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs with spring animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <motion.a
              href="#projects"
              whileHover={{
                y: -3,
                scale: 1.03,
                boxShadow: "0 20px 40px -12px rgba(79, 70, 229, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 text-sm font-medium shadow-lg shadow-indigo-900/30 transition-all duration-200 group"
            >
              Explore Projects
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="size-4" />
              </motion.div>
            </motion.a>
            <motion.a
              href="mailto:workwithsadik@gmail.com"
              whileHover={{
                y: -3,
                scale: 1.03,
                backgroundColor: "rgba(255,255,255,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200/30 dark:border-neutral-800/50 bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-neutral-700 dark:text-white px-8 py-3.5 text-sm font-medium backdrop-blur-sm transition-all duration-200"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail className="size-4" />
              </motion.span>
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social links with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mt-10 flex items-center gap-4"
          >
            <motion.span
              className="text-[10px] font-medium text-neutral-400 dark:text-neutral-600 uppercase tracking-[0.2em]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Connect
            </motion.span>
            <div className="w-8 h-px bg-neutral-200/50 dark:bg-neutral-800/50" />
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                    y: -3,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200/30 dark:border-neutral-800/50 bg-white/60 dark:bg-white/5 text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Location tag with pulse */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="hidden sm:flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-neutral-600 font-medium ml-2"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="size-3 text-indigo-500/60" />
              </motion.span>
              Dhaka, BD
            </motion.span>
          </motion.div>

          {/* Scroll indicator with enhanced animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="mt-16 flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <motion.div
              animate={{
                y: [0, 8, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut"
              }}
              className="w-px h-10 bg-gradient-to-b from-indigo-500/60 to-transparent"
            />
            <motion.span
              className="text-[10px] tracking-[0.2em] text-neutral-400 dark:text-neutral-700 uppercase font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to explore
            </motion.span>
          </motion.div>
        </div>

        {/* ─── Right Column: Card with Tab System ──────── */}
        <div className="order-1 lg:order-2 lg:col-span-5 w-full flex justify-center lg:justify-end items-center">
          <div
            className="w-full max-w-md flex flex-col items-center gap-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Tabs Switcher */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-full border border-neutral-200/30 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-950/40 backdrop-blur-xl shadow-lg w-fit">
              {/* Play/Pause Button */}
              <button
                onClick={() => setIsAutoplayPaused((prev) => !prev)}
                className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer ml-1"
                title={isAutoplayPaused ? "Resume Autoplay" : "Pause Autoplay"}
              >
                {isAutoplayPaused ? (
                  <Play className="size-3.5 fill-current" />
                ) : (
                  <Pause className="size-3.5 fill-current" />
                )}
              </button>

              <div className="h-4 w-px bg-neutral-200/30 dark:bg-neutral-800/50" />

              {[
                { id: "terminal", label: "Terminal", icon: <Terminal className="size-3.5" /> },
                { id: "profile", label: "Profile", icon: <Code2 className="size-3.5" /> },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as "terminal" | "profile");
                    }}
                    className={`relative flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer overflow-hidden ${isActive
                        ? "text-neutral-950 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-bg"
                        className="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    {tab.icon}
                    <span>{tab.label}</span>

                    {/* Auto-change indicator: progress line at the bottom of the tab button */}
                    <ProgressBar
                      isActive={isActive}
                      isPaused={isHovered || isAutoplayPaused}
                      onComplete={() => {
                        setActiveTab((curr) => (curr === "terminal" ? "profile" : "terminal"));
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Card Container */}
            <div className="w-full relative min-h-[468px] flex items-start justify-center">
              <AnimatePresence mode="wait">
                {activeTab === "terminal" ? (
                  <motion.div
                    key="terminal-card"
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex justify-center"
                  >
                    <TerminalCard
                      coffeeCount={coffeeCount}
                      onBrew={handleBrew}
                      showCoffeeMsg={showCoffeeMsg}
                      coffeeMessage={coffeeMessage}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="profile-card"
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex justify-center"
                  >
                    <ProfilePhotoCard />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}