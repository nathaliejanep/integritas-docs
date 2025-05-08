import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { modes } from './lib/modes';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { source } from './source';

// shared configuration
export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/minima-global',
  links: modes.map((mode) => ({
    icon: <mode.icon />,
    text: mode.name,
    description: mode.description,
    url: `/docs/${mode.param}`,
  })),
  nav: {
    url: '/',
    title: (
      <div className='flex items-center gap-2 justify-center mr-4'>
        <svg
          width='25'
          height='25'
          viewBox='0 0 37 33'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`dark:fill-white fill-black transition-colors`}
        >
          <path
            d='M28.8727 9.20966L27.2806 16.2518L25.2445 7.7553L18.1105 4.86191L16.1816 13.3737L14.4823 3.39225L7.34831 0.51416L0 32.9998H7.79227L10.0427 23.0183L11.742 32.9998H19.5496L21.4632 24.488L23.4993 32.9998H31.2915L36.022 12.0877L28.8727 9.20966Z'
            fill='#currentColor'
          />
        </svg>

        <span className='font-medium text-sm mt-1'>Documentation</span>
      </div>
    ),
  },
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  sidebar: {
    collapsible: true,
    defaultOpenLevel: 1,
    content: 'test',
    className: 'p-0',
    banner: (
      <RootToggle
        className=' my-1 -ml-2'
        options={modes.map((mode) => ({
          url: `/docs/${mode.param}`,
          icon: (
            <div
              className='rounded-md p-1 shadow-lg ring-2 [&_svg]:size-4 w-fits'
              style={
                {
                  color: `var(--${mode.param}-color)`,
                  border: `1px solid color-mix(in oklab, var(--${mode.param}-color) 50%, transparent)`,
                  '--tw-ring-color': `color-mix(in oklab, var(--${mode.param}-color) 20%, transparent)`,
                } as object
              }
            >
              <div className='rounded-md border bg-gradient-to-b from-secondary p-1 shadow-sm'>
                <mode.icon />
              </div>
            </div>
          ),
          title: mode.name,
          description: mode.description,
        }))}
      />
    ),
    tabs: {
      transform(option, node) {
        const meta = source.getNodeMeta(node);
        if (!meta) return option;

        // const color = `var(--${meta.file.dirname}-color, var(--color-fd-foreground))`;

        return null;
      },
    },
  },
};
