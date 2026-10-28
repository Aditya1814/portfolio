import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { BUILD_SUMMARY, BUILD_THEMES, TECH_STACK, type BuildTheme } from '../data/content';

const START_OFFSET = 200;

// Three copies per row, centered, so the strip never runs out while it slides either way.
const triple = <T,>(items: readonly T[]): T[] => [...items, ...items, ...items];

const THEME_GRADIENTS = [
  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  'linear-gradient(123deg, #7621B0 0%, #B600A8 100%)',
  'linear-gradient(123deg, #BE4C00 0%, #B600A8 55%, #7621B0 100%)',
];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowOneRef = useRef<HTMLDivElement>(null);
  const rowTwoRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const rowOne = rowOneRef.current;
    const rowTwo = rowTwoRef.current;
    if (!section || !rowOne || !rowTwo) return;

    const applyOffset = (offset: number) => {
      rowOne.style.transform = `translateX(${offset - START_OFFSET}px)`;
      rowTwo.style.transform = `translateX(${-(offset - START_OFFSET)}px)`;
    };

    if (prefersReducedMotion) {
      applyOffset(0);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      applyOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    // Batch scroll events into one DOM write per frame.
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="marquee-heading"
      className="flex flex-col gap-3 bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      {/* The moving rows repeat each item three times, so screen readers get one plain summary instead. */}
      <h2 id="marquee-heading" className="sr-only">
        What I build
      </h2>
      <p className="sr-only">
        {BUILD_SUMMARY} Core stack: {TECH_STACK.join(', ')}.
      </p>

      <MarqueeRow rowRef={rowOneRef} initialOffset={-START_OFFSET}>
        {triple(BUILD_THEMES).map((theme, index) => (
          <ThemeTile key={`${theme.label}-${index}`} theme={theme} gradient={THEME_GRADIENTS[index % THEME_GRADIENTS.length]} />
        ))}
      </MarqueeRow>
      <MarqueeRow rowRef={rowTwoRef} initialOffset={START_OFFSET}>
        {triple(TECH_STACK).map((tech, index) => (
          <TechTile key={`${tech}-${index}`} label={tech} />
        ))}
      </MarqueeRow>
    </section>
  );
}

type MarqueeRowProps = {
  rowRef: RefObject<HTMLDivElement>;
  initialOffset: number;
  children: ReactNode;
};

function MarqueeRow({ rowRef, initialOffset, children }: MarqueeRowProps) {
  return (
    <div
      ref={rowRef}
      aria-hidden="true"
      className="flex justify-center gap-3"
      style={{ transform: `translateX(${initialOffset}px)`, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

function ThemeTile({ theme, gradient }: { theme: BuildTheme; gradient: string }) {
  const Icon = theme.icon;

  return (
    <div
      className="flex h-[110px] shrink-0 items-center gap-4 rounded-2xl px-8 sm:h-[140px] sm:gap-5 sm:px-10 md:h-[170px] md:gap-6 md:px-12"
      style={{ background: gradient }}
    >
      <Icon className="h-8 w-8 shrink-0 text-white sm:h-10 sm:w-10 md:h-12 md:w-12" strokeWidth={1.5} />
      <span
        className="whitespace-nowrap font-black uppercase leading-none tracking-tight text-white"
        style={{ fontSize: 'clamp(1.5rem, 3.4vw, 3.25rem)' }}
      >
        {theme.label}
      </span>
    </div>
  );
}

function TechTile({ label }: { label: string }) {
  return (
    <div className="flex h-[90px] shrink-0 items-center rounded-2xl border border-[#D7E2EA]/15 bg-[#141414] px-8 sm:h-[110px] sm:px-10 md:h-[130px] md:px-12">
      <span
        className="hero-heading whitespace-nowrap font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(1.25rem, 3vw, 2.75rem)' }}
      >
        {label}
      </span>
    </div>
  );
}
