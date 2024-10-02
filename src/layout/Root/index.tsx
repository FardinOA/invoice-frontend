import { Layout, theme } from "antd";
import { ReactNode, useState } from "react";
import SideNav from "./Sidenav";
const { Content } = Layout;
const RootLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        margin: 0,
      }}
    >
      <SideNav
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "none",
          border: "none",
          transition: "all .2s",
        }}
      />

      <Layout>
        <Content
          style={{
            margin: `0 0 0 ${collapsed ? 0 : "200px"}`,
            borderRadius: collapsed ? 0 : borderRadius,
            transition: "all .25s",
            padding: "24px 32px",
            minHeight: 360,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
