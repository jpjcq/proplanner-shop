import { createContext } from "react";

const context = {
  connectedToast: false,
  firstName: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  showConnectedToast(_firstName: string) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  dismissConnectedToast() {},
};

const ToastContext = createContext(context);

export default ToastContext;
