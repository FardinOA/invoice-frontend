import RootLayout from "../Root";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default Dashboard;
