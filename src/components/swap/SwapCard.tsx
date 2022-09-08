import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';

import { useBridge } from '@/hooks/useBridge';
import { Swap } from '@/icons/swap';

import ChainSelect from './ChainSelect';
import CoinSelect from './CoinSelect';
import WalletConnect from './shared/WalletConnect';
import { ethers } from 'ethers';

import { getChains, getTokens } from "fetcch-chain-data";
import type {Chain} from "fetcch-chain-data";
import TokenListComp from '../tokenlist';

const chainList: Chain[] = [...getChains()];

export const coins: any = getTokens()


export interface TokenInterface {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

const SwapCard = () => {
  const { address } = useAccount();
  const [toggle2, _setToggle2] = useState(true);
  const [fromChain, setFromChain] = useState(chainList[0] as Chain);
  const [toChain, setToChain] = useState(chainList[1] as Chain);
  const [receiver, setReceiver] = useState('');
  const [fromChainList, setFromChainList] = useState(chainList.filter(chain => chain.name !== fromChain.name));
  const [toChainList, setToChainList] = useState(
		chainList.filter((chain) => chain.name !== toChain.name)
  );
  const [fees, setFees] = useState('0')

  const { estimateFees, swapFunds } = useBridge();

  // @ts-ignore
  const [fromCoin, setFromCoin] = useState(coins[fromChain.internalId][0]);
  // @ts-ignore
  const [toCoin, setToCoin] = useState(coins[toChain.internalId][1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('0.00');
  const [showTokenList, setShowTokenList] = useState(false)
  const [tokenValue, setTokenValue] = useState('from')

  const changeFromChain = (value: Chain) => {
    if (toChain) {
      let val: Chain = fromChain
			if (value.name === toChain.name) {
				setToChain(fromChain);
      }

      setFromChain(value);
      setFromChainList(chainList.filter((v) => v.name !== value.name));
      setToChainList(chainList.filter((v) => v.name !== val.name));
    }
  };

  const changeToChain = (value: Chain) => {
    if (fromChain) {
      let val = toChain
			if (value.name === fromChain.name) {
        setFromChain(toChain);
      }

      setToChain(value);
      setToChainList(chainList.filter((v) => v.name !== value.name));
      setFromChainList(chainList.filter((v) => v.name !== val.name));
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
      estimateFees(fromCoin as any, toCoin as any, Number(fromAmount)).then(
        (a) => {setToAmount(a.amountOut.toString());setFees(a.fees.toString())}
      );
    }
  }, [fromCoin, toCoin, fromChain, toChain, fromAmount]);

	const { data: signer } = useSigner();

	const swap = async () => {
		if(signer && fromCoin && toCoin) {
			const chainId = await signer.getChainId()
			// console.log(chainId, fromCoin.lchainId);
			if(chainId !== fromCoin.lchainId) {
				alert("from chain is not same as connect chain")
				return
			}

			if(toggle2 && !ethers.utils.isAddress(receiver)) {
				alert("receiver is not an address")
				return
			}

			const tx = await swapFunds(fromCoin as any, toCoin as any, fromAmount, ethers.utils.parseUnits(toAmount, toCoin?.decimals).toString(), toggle2 ? receiver : await signer.getAddress(), signer)
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

							<div className="absolute inset-y-0 right-0 flex w-2/5 items-center rounded-r-md bg-white">
								<span className="pr-2 text-xs font-semibold text-fetcch-purple underline underline-offset-1">
									MAX
								</span>
								<CoinSelect
									value={fromCoin as any}
									setValue={setFromCoin}
                  tokenValue="from"
                  setShowTokenList={setShowTokenList}
                  showTokenList={showTokenList}
                  setTokenValue={setTokenValue}
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
									value={toCoin as any}
									setValue={setToCoin}
                  tokenValue="to"
                  setShowTokenList={setShowTokenList}
                  showTokenList={showTokenList}
                  setTokenValue={setTokenValue}
								/>
							</div>
						</div>
					</div>
					<p className="text-md text-gray-500">Fees - {fees} {toCoin?.name}</p>
				</div>
			</div>

		{/* section #3 removed */}

			{/* section #4 */}
			{toggle2 && (
				<Transition
					show={toggle2}
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
      {

      showTokenList && <TokenListComp toChain={toChain} fromChain={fromChain} setFromCoin={setFromCoin} setToCoin={setToCoin} setShowTokenList={setShowTokenList} showTokenList={showTokenList} tokenValue={tokenValue}  />
      }
		</section>
    
  );
};

export default SwapCard;
