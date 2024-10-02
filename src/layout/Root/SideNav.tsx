import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from "antd";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PieChartOutlined } from "@ant-design/icons";
import { COLOR } from "../../constants/theme";

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
  getItem(<Link to={"/"}>Dashboard</Link>, "Dashboard", <PieChartOutlined />),
];

type SideNavProps = SiderProps;
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
    if (latestOpenKey) {
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
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...rest}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "none",
              itemSelectedBg: COLOR["primary"],
              itemHoverBg: COLOR["secondary"],
              itemSelectedColor: COLOR["primaryForeground"],
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
