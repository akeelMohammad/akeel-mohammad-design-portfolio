import React, { useEffect, useRef, useState } from 'react';
import { ProjectSlug } from '../data/projects';
import { BrandLogo } from './BrandLogo';
import { ProjectVisual } from './ProjectVisual';

interface LoaderOverlayProps {
  onComplete: () => void;
  onDealStart?: () => void;
}

interface LoaderCardConfig {
  slug: ProjectSlug;
  categoryLabel: string;
  title: string;
  variant: number;
  imageSrc: string;
  widthPx: number;
  heightPx: number;
  initialRotate: number;
  stackRotate: number;
}

interface DealTarget {
  dx: number;
  dy: number;
  width: number;
  height: number;
}

/**
 * Exact Studio Loum loading screen stack:
 * One representative artwork from each of Akeel Mohammad's 5 portfolio categories,
 * organized by size from largest (bottom of stack) to smallest (top of stack),
 * stacking one by one directly on top of each other at center (0, 0) before dealing
 * out into the InfiniteGrid tiles.
 */
export const LOADER_CARDS: LoaderCardConfig[] = [
  {
    slug: 'bst-educational-campaign',
    categoryLabel: 'Educational Class Promotions',
    title: 'BST Educational Video Pack Promotion',
    variant: 1,
    imageSrc: '/assets/aistudio/dileepa_4d1dc9aa.png',
    widthPx: 300,
    heightPx: 375,
    initialRotate: -10,
    stackRotate: -3.5,
  },
  {
    slug: 'posters-and-campaigns',
    categoryLabel: 'Posters & Campaigns',
    title: 'Wetland Cleanup — Beddagama Wetland Park',
    variant: 1,
    imageSrc: '/src/assets/portfolio/poster-18-wetland-cleanup-8-.jpg',
    widthPx: 276,
    heightPx: 345,
    initialRotate: 9,
    stackRotate: 2.8,
  },
  {
    slug: 'reality-reimagined',
    categoryLabel: 'Reality Reimagined',
    title: 'ඇස්වහ කටවහ දුරු වේවා!',
    variant: 1,
    imageSrc: '/assets/aistudio/______________________0bab716f.jpg',
    widthPx: 264,
    heightPx: 264,
    initialRotate: -8,
    stackRotate: -2.0,
  },
  {
    slug: 'ceylon-teanora',
    categoryLabel: 'Ceylon Teanora Packaging',
    title: 'Pure Ceylon Tea Cubes — Packaging Label',
    variant: 1,
    imageSrc: '/assets/aistudio/Pur_tea_59a5ef5c.jpg',
    widthPx: 256,
    heightPx: 178,
    initialRotate: 7,
    stackRotate: 1.5,
  },
  {
    slug: 'youtube-thumbnails',
    categoryLabel: 'YouTube Thumbnails',
    title: 'GCE A/L Arduino — Educational Thumbnail',
    variant: 1,
    imageSrc: '/assets/aistudio/Hirusha_Arduino_0fb14746.jpg',
    widthPx: 248,
    heightPx: 140,
    initialRotate: -6,
    stackRotate: 0,
  },
];

export const LoaderOverlay: React.FC<LoaderOverlayProps> = ({
  onComplete,
  onDealStart,
}) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'stacking' | 'dealing' | 'done'>('counting');
  const [stackedCount, setStackedCount] = useState(0);
  const [dealTargets, setDealTargets] = useState<DealTarget[]>([]);
  const [brandDelta, setBrandDelta] = useState<{ dx: number; dy: number } | null>(null);

  const brandRef = useRef<HTMLSpanElement>(null);
  const hiddenMediaElsRef = useRef<HTMLElement[]>([]);

  // Phase 1: Count 000 -> 100 over 1600ms with power2.inOut easing
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onDealStart?.();
      onComplete();
      return;
    }

    const start = performance.now();
    const countDuration = 1600;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / countDuration);
      // power2.inOut easing
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      setCount(Math.round(eased * 100));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setPhase('stacking');
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete, onDealStart]);

  // Phase 2: Stack the 5 category cards one by one on top of each other at center (0, 0)
  // Stagger: 140ms per card, duration: 900ms with cubic-bezier(0.16, 1, 0.3, 1) (expo.out)
  useEffect(() => {
    if (phase !== 'stacking') return;

    const timers: number[] = [];
    const initialDelay = 100;
    const staggerMs = 140;
    const cardAnimDurationMs = 900;

    LOADER_CARDS.forEach((_, idx) => {
      const t = window.setTimeout(() => {
        setStackedCount(idx + 1);
      }, initialDelay + idx * staggerMs);
      timers.push(t);
    });

    // Trigger Phase 3 (dealing) 150ms after the last card finishes stacking
    const totalStackTime =
      initialDelay + (LOADER_CARDS.length - 1) * staggerMs + cardAnimDurationMs + 150;

    const dealTimer = window.setTimeout(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = vw / 2;
      const cy = vh / 2;

      // Measure top-left [data-brand] target for the left-center [data-loader-brand] glide
      const targetBrandEl = document.querySelector<HTMLElement>('[data-brand]');
      if (brandRef.current && targetBrandEl) {
        const fromRect = brandRef.current.getBoundingClientRect();
        const toRect = targetBrandEl.getBoundingClientRect();
        setBrandDelta({
          dx: toRect.left - fromRect.left,
          dy: toRect.top - fromRect.top,
        });
      }

      // Find visible [data-tile] elements on the InfiniteGrid to deal the 5 stacked cards into
      const allTiles = Array.from(
        document.querySelectorAll<HTMLElement>('[data-grid] [data-tile]')
      );

      interface CandidateTile {
        tileEl: HTMLElement;
        mediaEl: HTMLElement;
        rect: DOMRect;
        slug: string;
        dist: number;
      }

      const visibleCandidates: CandidateTile[] = [];
      for (const tileEl of allTiles) {
        const mediaEl = tileEl.querySelector<HTMLElement>('[data-tile-media]');
        if (!mediaEl) continue;
        const rect = mediaEl.getBoundingClientRect();
        if (
          rect.width > 20 &&
          rect.height > 20 &&
          rect.right > 40 &&
          rect.left < vw - 40 &&
          rect.bottom > 40 &&
          rect.top < vh - 40
        ) {
          const dist = Math.hypot(
            rect.left + rect.width / 2 - cx,
            rect.top + rect.height / 2 - cy
          );
          visibleCandidates.push({
            tileEl,
            mediaEl,
            rect,
            slug: tileEl.getAttribute('data-slug') || '',
            dist,
          });
        }
      }

      visibleCandidates.sort((a, b) => a.dist - b.dist);

      const usedMediaEls = new Set<HTMLElement>();
      const computedTargets: DealTarget[] = LOADER_CARDS.map((card, idx) => {
        // Prefer a visible tile matching this card's category slug, or fallback to closest unused visible tile
        let chosen = visibleCandidates.find(
          (c) => c.slug === card.slug && !usedMediaEls.has(c.mediaEl)
        );
        if (!chosen) {
          chosen = visibleCandidates.find((c) => !usedMediaEls.has(c.mediaEl));
        }

        if (chosen) {
          usedMediaEls.add(chosen.mediaEl);
          return {
            dx: chosen.rect.left + chosen.rect.width / 2 - cx,
            dy: chosen.rect.top + chosen.rect.height / 2 - cy,
            width: chosen.rect.width,
            height: chosen.rect.height,
          };
        }

        // Fallback radial spread if no DOM tile matched
        const angle = (idx / LOADER_CARDS.length) * Math.PI * 2;
        return {
          dx: Math.cos(angle) * 280,
          dy: Math.sin(angle) * 180,
          width: card.widthPx * 0.65,
          height: card.heightPx * 0.65,
        };
      });

      // Temporarily hide dealt target media elements during card flight, and animate other visible tiles with clip-path inset(50%) -> inset(0%)
      const dealtMediaList = Array.from(usedMediaEls);
      hiddenMediaElsRef.current = dealtMediaList;
      dealtMediaList.forEach((el) => {
        el.style.opacity = '0';
      });

      for (const candidate of visibleCandidates) {
        if (!usedMediaEls.has(candidate.mediaEl)) {
          candidate.mediaEl.animate(
            [
              { clipPath: 'inset(50% 50% 50% 50%)' },
              { clipPath: 'inset(0% 0% 0% 0%)' },
            ],
            {
              duration: 1000,
              delay: 200,
              easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
              fill: 'both',
            }
          );
        }
      }

      setDealTargets(computedTargets);
      setPhase('dealing');
      onDealStart?.();
    }, totalStackTime);

    timers.push(dealTimer);
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [phase, onDealStart]);

  // Phase 3: Complete deal after 1200ms flight + 4 * 70ms stagger
  useEffect(() => {
    if (phase !== 'dealing') return;

    const totalDealDuration = 1200 + (LOADER_CARDS.length - 1) * 70 + 60;
    const doneTimer = window.setTimeout(() => {
      hiddenMediaElsRef.current.forEach((el) => {
        el.style.opacity = '';
      });
      hiddenMediaElsRef.current = [];
      setPhase('done');
      onComplete();
    }, totalDealDuration);

    return () => {
      window.clearTimeout(doneTimer);
    };
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      data-loader
      aria-hidden="true"
      style={{
        transitionDelay: phase === 'dealing' ? '150ms' : '0ms',
      }}
      className={`pointer-events-none fixed inset-0 z-50 transition-colors duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === 'dealing' ? 'bg-white/0' : 'bg-white'
      }`}
    >
      {/* Left-center Akeel Mohammad monogram logo that glides to top-left [data-brand] on deal */}
      <span
        ref={brandRef}
        data-loader-brand
        style={
          phase === 'dealing' && brandDelta
            ? {
                transform: `translate3d(${brandDelta.dx}px, calc(-50% + ${brandDelta.dy}px), 0)`,
              }
            : undefined
        }
        className="absolute top-1/2 left-4 -translate-y-1/2 text-sm uppercase transition-transform duration-1200 ease-[cubic-bezier(0.76,0,0.24,1)]"
      >
        <BrandLogo className="h-4 w-auto md:h-5" />
      </span>

      {/* Center 000..100 tabular counter */}
      <span
        data-loader-count
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm tabular-nums transition-opacity duration-300 ease-out ${
          phase === 'counting' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {String(count).padStart(3, '0')}
      </span>

      {/* Center Card Stack: 5 Category Images Organized by Size Stacking One by One at (0, 0) */}
      <div
        data-loader-stack
        className="absolute top-1/2 left-1/2 size-0 -translate-x-1/2 -translate-y-1/2"
      >
        {LOADER_CARDS.map((card, idx) => {
          const isStacked = idx < stackedCount;
          const isDealing = phase === 'dealing';
          const target = dealTargets[idx];

          // Reverse stagger on deal (top card deals first, matching Studio Loum's stagger: { each: 0.07, from: "end" })
          const dealStaggerMs = (LOADER_CARDS.length - 1 - idx) * 70;

          const cardWidth = isDealing && target ? target.width : card.widthPx;
          const cardHeight = isDealing && target ? target.height : card.heightPx;

          let transformValue: string;
          if (isDealing && target) {
            transformValue = `perspective(1400px) translate3d(${target.dx - cardWidth / 2}px, ${target.dy - cardHeight / 2}px, 0px) rotateX(0deg) rotate(0deg) scale(1)`;
          } else if (isStacked) {
            // Stacked directly on top of each other at center (0, 0)
            transformValue = `perspective(1400px) translate3d(${-card.widthPx / 2}px, ${-card.heightPx / 2}px, 0px) rotateX(0deg) rotate(${card.stackRotate}deg) scale(1)`;
          } else {
            // Initial state below center with 3D tilt (yPercent: 70, rotateX: -55, scale: 0.8)
            transformValue = `perspective(1400px) translate3d(${-card.widthPx / 2}px, ${-card.heightPx / 2 + card.heightPx * 0.7}px, 0px) rotateX(-55deg) rotate(${card.initialRotate}deg) scale(0.8)`;
          }

          return (
            <div
              key={card.slug}
              data-loader-card
              data-category={card.slug}
              style={{
                zIndex: idx + 1,
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transform: transformValue,
                transitionProperty: 'transform, width, height, opacity, box-shadow',
                transitionDuration: isDealing ? '1200ms' : '900ms',
                transitionTimingFunction: isDealing
                  ? 'cubic-bezier(0.76, 0, 0.24, 1)'
                  : 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: isDealing ? `${dealStaggerMs}ms` : '0ms',
              }}
              className={`absolute top-0 left-0 overflow-hidden bg-neutral-200 will-change-transform ${
                isDealing
                  ? 'opacity-100 shadow-none'
                  : isStacked
                    ? 'opacity-100 shadow-2xl'
                    : 'pointer-events-none opacity-0 shadow-none'
              }`}
            >
              <ProjectVisual
                slug={card.slug}
                variant={card.variant}
                imageSrc={card.imageSrc}
                alt={card.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
