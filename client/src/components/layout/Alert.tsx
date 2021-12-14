import { AlertComponentPropsWithStyle, AlertType } from "react-alert";
import { Alert as BootstrapAlert } from "react-bootstrap";

export default function Alert({
  style,
  options,
  message,
  close,
}: AlertComponentPropsWithStyle) {
  if (options.type === "error") {
    options.type = "danger" as AlertType;
  }

  return (
    <BootstrapAlert
      style={style}
      variant={options.type}
      onClose={() => close()}
      dismissible
    >
      {message}
    </BootstrapAlert>
  );
}
