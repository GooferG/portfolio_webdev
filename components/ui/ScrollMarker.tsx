'use client';

import { useEffect, useState } from 'react';

type SectionMarker = {
  id: string;
  number: string;
  label: string;
};

const MARKERS: SectionMarker[] = [
  { id: 'hero', number: '01', label: 'Web + AI' },
  { id: 'featured', number: '02', label: 'Featured Work' },
  { id: 'freelance-cta', number: '03', label: 'Available' },
];

function useActiveSection(): SectionMarker {
  const [active, setActive] = useState<SectionMarker>(MARKERS[0]);

  useEffect(() => {
    const elements = MARKERS.map((m) =>
      m.id === 'hero' ? null : document.getElementById(m.id),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const idx = MARKERS.findIndex((m) => m.id === visible.target.id);
          if (idx !== -1) setActive(MARKERS[idx]);
        } else {
          setActive(MARKERS[0]);
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    elements.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function ScrollMarker() {
  const marker = useActiveSection();
  const [coordsOpen, setCoordsOpen] = useState(false);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-baseline justify-between gap-6 text-fg-faint text-xs font-mono">
        <span className="tabular-nums pointer-events-auto">
          — {marker.number} / {marker.label}
        </span>
        <span
          className="hidden sm:inline relative pointer-events-auto"
          onMouseEnter={() => setCoordsOpen(true)}
          onMouseLeave={() => setCoordsOpen(false)}
          onFocus={() => setCoordsOpen(true)}
          onBlur={() => setCoordsOpen(false)}
          tabIndex={0}
        >
          Phoenix, AZ · UTC-7
          {coordsOpen && (
            <span
              role="tooltip"
              className="absolute right-0 top-full mt-2 z-20 px-3 py-2 bg-bg-card border border-border-subtle rounded-md text-fg-default text-[11px] leading-relaxed tabular-nums whitespace-nowrap shadow-lg"
            >
              33.4484° N<br />
              112.0740° W
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
