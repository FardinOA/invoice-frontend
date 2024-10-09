import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  message,
  Switch,
  theme,
  Tooltip,
} from "antd";
import { ReactNode, useEffect, useState } from "react";
import SideNav from "./SideNav";
import { COLOR, DARK_COLOR } from "../../constants/theme";
import HeaderNav from "./HeaderNav";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { toggleTheme } from "../../redux/features/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ScrollToTop } from "../../components";
import { api } from "../../axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers";
import { AxiosError } from "axios";
import { getErrorMessage } from "../../utils";

const { Content } = Layout;

const RootLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(true);
  const [navFill, setNavFill] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);
  const currentColors = mytheme === "dark" ? DARK_COLOR : COLOR;

  const logoutHandler = async () => {
    message.open({
      key: "logoutToast",
      type: "loading",
      content: "Action in progress...",
      duration: 0,
    });

    try {
      // Perform the API call
      const { data } = await api.get(`users/logout`);

      // After successful response, show success message
      message.open({
        key: "logoutToast",
        type: "success",
        content: "Logout successful!",
        duration: 2,
      });

      console.log(data);
      if (data?.success) {
        setToken(null);
        navigate("/login", { replace: true });
      }
    } catch (error: unknown) {
      const apiError = error as AxiosError;
      message.open({
        key: "logoutToast",
        type: "error",
        content: getErrorMessage(apiError),
        duration: 2,
      });
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "user-profile-link",
      label: "profile",
      icon: <UserOutlined />,
      onClick: () => {
        message.info("This features is coming soon");
      },
    },

    {
      type: "divider",
    },
    {
      key: "user-logout-link",
      label: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: logoutHandler,
    },
  ];
  return (
    <Layout
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 16,
      }}
    >
      <SideNav
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: currentColors.sidebar,
          transition: "none",
          borderRadius: "5px",
        }}
      />

      <Layout style={{ margin: `0 0 0 ${collapsed ? 0 : "20px"}` }}>
        <HeaderNav
          style={{
            background: navFill
              ? "rgba(255, 255, 255, .5)"
              : currentColors.sidebar,
            backdropFilter: navFill ? "blur(8px)" : "none",
            boxShadow: navFill ? "0 0 8px 2px rgba(0, 0, 0, 0.05)" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 1,
            gap: 8,
            transition: "all .25s",
            borderRadius: "5px",
          }}
        >
          {" "}
          <Flex align="center">
            <Tooltip title={`${collapsed ? "Expand" : "Collapse"} Sidebar`}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Tooltip>
          </Flex>
          <Flex align="center" gap="small">
            <Tooltip title="Theme">
              <Switch
                className="    "
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                checked={mytheme === "light" ? true : false}
                onClick={() => dispatch(toggleTheme())}
              />
            </Tooltip>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Flex>
                <Avatar
                  className="cursor-pointer"
                  size={36}
                  icon={<UserOutlined />}
                />
              </Flex>
            </Dropdown>
          </Flex>
        </HeaderNav>
        <Content
          style={{
            borderRadius: collapsed ? 0 : borderRadius,
            transition: "all .25s",
            padding: 0,
            marginTop: 16,
          }}
          className="layout-content"
        >
          <ScrollToTop />

          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
