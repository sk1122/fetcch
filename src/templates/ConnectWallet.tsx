import '@rainbow-me/rainbowkit/styles.css';

import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React from 'react';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [
    chain.polygon,
    chain.mainnet,
    chain.optimism,
    chain.arbitrum,
    {
      id: 56,
      name: "BNB",
      network: "bsc",
      rpcUrls: {
        public: "https://bsc-dataseed1.binance.org/",
        default: "https://bsc-dataseed1.binance.org/",
      },
    },
    {
      id: 43114,
      name: "AVAX",
      network: "bsc",
      rpcUrls: {
        public: "https://api.avax.network/ext/bc/C/rpc",
        default: "https://api.avax.network/ext/bc/C/rpc",
      },
    },
  ],
  [alchemyProvider({ apiKey: "" }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'fetcch',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function ConnectWallet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        appInfo={{
          appName: 'fetcch',
        }}
        chains={chains}
        theme={{ lightMode: lightTheme(), darkMode: darkTheme() }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
