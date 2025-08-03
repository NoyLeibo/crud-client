import { useRoutes } from "react-router-dom";
import { routesConfig } from "./routes";


export function RootCmp() {
  const routes = useRoutes(routesConfig());

  return <>{routes}</>;
}
