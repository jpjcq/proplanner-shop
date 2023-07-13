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
  addItemToCart: (item: ItemInCart) => {},
  removeItemFromCart: () => {},
};

const CartContext = createContext(context);

export default CartContext;
