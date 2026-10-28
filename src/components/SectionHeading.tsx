import type { ReactNode } from 'react';
import FadeIn from './FadeIn';

type SectionHeadingProps = {
  children: ReactNode;
  /** Background the heading sits on: dark sections get gradient text, white panels get solid black. */
  surface: 'dark' | 'light';
  className?: string;
};

export default function SectionHeading({ children, surface, className = '' }: SectionHeadingProps) {
  const tone = surface === 'dark' ? 'hero-heading' : 'text-[#0C0C0C]';

  return (
    <FadeIn
      as="h2"
      delay={0}
      y={40}
      className={`text-center font-black uppercase leading-none tracking-tight ${tone} ${className}`}
      style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
    >
      {children}
    </FadeIn>
  );
}
