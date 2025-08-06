import { createContext, useContext, useState, useCallback } from "react";
import { AppAlert } from "../cmps/AppAlert";

type AlertType = "success" | "error";

interface AlertData {
  text: string;
  type?: AlertType;
  duration?: number;
  undoAction?: () => void;
}

interface AlertContextValue {
  showAlert: (alert: AlertData) => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertData | null>(null);

  const showAlert = useCallback((data: AlertData) => {
    setAlert(data);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <AppAlert {...alert} onClose={() => setAlert(null)} />}
    </AlertContext.Provider>
  );
}
