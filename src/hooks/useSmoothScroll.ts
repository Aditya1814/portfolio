import { cancelFrame, frame } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';
import { useMediaQuery } from './useMediaQuery';

/**
 * Smooth, eased mouse-wheel and trackpad scrolling with Lenis. In-page links (#about,
 * #projects and so on) glide to their section through Lenis too.
 *
 * Lenis moves the browser's real scroll position instead of transforming the page, so sticky
 * elements, Framer Motion's useScroll and the scroll listeners elsewhere keep working as they
 * are. Touch scrolling stays native (Lenis's default), and visitors who prefer reduced motion
 * keep the browser's normal scrolling.
 */
export function useSmoothScroll() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ anchors: true });

    // Lenis's documented Framer Motion setup: drive it from Framer Motion's frame loop, so
    // smooth scrolling and the page's animations update in the same frame.
    const update = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);
}
