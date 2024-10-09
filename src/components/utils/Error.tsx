import React from "react";
import { Button, Result } from "antd";
import { useRouteError, useNavigate } from "react-router-dom";

// Define a custom error type to handle errors with a status code
type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
};

// Map HTTP status codes to Ant Design's Result status types
const getAntdStatusType = (
  status?: number
): "403" | "404" | "500" | undefined => {
  switch (status) {
    case 403:
      return "403";
    case 404:
      return "404";
    case 500:
    default:
      return "500";
  }
};

const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <Result
        status={getAntdStatusType(error?.status)}
        title={error?.status || "500"}
        subTitle={error?.statusText || "Something went wrong."}
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Back Home
          </Button>
        }
      />
      {/* Optionally display the error message */}
      {error?.message && (
        <div style={{ marginTop: "20px", color: "#ff4d4f" }}>
          <i>{error.message}</i>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
