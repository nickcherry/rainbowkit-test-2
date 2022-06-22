import '@rainbow-me/rainbowkit/styles.css';
import { Example } from './Example';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import React, { FC } from 'react';
import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    infuraProvider({ infuraId: process.env.REACT_APP_INFURA_ID }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'Farcaster',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider: provider as unknown as providers.BaseProvider,
});

const App: FC = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Example />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export { App };
