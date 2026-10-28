import { motion, type Variants } from 'framer-motion';
import {
  Database,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  Send,
  Sparkles,
  Target,
  Twitter,
  Workflow,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { useId } from 'react';
import type { ProjectVisualKind } from '../data/content';

/*
 * Illustrations for the project cards' gradient panels. Each one diagrams what its project
 * does, using the project's own content (platforms, agent roles, signature checks).
 *
 * Entrance animations follow the panel's "hidden" → "visible" variants, so each plays once
 * when its card arrives. The hover-only effects (data pulses, the repeat scan) are driven by
 * the `active` prop instead of a hover variant: when a hover variant ends, Framer Motion
 * re-applies "visible" to every child, which would replay the one-off entrance effects.
 */

const EASE = [0.25, 0.1, 0.25, 1] as const;
const WHITE = (alpha: number) => `rgba(255, 255, 255, ${alpha})`;

const GLASS = { fill: WHITE(0.16), stroke: WHITE(0.45), strokeWidth: 1.5 } as const;
const LINE = { stroke: WHITE(0.5), strokeWidth: 2, strokeLinecap: 'round', fill: 'none' } as const;
const PULSE_LINE = { stroke: 'white', strokeWidth: 3.5, strokeLinecap: 'round', fill: 'none' } as const;
const LABEL = { fill: 'white', fontSize: 15, fontWeight: 600, letterSpacing: '0.06em' } as const;
// On phones the drawing renders too small for readable SVG text; shapes and icons carry it.
const LABEL_CLASS = 'hidden sm:inline';

// ----- Shared variants (the `custom` value is each element's delay in seconds) -----

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } }),
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 18, delay },
  }),
};
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.7, ease: 'easeInOut', delay }, opacity: { duration: 0.01, delay } },
  }),
};
/** Skeleton text lines filling in from the left, like text being written. */
const grow: Variants = {
  hidden: { scaleX: 0 },
  visible: (delay: number) => ({ scaleX: 1, transition: { duration: 0.6, ease: EASE, delay } }),
};

const PULSE_REST = { pathLength: 0.12, pathOffset: -0.12, opacity: 0 };

/** A short bright dash that travels along a connector while `active` is true. */
function Pulse({ d, active, delay }: { d: string; active: boolean; delay: number }) {
  return (
    <motion.path
      d={d}
      {...PULSE_LINE}
      initial={PULSE_REST}
      animate={active ? { pathLength: 0.12, pathOffset: [-0.12, 1], opacity: [0, 1, 1, 0] } : PULSE_REST}
      transition={
        active
          ? { duration: 1.3, ease: 'linear', delay, repeat: Infinity, repeatDelay: 0.25 }
          : { opacity: { duration: 0.2 }, pathOffset: { duration: 0, delay: 0.2 } }
      }
    />
  );
}

type ProjectVisualProps = {
  kind: ProjectVisualKind;
  /** False when the visitor prefers reduced motion; sweeping effects are skipped. */
  motionOk: boolean;
  /** True while the panel is hovered: data pulses and the repeat scan run. */
  active: boolean;
};

export default function ProjectVisual({ kind, motionOk, active }: ProjectVisualProps) {
  return (
    // Decorative: the Overview and Highlights panels already say the same thing in text.
    // On desktop it fills whatever height the text column leaves rather than setting the card's
    // height, so cards stay short enough to stack.
    <div aria-hidden="true" className="h-full w-full max-w-[460px] lg:absolute lg:inset-0 lg:mx-auto">
      <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet" className="block h-full w-full overflow-visible" fill="none">
        {kind === 'publish' ? <PublishScene active={active} /> : null}
        {kind === 'agents' ? <AgentsScene active={active} /> : null}
        {kind === 'signature' ? <SignatureScene motionOk={motionOk} active={active} /> : null}
      </svg>
    </div>
  );
}

function Tick({ cx, cy, r = 8 }: { cx: number; cy: number; r?: number }) {
  const s = r / 8;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#22C55E" stroke="white" strokeWidth={1.5} />
      <path
        d={`M ${cx - 3.5 * s} ${cy + 0.2 * s} l ${2.5 * s} ${2.5 * s} l ${4.6 * s} ${-5 * s}`}
        stroke="white"
        strokeWidth={1.8 * Math.min(s, 1.4)}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

type Node = { x: number; y: number; r: number };

/** Straight connector between two circles, stopping just short of each edge. */
function edgeBetween(from: Node, to: Node) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const x1 = from.x + Math.cos(angle) * (from.r + 4);
  const y1 = from.y + Math.sin(angle) * (from.r + 4);
  const x2 = to.x - Math.cos(angle) * (to.r + 4);
  const y2 = to.y - Math.sin(angle) * (to.r + 4);
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

// ----- 01 · Social Publish Automation Platform -----
// An AI-written post (title, description, hashtags) flows through one publish hub
// out to every platform, and each platform confirms.

const PLATFORMS: LucideIcon[] = [Youtube, Facebook, Instagram, Linkedin, Twitter];
const HUB: Node = { x: 266, y: 150, r: 22 };
const PLATFORM_X = 420;
const PLATFORM_R = 20;
const platformY = (index: number) => 46 + index * 52;
const platformPath = (index: number) => {
  const y = platformY(index);
  return `M ${HUB.x + HUB.r + 4} ${HUB.y} C 335 ${HUB.y}, 350 ${y}, ${PLATFORM_X - PLATFORM_R - 4} ${y}`;
};
const POST_LINES = [
  { y: 112, width: 136, height: 10, alpha: 0.9, delay: 0.7 },
  { y: 128, width: 96, height: 10, alpha: 0.9, delay: 0.8 },
  { y: 150, width: 144, height: 6, alpha: 0.45, delay: 0.9 },
  { y: 162, width: 132, height: 6, alpha: 0.45, delay: 0.95 },
  { y: 174, width: 110, height: 6, alpha: 0.45, delay: 1 },
];
const HASHTAGS = [
  { label: '#seo', x: 36, width: 44 },
  { label: '#ai', x: 86, width: 36 },
  { label: '#reach', x: 128, width: 54 },
];

function PublishScene({ active }: { active: boolean }) {
  return (
    <>
      <motion.g variants={fadeUp} custom={0.45}>
        <rect x={20} y={58} width={176} height={184} rx={20} {...GLASS} />
        <rect x={36} y={72} width={100} height={28} rx={14} fill={WHITE(0.22)} />
        <Sparkles x={45} y={79} width={14} height={14} color="white" strokeWidth={2} />
        <text x={65} y={91.5} {...LABEL} className={LABEL_CLASS}>
          AI SEO
        </text>
      </motion.g>
      {POST_LINES.map((line) => (
        <motion.rect
          key={line.y}
          x={36}
          y={line.y}
          width={line.width}
          height={line.height}
          rx={line.height / 2}
          fill={WHITE(line.alpha)}
          style={{ originX: 0 }}
          variants={grow}
          custom={line.delay}
        />
      ))}
      {HASHTAGS.map((tag, index) => (
        <motion.g key={tag.label} variants={pop} custom={1.05 + index * 0.08}>
          <rect x={tag.x} y={198} width={tag.width} height={22} rx={11} fill={WHITE(0.2)} />
          <text
            x={tag.x + tag.width / 2}
            y={213}
            textAnchor="middle"
            {...LABEL}
            fontSize={13}
            fontWeight={500}
            letterSpacing="0.02em"
            className={LABEL_CLASS}
          >
            {tag.label}
          </text>
        </motion.g>
      ))}

      <motion.path d={`M 200 150 L ${HUB.x - HUB.r - 4} 150`} {...LINE} variants={draw} custom={1.1} />
      <motion.g variants={pop} custom={1.25}>
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r} fill={WHITE(0.24)} stroke={WHITE(0.6)} strokeWidth={1.5} />
        <Send x={HUB.x - 10} y={HUB.y - 10} width={20} height={20} color="white" strokeWidth={1.75} />
      </motion.g>
      <motion.text x={HUB.x} y={HUB.y + 52} textAnchor="middle" {...LABEL} className={LABEL_CLASS} variants={fadeUp} custom={1.35}>
        AUTO-PUBLISH
      </motion.text>

      {PLATFORMS.map((Icon, index) => (
        <g key={index}>
          <motion.path d={platformPath(index)} {...LINE} variants={draw} custom={1.4 + index * 0.1} />
          <Pulse d={platformPath(index)} active={active} delay={index * 0.12} />
          <motion.g variants={pop} custom={1.55 + index * 0.1}>
            <circle cx={PLATFORM_X} cy={platformY(index)} r={PLATFORM_R} {...GLASS} />
            <Icon x={PLATFORM_X - 10} y={platformY(index) - 10} width={20} height={20} color="white" strokeWidth={1.75} />
          </motion.g>
          <motion.g variants={pop} custom={1.95 + index * 0.1}>
            <Tick cx={PLATFORM_X + 16} cy={platformY(index) - 15} />
          </motion.g>
        </g>
      ))}
    </>
  );
}

// ----- 02 · Multi-Agent AI Automation Platform -----
// A query reaches the LangGraph orchestrator, which fans work out to the intent,
// search (RAG) and response agents named in the project description.

const ORCHESTRATOR: Node = { x: 236, y: 150, r: 38 };
const QUERY_EDGE = `M 124 150 L ${ORCHESTRATOR.x - ORCHESTRATOR.r - 4} 150`;
const AGENTS: Array<Node & { icon: LucideIcon; label: string; labelY: number }> = [
  { icon: Target, label: 'INTENT', x: 392, y: 60, r: 24, labelY: 24 },
  { icon: Database, label: 'SEARCH · RAG', x: 414, y: 150, r: 24, labelY: 198 },
  { icon: Sparkles, label: 'RESPONSE', x: 392, y: 240, r: 24, labelY: 286 },
];
/** One-off ring that bursts outward when the orchestrator switches on. */
const burst: Variants = {
  hidden: { opacity: 0, scale: 1 },
  visible: (delay: number) => ({
    opacity: [0.8, 0],
    scale: [1, 1.7],
    transition: { duration: 0.9, ease: 'easeOut', delay },
  }),
};

function AgentsScene({ active }: { active: boolean }) {
  return (
    <>
      <motion.g variants={pop} custom={0.5}>
        <rect x={16} y={128} width={108} height={44} rx={22} {...GLASS} />
        <MessageSquare x={31} y={141} width={18} height={18} color="white" strokeWidth={1.75} />
        <text x={57} y={154.5} {...LABEL} className={LABEL_CLASS}>
          QUERY
        </text>
      </motion.g>
      <motion.path d={QUERY_EDGE} {...LINE} variants={draw} custom={0.75} />
      <Pulse d={QUERY_EDGE} active={active} delay={0} />

      <motion.circle
        cx={ORCHESTRATOR.x}
        cy={ORCHESTRATOR.y}
        r={ORCHESTRATOR.r}
        stroke="white"
        strokeWidth={1.5}
        fill="none"
        variants={burst}
        custom={1.1}
      />
      <motion.g variants={pop} custom={0.95}>
        <circle cx={ORCHESTRATOR.x} cy={ORCHESTRATOR.y} r={ORCHESTRATOR.r} fill={WHITE(0.22)} stroke={WHITE(0.6)} strokeWidth={2} />
        <Workflow x={ORCHESTRATOR.x - 14} y={ORCHESTRATOR.y - 14} width={28} height={28} color="white" strokeWidth={1.5} />
      </motion.g>
      <motion.text x={ORCHESTRATOR.x} y={ORCHESTRATOR.y + 64} textAnchor="middle" {...LABEL} className={LABEL_CLASS} variants={fadeUp} custom={1.15}>
        LANGGRAPH
      </motion.text>

      {AGENTS.map((agent, index) => {
        const Icon = agent.icon;
        const edge = edgeBetween(ORCHESTRATOR, agent);
        return (
          <g key={agent.label}>
            <motion.path d={edge} {...LINE} variants={draw} custom={1.25 + index * 0.15} />
            <Pulse d={edge} active={active} delay={0.35 + index * 0.15} />
            <motion.g variants={pop} custom={1.45 + index * 0.15}>
              <circle cx={agent.x} cy={agent.y} r={agent.r} {...GLASS} />
              <Icon x={agent.x - 10} y={agent.y - 10} width={20} height={20} color="white" strokeWidth={1.75} />
            </motion.g>
            <motion.text
              x={agent.x}
              y={agent.labelY}
              textAnchor="middle"
              {...LABEL}
              className={LABEL_CLASS}
              variants={fadeUp}
              custom={1.6 + index * 0.15}
            >
              {agent.label}
            </motion.text>
          </g>
        );
      })}
    </>
  );
}

// ----- 03 · Signature Authentication System -----
// A handwritten signature draws itself, a scan sweeps across it, the three checks from
// the description (stroke patterns, angles, pressure points) light up, and it verifies.

const SIGNATURE =
  'M 86 196 C 104 150, 122 112, 138 112 C 154 112, 146 168, 128 182 C 112 194, 110 170, 132 158 C 160 142, 176 150, 180 176 C 184 198, 196 196, 204 172 C 214 142, 222 132, 230 150 C 238 168, 236 190, 250 186 C 266 182, 270 140, 284 136 C 298 132, 296 178, 312 178 C 330 178, 334 128, 350 126 C 366 124, 360 170, 376 172 C 392 174, 402 150, 412 140';
const UNDERLINE = 'M 118 210 C 200 200, 300 198, 400 190';
const CHECKS = [
  { label: 'STROKES', x: 44, width: 114 },
  { label: 'ANGLES', x: 166, width: 104 },
  { label: 'PRESSURE', x: 278, width: 126 },
];
const SCAN_DISTANCE = 345;

const signatureDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.4, ease: 'easeInOut', delay }, opacity: { duration: 0.01, delay } },
  }),
};
const chipLight: Variants = {
  hidden: { fillOpacity: 0.12 },
  visible: (delay: number) => ({ fillOpacity: 0.32, transition: { duration: 0.4, delay } }),
};
const chipDot: Variants = {
  hidden: { fill: WHITE(0.5) },
  visible: (delay: number) => ({ fill: '#22C55E', transition: { duration: 0.3, delay } }),
};
const scanOnce: Variants = {
  hidden: { x: 0, opacity: 0 },
  visible: (delay: number) => ({
    x: [0, SCAN_DISTANCE],
    opacity: [0, 1, 1, 0],
    transition: { duration: 1.3, ease: 'easeInOut', delay },
  }),
};

function ScanBar({ gradientId }: { gradientId: string }) {
  return (
    <>
      <rect x={38} y={86} width={46} height={150} fill={`url(#${gradientId})`} />
      <rect x={60} y={86} width={2.5} height={150} rx={1.25} fill="white" />
    </>
  );
}

function SignatureScene({ motionOk, active }: { motionOk: boolean; active: boolean }) {
  // useId output contains colons, which some browsers reject inside url(#...).
  const gradientId = `scan-${useId().replace(/:/g, '')}`;

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.35" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.g variants={fadeUp} custom={0.45}>
        <rect x={24} y={30} width={432} height={240} rx={22} fill={WHITE(0.12)} stroke={WHITE(0.4)} strokeWidth={1.5} />
        <line x1={64} y1={222} x2={416} y2={222} stroke={WHITE(0.4)} strokeWidth={1.5} strokeDasharray="6 6" />
        <path d="M 58 206 l 10 10 M 68 206 l -10 10" stroke={WHITE(0.55)} strokeWidth={1.8} strokeLinecap="round" />
      </motion.g>

      {CHECKS.map((check, index) => (
        <motion.g key={check.label} variants={fadeUp} custom={0.6 + index * 0.08}>
          <motion.rect
            x={check.x}
            y={48}
            width={check.width}
            height={26}
            rx={13}
            fill="white"
            variants={chipLight}
            custom={2.2 + index * 0.22}
          />
          <motion.circle cx={check.x + 14} cy={61} r={4} variants={chipDot} custom={2.2 + index * 0.22} />
          <text x={check.x + 25} y={65.5} {...LABEL} className={LABEL_CLASS}>
            {check.label}
          </text>
        </motion.g>
      ))}

      <motion.path
        d={SIGNATURE}
        stroke="white"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={signatureDraw}
        custom={0.8}
      />
      <motion.path d={UNDERLINE} stroke={WHITE(0.85)} strokeWidth={2.5} strokeLinecap="round" fill="none" variants={draw} custom={2.25} />

      {motionOk ? (
        <>
          <motion.g variants={scanOnce} custom={2.1}>
            <ScanBar gradientId={gradientId} />
          </motion.g>
          {/* The repeat scan runs only while hovered; see the note at the top of this file. */}
          <motion.g
            initial={{ x: 0, opacity: 0 }}
            animate={active ? { x: [0, SCAN_DISTANCE], opacity: [0, 1, 1, 0] } : { x: 0, opacity: 0 }}
            transition={
              active
                ? { duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.25 }
                : { opacity: { duration: 0.2 }, x: { duration: 0, delay: 0.2 } }
            }
          >
            <ScanBar gradientId={gradientId} />
          </motion.g>
        </>
      ) : null}

      <motion.text x={402} y={252} textAnchor="end" {...LABEL} className={LABEL_CLASS} variants={fadeUp} custom={3.4}>
        VERIFIED
      </motion.text>
      <motion.g variants={pop} custom={3.35}>
        <Tick cx={422} cy={247} r={12} />
      </motion.g>
    </>
  );
}
