import React from 'react';

import SwapButton from './SwapButton';

const Hero = () => {
  return (
    <section className="lg:custom-bg dark:bg-none">
      <div className="mx-auto min-h-[80vh]  max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="mt-28 flex w-full flex-col justify-center text-center lg:mt-40">
          <h1 className="text-5xl font-extrabold text-fetcch-dark dark:text-white xl:text-7xl">
            Seamless <br />
            <span className="font-extrabold text-fetcch-mustard">
              Crosschain
            </span>{' '}
            Swapping
          </h1>
          <h2 className="mt-4 text-lg font-semibold text-fetcch-dark dark:text-white lg:text-2xl">
            At wagpay we power a seamless bridge for your swap
          </h2>
          <div className="mt-10 flex w-full justify-center space-x-4">
            <SwapButton classes="px-6 py-3 text-sm lg:text-lg" />
            <button type="button" className="btn-tilt ext-btn">
              Download Ext.
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
