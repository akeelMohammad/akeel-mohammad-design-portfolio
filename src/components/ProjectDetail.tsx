import React, { useEffect, useRef, useState } from 'react';
import { PROJECT_LIST, PROJECTS, ProjectSlug } from '../data/projects';
import { formatScrollPercent, scrambleTextAtProgress } from '../utils/gridMath';
import { BrandLogo } from './BrandLogo';
import { CropMarks } from './CropMarks';
import { ProjectVisual } from './ProjectVisual';

interface ProjectDetailProps {
  slug: ProjectSlug;
  onBackToIndex: () => void;
  onSelectProject: (slug: ProjectSlug) => void;
}

/**
 * Portfolio Project Case Study Page (/work/:slug).
 * Preserves the exact 12-column spec-sheet hero, permanent cover registration marks (.marks-on),
 * (01) Description, (02) Figures 2-per-row paired layout with the exact Studio Loum scroll-triggered
 * clip-path reveal (inset(100% 0% 0% 0%) -> inset(0% 0% 0% 0%), 1.2s cubic-bezier(0.76,0,0.24,1))
 * excluding the intro cover image, and the sticky 210svh "Keep scrolling 000%" next-project transition zone.
 */
export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  slug,
  onBackToIndex,
  onSelectProject,
}) => {
  const project = PROJECTS[slug] || PROJECTS['posters-and-campaigns'];
  const nextProject = PROJECTS[project.nextSlug] || PROJECTS['bst-educational-campaign'];
  const totalCount = String(PROJECT_LIST.length).padStart(3, '0');

  const [backLabel, setBackLabel] = useState('Back to index');
  const [scrambledYear, setScrambledYear] = useState(project.year);
  const [scrambledSector, setScrambledSector] = useState(project.sector);
  const [scrambledServices, setScrambledServices] = useState<string[]>(project.services);
  const [scrambledImages, setScrambledImages] = useState(project.imagesCount);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [revealedFigures, setRevealedFigures] = useState<Record<string, boolean>>({});

  const nextZoneRef = useRef<HTMLElement>(null);
  const figureElsRef = useRef<Map<string, HTMLElement>>(new Map());
  const transitioningRef = useRef(false);

  // Scroll to top & trigger scramble-in and split-char reveal on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    transitioningRef.current = false;
    setScrollProgress(0);
    setHeroRevealed(false);
    setRevealedFigures({});

    const revealTimer = window.setTimeout(() => setHeroRevealed(true), 40);

    const start = performance.now();
    const duration = 780;
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const p = Math.min(1, elapsed / duration);
      const seed = Math.floor(elapsed);

      setScrambledYear(scrambleTextAtProgress(project.year, p, seed + 1));
      setScrambledSector(scrambleTextAtProgress(project.sector, p, seed + 7));
      setScrambledServices(
        project.services.map((s, idx) =>
          scrambleTextAtProgress(s, Math.max(0, Math.min(1, (p - idx * 0.08) / 0.84)), seed + idx * 13)
        )
      );
      setScrambledImages(scrambleTextAtProgress(project.imagesCount, p, seed + 29));

      if (p >= 1) {
        window.clearInterval(interval);
      }
    }, 28);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearInterval(interval);
    };
  }, [slug, project]);

  // Exact Studio Loum scroll-triggered reveal for (02) Figures ([data-figure])
  // Trigger start: "top 88%" (when figure top <= 88% of viewport height)
  // Excludes the intro cover image ([data-hero]).
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const allRevealed: Record<string, boolean> = {};
      project.figures.forEach((f) => {
        allRevealed[f.id] = true;
      });
      setRevealedFigures(allRevealed);
      return;
    }

    const checkVisibleFigures = () => {
      const triggerLine = window.innerHeight * 0.88;
      setRevealedFigures((prev) => {
        let changed = false;
        const next = { ...prev };
        figureElsRef.current.forEach((el, figId) => {
          if (!next[figId]) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerLine) {
              next[figId] = true;
              changed = true;
            }
          }
        });
        return changed ? next : prev;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        setRevealedFigures((prev) => {
          let changed = false;
          const next = { ...prev };
          for (const entry of entries) {
            const figId = entry.target.getAttribute('data-figure-id');
            if (
              figId &&
              !next[figId] &&
              (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight * 0.88)
            ) {
              next[figId] = true;
              changed = true;
            }
          }
          return changed ? next : prev;
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    figureElsRef.current.forEach((el) => observer.observe(el));
    const initTimer = window.setTimeout(checkVisibleFigures, 60);
    window.addEventListener('scroll', checkVisibleFigures, { passive: true });
    window.addEventListener('resize', checkVisibleFigures);

    return () => {
      window.clearTimeout(initTimer);
      observer.disconnect();
      window.removeEventListener('scroll', checkVisibleFigures);
      window.removeEventListener('resize', checkVisibleFigures);
    };
  }, [slug, project.figures]);

  // Monitor scroll inside the sticky [data-next-zone] section for 000% -> 100% transition
  useEffect(() => {
    const onScroll = () => {
      const zone = nextZoneRef.current;
      if (!zone || transitioningRef.current) return;

      const rect = zone.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setScrollProgress(rawProgress);

      if (rawProgress >= 0.992 && !transitioningRef.current) {
        transitioningRef.current = true;
        setScrollProgress(1);
        window.setTimeout(() => {
          onSelectProject(nextProject.slug);
        }, 260);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [nextProject.slug, onSelectProject]);

  const handleBackHover = () => {
    const target = 'Back to index';
    const start = performance.now();
    const duration = 420;
    const id = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const p = Math.min(1, elapsed / duration);
      setBackLabel(scrambleTextAtProgress(target, p, Math.floor(elapsed)));
      if (p >= 1) window.clearInterval(id);
    }, 28);
  };

  // Interpolate next-project media inset clip-path from 38% 34% to 0% 0%
  const insetV = Math.round((1 - scrollProgress) * 38);
  const insetH = Math.round((1 - scrollProgress) * 34);

  return (
    <div className="min-h-svh bg-white text-neutral-950">
      {/* Fixed Top Header with mix-blend-exclusion */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 grid grid-cols-12 gap-4 px-4 pt-3 text-sm uppercase text-white mix-blend-exclusion">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onBackToIndex();
          }}
          data-brand
          aria-label="Akeel Mohammad"
          className="pointer-events-auto col-span-4 inline-flex items-center md:col-span-3"
        >
          <BrandLogo className="h-4 w-auto md:h-5" invertForExclusion />
        </a>
        <div className="col-span-8 col-start-5 text-right text-[10px] md:col-span-6 md:col-start-7 md:text-sm">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBackToIndex();
            }}
            onPointerEnter={handleBackHover}
            data-back
            className="pointer-events-auto transition-colors duration-300 hover:text-neutral-400"
          >
            ← <span>{backLabel}</span>
          </a>
        </div>
      </header>

      <main className="px-4" data-project data-slug={project.slug}>
        {/* Hero Section: Title, Spec Sheet, Uncropped Cover with Registration Marks, and Description */}
        <section className="grid grid-cols-12 grid-rows-[auto_1fr] gap-x-4 gap-y-6 pt-16 pb-12 md:h-svh">
          <div className="col-span-12 flex justify-between text-[10px] text-neutral-400 uppercase">
            <span>
              N°{project.number} — {project.subtitle}
            </span>
            <span>
              {project.number} / {totalCount}
            </span>
          </div>

          {/* Left Column: Oversized Split Title + Spec Sheet */}
          <div className="col-span-12 flex min-h-0 flex-col justify-between gap-10 max-md:contents md:col-span-4">
            <h1
              aria-label={project.title}
              className="overflow-clip text-[10.5vw] leading-[0.88] tracking-tight max-md:col-span-12 md:text-[3.8vw]"
            >
              <span className="inline-block" aria-hidden="true">
                {project.title.split(' ').map((word, wIdx, words) => (
                  <span key={wIdx} className="inline-block whitespace-nowrap">
                    {word.split('').map((ch, cIdx) => {
                      const charOffset =
                        words.slice(0, wIdx).reduce((acc, w) => acc + w.length + 1, 0) + cIdx;
                      return (
                        <span
                          key={cIdx}
                          style={{
                            transitionDelay: `${charOffset * 20}ms`,
                            transform: heroRevealed ? 'translateY(0%)' : 'translateY(110%)',
                          }}
                          className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        >
                          {ch}
                        </span>
                      );
                    })}
                    {wIdx < words.length - 1 ? '\u00A0' : ''}
                  </span>
                ))}
              </span>
            </h1>

            <dl className="text-[10px] leading-[0.95] uppercase max-md:order-last max-md:col-span-12">
              <div
                data-spec-row
                className="grid grid-cols-3 border-t border-neutral-200 py-2 last:border-b"
              >
                <dt className="text-neutral-400">Year</dt>
                <dd className="col-span-2">
                  <span className="block">{scrambledYear}</span>
                </dd>
              </div>

              <div
                data-spec-row
                className="grid grid-cols-3 border-t border-neutral-200 py-2 last:border-b"
              >
                <dt className="text-neutral-400">Category</dt>
                <dd className="col-span-2">
                  <span className="block">{scrambledSector}</span>
                </dd>
              </div>

              <div
                data-spec-row
                className="grid grid-cols-3 border-t border-neutral-200 py-2 last:border-b"
              >
                <dt className="text-neutral-400">Disciplines</dt>
                <dd className="col-span-2 space-y-0.5">
                  {scrambledServices.map((srv, idx) => (
                    <span key={idx} className="block">
                      {srv}
                    </span>
                  ))}
                </dd>
              </div>

              <div
                data-spec-row
                className="grid grid-cols-3 border-t border-neutral-200 py-2 last:border-b"
              >
                <dt className="text-neutral-400">Images</dt>
                <dd className="col-span-2">
                  <span className="block">{scrambledImages}</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Center Column: Cover Figure with Permanent Registration Marks (.marks-on) — Excluded from Figure Scroll Clip Reveal */}
          <figure className="col-span-12 flex min-h-0 flex-col md:col-span-5">
            <div className="min-h-0 flex-1 md:[container-type:size]">
              <div
                className="marks-on relative aspect-(--ratio) w-full md:w-[min(100cqw,calc(100cqh*var(--ratio)))]"
                style={{ '--ratio': project.coverAspectRatio } as React.CSSProperties}
              >
                <div className="size-full overflow-hidden bg-neutral-100" data-hero>
                  <ProjectVisual
                    slug={project.slug}
                    variant={0}
                    imageSrc={project.coverImage}
                    alt={project.coverAlt}
                    isCover
                  />
                </div>
                <CropMarks dimensionText={project.coverDimensions} />
              </div>
            </div>
            <figcaption className="mt-8 flex justify-between text-[10px] text-neutral-400 uppercase">
              <span>Fig. 00 — Cover</span>
              <span>{project.title}</span>
            </figcaption>
          </figure>

          {/* Right Column: (01) Description */}
          <aside className="col-span-12 md:col-span-3" data-aside="hero">
            <p className="text-[10px] text-neutral-400 uppercase" data-aside-label>
              (01) Description
            </p>
            <div className="mt-3 space-y-2.5 text-sm leading-[0.95]" data-aside-text>
              {project.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </aside>
        </section>

        {/* (02) Figures — Clean 2-Images-Per-Row Layout with Studio Loum Scroll Clip-Path Reveal */}
        <section className="mt-24 border-t border-neutral-200 pt-3">
          <div className="flex justify-between text-[10px] text-neutral-400 uppercase">
            <span>(02) Figures</span>
            <span>{String(project.figures.length).padStart(2, '0')}</span>
          </div>

          <div className="mt-14 grid grid-cols-12 items-start gap-x-8 gap-y-20">
            {project.figures.map((fig) => {
              const isRevealed = Boolean(revealedFigures[fig.id]);

              return (
                <figure
                  key={fig.id}
                  ref={(el) => {
                    if (el) figureElsRef.current.set(fig.id, el);
                    else figureElsRef.current.delete(fig.id);
                  }}
                  data-figure
                  data-figure-id={fig.id}
                  data-revealed={isRevealed ? 'true' : 'false'}
                  className={`marks-hover ${fig.gridClass}`}
                >
                  <div className="relative">
                    <div
                      data-figure-media
                      style={{
                        aspectRatio: String(fig.aspectRatio),
                        clipPath: isRevealed
                          ? 'inset(0% 0% 0% 0%)'
                          : 'inset(100% 0% 0% 0%)',
                        transition: 'clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1)',
                      }}
                      className="w-full overflow-hidden bg-neutral-100 will-change-[clip-path]"
                    >
                      <ProjectVisual
                        slug={project.slug}
                        variant={fig.variant}
                        imageSrc={fig.imageSrc}
                        alt={fig.alt}
                      />
                    </div>
                    <CropMarks dimensionText={fig.dimensions} />
                  </div>
                  <figcaption
                    style={{
                      opacity: isRevealed ? 1 : 0,
                      transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
                    }}
                    className="mt-8 space-y-2"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[10px] text-neutral-950 uppercase">
                      <span className="wrap-break-word">{fig.label}</span>
                      <span className="shrink-0 text-neutral-400">
                        {fig.dimensions} — {project.title}
                      </span>
                    </div>
                    <p
                      data-figure-description
                      className="block text-xs leading-[1.35] text-neutral-600"
                    >
                      {fig.description}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        {/* Sticky Next Project Scroll-Scrubbed Zone (210svh) */}
        <section
          ref={nextZoneRef}
          data-next-zone
          data-next-href={`/work/${nextProject.slug}`}
          className="relative mt-40 h-[210svh] border-t border-neutral-200"
        >
          <div className="sticky top-0 grid h-svh grid-cols-12 grid-rows-[auto_auto_1fr_auto] gap-x-4 gap-y-6 pt-16 pb-12 md:grid-rows-[auto_1fr]">
            <div className="col-span-12 flex justify-between text-[10px] text-neutral-400 uppercase">
              <span>N°{nextProject.number} — Next project</span>
              <span>
                {nextProject.number} / {totalCount}
              </span>
            </div>

            <div className="col-span-12 flex min-h-0 flex-col justify-between gap-10 max-md:contents md:col-span-4">
              <a
                href={`/work/${nextProject.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectProject(nextProject.slug);
                }}
                data-next
                data-next-title
                data-cursor-label="Next project"
                className="text-[11vw] leading-[0.88] tracking-tight max-md:col-span-12 md:text-[4.2vw]"
              >
                {nextProject.title}
              </a>

              <div className="text-[10px] text-neutral-400 uppercase max-md:order-last max-md:col-span-12">
                <div className="flex justify-between">
                  <span>Keep scrolling</span>
                  <span className="text-neutral-950 tabular-nums">
                    <span data-next-percent>{formatScrollPercent(scrollProgress)}</span>%
                  </span>
                </div>
                <div className="relative mt-2 h-1.5 border-x border-b border-neutral-300">
                  <span
                    data-next-bar
                    style={{ transform: `scaleX(${scrollProgress})` }}
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-neutral-950 transition-transform duration-75"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <BrandLogo className="h-3 w-auto" />
                    <span>© 2026 Akeel Mohammad</span>
                  </span>
                  <span>
                    Index {project.number} / {totalCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-12 flex min-h-0 flex-col md:col-span-5">
              <div className="flex min-h-0 flex-1 items-start">
                <div
                  className="marks-on relative w-full max-w-[440px]"
                  style={{ aspectRatio: String(nextProject.coverAspectRatio) }}
                >
                  <div
                    data-next-media
                    style={{
                      clipPath: `inset(${insetV}% ${insetH}% ${insetV}% ${insetH}%)`,
                    }}
                    className="size-full overflow-hidden bg-neutral-100 transition-[clip-path] duration-100"
                  >
                    <ProjectVisual
                      slug={nextProject.slug}
                      variant={0}
                      imageSrc={nextProject.coverImage}
                      alt={nextProject.coverAlt}
                      isCover
                    />
                  </div>
                  <CropMarks dimensionText={nextProject.coverDimensions} />
                </div>
              </div>
              <div className="mt-8 flex max-w-[440px] justify-between text-[10px] text-neutral-400 uppercase">
                <span>Fig. 00 — Cover</span>
                <span>{nextProject.title}</span>
              </div>
            </div>

            <aside className="col-span-12 md:col-span-3" data-aside="next">
              <p className="text-[10px] text-neutral-400 uppercase">(01) Description</p>
              <div className="mt-3 space-y-2.5 text-sm leading-[0.95]">
                {nextProject.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};
