'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useInView } from 'motion/react';

const lettersAndSymbols = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,';

interface AnimatedTextProps {
  text: string;
  /** Optional delay before starting animation when in view (ms) */
  delay?: number;
}

export function RandomizedTextEffect({ text, delay = 0 }: AnimatedTextProps) {
  const [animatedText, setAnimatedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const timeoutIds = useRef<number[]>([]);

  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const getRandomChar = useCallback(
    () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
    []
  );

  const animateText = useCallback(async () => {
    // Prevent overlapping animations
    if (isAnimating.current) return;
    isAnimating.current = true;

    const duration = 50;
    const revealDuration = 80;
    const initialRandomDuration = 300;

    const generateRandomText = () =>
      text
        .split('')
        .map(() => getRandomChar())
        .join('');

    setAnimatedText(generateRandomText());

    const endTime = Date.now() + initialRandomDuration;
    // Scramble phase
    while (Date.now() < endTime) {
      await new Promise((resolve) => {
        const id = window.setTimeout(resolve, duration);
        timeoutIds.current.push(id);
      });
      setAnimatedText(generateRandomText());
    }

    // Reveal phase – letter by letter
    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => {
        const id = window.setTimeout(resolve, revealDuration);
        timeoutIds.current.push(id);
      });
      setAnimatedText(
        (prevText) =>
          text.slice(0, i + 1) +
          prevText
            .slice(i + 1)
            .split('')
            .map(() => getRandomChar())
            .join('')
      );
    }

    isAnimating.current = false;
  }, [text, getRandomChar]);

  // Cleanup all pending timeouts
  const clearTimeouts = useCallback(() => {
    timeoutIds.current.forEach((id) => window.clearTimeout(id));
    timeoutIds.current = [];
  }, []);

  // Reset animation and trigger when in view
  useEffect(() => {
    if (isInView) {
      // If animation is running, stop it and reset flag
      if (isAnimating.current) {
        clearTimeouts();
        isAnimating.current = false;
      }
      // Start after optional delay
      const startId = window.setTimeout(() => {
        // Reset to empty or initial scramble? We'll start fresh.
        setAnimatedText(''); // optional: show empty before starting
        animateText();
      }, delay);
      timeoutIds.current.push(startId);
    } else {
      // Optionally reset text when out of view – you can keep or remove
      // setAnimatedText('');
      // clearTimeouts();
      // isAnimating.current = false;
    }

    return () => {
      clearTimeouts();
      isAnimating.current = false;
    };
  }, [isInView, delay, animateText, clearTimeouts]);

  // Initial set (if you want to show something before first animation)
  useEffect(() => {
    if (!animatedText && text) {
      // Optionally show a scrambled version initially
      // Defer the initial set to avoid synchronous setState inside effect
      const id = window.setTimeout(() => {
        setAnimatedText(
          text
            .split('')
            .map(() => getRandomChar())
            .join('')
        );
      }, 0);
      timeoutIds.current.push(id);
    }
  }, [text, getRandomChar, animatedText]);

  return <div ref={containerRef} className="relative inline-block">{animatedText}</div>;
}