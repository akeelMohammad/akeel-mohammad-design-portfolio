import React, { useEffect, useRef, useState } from 'react';

interface ReticleCursorProps {
  isDragging?: boolean;
}

/**
 * Studio Loum custom crosshair reticle cursor with mix-blend-exclusion.
 * Tracks pointer position and reveals [data-cursor-label] ("SEE THE PROJECT", "NEXT PROJECT").
 */
export const ReticleCursor: React.FC<ReticleCursorProps> = ({ isDragging = false }) => {
  const reticleRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const el = reticleRef.current;
    if (!el) return;

    // Initialize at viewport center matching Layout.astro
    el.style.transform = `translate3d(${window.innerWidth / 2}px, ${window.innerHeight / 2}px, 0)`;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === '') {
        document.documentElement.classList.add('custom-cursor-active');
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        el.style.opacity = '1';
      }
      const hovered = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const target = hovered?.closest?.('[data-cursor-label]') as HTMLElement | null;
      if (target && target.dataset.cursorLabel) {
        setLabel(target.dataset.cursorLabel);
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.('[data-cursor-label]') as HTMLElement | null;
      if (target && target.dataset.cursorLabel) {
        setLabel(target.dataset.cursorLabel);
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    const onMouseLeave = () => {
      if (el) el.style.opacity = '0';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  const showLabel = isActive && !isDragging && label.length > 0;

  return (
    <div
      ref={reticleRef}
      data-reticle
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-60 mix-blend-exclusion max-md:hidden"
    >
      <div
        data-reticle-shape
        className={`relative size-4 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out ${
          isDragging ? 'scale-175' : 'scale-100'
        }`}
      >
        <span className="absolute top-1/2 left-0 h-px w-full bg-white" />
        <span className="absolute top-0 left-1/2 h-full w-px bg-white" />
      </div>
      <span
        data-reticle-label
        className={`absolute top-0 left-3 -translate-y-1/2 text-[10px] whitespace-nowrap text-white uppercase transition-all duration-300 ease-out ${
          showLabel ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
        }`}
      >
        {label || 'See the project'}
      </span>
    </div>
  );
};
