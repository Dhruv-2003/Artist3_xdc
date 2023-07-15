import "../styles/globals.css";
import Layout from "../src/components/Layout";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import Head from "next/head";

const desiredChainId = ChainId.Mumbai;

const xdcApothem = {
  id: 51,
  name: "Apothem-Network (TestNet)",
  network: "XDC Apothem Network (TestNet)",
  nativeCurrency: {
    decimals: 18,
    name: "XDC-Network",
    symbol: "XDC",
  },
  rpcUrls: {
    default: {
      http: ["https://erpc.apothem.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Apothem Explorer",
      url: "https://explorer.apothem.network/",
    },
  },
  testnet: true,
};

const xdcMainnet = {
  id: 50,
  name: "Xinfin MainNet",
  network: "Xinfin Network MainNet",
  nativeCurrency: {
    decimals: 18,
    name: "XDC Network",
    symbol: "XDC",
  },
  rpcUrls: {
    default: {
      http: ["https://erpc.apothem.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Xinfin Scan",
      url: "https://explorer.xinfin.network/",
    },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [xdcApothem, xdcMainnet],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Artist3",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Head>
        <title>Artist3</title>
        <meta
          name="description"
          content="Mint NFT as a proof for your digital artwork in simple steps and
              sell it in form of fractions directly on the platform to earn from
              it. Token Holders earn a profit by holding the tokens for a peroid
              of time"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThirdwebProvider>
  );
}

export default MyApp;
