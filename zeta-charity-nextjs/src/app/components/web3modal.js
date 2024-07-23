"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

// 2. Set chains
const mainnet = {
  chainId: 7000,
  name: "ZetaChain",
  currency: "ZETA",
  explorerUrl: "https://explorer.zetachain.com",
  rpcUrl: "https://zetachain-evm.blockpi.network/v1/rpc/public",
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  themeVariables: {
    "--w3m-color-mix": "#570016",
    "--w3m-accent": "#570016",
    "--w3m-color-mix-strength": 40,
  },
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

// Theme Provider

const theme = createTheme({
  palette: {
    zeta: {
      main: "#570016",
      light: "#800020",
      dark: "#400010",
      contrastText: "#1a0006",
    },
  },
});

export function Web3Modal({ children }) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </React.Fragment>
  );
}
