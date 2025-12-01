import { CheckCircleFilled, InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";

const ToastContent = ({ message }) => {
  return (
    <span className="toast-message">
      {message}
    </span>
  );
};

export const CustomToast = ({
  message = "Success",
  type = "success",
  duration = 3000,
}) => {
  const content = <ToastContent message={message} />;

  switch (type) {
    case "success":
      return toast(content, { duration, icon: <CheckCircleFilled style={{ fontSize: 20, color: 'var(--color-success)' }} /> });
    case "error":
      return toast.error(content, { duration });
    case "loading":
      return toast.loading(content, { duration });
    case "info":
      return toast(content, { duration, icon: <InfoCircleOutlined style={{ fontSize: 20, color: 'var(--color-info)' }} /> });
    case "warning":
      return toast(content, { duration, icon: <WarningOutlined style={{ fontSize: 20, color: 'var(--color-warning)' }} /> });
    default:
      return toast(content, { duration });
  }
};

export default CustomToast;

