import React from 'react';

import SwapButton from './SwapButton';

const Hero = () => {
  return (
    <section className="lg:custom-bg h-full dark:bg-none">
      <div className="mx-auto min-h-screen  max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="mt-12 flex w-full flex-col justify-center text-center lg:mt-32">
          <h1 className="mt-16 text-7xl font-bold text-fetcch-dark dark:text-white">
            Seamless <br />
            <span className="font-extrabold text-fetcch-mustard">
              Crosschain
            </span>{' '}
            Swapping
          </h1>
          <h2 className="mt-4 text-2xl font-semibold text-fetcch-dark dark:text-white">
            At wagpay we power a seamless bridge for your swap
          </h2>
          <div className="mt-10 flex w-full justify-center space-x-4">
            <SwapButton classes="px-6 py-3 text-lg" />
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
