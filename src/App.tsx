import { ConfigProvider, theme as antdTheme } from "antd";
import "./App.css";
import { COLOR, DARK_COLOR } from "./constants/theme";
import { StylesContext } from "./context";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import { AuthProvider } from "./providers";
import Routes from "./routes/routes";
function App() {
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const currentColors = mytheme === "dark" ? DARK_COLOR : COLOR;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: currentColors.background,
          // colorBgLayout: currentColors.background,
          colorPrimary: currentColors.primary,
          colorTextBase: currentColors.text,
          borderRadius: 6,
          fontFamily: "Lato, sans-serif",
        },

        algorithm:
          mytheme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      <StylesContext.Provider
        value={{
          rowProps: {
            gutter: [
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ],
          },
        }}
      >
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </StylesContext.Provider>
    </ConfigProvider>
  );
}

export default App;
