import React from 'react';

import { Swap } from '@/icons/swap';

import ChainSelect from './ChainSelect';
import CoinSelect from './CoinSelect';

const SwapCard = () => {
  return (
    <section className="col-span-full flex w-full flex-col space-y-4 px-2 lg:col-span-3 lg:px-0">
      {/* chain section */}
      <h1 className="text-lg font-bold">Currency Swap</h1>
      <div className="w-full rounded-md">
        <div className="flex w-full justify-evenly space-x-3">
          <div className="w-1/2 rounded-md bg-fetcch-purple/5 p-2">
            <h3 className="mb-2 text-sm">Source Chain</h3>
            <ChainSelect />
          </div>
          <div className="hidden md:mt-2 md:block">
            <Swap fill="#7733FF" />
          </div>

          <div className="w-1/2 rounded-md bg-fetcch-purple/5 p-2">
            <h3 className="mb-2 text-sm">Destination Chain</h3>
            <ChainSelect />
          </div>
        </div>
      </div>

      {/* coin section */}
      <h2 className="font-semibold">Selected Tokens</h2>
      <div className="flex w-full flex-col justify-evenly space-y-6 space-x-0 md:flex-row md:space-y-0 md:space-x-3">
        <div className="w-full rounded-md bg-fetcch-purple/5 p-2 md:w-1/2">
          <label
            htmlFor="sender"
            className="mb-2 block text-left text-sm text-black dark:text-white"
          >
            You Send
          </label>
          <div className="flex w-full">
            <div className="relative mt-1 w-full rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>

              <input
                type="number"
                name="amount"
                id="amount"
                className="block h-10 w-3/5 rounded-l-md pl-7 outline-none sm:text-sm"
                placeholder="0.00"
              />

              <div className="absolute inset-y-0 right-0 flex w-2/5 items-center rounded-r-md bg-white ">
                <span className="pr-2 text-xs font-semibold text-fetcch-purple underline underline-offset-1">
                  MAX
                </span>
                <CoinSelect />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-md bg-fetcch-purple/5 p-2 md:w-1/2">
          <label
            htmlFor="sender"
            className="mb-2 block text-left text-sm text-black dark:text-white"
          >
            You Receive
          </label>
          <div className="flex w-full">
            <div className="relative mt-1 w-full rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                className="block h-10 w-3/5 rounded-l-md bg-white pl-7 outline-none sm:text-sm"
                placeholder="0.00"
                disabled
              />
              <div className="absolute inset-y-0 right-0 flex w-2/5 items-center rounded-r-md bg-white">
                <span className="pr-2 text-xs font-semibold text-fetcch-purple underline underline-offset-1">
                  MAX
                </span>
                <CoinSelect />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwapCard;
