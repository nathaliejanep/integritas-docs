import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { modes } from './lib/modes';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { source } from './source';

// shared configuration
export const baseOptions: BaseLayoutProps = {
  // TOP NAVIGATION - GITHUB LINK
  // githubUrl: 'https://github.com/minima-global',
  // links: modes.map((mode) => ({
  //   icon: <mode.icon />,
  //   text: mode.name,
  //   description: mode.description,
  //   url: `/docs/${mode.param}`,
  // })),
  nav: {
    url: '/',
    title: (
      <div className='flex items-center gap-2 justify-center mr-4'>
        <svg
          width='331'
          height='372'
          viewBox='0 0 331 372'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className=' h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630]'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            fill='#FFF'
            d='M9.07654 84.9058L108.951 142.563L156.127 115.333V-0.000183105L99.8683 32.4799C99.8683 50.2095 80.6854 61.2724 65.3355 52.4076L9.07654 84.9058ZM174.296 0V115.315L221.473 142.545L321.347 84.8878L265.088 52.4077C249.738 61.2725 230.555 50.1915 230.555 32.4801L174.296 0ZM99.8745 212.768L0 270.426V205.466C15.3499 196.601 15.3499 174.457 0 165.592V100.632L99.8745 158.29V212.768ZM230.562 158.29L330.436 100.632V165.593C315.086 174.457 315.086 196.601 330.436 205.466V270.426L230.562 212.769V158.29ZM156.127 255.732V371.047L99.8683 338.567C99.8683 320.856 80.6854 309.775 65.3355 318.64L9.07654 286.16L108.951 228.502L156.127 255.732ZM221.473 228.503L321.347 286.16L265.088 318.64C249.738 309.775 230.555 320.838 230.555 338.568L174.296 371.048V255.733L221.473 228.503Z'
          />
        </svg>
        <p className='font-medium text-sm text-muted'>Documentation</p>
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
