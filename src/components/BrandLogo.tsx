import React from 'react';

interface BrandLogoProps {
  className?: string;
  /**
   * When rendered inside a header that uses `mix-blend-exclusion`, white pixels
   * exclude against a white background to render as crisp black (and invert to
   * white over dark imagery). Set `invertForExclusion` to true inside
   * `mix-blend-exclusion` containers.
   */
  invertForExclusion?: boolean;
}

/**
 * Renders Akeel Mohammad's official "am" monogram logo (`./assets/aistudio/image_56_37fbed9d.png`),
 * framed to its exact non-transparent glyph bounds (viewBox="42 95 176 67" inside 260×260)
 * so it aligns flush-left and scales crisply at any size.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-4 w-auto md:h-5',
  invertForExclusion = false,
}) => {
  return (
    <span className="inline-flex items-center">
      <svg
        viewBox="42 95 176 67"
        aria-hidden="true"
        className={`block shrink-0 select-none ${invertForExclusion ? 'invert' : ''} ${className}`}
      >
        <image
          href="./assets/aistudio/image_56_37fbed9d.png"
          width="260"
          height="260"
        />
      </svg>
      <span className="sr-only">Akeel Mohammad</span>
    </span>
  );
};
