import React from 'react';

interface CropMarksProps {
  dimensionText: string;
}

/**
 * Technical print registration marks (.crop-tl/tr/bl/br), center ticks (.tick-t/b/l/r),
 * and dimension caliper bar (.dim) matching Studio Loum's CropMarks.astro component.
 */
export const CropMarks: React.FC<CropMarksProps> = ({ dimensionText }) => {
  return (
    <>
      <span className="crop crop-tl" aria-hidden="true" />
      <span className="crop crop-tr" aria-hidden="true" />
      <span className="crop crop-bl" aria-hidden="true" />
      <span className="crop crop-br" aria-hidden="true" />
      <span className="tick tick-t" aria-hidden="true" />
      <span className="tick tick-b" aria-hidden="true" />
      <span className="tick tick-l" aria-hidden="true" />
      <span className="tick tick-r" aria-hidden="true" />
      <span className="dim text-[9px] leading-none text-neutral-400 uppercase" aria-hidden="true">
        <span>{dimensionText}</span>
      </span>
    </>
  );
};
