import { ReactNode, useReducer } from "react";
import ToastContext from "./toast-context";

const initalToastState = {
  isOpen: false,
  text: {
    title: "",
    text: "",
  },
};

type ActionType = {
  type: string;
  payload?: {
    title: string;
    text: string;
  };
};

function toastReducer(prevState: typeof initalToastState, action: ActionType) {
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        ...prevState,
        isOpen: true,
        text: action.payload!,
      };
    case "DISMISS_TOAST":
      return {
        ...prevState,
        isOpen: false,
      };
    default:
      return prevState;
  }
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toastState, dispatchToastState] = useReducer(
    toastReducer,
    initalToastState
  );

  const toastContext = {
    isOpen: toastState.isOpen,
    text: toastState.text,
    showToast(text: { title: string; text: string }) {
      dispatchToastState({ type: "SHOW_TOAST", payload: text });
    },
    dismissToast() {
      dispatchToastState({
        type: "DISMISS_TOAST",
      });
    },
  };

  return (
    <ToastContext.Provider value={toastContext}>
      {children}
    </ToastContext.Provider>
  );
}
