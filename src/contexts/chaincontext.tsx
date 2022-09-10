import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

export interface ChainContextInterface {
  fromCoin: any;
  toCoin: any;
  amount: string;
  toggle: boolean;
  setFromCoin: Dispatch<SetStateAction<any>>;
  setToCoin: Dispatch<SetStateAction<any>>;
  setAmount: Dispatch<SetStateAction<string>>;
  setToggle: Dispatch<SetStateAction<boolean>>;
  tokens: TokenInterface[] | null;
  setTokens: Dispatch<SetStateAction<TokenInterface[] | null>>;
  defaultTokens: TokenInterface[];
}

export interface TokenList {
  name: string;
  url: string;
  logourl: string;
  timestamp: string;
}

export interface TokenInterface {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
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

const ChainContext = createContext<ChainContextInterface>(
  {} as ChainContextInterface
);

interface IContextProps {
  children: ReactNode;
}

export function useChainContext() {
  return useContext(ChainContext);
}

export function ChainContextProvider({ children }: IContextProps) {
  const [toggle, setToggle] = useState(false);
  const [fromCoin, setFromCoin] = useState(defaultTokens[0]);
  const [toCoin, setToCoin] = useState(defaultTokens[1]);
  const [amount, setAmount] = useState<string>('');
  const [tokens, setTokens] = useState<TokenInterface[] | null>(null);

  const sharedState: ChainContextInterface = {
    fromCoin,
    toCoin,
    amount,
    toggle,
    setFromCoin,
    setToCoin,
    setAmount,
    setToggle,
    tokens,
    setTokens,
    defaultTokens,
  };

  return (
    <ChainContext.Provider value={sharedState}>
      {children}
    </ChainContext.Provider>
  );
}
