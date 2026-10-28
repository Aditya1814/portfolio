import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

type FadeInTag = 'div' | 'nav' | 'h1' | 'h2' | 'p' | 'li';
type MotionTag = typeof motion.div;

// motion.create() must not run on every render (it would remount the element),
// so each tag's motion component is created once and reused.
const motionTags = new Map<FadeInTag, MotionTag>();

function getMotionTag(tag: FadeInTag): MotionTag {
  let component = motionTags.get(tag);
  if (!component) {
    component = motion.create(tag) as MotionTag;
    motionTags.set(tag, component);
  }
  return component;
}

type FadeInProps = {
  as?: FadeInTag;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
};

export default function FadeIn({
  as = 'div',
  children,
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const Component = getMotionTag(as);

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
}
