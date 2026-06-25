/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AnimatedBeamPipelineShowcase from "@/components/pages/home/AnimatedBeamPipelineShowcase/AnimatedBeamPipelineShowcase";
import RadarEffectDemo from "@/components/pages/home/RaderEffect/RaderEffect";
import ScrollTextAnimation from "@/components/pages/home/ScrollTextAnimation/ScrollTextAnimation";
import { SquigglyTextOut } from "@/components/pages/home/SquigglyText/SquigglyText";
import { SparklesCore } from "@/components/ui/sparkles";
import { ContextProvider } from "@/lib/MyContextProvider";
import { ReactLenis } from "lenis/react";
import { motion } from "motion/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

// ─── Config ──────────────────────────────────────────────────────────────
const SECTIONS = 3;
const SNAP_THRESHOLD = 0.35;      // magnetic zone: 35% from edge
const SNAP_DURATION_MS = 680;      // snap animation length
const IDLE_DELAY_MS = 80;          // wait after scroll stops before checking snap

// ─── Types ──────────────────────────────────────────────────────────────
interface SectionData {
  id: string;
  content: React.ReactNode;
}

// ─── Easing ──────────────────────────────────────────────────────────────
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

// ─── Section Content Config ─────────────────────────────────────────────
const SECTIONS_CONFIG: SectionData[] = [
  {
    id: "hero",
    content: (
      <>
    
      
        <AnimatedBeamPipelineShowcase />

        </>
    ),
  },
  {
    id: "skills",
    content: (
      <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-35 dark:opacity-20 z-0" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          <div className="flex-1 w-full flex flex-col justify-center">
            <ScrollTextAnimation />
          </div>
          <div className="flex-1 w-full flex items-center justify-center">
            <RadarEffectDemo />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "more",
    content: (
      <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-35 dark:opacity-20 z-0" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-center">
          <SquigglyTextOut />
        </div>
      </div>
    ),
  },
];

// ─── Custom Hook: Magnetic Snap ────────────────────────────────────────
function useMagneticSnap(sectionRef: React.RefObject<HTMLElement | null>) {
  const currentX = useRef(0);
  const targetX = useRef(0);
  const rafId = useRef<number | null>(null);
  const isSnapping = useRef(false);
  const lastScrollY = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const getContainer = useCallback(
    () => sectionRef.current?.querySelector<HTMLElement>("[data-scroll-container]"),
    [sectionRef]
  );

  const snapToSection = useCallback(
    (index: number) => {
      const container = getContainer();
      if (!container) return;

      const vw = window.innerWidth;
      targetX.current = -index * vw;
      isSnapping.current = true;

      const startX = currentX.current;
      const delta = targetX.current - startX;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / SNAP_DURATION_MS, 1);
        const eased = easeOutExpo(progress);

        currentX.current = startX + delta * eased;
        container.style.transform = `translateX(${currentX.current}px)`;

        if (progress < 1) {
          rafId.current = requestAnimationFrame(animate);
        } else {
          currentX.current = targetX.current;
          isSnapping.current = false;
          setActiveIndex(index);
        }
      };

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(animate);
    },
    [getContainer]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const driveFromScroll = () => {
      if (isSnapping.current) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      const vw = window.innerWidth;
      const raw = -progress * (SECTIONS - 1) * vw;
      currentX.current = raw;

      const container = getContainer();
      if (container) container.style.transform = `translateX(${raw}px)`;
    };

    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      driveFromScroll();
      lastScrollY.current = window.scrollY;

      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (isSnapping.current) return;

        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        if (scrolled < 0 || scrolled > sectionHeight) return;

        const progress = scrolled / sectionHeight;
        const rawIndex = progress * (SECTIONS - 1);
        const nearestIndex = Math.round(rawIndex);
        const fraction = rawIndex - Math.floor(rawIndex);

        const inMagneticZone =
          fraction < SNAP_THRESHOLD || fraction > 1 - SNAP_THRESHOLD;

        if (inMagneticZone) {
          snapToSection(nearestIndex);
          const snapScrollY =
            section.offsetTop + (nearestIndex / (SECTIONS - 1)) * sectionHeight;
          window.scrollTo({ top: snapScrollY, behavior: "instant" });
        }
      }, IDLE_DELAY_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    driveFromScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [sectionRef, getContainer, snapToSection]);

  return { activeIndex };
}

// ─── Dot Indicator ──────────────────────────────────────────────────────
function SectionDots({ active, total }: { active: number; total: number }) {
  return (
    <div className="fixed bottom-8 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-2.5 md:flex px-3.5 py-2 rounded-full border border-neutral-200/40 dark:border-neutral-800/40 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md shadow-sm">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
            i === active
              ? "w-5 bg-neutral-900 dark:bg-neutral-50"
              : "w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────
export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const { activeIndex } = useMagneticSnap(sectionRef);

  const context = useContext(ContextProvider);
  if (!context) return null;

  return (
    <ReactLenis root>
      <main>
        <article>
          <section
            ref={sectionRef}
            style={{ height: `${SECTIONS * 100}vh` }}
            className="relative hidden w-full bg-neutral-50 dark:bg-neutral-950 md:block transition-colors duration-300"
          >
            {/* Global Animated Particle Background */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none">
              <SparklesCore
                id="tsparticles-horizontal-scroll"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={60}
                className="w-full h-full"
                particleColor="#a3a3a3"
              />
            </div>

            <div className="sticky top-0 h-screen overflow-hidden">
              <div
                data-scroll-container
                className="flex h-full"
                style={{
                  width: `${SECTIONS * 100}vw`,
                  willChange: "transform",
                }}
              >
                {SECTIONS_CONFIG.map((section, index) => (
                  <div
                    key={section.id}
                    className="scroll-section relative h-screen w-screen shrink-0 overflow-hidden"
                  >
                    {section.content}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>
        {/* <SectionDots active={activeIndex} total={SECTIONS} /> */}
      </main>
    </ReactLenis>
  );
}