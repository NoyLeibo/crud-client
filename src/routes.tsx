import { Navigate } from "react-router-dom";

import type { Routemodel } from "./models/route.model";

import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";

export function routesConfig(): Routemodel[] {
  return [
    {
      path: "/",
      element: <HomePage />,
      label: "Home 🏠",
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