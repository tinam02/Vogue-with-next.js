
import "../styles/globals.css";
import Layout from "../components/UI/Layout";
import client from "../apollo";
import createEmotionCache from "../styles/emotioncache";
import themeOptions from "../styles/theme";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { FBContextProvider } from "../context/FBContext";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { useRouter } from "next/router";

const emoCache = createEmotionCache();
const lightTheme = createTheme(themeOptions);

function MyApp({ Component, pageProps, emotionCache = emoCache }) {
  const { pathname } = useRouter();
  const maxWidth = pathname === "/" ? false : "lg";
  return (
    <ApolloProvider client={client}>
      <FBContextProvider>
        <ThemeProvider theme={lightTheme}>
          <CacheProvider value={emotionCache}>
            <CssBaseline />
            <Layout maxWidth={maxWidth}>
              <Component {...pageProps} />
            </Layout>
          </CacheProvider>
        </ThemeProvider>
      </FBContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
