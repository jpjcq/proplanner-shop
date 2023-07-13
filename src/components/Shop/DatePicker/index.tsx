import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CartContext from "../../../contexts/cart/cart-context";
import SelectionScreen from "../SelectionScreen";
import MainList from "./MainListDate";

export default function DatePicker() {
  const { isEmpty } = useContext(CartContext);
  if (isEmpty) {
    return <Navigate to="/shop/service" />;
  } else {
    return (
      <>
        <SelectionScreen activePicker="date" />
        <MainList />
      </>
    );
  }
}
