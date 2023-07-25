import { useContext } from "react";
import SelectionScreen from "../SelectionScreen";
import MainList from "./MainListService";
import ToastContext from "../../../contexts/toast/toast-context";

export default function ServicePicker() {
  const toastCtx = useContext(ToastContext);

  console.log("service toast: ", toastCtx.connectedToast);

  return (
    <>
      <SelectionScreen activePicker="service" />
      <MainList />
    </>
  );
}
