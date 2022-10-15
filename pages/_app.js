import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import { FBContextProvider } from "../context/FBContext";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";
import createEmotionCache from "../styles/emotioncache";
import themeOptions from "../styles/theme";
import "../styles/globals.css";
import Layout from "../components/UI/Layout";

const emoCache = createEmotionCache();
const lightTheme = createTheme(themeOptions);

function MyApp({ Component, pageProps, emotionCache = emoCache }) {
  return (
    <ApolloProvider client={client}>
      <FBContextProvider>
        <ThemeProvider theme={lightTheme}>
          <CacheProvider value={emotionCache}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CacheProvider>
        </ThemeProvider>
      </FBContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
