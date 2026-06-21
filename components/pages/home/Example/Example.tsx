/* eslint-disable react-hooks/purity */
'use client';

import { useEffect, useRef } from 'react';
import AnimatedBeamMultipleOutput from '../AnimatedBeamMultipleOutput/AnimatedBeamMultipleOutput';

// ─── Page content ──────────────────────────────────────────────────────
const pageData = {
  title: 'Sadik Ahmmed',
  subtitle: 'Full‑Stack Developer',
  tagline: 'Next.js · TypeScript · Node.js · MongoDB',
  description:
    'I build production‑ready web applications that solve real problems. From Dhaka to the world – let’s connect.',
  primaryCTA: 'View My Work',
  secondaryCTA: 'Get in Touch',
};

export default function AnimationPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ─── Load UnicornStudio (keep or replace) ───────────────────────────
  useEffect(() => {
    // Only load if we want the 3D background
    const loadUnicornStudio = () => {
      if (typeof window === 'undefined' || !containerRef.current) return;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.textContent = `
        !function(){
          if(!window.UnicornStudio){
            window.UnicornStudio={isInitialized:!1};
            var i=document.createElement("script");
            i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
            i.onload=function(){
              window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
            };
            (document.head || document.body).appendChild(i)
          }
        }();
      `;
      document.head.appendChild(script);

      // Hide branding
      const style = document.createElement('style');
      style.textContent = `
        [data-us-project] { position:relative !important; overflow:hidden !important; }
        [data-us-project] canvas { clip-path:inset(0 0 10% 0) !important; }
        [data-us-project] * { pointer-events:none !important; }
        [data-us-project] a[href*="unicorn"],
        [data-us-project] button[title*="unicorn"],
        [data-us-project] .unicorn-brand,
        [data-us-project] [class*="brand"],
        [data-us-project] [class*="credit"],
        [data-us-project] [class*="watermark"] {
          display:none !important;
          visibility:hidden !important;
          opacity:0 !important;
          position:absolute !important;
          left:-9999px !important;
          top:-9999px !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(script);
        document.head.removeChild(style);
      };
    };

    if (containerRef.current) {
      loadUnicornStudio();
    }
  }, []);

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Animation */}
      <div ref={containerRef} className="absolute inset-0 hidden lg:block">
        <div
          data-us-project="OMzqyUv6M3kSnv0JeAtC"
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
      </div>

      {/* Mobile fallback */}
      <div className="absolute inset-0 lg:hidden stars-bg" />

      {/* ─── Top Header ──────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <span className="font-mono text-xl font-bold italic tracking-widest text-white transform -skew-x-12 lg:text-2xl">
              SADIK
            </span>
            <div className="h-3 w-px bg-white/40 lg:h-4" />
            <span className="font-mono text-[8px] text-white/60 lg:text-[10px]">DEV</span>
          </div>
          <div className="hidden items-center gap-3 font-mono text-[10px] text-white/60 lg:flex">
            <span>STATUS: AVAILABLE</span>
            <div className="h-1 w-1 rounded-full bg-white/40" />
            <span>FULL‑STACK</span>
          </div>
        </div>
      </div>

      {/* ─── Corner frames ────────────────────────────────────────────── */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <div
          key={corner}
          className={`absolute z-20 h-8 w-8 border-2 border-white/30 lg:h-12 lg:w-12 ${
            corner === 'top-left' ? 'top-0 left-0 border-t-2 border-l-2' : ''
          } ${
            corner === 'top-right' ? 'top-0 right-0 border-t-2 border-r-2' : ''
          } ${
            corner === 'bottom-left'
              ? 'bottom-[5vh] left-0 border-b-2 border-l-2'
              : ''
          } ${
            corner === 'bottom-right'
              ? 'bottom-[5vh] right-0 border-b-2 border-r-2'
              : ''
          }`}
        />
      ))}

      {/* ─── Main Content ────────────────────────────────────────────── */}
      <div className="relative z-10 flex min-h-screen items-end justify-end pt-16 lg:pt-0" style={{ marginTop: '5vh' }}>
        <div className="w-full px-6 lg:w-1/2 lg:px-16 lg:pr-[10%]">
          <div className="relative max-w-lg lg:ml-auto">
            {/* Decorative line */}
            <div className="mb-3 flex items-center gap-2 opacity-60">
              <div className="h-px w-8 bg-white" />
              <span className="font-mono text-[10px] tracking-wider text-white">∞</span>
              <div className="h-px flex-1 bg-white" />
            </div>

              <AnimatedBeamMultipleOutput/>
            {/* Title */}
            <h1 className="mb-3 whitespace-nowrap font-mono text-2xl font-bold tracking-wider text-white lg:-ml-[5%] lg:text-5xl" style={{ letterSpacing: '0.1em' }}>
              {pageData.title}
            </h1>

            {/* Subtitle with dots */}
            <div className="mb-3 hidden gap-1 opacity-40 lg:flex">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="h-0.5 w-0.5 rounded-full bg-white" />
              ))}
            </div>

            {/* Description */}
            <div className="relative">
              <p className="mb-5 font-mono text-xs leading-relaxed text-gray-300 opacity-80 lg:mb-6 lg:text-base">
                {pageData.subtitle} — {pageData.tagline}
                <br />
                {pageData.description}
              </p>
              <div className="absolute -left-4 top-1/2 hidden h-3 w-3 -translate-y-1/2 border border-white opacity-30 lg:block">
                <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-white" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
              <a
                href="#projects"
                className="group relative border border-white px-5 py-2 font-mono text-xs text-white transition-all hover:bg-white hover:text-black lg:px-6 lg:py-2.5 lg:text-sm"
              >
                <span className="absolute -left-1 -top-1 hidden h-2 w-2 border-l border-t border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                <span className="absolute -bottom-1 -right-1 hidden h-2 w-2 border-b border-r border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                {pageData.primaryCTA}
              </a>
              <a
                href="#contact"
                className="border border-white px-5 py-2 font-mono text-xs text-white transition-all hover:bg-white hover:text-black lg:px-6 lg:py-2.5 lg:text-sm"
              >
                {pageData.secondaryCTA}
              </a>
            </div>
            {/* Bottom technical notation */}
            <div className="mt-6 hidden items-center gap-2 opacity-40 lg:flex">
              <span className="text-[9px] text-white">∞</span>
              <div className="h-px flex-1 bg-white" />
              <span className="text-[9px] text-white">SADIK.PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Footer ────────────────────────────────────────────── */}
      <div
        className="absolute bottom-[5vh] left-0 right-0 z-20 border-t border-white/20 bg-black/40 px-4 py-2 backdrop-blur-sm lg:px-8 lg:py-3"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-[8px] text-white/50 lg:gap-6 lg:text-[9px]">
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS.ACT</span>
            <div className="hidden gap-1 lg:flex">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/30"
                  style={{ height: `${Math.random() * 12 + 4}px` }}
                />
              ))}
            </div>
            <span>V1.0.0</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[8px] text-white/50 lg:gap-4 lg:text-[9px]">
            <span className="hidden lg:inline">◐ RENDERING</span>
            <div className="flex gap-1">
              <div className="h-1 w-1 animate-pulse rounded-full bg-white/60" />
              <div className="h-1 w-1 animate-pulse rounded-full bg-white/40" style={{ animationDelay: '0.2s' }} />
              <div className="h-1 w-1 animate-pulse rounded-full bg-white/20" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="hidden lg:inline">FRAME: ∞</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stars-bg {
          background-image:
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent),
            radial-gradient(1px 1px at 70% 40%, white, transparent);
          background-size:
            200% 200%, 180% 180%, 250% 250%, 220% 220%,
            190% 190%, 240% 240%, 210% 210%, 230% 230%;
          background-position:
            0% 0%, 40% 40%, 60% 60%, 20% 20%,
            80% 80%, 30% 30%, 70% 70%, 50% 50%;
          opacity: 0.3;
        }
      `}</style>
    </main>
  );
}