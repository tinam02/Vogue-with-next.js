import { FBContextProvider } from "../context/FBContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <FBContextProvider>
      <Component {...pageProps} />
    </FBContextProvider>
  );
}

export default MyApp;
