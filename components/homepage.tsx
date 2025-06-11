"use client";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { SparklesCore } from "./sparkles";
import { motion } from "motion/react";
import Image from "next/image";

export function DocsHomePage() {
  return (
    <div className=" bg-background relative  md:px-8 flex flex-col justify-start items-start z-20 py-10 lg:py-16  mx-auto w-full   dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
      <div className=" absolute inset-0 top-0 z-[9000] h-[30vh] overflow-hidden">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
      <div className=" absolute inset-0 bg-background h-1/2 bottom-0"></div>
      <div className=" absolute bg-background right-0 bottom-[460px] left-0 h-[100px] blur-xl"></div>
      <div className="flex flex-col  mx-auto mt-5 relative pb-12 xl:min-w-[1200px] w-full lg:w-fit ">
        <main className="relative px-2 flex flex-col justify-center items-center w-full lg:w-fit">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-xl lg:text-3xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-primary-foreground"
          >
            <Image
              src="/logos/integritas-gradient.svg"
              alt="Integritas Logo"
              className="h-12 w-auto"
              height={8}
              width={8}
            />
          </motion.h4>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg lg:text-lg  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300"
          >
            Integritas Documentation provides an in-depth look at the systems
            full capabilities and robust features, designed to deliver trust,
            transparency, and integrity.
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
      title: "Introduction",
      description:
        "Get a comprehensive overview of what Integritas is, its core principles, and how it empowers users through blockchain technology.",
      link: "/docs/about",
      icon: (
        <svg
          width="331"
          height="372"
          viewBox="0 0 331 372"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.07654 84.9058L108.951 142.563L156.127 115.333V-0.000183105L99.8683 32.4799C99.8683 50.2095 80.6854 61.2724 65.3355 52.4076L9.07654 84.9058ZM174.296 0V115.315L221.473 142.545L321.347 84.8878L265.088 52.4077C249.738 61.2725 230.555 50.1915 230.555 32.4801L174.296 0ZM99.8745 212.768L0 270.426V205.466C15.3499 196.601 15.3499 174.457 0 165.592V100.632L99.8745 158.29V212.768ZM230.562 158.29L330.436 100.632V165.593C315.086 174.457 315.086 196.601 330.436 205.466V270.426L230.562 212.769V158.29ZM156.127 255.732V371.047L99.8683 338.567C99.8683 320.856 80.6854 309.775 65.3355 318.64L9.07654 286.16L108.951 228.502L156.127 255.732ZM221.473 228.503L321.347 286.16L265.088 318.64C249.738 309.775 230.555 320.838 230.555 338.568L174.296 371.048V255.733L221.473 228.503Z"
          />
        </svg>
      ),
    },
    {
      title: "Web App User Guide",
      description:
        "Step-by-step instructions and practical guidance on how to navigate and utilize the Integritas Web App.",
      link: "/docs/web-user-guide",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 32 32"
          className=" h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630] transition-colors "
        >
          <circle cx="16" cy="16" r="16" />
        </svg>
      ),
    },
    // {
    //   title: 'MiniDapp User Guide',
    //   description:
    //     'Step-by-step instructions and practical guidance on how to navigate and utilize the Integritas MiniDapp.',
    //   link: '/docs/user-guide',
    //   icon: (
    //     <svg
    //       xmlns='http://www.w3.org/2000/svg'
    //       version='1.1'
    //       id='Layer_1'
    //       x='0px'
    //       y='0px'
    //       viewBox='0 0 32 32'
    //       className=' h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630] transition-colors '
    //     >
    //       <circle
    //         cx='16'
    //         cy='16'
    //         r='16'
    //       />
    //     </svg>
    //   ),
    // },
    {
      title: "Technical Documentation",
      description:
        "For developers, engineers, and blockchain integrators working with  Integritas",
      link: "/docs/technical-docs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 32 32"
          className=" h-8 w-8 fill-neutral-500 group-hover:fill-[#FF8630] transition-colors"
        >
          <path d="M15.9,0l-16,16v16l16-16V0z" />
          <path d="M31.9,0l-16,16v16l16-16V0z" />
        </svg>
      ),
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-[repeat(2,minmax(0,1fr))] relative  mx-auto  mt-10  rounded-xl bg-background box dark:box z-[9999] w-full "
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
      className="h-full "
    >
      <Link
        href={link}
        className={cn(
          "flex flex-col lg:border-r group h-full py-12 2xl:py-[70px]  px-4 relative group/feature dark:border-neutral-800 cursor-pointer",
          (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
          index < 3 && "lg:border-b dark:border-neutral-800",
          index === 3 && "rounded-bl-xl",
          index === 5 && "rounded-br-xl"
        )}
      >
        {index < 4 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent  " />
        )}
        {index >= 4 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        )}
        <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
          {icon}
        </div>
        <div className=" font-bold mb-2 relative z-10 px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#FF8630] transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-700 dark:text-neutral-100 text-xl lg:text-2xl">
            {title}
          </span>
        </div>
        <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-sm relative z-10 px-10">
          {description}
        </p>
      </Link>
    </motion.div>
  );
};
