import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useRouter } from 'next/router';

import client from '../apollo';
import Layout from '../components/UI/Layout';
import { AlertProvider } from '../context/AlertContext';
import { FBContextProvider } from '../context/FBContext';
import { ToggleColorMode } from '../context/themeContext';
import createEmotionCache from '../styles/emotioncache';

const emoCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = emoCache }) {
  const { pathname } = useRouter();
  const maxWidth = pathname === "/" ? false : "lg";

  return (
    <ApolloProvider client={client}>
      <FBContextProvider>
        <ToggleColorMode>
          <CacheProvider value={emotionCache}>
            <AlertProvider>
              <CssBaseline />
              <Layout maxWidth={maxWidth}>
                <Component {...pageProps} />
              </Layout>
            </AlertProvider>
          </CacheProvider>
        </ToggleColorMode>
      </FBContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
