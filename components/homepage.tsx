'use client';
import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import { SparklesCore } from './sparkles';
import { motion } from 'motion/react';

export function DocsHomePage() {
  return (
    <div className=' bg-background relative  md:px-8 flex flex-col justify-start items-start z-20 py-10 lg:py-16  mx-auto w-full   dark:bg-grid-white/[0.2] bg-grid-black/[0.2]'>
      <div className=' absolute inset-0 top-0 z-[9000] h-[30vh] overflow-hidden'>
        <SparklesCore
          id='tsparticlesfullpage'
          background='transparent'
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className='w-full h-full'
          particleColor='#FFFFFF'
        />
      </div>
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] '></div>
      <div className=' absolute inset-0 bg-background h-1/2 bottom-0'></div>
      <div className=' absolute bg-background right-0 bottom-[460px] left-0 h-[100px] blur-xl'></div>
      <div className='flex flex-col  mx-auto mt-5 relative pb-12 xl:min-w-[1200px] w-full lg:w-fit '>
        <main className='relative px-2 flex flex-col justify-center items-center w-full lg:w-fit'>
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-primary-foreground'
          >
            Welcome to the Integritas Docs
          </motion.h4>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='text-lg lg:text-xl  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300'
          >
            Learn all there is to know about Integritas
          </motion.p>

          <Cards />
        </main>
      </div>
    </div>
  );
}

const Cards = () => {
  const features = [
    {
      title: 'Introduction',
      description: 'Learn about Integritas',
      link: '/docs/about',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          id='Layer_1'
          x='0px'
          y='0px'
          viewBox='0 0 32 32'
          className=' h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630]'
        >
          <path d='M25.6,9.3l-1.4,6.3L22.4,8l-6.3-2.6L14.4,13l-1.5-8.9L6.5,1.6L0,30.4h6.9l2-8.9l1.5,8.9h6.9l1.7-7.6l1.8,7.6h6.9L32,11.9  L25.6,9.3z' />
        </svg>
      ),
    },
    {
      title: 'User Guide',
      description: 'How to use Integritas dapp',
      link: '/docs/user-guide',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          id='Layer_1'
          x='0px'
          y='0px'
          viewBox='0 0 32 32'
          className=' h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630] transition-colors '
        >
          <circle
            cx='16'
            cy='16'
            r='16'
          />
        </svg>
      ),
    },
    {
      title: 'Technical Documentation',
      description:
        'For developers, engineers, and blockchain integrators working with  Integritas',
      link: '/docs/technical-docs',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          id='Layer_1'
          x='0px'
          y='0px'
          viewBox='0 0 32 32'
          className=' h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630] transition-colors'
        >
          <path d='M15.9,0l-16,16v16l16-16V0z' />
          <path d='M31.9,0l-16,16v16l16-16V0z' />
        </svg>
      ),
    },
    // {
    //   title: 'Knowledge Base',
    //   description: 'A deep dive into Minima and Maxima',
    //   link: '/docs/learn',
    //   icon: (
    //     <svg
    //       xmlns='http://www.w3.org/2000/svg'
    //       version='1.1'
    //       id='Layer_1'
    //       x='0px'
    //       y='0px'
    //       viewBox='0 0 32 32'
    //       className=' h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630] transition-colors'
    //     >
    //       <path d='M10.7,21.3V10.7h10.7V0H32v32H0V21.3H10.7z' />
    //     </svg>
    //   ),
    // },
    // {
    //   title: 'Developer Tutorials',
    //   description:
    //     'Build decentralized applications and create smart contracts on Minima',
    //   link: '/docs/development',
    //   icon: (
    //     <svg
    //       xmlns='http://www.w3.org/2000/svg'
    //       version='1.1'
    //       id='Layer_1'
    //       x='0px'
    //       y='0px'
    //       viewBox='0 0 32 32'
    //       className=' h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630] transition-colors'
    //     >
    //       <path d='M16,16H0v16h16V16z' />
    //       <path d='M32,0H16v16h16V0z' />
    //     </svg>
    //   ),
    // },
    // {
    //   title: 'Tokenomics',
    //   description:
    //     "Understand Minima's token allocation and distribution schedule",
    //   link: '/docs/core/tokenomics',
    //   icon: (
    //     <svg
    //       xmlns='http://www.w3.org/2000/svg'
    //       version='1.1'
    //       id='Layer_1'
    //       x='0px'
    //       y='0px'
    //       viewBox='0 0 32 32'
    //       className=' h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630] transition-colors'
    //     >
    //       <g>
    //         <path d='M24.7,14.4c3.9,0,7.1-3.2,7.1-7.1c0-3.9-3.2-7.1-7.1-7.1c-3.9,0-7.1,3.2-7.1,7.1C17.6,11.2,20.8,14.4,24.7,14.4z' />
    //         <path d='M7.3,14.4c3.9,0,7.1-3.2,7.1-7.1c0-3.9-3.2-7.1-7.1-7.1c-3.9,0-7.1,3.2-7.1,7.1C0.1,11.2,3.3,14.4,7.3,14.4z' />
    //         <path d='M24.7,31.9c3.9,0,7.1-3.2,7.1-7.1c0-3.9-3.2-7.1-7.1-7.1c-3.9,0-7.1,3.2-7.1,7.1C17.6,28.7,20.8,31.9,24.7,31.9z' />
    //         <path d='M7.3,31.9c3.9,0,7.1-3.2,7.1-7.1c0-3.9-3.2-7.1-7.1-7.1c-3.9,0-7.1,3.2-7.1,7.1C0.1,28.7,3.3,31.9,7.3,31.9z' />
    //       </g>
    //     </svg>
    //   ),
    // },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-[repeat(2,minmax(0,1fr))] relative  mx-auto  mt-10  rounded-xl bg-background box dark:box z-[9999] w-full '
    >
      {features.map((feature, index) => (
        <FeatureCards
          key={feature.title}
          {...feature}
          index={index}
          link={feature.link}
        />
      ))}
    </motion.div>
  );
};

const FeatureCards = ({
  title,
  description,
  icon,
  index,
  link,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  link: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
      className='h-full '
    >
      <Link
        href={link}
        className={cn(
          'flex flex-col lg:border-r group h-full py-12 2xl:py-[70px]  px-4 relative group/feature dark:border-neutral-800 cursor-pointer',
          (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
          index < 3 && 'lg:border-b dark:border-neutral-800',
          index === 3 && 'rounded-bl-xl',
          index === 5 && 'rounded-br-xl'
        )}
      >
        {index < 4 && (
          <div className='opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent  ' />
        )}
        {index >= 4 && (
          <div className='opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none' />
        )}
        <div className='mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400'>
          {icon}
        </div>
        <div className=' font-bold mb-2 relative z-10 px-10'>
          <div className='absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#FF8630] transition-all duration-200 origin-center' />
          <span className='group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-700 dark:text-neutral-100 text-xl lg:text-2xl'>
            {title}
          </span>
        </div>
        <p className='text-base text-neutral-500 dark:text-neutral-400 max-w-sm relative z-10 px-10'>
          {description}
        </p>
      </Link>
    </motion.div>
  );
};
