import { DocsHomePage } from '@/components/homepage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minima Docs',
  description: 'The official documentation for Minima',
};

export default function HomePage() {
  return <DocsHomePage />;
}
