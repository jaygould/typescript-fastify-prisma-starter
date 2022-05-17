import { CookiesProvider } from "react-cookie";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

import "../styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  );
}
