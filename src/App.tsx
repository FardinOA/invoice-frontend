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
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: COLOR["500"],
          borderRadius: 6,
          fontFamily: "Lato, sans-serif",
        },
        components: {
          Breadcrumb: {
            // linkColor: 'rgba(0,0,0,.8)',
            // itemColor: 'rgba(0,0,0,.8)',
          },
          Button: {
            colorLink: COLOR["500"],
            colorLinkActive: COLOR["700"],
            colorLinkHover: COLOR["300"],
          },
          Calendar: {
            colorBgContainer: "none",
          },
          Card: {
            colorBorderSecondary: COLOR["borderColor"],
          },
          Carousel: {
            colorBgContainer: COLOR["800"],
            dotWidth: 8,
          },
          Rate: {
            colorFillContent: COLOR["100"],
            colorText: COLOR["600"],
          },
          Segmented: {
            colorBgLayout: COLOR["100"],
            borderRadius: 6,
            colorTextLabel: "#000000",
          },
          Table: {
            borderColor: COLOR["100"],
            colorBgContainer: "none",
            headerBg: "none",
            rowHoverBg: COLOR["50"],
          },
          Tabs: {
            colorBorderSecondary: COLOR["100"],
          },
          Timeline: {
            dotBg: "none",
          },
          Typography: {
            colorLink: COLOR["500"],
            colorLinkActive: COLOR["700"],
            colorLinkHover: COLOR["300"],
            linkHoverDecoration: "underline",
          },
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
