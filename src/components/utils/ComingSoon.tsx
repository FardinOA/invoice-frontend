import React from "react";
import useTheme from "../../hooks/useTheme";

const ComingSoon = ({ style }: { style?: React.CSSProperties }) => {
  const { currentColors } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        ...style,
      }}
    >
      {" "}
      <div
        style={{
          background: currentColors.accent,
          borderRadius: "10px",
          padding: "40px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ color: currentColors.text, fontSize: "2.5rem" }}>
          Coming Soon
        </h1>
        <p style={{ color: currentColors.text, fontSize: "1.2rem" }}>
          We're working hard to bring something amazing to you!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
