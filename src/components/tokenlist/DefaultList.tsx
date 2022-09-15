import { Chain } from 'fetcch-chain-data';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { TokenInterface } from '../swap/SwapCard';
// import { getTokenByName } from 'fetcch-chain-data'


import Token from './token';
import CoinCaps from './tokencap';

interface Props {
  tokens: TokenInterface[] | any;
  tokenValue: string;
  setFromCoin: Function
  setToCoin: Function
  setShowTokenList: Function
  showTokenList: Function,
  toChain: Chain
  fromChain: Chain
  setTokens: Function
}

export const Fetcch_bnb = {
  "name": "FetcchTEST TOKEN",
  "symbol": "FTST",
  "address": "0x0F20970D15cBF09abb3569F26Df55684e9A433cc",
  "chainId": 56,
  "decimals": 18,
  "logoURI": "https://pbs.twimg.com/profile_images/1556605149287948288/mhGJXWHS_400x400.jpg"
}

export const Fetcch_poly = {
  "name": "FetcchTEST TOKEN",
  "symbol": "FTST",
  "address": "0x120854B8eC9F2Fd19218F04D2DD37bEEB5282656",
  "chainId": 137,
  "decimals": 18,
  "logoURI": "https://pbs.twimg.com/profile_images/1556605149287948288/mhGJXWHS_400x400.jpg"
}

const DefaultTokenList = ({ tokens, tokenValue, setFromCoin, setToCoin, setShowTokenList, showTokenList, toChain, fromChain, setTokens }: Props) => {
  
  const [searchToken, setSearchToken] = useState<string>('');
  const [tokenOnScrenIndex, setTokenOnScreenIndex] = useState(10);
  const [defaultTokens] = useState(fromChain.internalId === 3 ? [Fetcch_bnb] : [Fetcch_poly])
  const [defaultToTokens] = useState(toChain.internalId === 3 ? [Fetcch_bnb] : [Fetcch_poly])

  useEffect(() => {
    if(tokenValue == "from") {
      setTokens(tokens.filter((token: TokenInterface) => {
          return token.chainId == fromChain.chainId
      }))
    } else {
         setTokens(tokens.filter((token: TokenInterface) => {
          return token.chainId == toChain.chainId
      }))
      
    }
  }, [toChain, fromChain]);

  return (
    <>
      <div className="flex w-full items-center bg-fetcch-dark/50   px-2 text-white ">
        <AiOutlineSearch className="text-2xl" />
        <input
          type="text"
          value={searchToken}
          onChange={(e) => {
            setSearchToken(e.target.value);
          }}
          placeholder="Search tokens"
          className="w-full border-none bg-transparent p-3 focus:border-none focus:outline-none"
        />
      </div>
      <div className="flex flex-wrap items-center space-x-2 space-y-1">
        {tokenValue === 'from' && defaultTokens?.map((token: TokenInterface, index: number) => {
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
        {tokenValue === 'to' && defaultToTokens?.map((token: TokenInterface, index: number) => {
          console.log(token)
          return (
            <div
              key={index}
              onClick={() => {
                setToCoin(token);
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
              0, searchToken === '' ? tokenOnScrenIndex : tokens?.length - 1
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

              return undefined
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
        <div>There are {tokens?.length} tokens</div>
      </div>
    </>
  );
};

export default DefaultTokenList;
