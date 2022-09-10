import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

interface ContextINTerface {
  showTokenList: boolean;
  setShowTokenList: Dispatch<SetStateAction<boolean>>;
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

export const AppContext = createContext<ContextINTerface>(
  {} as ContextINTerface
);
export function useAppContext() {
  return useContext(AppContext);
}

interface AppCOntextProps {
  children: ReactNode;
}

const AppCOntextPRovider = ({ children }: AppCOntextProps) => {
  const [showTokenList, setShowTokenList] = useState<boolean>(false);

  const sharedState = {
    showTokenList,
    setShowTokenList,
  };

  return (
    <AppContext.Provider value={sharedState}>{children} </AppContext.Provider>
  );
};

export default AppCOntextPRovider;
