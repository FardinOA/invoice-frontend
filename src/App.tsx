import { ConfigProvider, theme as antdTheme } from "antd";
import "./App.css";
import { COLOR } from "./constants/theme";
import { StylesContext } from "./context";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
function App() {
  const { mytheme } = useSelector((state: RootState) => state.theme);
  console.log(mytheme);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: COLOR["background"],
          colorPrimary: COLOR["primary"],

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
          carouselProps: {
            autoplay: true,
            dots: true,
            dotPosition: "bottom",
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        }}
      >
        <RouterProvider router={routes} />
      </StylesContext.Provider>
    </ConfigProvider>
  );
}

export default App;
