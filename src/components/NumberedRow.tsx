import type { CSSProperties, ReactNode } from 'react';
import FadeIn from './FadeIn';

type NumberedRowProps = {
  index: number;
  /** Big leading label, e.g. "01" or a year. */
  marker: string;
  markerClassName?: string;
  markerStyle?: CSSProperties;
  /** Puts the marker above the content on phones, for rows with long text. */
  stackOnMobile?: boolean;
  children: ReactNode;
};

const DEFAULT_MARKER_STYLE: CSSProperties = { fontSize: 'clamp(3rem, 10vw, 140px)' };

/** One row of the numbered lists on the white panels (experience, skills, education). */
export default function NumberedRow({
  index,
  marker,
  // A fixed em width lines up every text column, since "01" renders narrower than "04".
  markerClassName = 'min-w-[1.3em]',
  markerStyle = DEFAULT_MARKER_STYLE,
  stackOnMobile = false,
  children,
}: NumberedRowProps) {
  const layout = stackOnMobile
    ? 'flex-col gap-4 sm:flex-row sm:items-start sm:gap-8 md:gap-12'
    : 'items-start gap-5 sm:gap-8 md:gap-12';
  const divider = index > 0 ? 'border-t border-[#0C0C0C]/15' : '';

  return (
    <FadeIn as="li" delay={index * 0.1} className={`flex py-8 sm:py-10 md:py-12 ${layout} ${divider}`}>
      <span className={`shrink-0 font-black leading-none text-[#0C0C0C] ${markerClassName}`} style={markerStyle}>
        {marker}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">{children}</div>
    </FadeIn>
  );
}
