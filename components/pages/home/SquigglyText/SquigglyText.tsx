"use client";
import React from "react";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Cover } from "@/components/ui/cover";

export function SquigglyTextOut() {
  return (
    <>
        <div>
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Build amazing websites <br /> at <Cover>warp speed</Cover>
        </h1>
      </div>
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      {/* First line: builds anticipation */}
      <TextGenerateEffect
        className="text-center text-4xl font-bold text-neutral-800 md:text-6xl dark:text-neutral-200"
        words="Wait..."
        duration={0.3}
        />

      {/* Second line: the real question */}
      <TextGenerateEffect
        className="text-center text-4xl font-bold text-neutral-800 md:text-6xl dark:text-neutral-200"
        words="I have a question:"
        duration={0.4}
        />

      {/* Main punchline with squiggly emphasis */}
      <h1 className="text-center text-4xl font-bold leading-tight text-neutral-800 md:text-6xl lg:text-7xl dark:text-neutral-200">
        How many{" "}
        <SquigglyText
          stepDuration={70}
          scale={[6, 9]}
          className="text-amber-500 dark:text-amber-400"
          >
          cups of coffee
        </SquigglyText>{" "}
        <br />
        is{" "}
        <SquigglyText
          scale={5}
          className="text-rose-500 dark:text-rose-400"
          >
          too many
        </SquigglyText>{" "}
        cups of coffee?
      </h1>

      {/* Funny subtext – appears after a delay (using TextGenerateEffect again) */}
      <TextGenerateEffect
        className="mt-4 text-center text-xl text-neutral-500 dark:text-neutral-400 md:text-2xl"
        words="Asking for a friend… and my sleep schedule."
        duration={0.5}
        />

      {/* Optional: a small emoji for extra personality */}
      <div className="mt-2 text-4xl">☕️😅</div>
    </div>
        </>
  );
}