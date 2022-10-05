import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import { FBContextProvider } from "../context/FBContext";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";
import createEmotionCache from "../styles/emotioncache";
import themeOptions from "../styles/theme";

const emoCache = createEmotionCache();
const lightTheme = createTheme(themeOptions);

function MyApp({ Component, pageProps, emotionCache = emoCache }) {
  return (
    <ApolloProvider client={client}>
      <FBContextProvider>
        <ThemeProvider theme={lightTheme}>
          <CacheProvider value={emotionCache}>
            <CssBaseline />
            <Component {...pageProps} />
          </CacheProvider>
        </ThemeProvider>
      </FBContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
