import { Switch, Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';

import { useBridge } from '@/hooks/useBridge';
import { Swap } from '@/icons/swap';
import type { Chain, Coin } from '@/types';

import ChainSelect from './ChainSelect';
import CoinSelect from './CoinSelect';
import WalletConnect from './shared/WalletConnect';
import ToggleOff from './ToggleOff';
import ToggleOn from './ToggleOn';
import { ethers } from 'ethers';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const chainList: Chain[] = [
  {
    id: 1,
    name: 'Rinkeby (ETH)',
    icon: 'https://movricons.s3.ap-south-1.amazonaws.com/Ether.svg',
    chainId: '4',
  },
  {
    id: 2,
    name: 'Mumbai (POL)',
    icon: 'https://movricons.s3.ap-south-1.amazonaws.com/Matic.svg',
    chainId: '80001',
  },
];

export const coins: { "4": Coin[]; "80001": Coin[] } = {
	"4": [
		{
			id: 1,
			name: "USDC",
			icon: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
			address: "0xd3AfdA70B888388a1d5e8737Ba8b533fFE352e92",
			decimals: 18,
			chainId: "10001",
			lchainId: 4,
		},
		{
			id: 2,
			name: "USDT",
			icon: "https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707",
			address: "0x28484dF284De386A00b025998B0dE5ED1af63e1A",
			decimals: 18,
			chainId: "10001",
			lchainId: 4,
		},
		{
			id: 3,
			name: "WETH",
			icon: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
			address: "0x60091A457EBbb78d4054aA49502ED3150722228F",
			decimals: 18,
			chainId: "10001",
			lchainId: 4,
		},
	],
	"80001": [
		{
			id: 1,
			name: "USDC",
			icon: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
			address: "0x09b93456Ea3799fC88e4afD4D9cCCA11F032520d",
			decimals: 18,
			chainId: "10009",
			lchainId: 80001,
		},
		{
			id: 2,
			name: "USDT",
			icon: "https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707",
			address: "0xd3AfdA70B888388a1d5e8737Ba8b533fFE352e92",
			decimals: 18,
			chainId: "10009",
			lchainId: 80001,
		},
		{
			id: 3,
			name: "WMATIC",
			icon: "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912",
			address: "0x60091A457EBbb78d4054aA49502ED3150722228F",
			decimals: 18,
			chainId: "10001",
			lchainId: 4,
		},
	],
};

const SwapCard = () => {
  const { address } = useAccount();

  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [fromChain, setFromChain] = useState(chainList[0] as Chain);
  const [toChain, setToChain] = useState(chainList[1] as Chain);
  const [receiver, setReceiver] = useState('');
  const [fromChainList, setFromChainList] = useState([chainList[1]]);
  const [toChainList, setToChainList] = useState([chainList[0]]);
  const [fees, setFees] = useState('0')

  const { estimateFees, swapFunds } = useBridge();

  // @ts-ignore
  const [fromCoin, setFromCoin] = useState(coins[fromChain.chainId][0]);
  // @ts-ignore
  const [toCoin, setToCoin] = useState(coins[toChain.chainId][1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('0.00');

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

  useEffect(() => {
    if (fromCoin && toCoin && fromChain && toChain && fromAmount) {
      estimateFees(fromCoin as Coin, toCoin as Coin, Number(fromAmount)).then(
        (a) => {setToAmount(a.amountOut.toString());setFees(a.fees.toString())}
      );
    }
  }, [fromCoin, toCoin, fromChain, toChain, fromAmount]);

	const { data: signer } = useSigner();

	const swap = async () => {
		if(signer && fromCoin && toCoin) {
			const chainId = await signer.getChainId()
			if(chainId !== fromCoin.lchainId) {
				alert("from chain is not same as connect chain")
				return
			}

			if(toggle2 && !ethers.utils.isAddress(receiver)) {
				alert("receiver is not an address")
				return
			}

			const tx = await swapFunds(fromCoin as Coin, toCoin as Coin, fromAmount, ethers.utils.parseUnits(toAmount, toCoin?.decimals).toString(), toggle2 ? receiver : await signer.getAddress(), signer)
			console.log(tx)
		}
	}

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
								<span className="text-gray-500 sm:text-sm">
									$
								</span>
							</div>

							<input
								type="number"
								name="amount"
								id="amount"
								value={fromAmount}
								onChange={(e) => setFromAmount(e.target.value)}
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
								<span className="text-gray-500 sm:text-sm">
									$
								</span>
							</div>
							<input
								type="number"
								name="amount"
								id="amount"
								value={toAmount}
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
					<p className="text-md text-gray-500">Fees - {fees} {toCoin?.name}</p>
				</div>
			</div>

			{/* section #3 */}
			<div className="flex w-full flex-col justify-evenly space-y-6 space-x-3 md:flex-row md:space-y-0">
				<div className="flex w-full items-center justify-between space-x-4 ">
					<h2 className="pl-2 text-left font-semibold">
						Select bridge automatically
					</h2>
					<Switch
						checked={toggle}
						onChange={setToggle}
						className={classNames(
							toggle ? "bg-fetcch-purple" : "bg-gray-200",
							"relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
						)}
					>
						<span className="sr-only">Use setting</span>
						<span
							className={classNames(
								toggle ? "translate-x-5" : "translate-x-0",
								"pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
							)}
						>
							<span
								className={classNames(
									toggle
										? "opacity-0 ease-out duration-100"
										: "opacity-100 ease-in duration-200",
									"absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
										? "opacity-100 ease-in duration-200"
										: "opacity-0 ease-out duration-100",
									"absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
				<div className="flex w-full items-center justify-between space-x-4">
					<h2 className="pl-2 text-left font-semibold">
						Change Reciever
					</h2>
					<Switch
						checked={toggle2}
						onChange={setToggle2}
						className={classNames(
							toggle2 ? "bg-fetcch-purple" : "bg-gray-200",
							"relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
						)}
					>
						<span className="sr-only">Use setting</span>
						<span
							className={classNames(
								toggle2 ? "translate-x-5" : "translate-x-0",
								"pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
							)}
						>
							<span
								className={classNames(
									toggle2
										? "opacity-0 ease-out duration-100"
										: "opacity-100 ease-in duration-200",
									"absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
									toggle2
										? "opacity-100 ease-in duration-200"
										: "opacity-0 ease-out duration-100",
									"absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
			</div>

			{/* section #4 */}
			{toggle2 && (
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
					<input
						type="text"
						onChange={(e) => setReceiver(e.target.value)}
						value={receiver}
						className="block h-10 w-full rounded-l-md border-none bg-white pl-7 text-black outline-none sm:text-sm"
						placeholder="Receiver Address"
					/>
				</Transition>
			)}
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
			{!address && <WalletConnect />}
			{address && (
				<div
					onClick={() => swap()}
					className="cursor-pointer flex w-full items-center justify-center space-x-2 rounded-md bg-fetcch-purple px-6 py-2 text-center text-sm font-medium text-white"
				>
					<h1>Swap Here</h1>
					<Swap />
				</div>
			)}
		</section>
  );
};

export default SwapCard;
