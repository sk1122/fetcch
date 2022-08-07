import { Switch, Transition } from '@headlessui/react';
import React, { useState } from 'react';

import { Swap } from '@/icons/swap';
import type { Chain, Coin } from '@/types';

import ChainSelect from './ChainSelect';
import CoinSelect from './CoinSelect';
import WalletConnect from './shared/WalletConnect';
import ToggleOff from './ToggleOff';
import ToggleOn from './ToggleOn';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const chainList: Chain[] = [
  {
    id: 1,
    name: 'Rinkeby (ETH)',
    icon: 'https://movricons.s3.ap-south-1.amazonaws.com/Ether.svg',
    chainId: '1',
  },
  {
    id: 2,
    name: 'Mumbai (POL)',
    icon: 'https://movricons.s3.ap-south-1.amazonaws.com/Matic.svg',
    chainId: '137',
  },
];

const coins: { '1': Coin[]; '137': Coin[] } = {
  '1': [
    {
      id: 1,
      name: 'USDC',
      icon: 'https://movricons.s3.ap-south-1.amazonaws.com/Ether.svg',
      address: '',
      decimals: 6,
      chainId: '1',
    },
    {
      id: 2,
      name: 'USDT',
      icon: 'https://movricons.s3.ap-south-1.amazonaws.com/Matic.svg',
      address: '',
      decimals: 6,
      chainId: '1',
    },
  ],
  '137': [
    {
      id: 1,
      name: 'USDC',
      icon: 'https://movricons.s3.ap-south-1.amazonaws.com/Ether.svg',
      address: '',
      decimals: 6,
      chainId: '137',
    },
    {
      id: 2,
      name: 'USDT',
      icon: 'https://movricons.s3.ap-south-1.amazonaws.com/Matic.svg',
      address: '',
      decimals: 6,
      chainId: '137',
    },
  ],
};

const SwapCard = () => {
  const [toggle, setToggle] = useState(true);
  const [fromChain, setFromChain] = useState(chainList[0] as Chain);
  const [toChain, setToChain] = useState(chainList[1] as Chain);
  const [fromChainList, setFromChainList] = useState([chainList[1]]);
  const [toChainList, setToChainList] = useState([chainList[0]]);

  // @ts-ignore
  const [fromCoin, setFromCoin] = useState(coins[fromChain.chainId][0]);
  // @ts-ignore
  const [toCoin, setToCoin] = useState(coins[toChain.chainId][1]);

  const changeFromChain = (value: Chain) => {
    if (toChain) {
      if (value.name === toChain.name) {
        setToChain(fromChain);
      }

      setFromChain(value);
      setFromChainList(chainList.filter((v) => v.name !== value.name));
      setToChainList(chainList.filter((v) => v.name === value.name));
    }
  };

  const changeToChain = (value: Chain) => {
    if (fromChain) {
      if (value.name === fromChain.name) {
        setFromChain(toChain);
      }

      setToChain(value);
      setToChainList(chainList.filter((v) => v.name !== value.name));
      setFromChainList(chainList.filter((v) => v.name === value.name));
    }
  };

  const swapChain = () => {
    const fChain = fromChain;
    const tChain = toChain;

    const fCoin = fromCoin;
    const tCoin = toCoin;

    setFromChain(toChain);
    setToChain(fChain);

    setFromChainList(chainList.filter((v) => v.name !== tChain.name));
    setToChainList(chainList.filter((v) => v.name !== fChain.name));

    setFromCoin(tCoin);
    setToCoin(fCoin);
  };

  return (
    <section className="col-span-full flex w-full flex-col space-y-4 px-2 lg:col-span-3 lg:px-0">
      {/* chain section */}
      <h1 className="pl-2 text-lg font-bold">Currency Swap</h1>
      <div className="w-full rounded-md">
        <div className="flex w-full justify-evenly space-x-3">
          <div className="w-1/2 rounded-md bg-fetcch-purple/5 p-2">
            <h3 className="mb-2 text-sm">Source Chain</h3>
            <ChainSelect
              chain={fromChain}
              setChain={changeFromChain}
              chainList={fromChainList as Chain[]}
            />
          </div>
          <div className="hidden md:mt-2 md:block">
            <Swap fill="#7733FF" onClick={() => swapChain()} />
          </div>

          <div className="w-1/2 rounded-md bg-fetcch-purple/5 p-2">
            <h3 className="mb-2 text-sm">Destination Chain</h3>
            <ChainSelect
              chain={toChain}
              setChain={changeToChain}
              chainList={toChainList as Chain[]}
            />
          </div>
        </div>
      </div>

      {/* coin section */}
      <h2 className="pl-2 font-semibold">Selected Tokens</h2>
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
                className="block h-10 w-3/5 rounded-l-md border-none pl-7 text-black outline-none sm:text-sm"
                placeholder="0.00"
              />

              <div className="absolute inset-y-0 right-0 flex w-2/5 items-center rounded-r-md bg-white ">
                <span className="pr-2 text-xs font-semibold text-fetcch-purple underline underline-offset-1">
                  MAX
                </span>
                <CoinSelect
                  value={fromCoin as Coin}
                  setValue={setFromCoin}
                  coins={coins[fromChain.chainId]}
                />
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
                className="block h-10 w-3/5 rounded-l-md border-none bg-white pl-7 text-black outline-none sm:text-sm"
                placeholder="0.00"
                disabled
              />
              <div className="absolute inset-y-0 right-0 flex w-2/5 items-center rounded-r-md bg-white">
                <span className="pr-2 text-xs font-semibold text-fetcch-purple underline underline-offset-1">
                  MAX
                </span>
                <CoinSelect
                  value={toCoin as Coin}
                  setValue={setToCoin}
                  coins={coins[toChain.chainId]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section #3 */}
      <div className="flex w-full items-center justify-between space-x-4 md:w-2/5">
        <h2 className="pl-2 text-left font-semibold">
          Select bridge automatically
        </h2>
        <Switch
          checked={toggle}
          onChange={setToggle}
          className={classNames(
            toggle ? 'bg-fetcch-purple' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            className={classNames(
              toggle ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
            )}
          >
            <span
              className={classNames(
                toggle
                  ? 'opacity-0 ease-out duration-100'
                  : 'opacity-100 ease-in duration-200',
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
              )}
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={classNames(
                toggle
                  ? 'opacity-100 ease-in duration-200'
                  : 'opacity-0 ease-out duration-100',
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
              )}
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-fetcch-purple"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </span>
          </span>
        </Switch>
      </div>

      {/* section #4 */}
      {toggle ? (
        <Transition
          show={toggle}
          appear={true}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-500"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <ToggleOn />
        </Transition>
      ) : (
        <Transition
          show={!toggle}
          appear={true}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-500"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <ToggleOff />
        </Transition>
      )}
      <WalletConnect />
    </section>
  );
};

export default SwapCard;
