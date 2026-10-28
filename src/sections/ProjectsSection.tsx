import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import ProjectVisual from '../components/ProjectVisuals';
import SectionHeading from '../components/SectionHeading';
import { PROJECTS, type Project } from '../data/content';

/** Sticky offsets to try, roomiest first; shorter screens fall back to the tighter one. */
const STICKY_TOPS = [128, 96];
/** Each stacked card sits this much lower than the one before it. */
const CARD_OFFSET = 28;
const MIN_STACK_WIDTH = 768;

const TEXT_SIZE = { fontSize: 'clamp(0.9rem, 1.15vw, 1.05rem)' };

// Same easing and trigger as FadeIn, so project reveals match the rest of the page.
const EASE = [0.25, 0.1, 0.25, 1] as const;
const VIEWPORT = { once: true, margin: '50px', amount: 0 } as const;

const OUTLINE = 'rgba(215, 226, 234, 1)';
const OUTLINE_BURIED = 'rgba(215, 226, 234, 0.35)';

// ----- Motion variants -----

const featureList: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.3, staggerChildren: 0.08 } },
};
const featureItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};
const checkBadge: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: 'spring', stiffness: 420, damping: 20 } },
};
const numberRise: Variants = {
  hidden: { y: '105%' },
  visible: { y: '0%', transition: { duration: 0.8, ease: EASE } },
};
const checkMark: Variants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 0.35, delay: 0.15, ease: 'easeOut' } },
};

/** Gradient panel wipes upward, like a curtain rising. */
const panelReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.9, delay: 0.15, ease: EASE } },
};
const techBlock: Variants = {
  hidden: {},
  // Starts after the illustration has mostly drawn itself.
  visible: { transition: { delayChildren: 1.2, staggerChildren: 0.08 } },
};
const pillList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const riseIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};
const popIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

export default function ProjectsSection() {
  const listRef = useRef<HTMLDivElement>(null);
  /** Sticky offset in px while the cards stack, or null when they flow normally. */
  const [stickyTop, setStickyTop] = useState<number | null>(null);
  const motionOk = !useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start start', 'end end'],
  });

  // Cards stack only when the tallest one fits on screen under the sticky offset; otherwise
  // later cards would cover text the visitor never saw. Stacked cards all take the tallest
  // height so lower cards don't peek out under the top one.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cards = Array.from(list.querySelectorAll<HTMLElement>('article'));
    let frame = 0;

    const layout = () => {
      cards.forEach((card) => {
        card.style.minHeight = '';
      });
      const tallest = Math.max(...cards.map((card) => card.offsetHeight));
      const top =
        window.innerWidth >= MIN_STACK_WIDTH && tallest <= window.innerHeight * 0.85
          ? (STICKY_TOPS.find((t) => t + (cards.length - 1) * CARD_OFFSET + tallest <= window.innerHeight) ?? null)
          : null;

      if (top !== null) {
        cards.forEach((card) => {
          card.style.minHeight = `${tallest}px`;
        });
      }
      setStickyTop(top);
    };
    // Deferred a frame so resizing inside the observer callback can't trigger a resize loop.
    const scheduleLayout = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(layout);
    };

    layout();
    const observer = new ResizeObserver(scheduleLayout);
    cards.forEach((card) => observer.observe(card));
    window.addEventListener('resize', scheduleLayout);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', scheduleLayout);
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-24 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32"
    >
      <SectionHeading surface="dark" className="mb-16 sm:mb-20 md:mb-28">
        Projects
      </SectionHeading>

      <div ref={listRef} className="relative mx-auto max-w-6xl">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
            stickyTop={stickyTop}
            motionOk={motionOk}
          />
        ))}
      </div>
    </section>
  );
}

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  /** Sticky offset in px while stacking, or null when cards flow normally. */
  stickyTop: number | null;
  /** False when the visitor prefers reduced motion: no hover movement or sweeping effects. */
  motionOk: boolean;
};

function ProjectCard({ project, index, total, progress, stickyTop, motionOk }: ProjectCardProps) {
  const canStack = stickyTop !== null;
  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '50px' });
  const isLast = index === total - 1;
  const range = [index / total, 1];

  // Earlier cards shrink a little more, so the stack reads as layered paper.
  const scale = useTransform(progress, range, [1, 1 - (total - 1 - index) * 0.03]);
  // Cards that end up underneath dim their outline, so the stack reads back to front.
  const borderColor = useTransform(progress, range, [OUTLINE, isLast ? OUTLINE : OUTLINE_BURIED]);

  // Unstacked cards rise in as they arrive. Stacked cards slide in with the scroll instead,
  // and must stay opaque so the card underneath never shows through.
  const shellVisible = canStack || inView;
  const Icon = project.icon;

  return (
    <div className={canStack ? 'sticky h-[85vh]' : 'mb-6 last:mb-0'} style={canStack ? { top: stickyTop } : undefined}>
      <motion.article
        ref={cardRef}
        className="relative flex flex-col rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        initial={false}
        animate={shellVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={canStack ? { scale, borderColor, top: `${index * CARD_OFFSET}px`, transformOrigin: 'top' } : undefined}
      >
        <header className="mb-4 flex flex-wrap items-center justify-between gap-4 sm:mb-6 md:mb-8">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6 md:gap-8">
            {/* The number rises out of a mask, echoing the hero heading. The mask triggers the
                reveal: the clipped number itself never counts as "in view". */}
            <motion.span
              className="inline-block shrink-0 overflow-hidden font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: 'clamp(3rem, 8vw, 120px)' }}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.span className="block" variants={numberRise}>
                {project.number}
              </motion.span>
            </motion.span>
            <FadeIn delay={0.15} y={20} className="flex min-w-0 flex-col gap-1 sm:gap-2">
              <span
                className="flex items-center gap-2 font-light uppercase tracking-widest text-[#D7E2EA]/60"
                style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
              >
                <Icon aria-hidden="true" className="h-[1.15em] w-[1.15em] shrink-0" strokeWidth={1.75} />
                {project.category}
              </span>
              <h3
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </FadeIn>
          </div>
          {project.url ? (
            <FadeIn delay={0.25} y={20}>
              <LiveProjectButton href={project.url} projectName={project.name} />
            </FadeIn>
          ) : null}
        </header>

        {/* Phones: everything stacks. Tablets: the two text panels sit side by side above the
            gradient panel. Desktop: text panels on the left, gradient panel on the right.
            Height added by equalizing goes to the gradient or highlights panel. */}
        <div className="grid flex-1 grid-rows-[auto_1fr] gap-3 sm:gap-4 lg:grid-cols-5 lg:grid-rows-1">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:col-span-2 lg:grid-cols-1 lg:grid-rows-[auto_1fr]">
            <Panel label="Overview" delay={0.1}>
              <p className="font-light leading-relaxed text-[#D7E2EA]/85" style={TEXT_SIZE}>
                {project.description}
              </p>
            </Panel>
            <Panel label="Highlights" delay={0.2}>
              <motion.ul
                className="flex flex-col gap-2.5"
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={featureList}
              >
                {project.features.map((feature) => (
                  <motion.li
                    key={feature}
                    variants={featureItem}
                    className="flex items-start gap-3 text-[#D7E2EA]"
                    style={TEXT_SIZE}
                  >
                    <motion.span
                      aria-hidden="true"
                      variants={checkBadge}
                      className="mt-[0.15em] flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: project.gradient }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="white"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <motion.path d="M20 6 9 17l-5-5" variants={checkMark} />
                      </svg>
                    </motion.span>
                    <span className="font-light leading-snug">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </Panel>
          </div>

          <VisualPanel project={project} motionOk={motionOk} />
        </div>
      </motion.article>
    </div>
  );
}

function VisualPanel({ project, motionOk }: { project: Project; motionOk: boolean }) {
  // Hover is tracked in state rather than as a variant; see the note in ProjectVisuals.tsx.
  const [hovered, setHovered] = useState(false);

  return (
    // The panel's hidden → visible variants also drive the illustration's entrance.
    <motion.div
      className="relative flex flex-col gap-5 overflow-hidden rounded-[32px] p-6 sm:gap-6 sm:rounded-[40px] sm:p-8 md:rounded-[48px] lg:col-span-3"
      style={{ background: project.gradient }}
      initial="hidden"
      whileInView="visible"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      viewport={VIEWPORT}
      variants={panelReveal}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.55) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />

      <div className="relative flex min-h-0 flex-1 items-center justify-center lg:min-h-[200px]">
        <ProjectVisual kind={project.visual} motionOk={motionOk} active={motionOk && hovered} />
      </div>

      <motion.div className="relative" variants={techBlock}>
        <motion.p variants={riseIn} className="mb-3 text-xs font-medium uppercase tracking-widest text-white">
          Tech stack
        </motion.p>
        <motion.ul aria-label={`${project.name} tech stack`} className="flex flex-wrap gap-2" variants={pillList}>
          {project.tech.map((tech) => (
            <motion.li
              key={tech}
              variants={popIn}
              className="rounded-full border border-white/40 bg-black/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white sm:text-sm"
            >
              {tech}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

function Panel({ label, delay, children }: { label: string; delay: number; children: ReactNode }) {
  return (
    <FadeIn
      delay={delay}
      y={24}
      className="rounded-[28px] border border-[#D7E2EA]/10 bg-[#151515] p-5 sm:rounded-[36px] sm:p-6 md:rounded-[44px] md:p-7"
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">{label}</p>
      {children}
    </FadeIn>
  );
}
