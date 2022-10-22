import "../styles/globals.css";
import Layout from "../components/UI/Layout";
import client from "../apollo";
import createEmotionCache from "../styles/emotioncache";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { FBContextProvider } from "../context/FBContext";
import { CssBaseline } from "@mui/material";
import { useRouter } from "next/router";
import { ToggleColorMode } from "../context/themeContext";

const emoCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = emoCache }) {
  const { pathname } = useRouter();
  const maxWidth = pathname === "/" ? false : "lg";

  return (
    <ApolloProvider client={client}>
      <FBContextProvider>
        <ToggleColorMode>
          <CacheProvider value={emotionCache}>
            <CssBaseline />
            <Layout maxWidth={maxWidth}>
              <Component {...pageProps} />
            </Layout>
          </CacheProvider>
        </ToggleColorMode>
      </FBContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
