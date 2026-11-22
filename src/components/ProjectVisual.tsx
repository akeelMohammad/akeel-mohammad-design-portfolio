import React from 'react';
import { PROJECTS, ProjectSlug, VERIFIED_ARTWORKS } from '../data/projects';

interface ProjectVisualProps {
  slug: ProjectSlug;
  variant?: number;
  imageSrc?: string;
  alt: string;
  className?: string;
  isCover?: boolean;
}

/**
 * Renders Akeel Mohammad's verified original portfolio artwork without artificial
 * filters, cropping, or replacement graphics.
 */
export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  slug,
  variant = 1,
  imageSrc,
  alt,
  className = '',
  isCover = false,
}) => {
  const project = PROJECTS[slug] || PROJECTS['posters-and-campaigns'];

  let resolvedSrc = imageSrc;
  let resolvedAlt = alt;

  if (!resolvedSrc) {
    if (isCover || variant === 0) {
      resolvedSrc = project.coverImage;
      resolvedAlt = project.coverAlt || alt;
    } else {
      const matchingFigure =
        project.figures.find((fig) => fig.variant === variant) ||
        project.figures[(Math.max(1, variant) - 1) % project.figures.length];
      if (matchingFigure) {
        resolvedSrc = matchingFigure.imageSrc;
        resolvedAlt = matchingFigure.alt || alt;
      } else {
        resolvedSrc = VERIFIED_ARTWORKS[0].src;
      }
    }
  }

  return (
    <div className={`relative size-full overflow-hidden bg-neutral-100 select-none ${className}`}>
      <img
        src={resolvedSrc}
        alt={resolvedAlt}
        className="size-full object-contain"
        draggable={false}
      />
    </div>
  );
};
