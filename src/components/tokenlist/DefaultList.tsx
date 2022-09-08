import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';

import type { TokenInterface } from '@/contexts/AppContext';
import { useAppContext } from '@/contexts/AppContext';
import { defaultTokens, useChainContext } from '@/contexts/chaincontext';

import Token from './token';
import CoinCaps from './tokencap';

interface Props {
  setOnManageTokenPage: Function;
  tokens: TokenInterface[] | any;
  tokenValue: string;
}

const DefaultTokenList = ({
  setOnManageTokenPage,
  tokens,
  tokenValue,
}: Props) => {
  const { setToCoin, setFromCoin } = useChainContext();
  const { setShowTokenList, showTokenList } = useAppContext();
  const [searchToken, setSearchToken] = useState<string>('');
  const [tokenOnScrenIndex, setTokenOnScreenIndex] = useState(10);

  useEffect(() => {
    console.log('defaulttokens', defaultTokens);
  }, []);

  return (
    <>
      <div className="flex w-full  items-center bg-fetcch-dark/50   px-2 text-white ">
        <AiOutlineSearch className="text-2xl" />
        <input
          type="text"
          value={searchToken}
          onChange={(e) => {
            setSearchToken(e.target.value);
          }}
          placeholder="search tokens"
          className="w-full border-none bg-transparent p-3 focus:border-none focus:outline-none"
        />
      </div>
      <div className="flex flex-wrap items-center space-x-2 space-y-1">
        {defaultTokens?.map((token: TokenInterface, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                if (tokenValue === 'from') {
                  setFromCoin(token);
                } else {
                  setToCoin(token);
                }
                setShowTokenList(false);
              }}
            >
              {' '}
              <CoinCaps
                name={token.name}
                symbol={token.symbol}
                key={token.address}
                logoURI={token.logoURI}
                chainId={token.chainId}
                address={token.address}
                decimals={token.decimals}
              />{' '}
            </div>
          );
        })}
      </div>
      <div
        className="max-h-[330px] overflow-y-auto"
        onScroll={() => {
          setTokenOnScreenIndex(tokenOnScrenIndex + 1);
        }}
      >
        <div className="w-full space-y-1  p-1">
          {tokens
            ?.slice(
              0,
              // eslint-disable-next-line no-unsafe-optional-chaining
              searchToken === '' ? tokenOnScrenIndex : tokens?.length - 1
            )
            // eslint-disable-next-line array-callback-return, consistent-return
            .filter((token: TokenInterface) => {
              if (searchToken === '') {
                return token;
              }
              if (
                token.name.toLowerCase().includes(searchToken.toLowerCase())
              ) {
                return token;
              }
            })
            .map((token: TokenInterface, index: number) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    tokenValue === 'from'
                      ? setFromCoin(token)
                      : setToCoin(token);
                    setShowTokenList(!showTokenList);
                  }}
                >
                  {' '}
                  <Token
                    decimals={token.decimals}
                    name={token.name}
                    symbol={token.symbol}
                    logoURI={token.logoURI}
                    address={token.address}
                    chainId={token.chainId}
                    key={token.name}
                  />{' '}
                </div>
              );
            })}
        </div>
      </div>

      <div className="absolute bottom-0 flex w-full items-center justify-between pb-2">
        <div>tokens : {tokens?.length}</div>
        <button
          onClick={() => {
            setOnManageTokenPage(true);
          }}
          className=" flex items-center  bg-fetcch-dark/50 px-3 py-2   "
        >
          {' '}
          <span>
            <FiEdit className="mr-1 text-xl" />
          </span>{' '}
          manage tokens{' '}
        </button>
      </div>
    </>
  );
};

export default DefaultTokenList;
