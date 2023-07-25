import { createContext } from "react";
import { ItemInCart } from "./CartProvider";

const context: {
  cartItems: ItemInCart[];
  cartAmount: number;
  totalDuration: number;
  isEmpty: boolean;
  addItemToCart: (item: ItemInCart) => void;
  removeItemFromCart: (id: ItemInCart["_id"]) => void;
} = {
  cartItems: [],
  cartAmount: 0,
  totalDuration: 0,
  isEmpty: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addItemToCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeItemFromCart: () => {},
};

const CartContext = createContext(context);

export default CartContext;
