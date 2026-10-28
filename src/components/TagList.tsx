import { motion, type Variants } from 'framer-motion';

type TagListProps = {
  tags: readonly string[];
  /** Accessible name for the list, e.g. "Technologies used". */
  label: string;
  /** Surface the pills sit on. */
  tone?: 'light' | 'dark';
  className?: string;
};

const EASE = [0.25, 0.1, 0.25, 1] as const;

const list: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.15, staggerChildren: 0.04 } },
};
const pill: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

const TONES = {
  light: 'border-[#0C0C0C]/15 text-[#0C0C0C]/75',
  dark: 'border-[#D7E2EA]/25 text-[#D7E2EA]/85',
} as const;

/** Outlined pills that pop in one after another when the list scrolls into view. */
export default function TagList({ tags, label, tone = 'light', className = '' }: TagListProps) {
  return (
    <motion.ul
      aria-label={label}
      className={`flex flex-wrap gap-2 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '50px', amount: 0 }}
      variants={list}
    >
      {tags.map((tag) => (
        <motion.li
          key={tag}
          variants={pill}
          className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider sm:text-sm ${TONES[tone]}`}
        >
          {tag}
        </motion.li>
      ))}
    </motion.ul>
  );
}
