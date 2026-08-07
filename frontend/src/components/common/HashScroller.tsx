'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function HashScrollerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  }, [pathname, searchParams]);

  return null;
}

import { Suspense } from 'react';

export default function HashScroller() {
  return (
    <Suspense fallback={null}>
      <HashScrollerInner />
    </Suspense>
  );
}
