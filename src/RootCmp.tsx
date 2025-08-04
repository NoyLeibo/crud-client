import { useRoutes } from "react-router-dom";
import { routesConfig } from "./routes";
import "./assets/main.scss";

export function RootCmp() {
  const routes = useRoutes(routesConfig());

  return (
    <>
      {routes}
    </>
  );
}
