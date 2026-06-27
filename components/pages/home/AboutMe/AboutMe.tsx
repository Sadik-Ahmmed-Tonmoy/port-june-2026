'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { User, MapPin, Coffee, Music, Code2, Cpu, Globe, Compass, Heart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

// ─── Sub-components ───────────────────────────────────────────────────

/** Grid background pattern overlay */
const GridOverlay = () => (
  <div
    className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] opacity-75 dark:opacity-15 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
    aria-hidden="true"
  />
);

/** Futuristic 3D Bento Card with mouse tilt and cursor spotlight */
const BentoCard = ({
  className,
  title,
  icon,
  accentColor,
  children,
}: {
  className?: string;
  title: string;
  icon?: React.ReactNode;
  accentColor?: string;
  children: React.ReactNode;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Transform values for 3D card tilt
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 120, damping: 25 });
  
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

  const spotlightGlow = mounted && resolvedTheme === 'light'
    ? `radial-gradient(circle 250px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(99, 102, 241, 0.06), transparent 85%)`
    : `radial-gradient(circle 250px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.035), transparent 85%)`;

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
      }}
      className={cn(
        "relative group bg-neutral-100/60 dark:bg-neutral-900/35 border border-neutral-200 dark:border-neutral-850 rounded-3xl p-6 sm:p-8 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-neutral-350 dark:hover:border-neutral-700/60 shadow-lg dark:shadow-xl",
        className
      )}
    >
      {/* Top Accent Edge */}
      {accentColor && (
        <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-85 dark:opacity-80", accentColor)} />
      )}

      {/* Hover Spotlight Glow */}
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100"
          style={{
            background: spotlightGlow,
          }}
        />
      )}

      {/* Subtle corner glow in the card's backdrop */}
      <div className={cn(
        "absolute -bottom-16 -right-16 w-36 rounded-full bg-gradient-to-tr opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 blur-2xl pointer-events-none",
        accentColor
      )} />

      {/* Card Header */}
      <div className="flex items-center gap-3 mb-5 relative z-10">
        {icon && (
          <div className="p-2.5 bg-neutral-200/50 dark:bg-neutral-850/80 rounded-xl border border-neutral-300 dark:border-neutral-750 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:scale-105 group-hover:border-neutral-400 dark:group-hover:border-neutral-700 transition-all duration-300">
            {icon}
          </div>
        )}
        <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-indigo-650 dark:group-hover:text-indigo-200 transition-colors duration-300">{title}</h3>
      </div>

      {/* Card Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState<'narrative' | 'approach' | 'mindset'>('narrative');
  const [localTime, setLocalTime] = useState('');
  const { resolvedTheme } = useTheme();

  // Clock updates Asiatic Dhaka Time (GMT+6)
  useEffect(() => {
    const updateTime = () => {
      const timeString = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setLocalTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const techStack = [
    'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3',
    'React', 'Next.js', 'Redux Toolkit', 'RTK Query', 'Tailwind CSS', 'Framer Motion', 'Ant Design', 'Swiper.js',
    'Node.js', 'Express.js', 'RESTful APIs', 'GraphQL', 'Socket.io',
    'MongoDB', 'PostgreSQL', 'Prisma ORM', 'Mongoose', 'Redis',
    'Docker', 'Vercel', 'Firebase', 'Git', 'GitHub', 'PM2', 'Linux',
    'Postman', 'Agile/Scrum', 'SEO Best Practices', 'Performance Optimization'
  ];

  // Framer motion variants for staggered tags reveal
  const tagsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05,
      }
    }
  };

  const tagItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 12 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 90, damping: 15 }
    }
  };

  const tabContent = {
    narrative: (
      <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
        <p>
          I'm a full-stack developer who loves bridging the gap between clean database schemas and fluid interactive layouts. My journey started in a unique place—studying <strong>Bachelor of Business Administration (BBA)</strong> with a major in <strong>Marketing</strong>. This background gives me a distinct perspective, allowing me to view software not just as syntax, but as tools that drive real user adoption and commercial goals.
        </p>
        <p>
          Since transitioning into software engineering, I have focused heavily on mastering modern web technologies. I specialize in building highly responsive frontends and optimized backends, using the Next.js and Node.js ecosystems.
        </p>
      </div>
    ),
    approach: (
      <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
        <p>
          I write code with a strong focus on durability and clean abstractions. Whether it's setting up strict typing in TypeScript, optimizing query indexes in PostgreSQL/Prisma, or designing reusable layout components, I aim for scalable, maintainable architectures.
        </p>
        <p>
          I value collaborative agile environments, complete documentation, and clear communication. For me, clean engineering is about building systems that other developers can understand and build upon easily.
        </p>
      </div>
    ),
    mindset: (
      <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
        <p>
          Having a commercial background means I prioritize user experience and performance analytics. I focus on optimizing Core Web Vitals and reducing backend response times because I know they directly impact product growth and user retention.
        </p>
        <p>
          I am obsessed with caching strategies, asset pipeline optimization, and crafting premium micro-interactions that make the product feel extremely responsive and alive.
        </p>
      </div>
    )
  };

  return (
    <section className="relative w-full bg-background text-foreground py-20 px-4 sm:px-8 overflow-hidden z-10 border-t border-neutral-200 dark:border-neutral-900">
      <GridOverlay />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 px-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.25em] text-indigo-650 dark:text-indigo-400 uppercase"
          >
            Get To Know Me
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-neutral-900 dark:text-white leading-tight"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed mt-4"
          >
            A look into my background, core development principles, and technical toolbox.
          </motion.p>
        </div>

        {/* Bento Grid Layout (Symmetric 4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Main Bio (Spans 2 columns on desktop) */}
          <BentoCard
            title="The Code & The Craft"
            icon={<User className="w-5 h-5" />}
            accentColor="from-indigo-500 via-purple-500 to-pink-500"
            className="md:col-span-2"
          >
            {/* Interactive Tab Headers */}
            <div className="flex gap-2 mb-6 border-b border-neutral-250 dark:border-neutral-800/80 pb-3 relative z-20">
              {(['narrative', 'approach', 'mindset'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative px-4 py-1.5 text-xs sm:text-sm font-mono font-medium rounded-lg uppercase transition-colors cursor-pointer",
                    activeTab === tab ? "text-neutral-900 dark:text-white font-bold" : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeAboutTab"
                      className="absolute inset-0 bg-neutral-200 dark:bg-neutral-850 border border-neutral-300 dark:border-neutral-750 rounded-lg -z-10 shadow-sm dark:shadow-lg"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Interactive Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal"
              >
                {activeTab === 'narrative' && (
                  <>
                    <p>
                      I'm a full-stack developer who loves bridging the gap between clean database schemas and fluid interactive layouts. My journey started in a unique place—studying <strong>Bachelor of Business Administration (BBA)</strong> with a major in <strong>Marketing</strong>. This background gives me a distinct perspective, allowing me to view software not just as syntax, but as tools that drive real user adoption and commercial goals.
                    </p>
                    <p>
                      Since transitioning into software engineering, I have focused heavily on mastering modern web technologies. I specialize in building highly responsive frontends and optimized backends, using the Next.js and Node.js ecosystems.
                    </p>
                  </>
                )}
                {activeTab === 'approach' && (
                  <>
                    <p>
                      I write code with a strong focus on durability and clean abstractions. Whether it's setting up strict typing in TypeScript, optimizing query indexes in PostgreSQL/Prisma, or designing reusable layout components, I aim for scalable, maintainable architectures.
                    </p>
                    <p>
                      I value collaborative agile environments, complete documentation, and clear communication. For me, clean engineering is about building systems that other developers can understand and build upon easily.
                    </p>
                  </>
                )}
                {activeTab === 'mindset' && (
                  <>
                    <p>
                      Having a commercial background means I prioritize user experience and performance analytics. I focus on optimizing Core Web Vitals and reducing backend response times because I know they directly impact product growth and user retention.
                    </p>
                    <p>
                      I am obsessed with caching strategies, asset pipeline optimization, and crafting premium micro-interactions that make the product feel extremely responsive and alive.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </BentoCard>

          {/* Card 2: Location & Stats (Spans 1 column) */}
          <BentoCard
            title="Current Status"
            icon={<Globe className="w-5 h-5" />}
            accentColor="from-purple-500 to-indigo-600"
          >
            {/* Spinning background radar graphic */}
            <div className="absolute -right-6 -bottom-6 w-28 opacity-[0.05] dark:opacity-[0.04] pointer-events-none z-0">
              <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full stroke-purple-600 dark:stroke-purple-400 fill-none stroke-[1.5px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="50" cy="50" r="45" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="30" strokeDasharray="6 6" />
                <line x1="50" y1="5" x2="50" y2="95" />
                <line x1="5" y1="50" x2="95" y2="50" />
              </motion.svg>
            </div>

            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 cursor-default"
              >
                <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">Dhaka, Bangladesh</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 cursor-default"
              >
                <Compass className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 group-hover:rotate-45 transition-transform duration-300" />
                <div>
                  <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Timezone Sync</p>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    GMT+6 {localTime ? `(${localTime})` : ''}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 cursor-default"
              >
                <Heart className="w-5 h-5 text-pink-650 dark:text-pink-400 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Core Belief</p>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white italic">"Simplicity is the ultimate scaling strategy."</p>
                </div>
              </motion.div>
            </div>
          </BentoCard>

          {/* Card 3: Core Pillars / Principles */}
          <BentoCard
            title="Core Pillars"
            icon={<Cpu className="w-5 h-5" />}
            accentColor="from-sky-500 to-blue-600"
          >
            <ul className="space-y-4">
              <motion.li 
                whileHover={{ x: 6 }}
                className="flex gap-3 cursor-default"
              >
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-900 bg-sky-100/40 dark:bg-sky-950/40 rounded px-1.5 py-0.5 h-fit shrink-0 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.3)] transition-shadow">01</span>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-sky-650 dark:group-hover:text-sky-300 transition-colors">User-Centric Architecture</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">Creating interfaces that solve human problems effectively.</p>
                </div>
              </motion.li>
              <motion.li 
                whileHover={{ x: 6 }}
                className="flex gap-3 cursor-default"
              >
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-900 bg-sky-100/40 dark:bg-sky-950/40 rounded px-1.5 py-0.5 h-fit shrink-0 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.3)] transition-shadow">02</span>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-sky-650 dark:group-hover:text-sky-300 transition-colors">Speed & Optimization</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">Minimizing overhead, optimizing query speeds, and code performance.</p>
                </div>
              </motion.li>
              <motion.li 
                whileHover={{ x: 6 }}
                className="flex gap-3 cursor-default"
              >
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-900 bg-sky-100/40 dark:bg-sky-950/40 rounded px-1.5 py-0.5 h-fit shrink-0 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.3)] transition-shadow">03</span>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-sky-650 dark:group-hover:text-sky-300 transition-colors">Clean Engineering</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">Strict typing, scalable folder systems, and complete documentation.</p>
                </div>
              </motion.li>
            </ul>
          </BentoCard>

          {/* Card 4: Toolbox / Stack Details (Spans 2 columns on desktop) */}
          <BentoCard
            title="Technical Core & Stack"
            icon={<Code2 className="w-5 h-5" />}
            accentColor="from-emerald-500 to-teal-600"
            className="md:col-span-2"
          >
            <div className="flex flex-col h-full justify-between gap-6">
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed">
                I pick tools that allow me to deliver production-grade applications rapidly. Here is a breakdown of languages, libraries, and frameworks I use on a daily basis:
              </p>
              
              {/* Staggered tags grid animated on view */}
              <motion.div 
                variants={tagsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2 pb-2"
              >
                {techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={tagItemVariants}
                    whileHover={{ 
                      scale: 1.08, 
                      y: -2,
                      backgroundColor: resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)',
                      borderColor: resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.2)'
                    }}
                    className="text-xs font-mono font-semibold bg-neutral-200/50 dark:bg-white/5 border border-neutral-300 dark:border-white/5 px-3 py-1 rounded-xl text-neutral-750 dark:text-neutral-300 cursor-default transition-all duration-200"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </BentoCard>

        </div>

      </div>
    </section>
  );
}
