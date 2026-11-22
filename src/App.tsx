/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { FloatingMenu } from './components/FloatingMenu';
import { InfiniteGrid } from './components/InfiniteGrid';
import { LoaderOverlay } from './components/LoaderOverlay';
import { ProjectDetail } from './components/ProjectDetail';
import { ReticleCursor } from './components/ReticleCursor';
import { PROJECTS, ProjectSlug } from './data/projects';

function parseRouteFromLocation(): { view: 'index' | 'project'; slug: ProjectSlug } {
  const path = window.location.pathname;
  const match = path.match(/^\/(?:work|projects)\/([a-z0-9-]+)\/?$/i);
  if (match && match[1] in PROJECTS) {
    return { view: 'project', slug: match[1] as ProjectSlug };
  }
  return { view: 'index', slug: 'ceylon-teanora' };
}

export default function App() {
  const [route, setRoute] = useState<{ view: 'index' | 'project'; slug: ProjectSlug }>(() =>
    parseRouteFromLocation()
  );

  // Skip loader if ?autostart=1 is present or if directly opening a project route
  const [showLoader, setShowLoader] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return false;
    return parseRouteFromLocation().view === 'index';
  });

  const [gridReady, setGridReady] = useState<boolean>(() => !showLoader);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRouteFromLocation());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (route.view === 'project') {
      const p = PROJECTS[route.slug];
      document.title = `${p.title} — Akeel Mohammad`;
    } else {
      document.title = 'Akeel Mohammad — Graphic Designer & Digital Creative';
    }
  }, [route]);

  const navigateToProject = useCallback((slug: ProjectSlug) => {
    window.history.pushState({}, '', `/work/${slug}`);
    setRoute({ view: 'project', slug });
  }, []);

  const navigateToIndex = useCallback(() => {
    window.history.pushState({}, '', '/');
    setRoute({ view: 'index', slug: 'ceylon-teanora' });
    setGridReady(true);
  }, []);

  const handleLoaderDealStart = useCallback(() => {
    setGridReady(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
    setGridReady(true);
  }, []);

  return (
    <div className="relative min-h-svh bg-white text-neutral-950">
      {/* Initial 000..100 & Card Stack Deal Loader */}
      {showLoader && route.view === 'index' && (
        <LoaderOverlay
          onDealStart={handleLoaderDealStart}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* Main View: Infinite 2D Canvas Index or Project Case Study */}
      {route.view === 'index' ? (
        <InfiniteGrid
          isReady={gridReady}
          onSelectProject={navigateToProject}
          onDraggingChange={setIsDragging}
        />
      ) : (
        <ProjectDetail
          slug={route.slug}
          onBackToIndex={navigateToIndex}
          onSelectProject={navigateToProject}
        />
      )}

      {/* Persistent Floating Glass Menu, About & Contact Drawer */}
      <FloatingMenu
        isIndexPage={route.view === 'index'}
        onNavigateIndex={navigateToIndex}
      />

      {/* Persistent Exclusion Crosshair Reticle Cursor */}
      <ReticleCursor isDragging={isDragging} />
    </div>
  );
}
