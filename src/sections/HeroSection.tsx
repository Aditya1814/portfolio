import { useReducedMotion } from 'framer-motion';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import { HERO_PORTRAIT, NAV_LINKS, PROFILE } from '../data/content';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function HeroSection() {
  // Touch taps fire synthetic mouse events, so the magnet only runs with a real hover pointer.
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      // 100svh keeps the bottom bar above mobile browser toolbars; h-screen is the fallback.
      className="relative flex h-screen flex-col supports-[height:100svh]:h-[100svh]"
      style={{ overflowX: 'clip' }}
    >
      {/* relative z-20 keeps the links clickable: from md up, the heading's negative top margin
          slides it under the nav, and as the later element it would otherwise catch the clicks. */}
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20 flex justify-between px-6 pt-6 md:px-10 md:pt-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {link.label}
          </a>
        ))}
      </FadeIn>

      <div className="mt-6 overflow-hidden sm:mt-4 md:-mt-5">
        {/* 14.6vw fills about 92% of the width with this name; recheck it if the name changes. */}
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading w-full whitespace-nowrap text-center text-[14.6vw] font-black uppercase leading-none tracking-tight"
        >
          Hi, i&apos;m {PROFILE.firstName}
        </FadeIn>
      </div>

      {/* z-20 keeps the text and button above the portrait where they overlap at tablet widths. */}
      <div className="relative z-20 mt-auto flex items-end justify-between gap-6 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="flex flex-col gap-3 md:gap-4">
          {/* Widths stay narrow until lg so the text clears the portrait instead of running over it. */}
          <p className="flex max-w-[160px] items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-[#D7E2EA]/70 sm:text-xs md:max-w-[200px] lg:max-w-none">
            <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
            </span>
            {PROFILE.availability}
          </p>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] md:max-w-[200px] lg:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {PROFILE.tagline}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="shrink-0">
          <ContactButton />
        </FadeIn>
      </div>

      {/* pointer-events-none keeps the portrait from blocking clicks on the content it overlaps. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            disabled={!canHover || Boolean(prefersReducedMotion)}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="block w-full"
          >
            <img src={HERO_PORTRAIT} alt="3D avatar illustration" className="block h-auto w-full" draggable={false} />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
