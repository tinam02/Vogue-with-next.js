import { FBContextProvider } from "../context/FBContext";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";

function MyApp({ Component, pageProps }) {

  return (
    <ApolloProvider client={client}>
      <FBContextProvider>
        <Component {...pageProps} />
      </FBContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
