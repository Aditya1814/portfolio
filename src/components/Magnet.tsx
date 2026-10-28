import { useEffect, useRef, type ReactNode } from 'react';

type MagnetProps = {
  children: ReactNode;
  /** Distance in px beyond the element's edges where the pull starts. */
  padding?: number;
  /** Higher values move the element less (offset = distance / strength). */
  strength?: number;
  disabled?: boolean;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  innerClassName?: string;
};

export default function Magnet({
  children,
  padding = 100,
  strength = 2,
  disabled = false,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  className = 'inline-block',
  innerClassName = '',
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const release = () => {
      inner.style.transition = inactiveTransition;
      inner.style.transform = 'translate3d(0px, 0px, 0)';
    };

    if (disabled) {
      release();
      return;
    }

    let isActive = false;

    // Transforms are written straight to the DOM so mouse movement never re-renders React.
    const handleMouseMove = (event: MouseEvent) => {
      const { left, top, width, height } = wrapper.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const isNear =
        Math.abs(event.clientX - centerX) < width / 2 + padding &&
        Math.abs(event.clientY - centerY) < height / 2 + padding;

      if (isNear) {
        if (!isActive) {
          isActive = true;
          inner.style.transition = activeTransition;
        }
        const offsetX = (event.clientX - centerX) / strength;
        const offsetY = (event.clientY - centerY) / strength;
        inner.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      } else if (isActive) {
        isActive = false;
        release();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength, disabled, activeTransition, inactiveTransition]);

  return (
    <div ref={wrapperRef} className={className} style={{ position: 'relative' }}>
      <div
        ref={innerRef}
        className={innerClassName}
        style={{
          transform: 'translate3d(0px, 0px, 0)',
          transition: inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
