import { ReactNode, useReducer } from "react";
import ToastContext from "./toast-context";

const initalToastState = {
  connectedToast: false,
  firstName: "",
};

type ActionType = {
  type: string;
  payload?: string | boolean;
};

function toastReducer(prevState: typeof initalToastState, action: ActionType) {
  switch (action.type) {
    case "CONNECTED_GREETING":
      return {
        ...prevState,
        connectedToast: true,
        firstName: action.payload! as string,
      };
    default:
      return prevState;
    case "DISMISS_CONNECTED_GREETING":
      return {
        ...prevState,
        connectedToast: false,
      };
  }
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toastState, dispatchToastState] = useReducer(
    toastReducer,
    initalToastState
  );

  const toastContext = {
    connectedToast: toastState.connectedToast,
    firstName: toastState.firstName,
    showConnectedToast(firstName: string) {
      dispatchToastState({ type: "CONNECTED_GREETING", payload: firstName });
    },
    dismissConnectedToast() {
      dispatchToastState({
        type: "DISMISS_CONNECTED_GREETING",
      });
    },
  };

  return (
    <ToastContext.Provider value={toastContext}>
      {children}
    </ToastContext.Provider>
  );
}
