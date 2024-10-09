import React from "react";
import { Layout } from "antd";
const { Header } = Layout;
type HeaderNavProps = {
  navFill?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
const HeaderNav = ({ ...rest }: HeaderNavProps) => {
  return <Header {...rest} />;
};

export default HeaderNav;
