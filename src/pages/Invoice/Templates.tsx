import ComingSoon from "../../components/utils/ComingSoon";
import useTheme from "../../hooks/useTheme";

const Templates = () => {
  const { currentColors } = useTheme();
  return (
    <div
      style={{
        background: currentColors.sidebar,
        borderRadius: "5px",
        padding: 16,
        height: "100%",
      }}
    >
      <ComingSoon />
    </div>
  );
};

export default Templates;
