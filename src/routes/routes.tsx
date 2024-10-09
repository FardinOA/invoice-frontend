import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  CreateInvoice,
  HomePage,
  InvoiceHome,
  SignInPage,
  Templates,
} from "../pages";
import Dashboard from "../layout/dashboard";
import { InvoiceLayout } from "../layout";
import { useAuth } from "../providers";
import { ProtectedRoute } from "./ProtectedRoute";
import { ErrorPage } from "../components";

const Routes = () => {
  const { token } = useAuth(); // Get token from the auth context

  // Public routes, accessible by all users
  const routesForPublic = [
    {
      path: "/login",
      element: <SignInPage />,
      errorElement: <ErrorPage />,
    },
  ];

  // Routes for authenticated users only, wrapped with ProtectedRoute
  const routesForAuthenticatedOnly = [
    {
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
          children: [
            {
              index: true,
              path: "/",
              element: <HomePage />,
            },
          ],
        },
      ],
    },
    {
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/invoice",
          element: <InvoiceLayout />,
          children: [
            {
              index: true,
              path: "/invoice",
              element: <InvoiceHome />,
            },
            {
              path: "create-invoice",
              element: <CreateInvoice />,
            },
            {
              path: "templates",
              element: <Templates />,
            },
          ],
        },
      ],
    },
  ];

  // Routes for non-authenticated users only
  const routesForNotAuthenticatedOnly = [
    {
      path: "/signin",
      element: <SignInPage />,
      errorElement: <ErrorPage />,
    },
  ];

  // Combine routes conditionally based on authentication
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly.map((route) => ({
      ...route,
      element: <ProtectedRoute />,
    })),
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
