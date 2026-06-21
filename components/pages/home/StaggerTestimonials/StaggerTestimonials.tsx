'use client';

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "KnockMyRide completely transformed how we handle vehicle logistics. The QR system is genius – our customers love the instant contact feature.",
    by: "Rakib H., Fleet Manager at Dhaka Transport",
    imgSrc: "https://i.pravatar.cc/150?img=1",
  },
  {
    tempId: 1,
    testimonial:
      "Sadik delivered our e‑commerce platform ahead of schedule and under budget. The admin dashboard he built is a game‑changer for our inventory team.",
    by: "Nadia S., CTO at PerfectoBD",
    imgSrc: "https://i.pravatar.cc/150?img=2",
  },
  {
    tempId: 2,
    testimonial:
      "Working with Sadik was a breeze – he’s a true full‑stack expert. He took our vague idea for a tournament platform and turned it into a polished, fast product.",
    by: "Zayn A., Founder of Primely Gaming",
    imgSrc: "https://i.pravatar.cc/150?img=3",
  },
  {
    tempId: 3,
    testimonial:
      "I’ve hired many developers, but Sadik stands out for his ability to communicate complex technical decisions clearly. He’s a pleasure to collaborate with.",
    by: "Tahmina R., Product Lead at SM Technology",
    imgSrc: "https://i.pravatar.cc/150?img=4",
  },
  {
    tempId: 4,
    testimonial:
      "The real‑time analytics he built for KnockMyRide gave us insights we never had before. Our operational efficiency improved by 40% in just two months.",
    by: "Imran H., Operations Director at KnockMyRide",
    imgSrc: "https://i.pravatar.cc/150?img=5",
  },
  {
    tempId: 5,
    testimonial:
      "Sadik’s code is clean, scalable, and well‑documented. He’s the kind of developer you want on every project. Highly recommend!",
    by: "Sarah K., Senior Engineer at Wizard Software",
    imgSrc: "https://i.pravatar.cc/150?img=6",
  },
  {
    tempId: 6,
    testimonial:
      "Sadik was a pleasure to work with. He delivered a high-quality product that exceeded our expectations. We look forward to working with him again.",
    by: "Ali A., CTO at Aceternity",
    imgSrc: "https://i.pravatar.cc/150?img=7",
  },
  {
    tempId: 7,
    testimonial:
      "Sadik is a true expert in web development. He consistently delivers high-quality code that meets our needs. I highly recommend him for any web development project.",
    by: "John D., CEO at WebTech Solutions",
    imgSrc: "https://i.pravatar.cc/150?img=8",
  },
  {
    tempId: 8,
    testimonial:
      "Sadik is a talented developer with a keen eye for detail. He delivered a stunning website that exceeded our expectations. We're thrilled to have worked with him.",
    by: "Jane S., Marketing Manager at Tech Solutions",
    imgSrc: "https://i.pravatar.cc/150?img=9",
  },
];


interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;
  const step = cardSize * 0.65; // spacing factor – adjust to control overlap

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-primary"
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${step * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border))"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{ boxShadow: "3px 3px 0px hsl(var(--background))" }}
      />
      <h3
        className={cn(
          "text-base sm:text-xl font-medium",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {testimonial.testimonial}
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
      >
        – {testimonial.by}
      </p>
    </div>
  );
};

export interface StaggerTestimonialsProps {
  autoplay?: boolean;
  autoplaySpeed?: number;
  visibleCards?: number; // number of cards to show (default 3)
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  autoplay = true,
  autoplaySpeed = 2800,
  visibleCards = 5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ─── Dynamically calculate card size to fit exactly `visibleCards` ──
  useLayoutEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      // Allow some padding, and use a factor to control spacing
      const padding = 32; // total horizontal padding
      const availableWidth = containerWidth - padding;
      // Each card takes width, and we want to show `visibleCards` cards with some overlap/gap.
      // We use a spacing factor: cardSize * 0.65 ≈ 65% of card width as step.
      // So the total width for 3 cards ≈ cardSize + 2 * cardSize * 0.65 = cardSize * (1 + 1.3) = 2.3 * cardSize.
      // To fit availableWidth, cardSize = availableWidth / 2.3.
      // Adjust factor to control overlap – 0.65 gives good overlap.
      const factor = 0.65;
      const newSize = Math.min(
        Math.floor(availableWidth / (1 + (visibleCards - 1) * factor)),
        400 // max size to avoid too large
      );
      setCardSize(Math.max(newSize, 200)); // min size
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [visibleCards]);

  // ─── handleMove ────────────────────────────────────────────────────────
  const handleMove = useCallback(
    (steps: number) => {
      const newList = [...testimonialsList];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      setTestimonialsList(newList);
    },
    [testimonialsList]
  );

  // ─── Autoplay ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!autoplay || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      handleMove(1);
    }, autoplaySpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoplay, autoplaySpeed, isPaused, handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-muted/30"
      style={{ height: 600 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {testimonialsList.map((testimonial, index) => {
        // Position relative to the center (0)
        const position = index - Math.floor(testimonialsList.length / 2);
        // Only render cards that are within the visible range
        const halfVisible = Math.floor(visibleCards / 2);
        if (Math.abs(position) > halfVisible) return null;

        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => {
            handleMove(-1);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                handleMove(1);
              }, autoplaySpeed);
            }
          }}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => {
            handleMove(1);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                handleMove(1);
              }, autoplaySpeed);
            }
          }}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};