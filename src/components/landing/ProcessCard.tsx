import React from 'react';

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const Process = (props: Props) => {
  return (
    <div className="relative flex h-96 w-full items-center justify-center">
      <div className="absolute bottom-0 inline-block h-96 w-80 -rotate-6 rounded-3xl bg-fetcch-mustard shadow-lg"></div>
      <div className="absolute bottom-0 inline-block h-96 w-80 rotate-6 rounded-3xl bg-fetcch-purple shadow-lg"></div>
      <div className="absolute bottom-0 z-10 grid h-96 w-80  rounded-3xl bg-white shadow-xl transition">
        <div className="flex flex-col items-center justify-start space-y-4 px-4 py-6 pb-20 text-center dark:text-fetcch-dark">
          {props.icon}
          <h2 className="text-2xl font-bold">{props.title}</h2>
          <p className="px-8">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Process;
