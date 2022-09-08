import { Chain } from 'fetcch-chain-data';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { TokenInterface } from '../swap/SwapCard';



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

export const defaultTokens: TokenInterface[] = [
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    chainId: 1,
    name: 'TetherUSD',
    symbol: 'USDT',
    decimals: 6,
    logoURI:
      'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
  },
  {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    chainId: 1,
    name: 'USDCoin',
    symbol: 'USDC',
    decimals: 6,
    logoURI:
      'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
  },
];

const DefaultTokenList = ({ tokens, tokenValue, setFromCoin, setToCoin, setShowTokenList, showTokenList, toChain, fromChain, setTokens }: Props) => {
  const [searchToken, setSearchToken] = useState<string>('');
  const [tokenOnScrenIndex, setTokenOnScreenIndex] = useState(10);

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
      </div>
    </>
  );
};

export default DefaultTokenList;
