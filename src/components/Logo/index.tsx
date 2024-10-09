import { Flex, FlexProps, theme, Typography } from "antd";
import { Link } from "react-router-dom";
import { CSSProperties } from "react";

import "./styles.css";

type LogoProps = {
  color: CSSProperties["color"];
  imgSize?: {
    h?: number | string;
    w?: number | string;
  };
  asLink?: boolean;
  href?: string;
  bgColor?: CSSProperties["backgroundColor"];
} & Partial<FlexProps>;

export const Logo = ({
  asLink,
  color,
  href,

  bgColor,
  ...others
}: LogoProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  return asLink ? (
    <Link to={href || "#"} className="logo-link">
      <Flex gap={others.gap || "small"} align="center" {...others}>
        <img src="/ig.png" alt="design sparx logo" className="size-[48px]" />
        <Typography.Title
          level={5}
          type="secondary"
          style={{
            color,
            margin: 0,
            padding: `4px 8px`,
            backgroundColor: bgColor,
            borderRadius,
          }}
        >
          Invoice Generator
        </Typography.Title>
      </Flex>
    </Link>
  ) : (
    <Flex gap={others.gap || "small"} align="center" {...others}>
      <img src="/ig.png" alt="design sparx logo" className="size-[48px]" />
      <Typography.Title
        level={4}
        type="secondary"
        style={{
          color,
          margin: 0,
          padding: `4px 8px`,
          backgroundColor: bgColor,
          borderRadius,
        }}
      >
        Invoice Generator
      </Typography.Title>
    </Flex>
  );
};
