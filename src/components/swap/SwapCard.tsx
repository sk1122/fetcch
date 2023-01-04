import { Switch, Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { useGetTransactionData } from "../../hooks/getTransactions"

import { Swap } from '@/icons/swap';

import ChainSelect from './ChainSelect';
import CoinSelect from './CoinSelect';
import WalletConnect from './shared/WalletConnect';
import { ethers } from 'ethers';

import { getChains, getTokens } from "fetcch-chain-data";
import type {Chain} from "fetcch-chain-data";
import TokenListComp from '../tokenlist';
import { getQuote, swapFunds } from '@/hooks/bridge';

const chainList: Chain[] = [...getChains()];

export interface TokenInterface {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

const SwapCard = () => {

  const [coins, setCoins] = useState<any>()
  
  const { address } = useAccount();
  const [toggle2, _setToggle2] = useState(true);
  const [fromChain, setFromChain] = useState(chainList[3] as Chain);
  const [toChain, setToChain] = useState(chainList[1] as Chain);
  const [receiver, setReceiver] = useState('');
  const [fromChainList, setFromChainList] = useState([chainList[1]]);
  const [toChainList, setToChainList] = useState(
		[chainList[3]]
  );
  const [fees, setFees] = useState('0')
  const { setHash } = useGetTransactionData();

  // @ts-ignore
  const [fromCoin, setFromCoin] = useState(coins && coins[fromChain.internalId][0]);
  // @ts-ignore
  const [toCoin, setToCoin] = useState(coins && coins[toChain.internalId][1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('0.00');
  const [showTokenList, setShowTokenList] = useState(false)
  const [tokenValue, setTokenValue] = useState('from')

  const changeFromChain = (value: Chain) => {
    if (toChain) {
      // let val: Chain = fromChain
			if (value.name === toChain.name) {
				setToChain(fromChain);
      }

      setFromChain(value);
      setFromChainList([chainList[value.chainId == 1 ? 3 : 1]]);
      setToChainList([chainList[value.chainId == 1 ? 1 : 3]]);
    }
  };

  const changeToChain = (value: Chain) => {
    if (fromChain) {
      // let val = toChain
			if (value.name === fromChain.name) {
        setFromChain(toChain);
      }

      setToChain(value);
      setToChainList([chainList[value.chainId == 1 ? 3 : 1]]);
      setFromChainList([chainList[value.chainId == 1 ? 1 : 3]]);
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
    if(coins) setFromCoin(coins[fromChain.internalId][0])
  }, [fromChain])

  useEffect(() => {
    if (coins) setToCoin(coins[toChain.internalId][0]);
  }, [toChain]);

  const getAllTokens = async () => {
    const tokens = getTokens()

    const res = await fetch(`https://api.1inch.io/v5.0/43114/tokens`);
    const data = await res.json()

    console.log(data.tokens, "tokens");

    setCoins({
      ...tokens,
      "4": Object.values(data.tokens).map((x: any) => ({
        ...x,
        chainId: 43114
      }))
    });
  }

  useEffect(() => {
    getAllTokens()
  }, [])

  useEffect(() => {
    const delay = setTimeout(() => {
      if (fromCoin && toCoin && fromChain && toChain && fromAmount) {
        console.log(toCoin.symbol.startsWith("FTST"), fromAmount, "das")
        if(fromCoin && fromCoin.symbol.startsWith('FTST') && toCoin.symbol.startsWith('FTST')) {
          const fees = Number(fromAmount) * 0.001
          
          setToAmount((Number(fromAmount) - fees).toString())
          setFees(fees.toString())
          return
        }
        
        getQuote({fromChain, toChain, fromToken: fromCoin, toToken: toCoin, amount: ethers.utils.parseUnits(fromAmount, fromCoin.decimals).toString()}).then(
          (a) => {setToAmount(a.amountOut.toString());setFees(a.fees.toString())}
        );
      }
    }, 1000)

    return () => clearTimeout(delay)
  }, [fromCoin, toCoin, fromChain, toChain, fromAmount]);

  // useEffect(() => {toast.success("successful")}, []);

	const { data: signer } = useSigner();

	const swap = async () => {
		if(signer && fromCoin && toCoin) {
			const chainId = await signer.getChainId()
			// console.log(chainId, fromCoin.lchainId);
			if(chainId !== fromChain.chainId) {
				alert("from chain is not same as connect chain")
				return
			}

			if(toggle2 && !ethers.utils.isAddress(receiver)) {
				alert("receiver is not an address")
				return
			}

      console.log(fromAmount, fromCoin.decimals, ethers.utils.parseUnits(fromAmount, fromCoin.decimals).toString())

			const tx = await swapFunds({
        receiver: toggle2 ? receiver : await signer.getAddress(),
        fromChain,
        toChain,
        fromToken: fromCoin,
        toToken: toCoin,
        amount: ethers.utils.parseUnits(fromAmount, fromCoin.decimals).toString(),
        signer
      })
			console.log(tx)
      setHash(tx);
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
                <span className="text-gray-500 sm:text-sm">$</span>
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
                  coins={coins}
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
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                //@ts-ignore
                value={
                  toAmount.split(".").length > 1
                    ? toAmount.split(".")[0] +
                      "." +
                      toAmount.split(".")[1]?.substring(0, 2)
                    : toAmount
                }
                className="block h-10 w-3/5 rounded-l-md border-none bg-white pl-7 text-black outline-none sm:text-sm"
                placeholder="0.00"
                disabled
              />
              <div className="absolute inset-y-0 right-0 flex w-2/5 items-center rounded-r-md bg-white">
                <CoinSelect
                  coins={coins}
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
          <p className="text-md text-gray-500">
            Fees - {Number(fees).toFixed(2)} {fromCoin && fromCoin.symbol}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-evenly space-y-6 space-x-3 md:flex-row md:space-y-0">
        <div className="flex w-full items-center justify-between space-x-4">
          <h2 className="pl-2 text-left font-semibold">Change Reciever</h2>
          <Switch
            checked={toggle2}
            onChange={() => _setToggle2(!toggle2)}
            className={
              toggle2
                ? "bg-fetcch-purple"
                : "bg-gray-200" +
                  " relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
            }
          >
            <span className="sr-only">Use setting</span>
            <span
              className={
                toggle2
                  ? "translate-x-5"
                  : "translate-x-0" +
                    " pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              }
            >
              <span
                className={
                  toggle2
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200" +
                      " absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                }
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
                className={
                  toggle2
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100" +
                      " absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                }
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
      {showTokenList && (
        <TokenListComp
          coins={coins}
          toChain={toChain}
          fromChain={fromChain}
          setFromCoin={setFromCoin}
          setToCoin={setToCoin}
          setShowTokenList={setShowTokenList}
          showTokenList={showTokenList}
          tokenValue={tokenValue}
        />
      )}
    </section>
  );
};

export default SwapCard;
