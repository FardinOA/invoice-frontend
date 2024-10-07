import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from "antd";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PieChartOutlined } from "@ant-design/icons";
import { COLOR } from "../../constants/theme";
import { PATH_DASHBOARD, PATH_INVOICE } from "../../constants/routes";
import { Logo } from "../../components";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps["items"] = [
  getItem(
    <Link to={PATH_DASHBOARD.root}>Dashboard</Link>,
    "Dashboard",
    <PieChartOutlined />
  ),
  getItem("Manage Invoice", "manage_invoice", <PieChartOutlined />, [
    getItem(<Link to={PATH_INVOICE.root}>Invoice</Link>, "invoice", null),
    getItem(
      <Link to={PATH_INVOICE.templates}>Templates</Link>,
      "templates",
      null
    ),
    getItem(
      <Link to={PATH_INVOICE.create_invoice}>Create Invoice</Link>,
      "create-invoice",
      null
    ),
  ]),
];

type SideNavProps = SiderProps;

const rootSubmenuKeys = ["dashboard", "manage_invoice"];
const SideNav = ({ ...rest }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([""]);
  const [current, setCurrent] = useState("");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e?.key);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split("/");
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);
  return (
    <Sider
      ref={nodeRef}
      breakpoint="lg"
      collapsedWidth="0"
      width={230}
      {...rest}
    >
      <Logo
        color="blue"
        asLink
        href={PATH_DASHBOARD.root}
        justify="center"
        gap="small"
        imgSize={{ h: 28, w: 28 }}
        style={{ padding: "1rem 0" }}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "none",
              itemSelectedBg: "none",
              itemHoverBg: COLOR["secondary"],
              itemSelectedColor: COLOR["primary"],
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: "none" }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
