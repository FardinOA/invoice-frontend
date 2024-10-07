import React, { CSSProperties } from "react";
import {
  Button,
  Form,
  Input,
  Grid,
  Typography,
  theme,
  Layout,
  message,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { api } from "../../axios";
import { useAuth } from "../../providers";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { getErrorMessage } from "../../utils";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Title } = Typography;

type FormValueType = {
  email: string;
  password: string;
};

const SignInPage: React.FC = () => {
  const { token } = useToken();
  const { setToken } = useAuth();
  const screens = useBreakpoint();
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  // Submit function
  const onFinish = async (values: FormValueType) => {
    // Show loading message
    messageApi.open({
      key: "loginToast",
      type: "loading",
      content: "Action in progress...",
      duration: 0,
    });

    try {
      // Perform the API call
      const { data } = await api.post(`users/signin`, values);

      // After successful response, show success message
      messageApi.open({
        key: "loginToast",
        type: "success",
        content: "Sign in successful!",
        duration: 2,
      });

      console.log(data);
      if (data?.success) {
        setToken(data?.data?.token);
        navigate("/", { replace: true });
      }
    } catch (error: unknown) {
      const apiError = error as AxiosError;
      messageApi.open({
        key: "loginToast",
        type: "error",
        content: getErrorMessage(apiError),
        duration: 2,
      });
    }
  };

  const styles: { [key: string]: CSSProperties } = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      backgroundColor: token.colorBgContainer,
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: token.colorTextSecondary,
      textAlign: "center",
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <Layout style={styles.section}>
      {contextHolder}
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>Sign in</Title>
        </div>
        <Form layout="vertical" onFinish={onFinish} requiredMark="optional">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button size="large" block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default SignInPage;
