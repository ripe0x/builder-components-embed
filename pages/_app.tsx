import "../styles/global.scss";
import "../styles/app.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import cx from "classnames";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";

import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";

const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className={cx(sfPro.variable, inter.variable)}>
          <Component {...pageProps} />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
