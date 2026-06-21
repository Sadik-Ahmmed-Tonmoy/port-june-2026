'use client';

import TextAnimation from '@/components/uilayouts/scroll-text';

function ScrollTextAnimation() {
  return (
    <div className="py-16 space-y-24 container">
      {/* Main tagline – centered, fading up */}
      <div className="flex flex-col items-center justify-center text-center">
        <TextAnimation
          text="Building full‑stack solutions that connect the world."
          variants={{
            hidden: { filter: 'blur(10px)', opacity: 0, y: 30 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: { ease: 'easeOut', duration: 0.6 },
            },
          }}
          classname="xl:text-7xl text-5xl max-w-3xl mx-auto font-bold capitalize text-foreground"
        />
      </div>

      {/* Skills – letter‑by‑letter, left‑aligned */}
      <div className="flex items-center text-left">
        <TextAnimation
          as="p"
          letterAnime={true}
          text="Next.js · TypeScript · Node.js · MongoDB · Redis"
          classname="text-5xl max-w-3xl font-mono text-muted-foreground"
          variants={{
            hidden: { filter: 'blur(4px)', opacity: 0, y: 20 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: 'easeOut' },
            },
          }}
        />
      </div>

      {/* Project highlight – sliding in from the right */}
      <div className="flex justify-end text-right">
        <TextAnimation
          text="KnockMyRide – Bangladesh's first QR vehicle contact system"
          direction="right"
          classname="text-4xl max-w-2xl font-medium text-primary"
        />
      </div>

      {/* Final CTA – line animation, centered */}
      <div className="flex justify-center text-center">
        <TextAnimation
          text="Let’s turn your idea into reality."
          direction="down"
          lineAnime={true}
          classname="text-5xl max-w-2xl mx-auto font-semibold capitalize bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        />
      </div>

    </div>
  );
}

export default ScrollTextAnimation;