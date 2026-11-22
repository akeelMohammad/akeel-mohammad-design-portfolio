import React, { useEffect, useRef, useState } from 'react';
import { formatSriLankaClock, scrambleTextAtProgress } from '../utils/gridMath';
import { BrandLogo } from './BrandLogo';

interface FloatingMenuProps {
  isIndexPage: boolean;
  onNavigateIndex: () => void;
}

const SKILLS_AND_SERVICES = [
  'Graphic Design',
  'Brand Identity',
  'Packaging & Label Design',
  'Social Media Design',
  'YouTube Thumbnail Design',
  'Photo Manipulation',
  'Digital Art',
  'Visual Storytelling',
];

/**
 * Persistent bottom floating frosted-glass navigation bar ("01 Index", "02 About" / "02 Close",
 * "03 Contact" / "03 Close", "LK HH:MM") and expandable About & Contact drawer preserving
 * the exact Studio Loum menu-shell styling, with Akeel Mohammad's official "am" monogram logo
 * and contact details.
 */
export const FloatingMenu: React.FC<FloatingMenuProps> = ({
  isIndexPage,
  onNavigateIndex,
}) => {
  const [activePanel, setActivePanel] = useState<'none' | 'about' | 'contact'>('none');
  const [clock, setClock] = useState<string>(() => formatSriLankaClock());
  const [indexText, setIndexText] = useState('Index');
  const [aboutText, setAboutText] = useState('About');
  const [contactText, setContactText] = useState('Contact');

  const navRef = useRef<HTMLElement>(null);
  const scrambleTimers = useRef<Record<string, number>>({});

  const isOpen = activePanel !== 'none';

  const runScramble = (key: string, target: string, setter: (val: string) => void) => {
    if (scrambleTimers.current[key]) {
      window.clearInterval(scrambleTimers.current[key]);
    }
    const start = performance.now();
    const duration = 420;
    const id = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(1, elapsed / duration);
      setter(scrambleTextAtProgress(target, progress, Math.floor(elapsed)));
      if (progress >= 1) {
        window.clearInterval(id);
      }
    }, 28);
    scrambleTimers.current[key] = id;
  };

  useEffect(() => {
    const updateClock = () => setClock(formatSriLankaClock());
    updateClock();
    const interval = window.setInterval(updateClock, 10000);
    return () => {
      window.clearInterval(interval);
      Object.values(scrambleTimers.current).forEach((id) => window.clearInterval(id));
    };
  }, []);

  useEffect(() => {
    runScramble(
      'aboutToggle',
      activePanel === 'about' ? 'Close' : 'About',
      setAboutText
    );
    runScramble(
      'contactToggle',
      activePanel === 'contact' ? 'Close' : 'Contact',
      setContactText
    );
  }, [activePanel]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setActivePanel('none');
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setActivePanel('none');
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isOpen]);

  const handleIndexClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActivePanel('none');
    if (!isIndexPage) {
      onNavigateIndex();
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      data-nav
      data-menu
      className={`pointer-events-none fixed inset-x-0 bottom-4 z-55 flex justify-center px-4 ${
        isOpen ? 'is-open' : ''
      }`}
    >
      <div
        data-menu-shell
        className={`menu-shell pointer-events-auto relative flex max-w-full flex-col overflow-hidden rounded-[14px] transition-all duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] ${
          isOpen ? 'is-open' : ''
        }`}
      >
        {/* Expandable About Panel */}
        {activePanel === 'about' && (
          <section
            id="menu-about"
            data-menu-panel
            className="w-[min(32rem,calc(100vw-2rem))] animate-[fadeIn_0.35s_ease-out] px-4 pt-4 pb-2"
          >
            <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase">
              <span>(About) — Portfolio file</span>
              <span className="inline-flex items-center gap-2 text-neutral-950">
                <BrandLogo className="h-3 w-auto" />
                <span>Akeel Mohammad</span>
              </span>
            </div>

            <h2 className="mt-4 text-sm leading-[0.95] text-neutral-950 uppercase">
              A creative mind behind purposeful visuals.
            </h2>

            <div className="mt-3 space-y-2 text-[12px] leading-[1.15] text-neutral-800">
              <p>
                I&apos;m Akeel Mohammad, a graphic designer and digital creative.
              </p>
              <p>
                My creative interests span brand identity, packaging design, social media graphics,
                educational content design, and experimental digital art.
              </p>
              <p>
                I enjoy creating visuals that balance clarity, creativity, and meaningful
                communication.
              </p>
              <p>
                Through both commercial-style design projects and personal artistic experiments, I
                explore different approaches to visual storytelling.
              </p>
            </div>

            <dl className="mt-5 grid grid-cols-3 content-start gap-x-4 gap-y-4 border-t border-neutral-950/10 pt-3 text-[10px] leading-[0.95] uppercase">
              <div className="col-span-2 row-span-2">
                <dt className="text-neutral-400">Skills &amp; Services</dt>
                <dd className="mt-1.5 space-y-1 text-neutral-950">
                  {SKILLS_AND_SERVICES.map((service) => (
                    <span key={service} className="block">
                      {service}
                    </span>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="text-neutral-400">Role</dt>
                <dd className="mt-1.5 text-neutral-950">
                  Graphic Designer &amp; Digital Creative
                </dd>
              </div>

              <div>
                <dt className="text-neutral-400">Direct</dt>
                <dd className="mt-1.5 space-y-1 text-neutral-950">
                  <a
                    href="tel:0761104270"
                    className="block transition-colors hover:text-neutral-500"
                  >
                    0761104270
                  </a>
                  <a
                    href="https://www.linkedin.com/in/akeel-mohammad-li"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-neutral-500"
                  >
                    LinkedIn ↗
                  </a>
                </dd>
              </div>
            </dl>

            <p className="mt-5 flex items-center justify-between text-[9px] text-neutral-400 uppercase">
              <span className="inline-flex items-center gap-1.5">
                <BrandLogo className="h-2.5 w-auto" />
                <span>© 2026 Akeel Mohammad</span>
              </span>
              <span>All rights reserved</span>
            </p>
          </section>
        )}

        {/* Expandable Contact Panel */}
        {activePanel === 'contact' && (
          <section
            id="menu-contact"
            data-menu-panel
            className="w-[min(32rem,calc(100vw-2rem))] animate-[fadeIn_0.35s_ease-out] px-4 pt-4 pb-2"
          >
            <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase">
              <span>(Contact) — Inquiries &amp; Collaborations</span>
              <span className="inline-flex items-center gap-2 text-neutral-950">
                <BrandLogo className="h-3 w-auto" />
                <span>Akeel Mohammad</span>
              </span>
            </div>

            <h2 className="mt-5 text-base leading-[0.95] text-neutral-950 uppercase">
              Have something creative in mind?
            </h2>

            <p className="mt-3 text-sm leading-[1.1] text-neutral-800">
              I&apos;m always interested in exploring creative projects, collaborations, and design
              opportunities.
            </p>

            {/* Primary Email Callout */}
            <div className="mt-4 border-t border-neutral-950/10 pt-3">
              <span className="block text-[9px] text-neutral-400 uppercase">Email</span>
              <a
                href="mailto:a.h.akeelmohammad@gmail.com"
                data-contact-email
                className="mt-1 inline-block text-sm leading-tight text-neutral-950 lowercase underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-500"
              >
                a.h.akeelmohammad@gmail.com
              </a>
            </div>

            <dl className="mt-4 grid grid-cols-2 content-start gap-x-4 gap-y-4 border-t border-neutral-950/10 pt-3 text-[10px] leading-[1.05] uppercase">
              <div>
                <dt className="text-neutral-400">Phone</dt>
                <dd className="mt-1.5 text-neutral-950">
                  <a
                    href="tel:0761104270"
                    data-contact-phone
                    className="transition-colors hover:text-neutral-500"
                  >
                    0761104270
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-neutral-400">LinkedIn</dt>
                <dd className="mt-1.5 text-neutral-950">
                  <a
                    href="https://www.linkedin.com/in/akeel-mohammad-li"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-contact-linkedin
                    className="inline-block break-all lowercase transition-colors hover:text-neutral-500"
                  >
                    www.linkedin.com/in/akeel-mohammad-li
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-neutral-400">Designer</dt>
                <dd className="mt-1.5 text-neutral-950">Akeel Mohammad</dd>
              </div>

              <div>
                <dt className="text-neutral-400">Role</dt>
                <dd className="mt-1.5 text-neutral-950">Graphic Designer &amp; Digital Creative</dd>
              </div>
            </dl>

            <p className="mt-5 flex items-center justify-between text-[9px] text-neutral-400 uppercase">
              <span className="inline-flex items-center gap-1.5">
                <BrandLogo className="h-2.5 w-auto" />
                <span>© 2026 Akeel Mohammad</span>
              </span>
              <span>All rights reserved</span>
            </p>
          </section>
        )}

        {/* Persistent Menu Bar */}
        <div
          data-menu-bar
          className="flex items-center justify-between gap-5 px-4.5 py-4 text-[12px] whitespace-nowrap uppercase md:gap-6 md:px-4 md:py-3.5 md:text-[11px]"
        >
          <a
            href="./"
            onClick={handleIndexClick}
            aria-label="Akeel Mohammad Home"
            data-menu-logo
            className="inline-flex shrink-0 items-center transition-opacity hover:opacity-60"
          >
            <BrandLogo className="h-3.5 w-auto" />
          </a>

          <ul className="flex shrink-0 items-center gap-4 md:gap-5">
            <li>
              <a
                href="./"
                onClick={handleIndexClick}
                aria-current={isIndexPage && activePanel === 'none' ? 'page' : undefined}
                onPointerEnter={() => runScramble('index', 'Index', setIndexText)}
                className="menu-item"
              >
                <sup>01</sup>
                <span>{indexText}</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                aria-expanded={activePanel === 'about'}
                aria-controls="menu-about"
                onClick={() =>
                  setActivePanel((prev) => (prev === 'about' ? 'none' : 'about'))
                }
                onPointerEnter={() =>
                  runScramble(
                    'aboutHover',
                    activePanel === 'about' ? 'Close' : 'About',
                    setAboutText
                  )
                }
                className="menu-item cursor-pointer"
              >
                <sup>02</sup>
                <span>{aboutText}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                aria-expanded={activePanel === 'contact'}
                aria-controls="menu-contact"
                onClick={() =>
                  setActivePanel((prev) => (prev === 'contact' ? 'none' : 'contact'))
                }
                onPointerEnter={() =>
                  runScramble(
                    'contactHover',
                    activePanel === 'contact' ? 'Close' : 'Contact',
                    setContactText
                  )
                }
                className="menu-item cursor-pointer"
              >
                <sup>03</sup>
                <span>{contactText}</span>
              </button>
            </li>
          </ul>

          <span data-menu-clock className="shrink-0 text-neutral-400 tabular-nums">
            {clock}
          </span>
        </div>
      </div>
    </nav>
  );
};
