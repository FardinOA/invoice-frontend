import { createBrowserRouter, useLocation } from "react-router-dom";
import React, { ReactNode, useEffect } from "react";
import { HomePage, SignInPage } from "../pages";

// Custom scroll restoration function
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return null; // This component doesn't render anything
};

type PageProps = {
  children: ReactNode;
};

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({ children }: PageProps) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper children={<HomePage />} />, // Home Page
    errorElement: <div>Page Not Found</div>,
  },
  {
    path: "/signin",
    element: <PageWrapper children={<SignInPage />} />, // Sign In Page
  },
]);

export default router;
