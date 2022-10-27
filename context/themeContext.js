import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useEffect, useMemo, useState } from 'react';

import { baseTheme, darkPalette, lightPalette } from '../styles/theme';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem("mode", mode === "light" ? "dark" : "light");
      },
    }),
    [mode]
  );

  useEffect(() => {
    const localMode = localStorage.getItem("mode");
    localMode && setMode(localMode);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          mode,
          ...(mode === "light" ? lightPalette : darkPalette),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { ColorModeContext, ToggleColorMode };
