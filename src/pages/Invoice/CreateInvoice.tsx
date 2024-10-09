import { Create } from "../../components";
import useTheme from "../../hooks/useTheme";

const CreateInvoice = () => {
  const { currentColors } = useTheme();
  return (
    <div
      style={{
        backgroundColor: currentColors.sidebar,
        borderRadius: "5px",
        padding: 16,
        height: "100%",
      }}
    >
      <Create />
    </div>
  );
};

export default CreateInvoice;
