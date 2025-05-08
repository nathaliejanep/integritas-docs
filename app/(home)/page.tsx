import { DocsHomePage } from '@/components/homepage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integritas Docs',
  description: 'The official documentation for Integritas',
};

export default function HomePage() {
  return <DocsHomePage />;
}
