import { useRoutes } from "react-router-dom";
import { routesConfig } from "./routes";
import "./assets/main.scss";
import { AlertProvider } from "./context/AlertContext";

export function RootCmp() {
  const routes = useRoutes(routesConfig());

  return (
    <>
      <AlertProvider>{routes}</AlertProvider>
    </>
  );
}
