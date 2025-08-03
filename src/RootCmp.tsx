import routesConfig from "./routes";
import { Outlet, useRoutes } from 'react-router-dom';

function RootCmp() {
  const routes = useRoutes(routesConfig);


  return (
    <div className="RootCmp">
      {routes}
      <Outlet />
    </div>
  );
}

export default RootCmp;
