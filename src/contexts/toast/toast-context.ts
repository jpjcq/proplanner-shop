import { createContext } from "react";

const context = {
  isOpen: false,
  text: {
    title: "",
    text: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  showToast(_text: { title: string; text: string }) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  dismissToast() {},
};

const ToastContext = createContext(context);

export default ToastContext;
