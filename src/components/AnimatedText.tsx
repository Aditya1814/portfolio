import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, type CSSProperties } from 'react';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

/** Reveals text character by character (opacity 0.2 → 1) as the paragraph scrolls through the viewport. */
export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });
  const characters = Array.from(text);

  return (
    <p ref={paragraphRef} className={`relative ${className}`} style={style}>
      {/* Screen readers get the sentence once instead of hundreds of single-letter spans. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {characters.map((character, index) => {
          const start = index / characters.length;
          const end = start + 1 / characters.length;
          return (
            <Character
              key={index}
              character={character}
              progress={scrollYProgress}
              range={[start, end]}
            />
          );
        })}
      </span>
    </p>
  );
}

type CharacterProps = {
  character: string;
  progress: MotionValue<number>;
  range: [number, number];
};

function Character({ character, progress, range }: CharacterProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative">
      {/* Invisible placeholder keeps layout and line wrapping identical to plain text. */}
      <span className="invisible">{character}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {character}
      </motion.span>
    </span>
  );
}
