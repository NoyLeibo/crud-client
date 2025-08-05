import { Navigate } from "react-router-dom";

import type { Routemodel } from "./models/route.model";

import { NotFoundPage } from "./pages/NotFoundPage";
import { IndexPage } from "./pages/IndexPage";
import { DetailsPage } from "./pages/DetailsPage";

export function routesConfig(): Routemodel[] {
  return [
    {
      path: "/",
      element: <IndexPage />,
      label: "Home 🏠",
    },
    {
      path: "/product/:productId",
      element: <DetailsPage />,
      label: "Product Details and Edit",
    },
    {
      path: "/404",
      element: <NotFoundPage />,
      label: "Page Not Found (404)👤",
    },
    {
      path: "*",
      element: <Navigate to="/404" />,
      label: "404",
    },
  ];
}
