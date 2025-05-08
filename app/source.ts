import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { docs } from '@/.source';
import Icon, { TypescriptIcon } from '@/components/icon';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (icon && icon in icons) {
      return Icon({ icon: icons[icon as keyof typeof icons] });
    }

    if (icon === 'Typescript') {
      return Icon({ icon: TypescriptIcon as any });
    }
  },
});
