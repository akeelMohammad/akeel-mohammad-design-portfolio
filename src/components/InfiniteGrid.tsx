import React, { useEffect, useRef, useState } from 'react';
import { ProjectSlug, WORLD_TILES, WorldTileInstance } from '../data/projects';
import {
  CELL_SIZE,
  CHUNK_H,
  CHUNK_W,
  computeWrappedPosition,
  formatHudCoord,
  formatHudSpeed,
  LERP_FACTOR,
  MOBILE_SCALE,
  PARALLAX_STRENGTH,
  PERIOD_X,
  PERIOD_Y,
  scrambleTextAtProgress,
  WRAP_BUFFER,
} from '../utils/gridMath';
import { BrandLogo } from './BrandLogo';
import { CropMarks } from './CropMarks';
import { ProjectVisual } from './ProjectVisual';

interface InfiniteGridProps {
  isReady: boolean;
  onSelectProject: (slug: ProjectSlug) => void;
  onDraggingChange: (dragging: boolean) => void;
}

const HEADER_LINES = [
  'Designing visuals that speak.',
  'Graphic Designer & Digital Creative',
];

const CAMERA_STORAGE_KEY = 'loum:camera';

const GRID_BG_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cpath d='M0 140.5H280M140.5 0V280' stroke='%23efefef'/%3E%3Cpath d='M134 140.5H147M140.5 134V147' stroke='%23c4c4c4'/%3E%3Cg fill='%23d9d9d9'%3E%3Crect x='70' y='70' width='1' height='1'/%3E%3Crect x='70' y='210' width='1' height='1'/%3E%3Crect x='210' y='70' width='1' height='1'/%3E%3Crect x='210' y='210' width='1' height='1'/%3E%3C/g%3E%3C/svg%3E")`;

/**
 * Studio Loum 2D Infinite Canvas Grid (88 project figures tiled in a 2×2 period = 352 DOM nodes).
 * Supports pointer drag with momentum throw, 2D wheel panning, keyboard panning,
 * subtle mouse parallax, live X/Y & Speed HUD telemetry, and tile hover scramble.
 */
export const InfiniteGrid: React.FC<InfiniteGridProps> = ({
  isReady,
  onSelectProject,
  onDraggingChange,
}) => {
  const mainRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const coordXRef = useRef<HTMLSpanElement>(null);
  const coordYRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const tileElsRef = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const titleElsRef = useRef<Map<string, HTMLSpanElement>>(new Map());

  const [headerLines, setHeaderLines] = useState<string[]>(HEADER_LINES);

  // Scramble header tagline when grid becomes ready
  useEffect(() => {
    if (!isReady) return;
    const start = performance.now();
    const duration = 1100;
    const id = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(1, elapsed / duration);
      setHeaderLines(
        HEADER_LINES.map((line, idx) => {
          const lineProgress = Math.max(0, Math.min(1, (progress - idx * 0.08) / 0.84));
          return scrambleTextAtProgress(line, lineProgress, idx * 19 + Math.floor(elapsed));
        })
      );
      if (progress >= 1) {
        window.clearInterval(id);
      }
    }, 30);
    return () => window.clearInterval(id);
  }, [isReady]);

  // 60fps Infinite 2D Canvas Camera Loop
  useEffect(() => {
    const mainEl = mainRef.current;
    const bgEl = bgRef.current;
    const worldEl = worldRef.current;
    if (!mainEl || !bgEl || !worldEl) return;

    const getScale = () => (window.matchMedia('(max-width: 767px)').matches ? MOBILE_SCALE : 1);
    let scale = getScale();

    const applyWorldScale = () => {
      scale = getScale();
      worldEl.style.transform = `scale(${scale})`;
      bgEl.style.backgroundSize = `${CELL_SIZE * scale}px ${CELL_SIZE * scale}px`;
    };
    applyWorldScale();

    const getOrigin = () => ({
      x: window.innerWidth / scale / 2 - CHUNK_W / 2,
      y: window.innerHeight / scale / 2 - CHUNK_H / 2,
    });

    const origin = getOrigin();
    let savedCamera: { x: number; y: number } | null = null;
    try {
      const raw = sessionStorage.getItem(CAMERA_STORAGE_KEY);
      if (raw) savedCamera = JSON.parse(raw);
    } catch {
      savedCamera = null;
    }

    const targetCam = savedCamera ? { ...savedCamera } : { ...origin };
    const currentCam = { ...targetCam };
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };
    const velocity = { x: 0, y: 0, time: 0 };

    let pointerDown: { x: number; y: number; id: number } | null = null;
    let isDragging = false;
    let suppressNextClick = false;
    let lastSpeed = -1;
    let rafId = 0;

    let hasInitialRender = false;

    const renderFrame = () => {
      const prevX = currentCam.x;
      const prevY = currentCam.y;
      const prevPx = parallax.x;
      const prevPy = parallax.y;

      currentCam.x += (targetCam.x - currentCam.x) * LERP_FACTOR;
      currentCam.y += (targetCam.y - currentCam.y) * LERP_FACTOR;
      parallax.x += (parallax.tx - parallax.x) * 0.05;
      parallax.y += (parallax.ty - parallax.y) * 0.05;

      const camDelta = Math.hypot(currentCam.x - prevX, currentCam.y - prevY);
      const parDelta = Math.hypot(parallax.x - prevPx, parallax.y - prevPy);

      if (!hasInitialRender || camDelta > 0.002 || parDelta > 0.002) {
        hasInitialRender = true;
        const offsetX = currentCam.x + parallax.x;
        const offsetY = currentCam.y + parallax.y;

        for (const tile of WORLD_TILES) {
          const el = tileElsRef.current.get(tile.instanceId);
          if (!el) continue;
          const { x, y } = computeWrappedPosition(
            tile.worldX,
            tile.worldY,
            offsetX,
            offsetY,
            PERIOD_X,
            PERIOD_Y,
            WRAP_BUFFER
          );
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }

        bgEl.style.backgroundPosition = `${(offsetX - CELL_SIZE / 2) * scale}px ${(offsetY - CELL_SIZE / 2) * scale}px`;

        if (coordXRef.current) {
          coordXRef.current.textContent = formatHudCoord(origin.x - offsetX);
        }
        if (coordYRef.current) {
          coordYRef.current.textContent = formatHudCoord(origin.y - offsetY);
        }
      }

      const speedStr = formatHudSpeed(currentCam.x - prevX, currentCam.y - prevY);
      const speedNum = parseFloat(speedStr);
      if (speedRef.current && speedNum !== lastSpeed) {
        speedRef.current.textContent = speedStr;
        lastSpeed = speedNum;
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);

    const onPointerDown = (e: PointerEvent) => {
      suppressNextClick = false;
      if (e.button !== 0) return;
      pointerDown = { x: e.clientX, y: e.clientY, id: e.pointerId };
      velocity.x = 0;
      velocity.y = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === '') {
        parallax.tx = -(e.clientX / window.innerWidth - 0.5) * PARALLAX_STRENGTH;
        parallax.ty = -(e.clientY / window.innerHeight - 0.5) * PARALLAX_STRENGTH;
      }
      if (!pointerDown) return;

      if (!isDragging) {
        if (Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y) < 5) return;
        isDragging = true;
        onDraggingChange(true);
        try {
          mainEl.setPointerCapture(pointerDown.id);
        } catch {
          // ignore synthetic event pointerId
        }
      }

      const dx = e.clientX - pointerDown.x;
      const dy = e.clientY - pointerDown.y;
      targetCam.x += dx / scale;
      targetCam.y += dy / scale;
      velocity.x = Math.max(-40, Math.min(40, dx));
      velocity.y = Math.max(-40, Math.min(40, dy));
      velocity.time = performance.now();
      pointerDown = { ...pointerDown, x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      if (isDragging) {
        suppressNextClick = true;
        onDraggingChange(false);
        if (performance.now() - velocity.time < 80) {
          targetCam.x += (velocity.x * 12) / scale;
          targetCam.y += (velocity.y * 12) / scale;
        }
        try {
          sessionStorage.setItem(CAMERA_STORAGE_KEY, JSON.stringify(targetCam));
        } catch {
          // ignore
        }
      }
      pointerDown = null;
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetCam.x -= e.deltaX / scale;
      targetCam.y -= e.deltaY / scale;
      try {
        sessionStorage.setItem(CAMERA_STORAGE_KEY, JSON.stringify(targetCam));
      } catch {
        // ignore
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const step = 140;
      if (e.key === 'ArrowLeft') targetCam.x += step;
      else if (e.key === 'ArrowRight') targetCam.x -= step;
      else if (e.key === 'ArrowUp') targetCam.y += step;
      else if (e.key === 'ArrowDown') targetCam.y -= step;
    };

    const onClickCapture = (e: MouseEvent) => {
      if (suppressNextClick) {
        e.preventDefault();
        e.stopPropagation();
        suppressNextClick = false;
      }
    };

    const onResize = () => {
      applyWorldScale();
    };

    mainEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    mainEl.addEventListener('wheel', onWheel, { passive: false });
    mainEl.addEventListener('click', onClickCapture, true);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      mainEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      mainEl.removeEventListener('wheel', onWheel);
      mainEl.removeEventListener('click', onClickCapture, true);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [onDraggingChange]);

  const handleTileHover = (tile: WorldTileInstance) => {
    const titleEl = titleElsRef.current.get(tile.instanceId);
    if (!titleEl) return;
    const start = performance.now();
    const duration = 450;
    const id = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(1, elapsed / duration);
      titleEl.textContent = scrambleTextAtProgress(
        tile.title,
        progress,
        tile.id + Math.floor(elapsed)
      );
      if (progress >= 1) {
        window.clearInterval(id);
      }
    }, 28);
  };

  const handleTileClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: ProjectSlug) => {
    e.preventDefault();
    onSelectProject(slug);
  };

  return (
    <>
      <h1 className="sr-only">
        Akeel Mohammad — Graphic Designer &amp; Digital Creative. Designing visuals that speak.
        Exploring the intersection of creativity, communication, and visual storytelling through
        branding, digital design, and experimental art.
      </h1>

      {/* Fixed Top Header with mix-blend-exclusion */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 grid grid-cols-12 gap-4 px-4 pt-3 text-sm uppercase text-white mix-blend-exclusion">
        <a
          href="/"
          onClick={(e) => e.preventDefault()}
          data-brand
          aria-label="Akeel Mohammad"
          className="pointer-events-auto col-span-4 inline-flex items-center md:col-span-3"
        >
          <BrandLogo className="h-4 w-auto md:h-5" invertForExclusion />
        </a>
        <div className="col-span-8 col-start-5 text-right text-[10px] leading-tight md:col-span-6 md:col-start-7 md:text-sm">
          {headerLines.map((line, i) => (
            <p key={i} className="min-h-[1lh]" data-scramble>
              {line}
            </p>
          ))}
        </div>
      </header>

      {/* Top HUD X / Y Camera Coordinates */}
      <div
        data-hud
        className="pointer-events-none fixed inset-x-0 top-16 z-40 hidden justify-between px-4 text-[10px] text-neutral-400 uppercase tabular-nums md:flex"
      >
        <span>
          X{' '}
          <span ref={coordXRef} className="text-neutral-950" data-coord-x>
            +0000.00
          </span>
        </span>
        <span>
          Y{' '}
          <span ref={coordYRef} className="text-neutral-950" data-coord-y>
            +0000.00
          </span>
        </span>
      </div>

      {/* Bottom-left Scale Ruler HUD */}
      <div
        data-hud
        className="pointer-events-none fixed bottom-5 left-4 z-40 hidden text-[10px] text-neutral-400 uppercase md:block"
      >
        <div className="mb-1.5 h-1.5 w-[100px] border-x border-b border-neutral-400" />
        100 px — drag to explore
      </div>

      {/* Bottom-right Speed HUD */}
      <div
        data-hud
        className="pointer-events-none fixed right-4 bottom-5 z-40 hidden text-[10px] text-neutral-400 uppercase tabular-nums md:block"
      >
        Speed{' '}
        <span ref={speedRef} className="text-neutral-950" data-speed>
          00.0
        </span>
      </div>

      {/* Infinite 2D Canvas Viewport */}
      <main
        ref={mainRef}
        data-grid
        data-ready
        data-testid="infinite-grid-canvas"
        data-chunk-w={CHUNK_W}
        data-chunk-h={CHUNK_H}
        data-period-x={PERIOD_X}
        data-period-y={PERIOD_Y}
        data-cell={CELL_SIZE}
        className="fixed inset-0 touch-none overflow-hidden select-none"
      >
        {/* 280px Technical Crosshair SVG Grid Background */}
        <div
          ref={bgRef}
          data-grid-bg
          className="absolute inset-0"
          style={{
            backgroundImage: GRID_BG_SVG,
            backgroundSize: '280px 280px',
          }}
        />

        {/* World Layer containing the 352 (88 × 4) wrapped project tiles */}
        <div ref={worldRef} data-grid-world className="absolute top-0 left-0 origin-top-left">
          {WORLD_TILES.map((tile) => (
            <a
              key={tile.instanceId}
              ref={(el) => {
                if (el) tileElsRef.current.set(tile.instanceId, el);
                else tileElsRef.current.delete(tile.instanceId);
              }}
              href={`/work/${tile.slug}`}
              onClick={(e) => handleTileClick(e, tile.slug)}
              onPointerEnter={() => handleTileHover(tile)}
              draggable={false}
              data-tile
              data-slug={tile.slug}
              data-x={tile.worldX}
              data-y={tile.worldY}
              data-cursor-label="See the project"
              style={{ width: `${tile.w}px` }}
              className="tile marks-hover absolute top-0 left-0 block"
            >
              <figure>
                <figcaption className="mb-2 flex items-baseline justify-between gap-2 text-[10px] leading-none whitespace-nowrap uppercase max-md:text-[14px]">
                  <span className="text-neutral-400">{tile.num}</span>
                  <span
                    ref={(el) => {
                      if (el) titleElsRef.current.set(tile.instanceId, el);
                      else titleElsRef.current.delete(tile.instanceId);
                    }}
                    data-tile-title
                    className="tile-title text-neutral-300 transition-colors duration-200"
                  >
                    {tile.title}
                  </span>
                </figcaption>

                <div className="relative">
                  <div
                    data-tile-media
                    style={{ height: `${tile.h}px` }}
                    className="overflow-hidden bg-neutral-100"
                  >
                    <ProjectVisual
                      slug={tile.slug}
                      variant={tile.variant}
                      imageSrc={tile.imageSrc}
                      alt={tile.alt}
                    />
                  </div>
                  <CropMarks dimensionText={tile.dim} />
                </div>
              </figure>
            </a>
          ))}
        </div>
      </main>
    </>
  );
};
