'use client';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { modes } from './lib/modes';
import { cn } from './lib/utils';
import Footer from '@/components/footer';

const itemVariants = cva(
  'rounded-md px-3 py-1 transition-colors hover:text-fd-accent-foreground',
  {
    variants: {
      active: {
        true: 'bg-fd-accent text-fd-accent-foreground',
      },
    },
  }
);

export function Body({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const mode = useMode();
  const isHome = usePathname() === '/';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <body
      className={cn(mode, 'flex min-h-screen flex-col pt-0', isHome && 'pt-3')}
    >
      {children}
      {mounted && <Footer />}
    </body>
  );
}

export function useMode(): string | undefined {
  const { slug } = useParams();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}

export function NavChildren(): React.ReactElement {
  const mode = useMode();

  return (
    <div
      className={cn(
        'rounded-md p-1 text-sm text-fd-muted-foreground max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 hidden lg:block'
      )}
    >
      {modes.map((m) => (
        <Link
          key={m.param}
          href={`/docs/${m.param}`}
          className={cn(itemVariants({ active: mode === m.param }))}
        >
          {m.name}
        </Link>
      ))}
    </div>
  );
}
