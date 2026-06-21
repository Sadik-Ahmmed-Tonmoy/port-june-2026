/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactLenis } from "lenis/react";
import { useContext, useEffect, useRef, useCallback, useState } from "react";
import { ContextProvider } from "@/lib/MyContextProvider";
import { SquigglyTextOut } from "@/components/pages/home/SquigglyText/SquigglyText";
import ScrollTextAnimation from "@/components/pages/home/ScrollTextAnimation/ScrollTextAnimation";
import Threads from "@/components/Threads";
import RadarEffectDemo from "@/components/pages/home/RaderEffect/RaderEffect";

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
      <div className="relative h-full w-full overflow-hidden">
        {/* <Threads amplitude={1} distance={0} enableMouseInteraction /> */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <SquigglyTextOut />
        </div>
      </div>
    ),
  },
  {
    id: "skills",
    content: (
      <>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[length:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <ScrollTextAnimation />
        </div>
        <RadarEffectDemo />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[length:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_95%,#000_70%,transparent_100%)]" />
      </>
    ),
  },
  {
    id: "more",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white text-4xl">
        Your next section here
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
    <div className="fixed bottom-8 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-3 md:flex">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-500 ease-out"
          style={{
            width: i === active ? 24 : 6,
            height: 6,
            background: i === active ? "#C4F135" : "rgba(255,255,255,0.25)",
          }}
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
            className="relative hidden w-full bg-gradient-to-b from-[#0a0617] via-[#120b26] to-[#0b0614] md:block"
          >
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