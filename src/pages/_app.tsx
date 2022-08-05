import '../styles/global.css';

import type { AppProps } from 'next/app';

import ConnectWallet from '@/templates/ConnectWallet';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ConnectWallet>
    <Component {...pageProps} />
  </ConnectWallet>
);

export default MyApp;
