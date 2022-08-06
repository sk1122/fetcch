import React from 'react';

import SwapCard from './SwapCard';

const Swap = () => {
  return (
    <div className="mx-auto flex min-h-[90vh] flex-col items-center px-2">
      <div className="mt-20 flex w-full max-w-5xl flex-col rounded-md bg-white p-2 sm:mt-32">
        <SwapCard />
      </div>
    </div>
  );
};

export default Swap;
