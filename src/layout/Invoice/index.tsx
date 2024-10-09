import RootLayout from "../Root";
import { Outlet } from "react-router-dom";

const InvoiceLayout = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default InvoiceLayout;
