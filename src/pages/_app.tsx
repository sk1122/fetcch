import '../styles/global.css';

import type { AppProps } from 'next/app';

import AppCOntextPRovider from '@/contexts/AppContext';
import { ChainContextProvider } from '@/contexts/chaincontext';
import ConnectWallet from '@/templates/ConnectWallet';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppCOntextPRovider>
    <ChainContextProvider>
      <ConnectWallet>
        <Component {...pageProps} />
      </ConnectWallet>
    </ChainContextProvider>
  </AppCOntextPRovider>
);

export default MyApp;
