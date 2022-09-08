import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';

import type { TokenInterface, TokenList } from '@/contexts/AppContext';
import { useAppContext } from '@/contexts/AppContext';
import { useChainContext } from '@/contexts/chaincontext';

import CustomTokenList from './customList';
import DefaultTokenList from './DefaultList';

const defaultList: TokenList[] = [
  {
    name: '1inch',
    url: 'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link',
    timestamp: '2022-08-08T06:09:44.387+00:00',
    logourl: 'https://app.1inch.io/assets/images/logo.png',
  },
  {
    name: 'CoinGecko',
    url: 'https://tokens.coingecko.com/uniswap/all.json',
    timestamp: '2022-08-08T06:09:44.387+00:01',
    logourl:
      'https://www.coingecko.com/assets/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png',
  },
];

interface Props {
  tokenValue: string;
}

const TokenListComp = ({ tokenValue }: Props) => {
  const { setShowTokenList } = useAppContext();
  const { fromCoin, toCoin } = useChainContext();
  const [onMangaeTokenPage, setOnManageTokenPage] = useState(false);
  const [tokens, setTokens] = useState<TokenInterface[] | null>(null);
  const [tokenLists] = useState<TokenList[]>(defaultList);
  console.log('rendring ', tokenValue);

  useEffect(() => {
    console.log(fromCoin);
    console.log(toCoin);
  }, [fromCoin, toCoin]);

  useEffect(() => {
    console.log(tokenValue);
  }, []);

  const fetchTokens = async () => {
    const res = await axios.get(
      'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json'
    );
    setTokens(res.data.tokens);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    console.log(tokens);
    console.log(tokens?.filter((token: any) => token.symbol === 'ETH'));
  }, [tokens]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-fetcch-purple bg-opacity-25 outline-none focus:outline-none">
        <div className="no-scrollbar relative my-6 mx-auto  max-h-[800px] w-[450px] max-w-5xl  overflow-auto ">
          {/* content */}
          <div className="relative flex w-full flex-col overflow-hidden rounded-lg border-0 bg-fetcch-purple  px-5 text-white shadow-lg outline-none focus:outline-none ">
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

                  <h3 className="text-xl font-semibold">select token</h3>
                </>
              ) : (
                <h3 className="text-xl font-semibold">mangae token</h3>
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
              {onMangaeTokenPage ? (
                <CustomTokenList
                  setTokens={setTokens}
                  tokenlists={tokenLists}
                />
              ) : (
                <DefaultTokenList
                  tokenValue={tokenValue}
                  setOnManageTokenPage={setOnManageTokenPage}
                  tokens={tokens}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenListComp;
