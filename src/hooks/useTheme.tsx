import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { COLOR, DARK_COLOR } from "../constants/theme";

const useTheme = () => {
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const currentColors = mytheme === "dark" ? DARK_COLOR : COLOR;
  return {
    currentColors,
    mytheme,
  };
};

export default useTheme;
