import { Alert, AlertTitle, ButtonBase, Snackbar } from '@mui/material';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import CrossIcon from '../components/UI/Icons/CrossIcon';

interface SnackbarMessage {
  message: string;
  title?: string;
  type?: "success" | "error";
  key?: number;
}

const getColor = (type: "success" | "error" | undefined) => {
  switch (type) {
    case "success":
      return "#6BB730";
    case "error":
      return "#BC331B";
    case undefined:
      return "#FBAE17";
    default:
      return "#FBAE17";
  }
};

interface AlertContextInterface {
  showAlert: ({ title, type, message, key }: SnackbarMessage) => void;
}

export const AlertContext = createContext<AlertContextInterface>(
  {} as AlertContextInterface
);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );

  useEffect(() => {
    if (alerts.length && !messageInfo) {
      setMessageInfo({ ...alerts[0] });
      setAlerts((prev) => prev.slice(1));
      setOpen(true);
    } else if (alerts.length && messageInfo && open) {
      setOpen(false);
    }
  }, [alerts, messageInfo, open]);

  const showAlert = useCallback(({ message, title, type }: SnackbarMessage) => {
    setAlerts((prev) => [
      ...prev,
      { message, title, type, key: new Date().getTime() },
    ]);
  }, []);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const action = (
    <ButtonBase
      aria-label="close"
      color="inherit"
      onClick={handleClose}
      sx={{ display: "flex", alignItems: "center", p: "6px", m: 0 }}
    >
      <CrossIcon fontSize="18px" />
    </ButtonBase>
  );

  const value = useMemo(
    () => ({
      showAlert,
    }),
    [showAlert]
  );

  return (
    <AlertContext.Provider value={value}>
      {children}

      <Snackbar
        onClose={handleClose}
        open={open}
        action={action}
        autoHideDuration={2600}
        TransitionProps={{ onExited: handleExited }}
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          variant="outlined"
          action={action}
          icon={false}
          sx={{
            borderColor: getColor(messageInfo?.type),
            color: "text.primary",
            backgroundColor: "background.paper",
          }}
        >
          {messageInfo && messageInfo.title && (
            <AlertTitle>{messageInfo.title}</AlertTitle>
          )}
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export default function useAlerts() {
  return useContext(AlertContext);
}
