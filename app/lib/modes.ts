import {
  //   Blocks,
  BookOpen,
  Waypoints,
  //   GraduationCap,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface Mode {
  param: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

// TOP NAVIGATION
export const modes: Mode[] = [
  {
    param: 'about',
    name: 'About',
    description: 'Welcome to Integritas',
    icon: Sparkles,
  },
  {
    param: 'user-guide',
    name: 'User Guide',
    description: 'How to use Integritas',
    icon: Waypoints,
  },
  {
    param: 'technical-docs',
    name: 'Technical Documentation',
    description: 'How to use Integritas',
    icon: BookOpen,
  },
];
