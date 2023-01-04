import { Chain } from 'fetcch-chain-data';
import {  useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';

import DefaultTokenList from './DefaultList';

interface Props {
  coins: any[]
  tokenValue: string;
  setShowTokenList: Function
  setFromCoin: Function
  setToCoin: Function
  showTokenList: any
  toChain: Chain
  fromChain: Chain

}

const TokenListComp = ({ coins, tokenValue, setShowTokenList, setFromCoin, setToCoin, showTokenList, toChain, fromChain }: Props) => {
  const [onMangaeTokenPage, setOnManageTokenPage] = useState(false);
  console.log(coins, "token")
  const [tokens, setTokens] = useState<any| null>(Object.values(coins).map((list: any) => {
          return [...list]
  }).flat());

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-fetcch-purple bg-opacity-30 outline-none focus:outline-none">
        <div className="no-scrollbar rounded-xl relative my-6 mx-auto  max-h-[800px] w-[450px] max-w-5xl overflow-auto   bg-fetcch-purple ">
          {/* content */}
          <div className="relative flex w-full flex-col overflow-hidden rounded-lg border-0  bg-fetcch-dark/10 px-5 text-white shadow-lg outline-none focus:outline-none ">
            <div className="sticky top-0 z-40 mt-5 flex items-center justify-between rounded-t  ">
              {onMangaeTokenPage ? (
                <>
                  <button
                    onClick={() => {
                      setOnManageTokenPage(false);
                    }}
                  >
                    <IoMdArrowBack className="text-lg" />
                  </button>

                  <h3 className="text-xl font-semibold">Select token</h3>
                </>
              ) : (
                <h3 className="text-xl font-semibold">Manage Tokens</h3>
              )}
              <div>
                <button
                  className="float-right ml-auto border-0 bg-transparent p-1   text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                  onClick={() => setShowTokenList(false)}
                >
                  <AiOutlineClose className="text-2xl text-white " />
                </button>
              </div>
            </div>
            {/* body */}
            <div className="relative min-h-[500px] flex-auto space-y-3 py-2">
              <DefaultTokenList setTokens={setTokens} toChain={toChain} fromChain={fromChain} setFromCoin={setFromCoin} setShowTokenList={setShowTokenList} setToCoin={setToCoin} showTokenList={showTokenList} key={3} tokenValue={tokenValue} tokens={tokens} coins={coins} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenListComp;
