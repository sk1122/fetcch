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
		chain.rinkeby,
		chain.polygonMumbai,
		{
			id: 97,
			name: "BNB",
			network: "bsc",
			rpcUrls: {
				public: "https://data-seed-prebsc-1-s1.binance.org:8545/",
				default: "https://data-seed-prebsc-1-s1.binance.org:8545/",
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
