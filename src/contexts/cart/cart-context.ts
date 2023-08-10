import { createContext } from "react";
import { ItemInCart } from "./CartProvider";
import { Interval } from "luxon";

const context: {
  cartItems: ItemInCart[];
  cartAmount: number;
  totalDuration: number;
  isEmpty: boolean;
  chosenDate: Interval | null;
  addItemToCart: (item: ItemInCart) => void;
  removeItemFromCart: (id: ItemInCart["_id"]) => void;
  addDateToCart: (crenel: Interval) => void;
  removeDateFromCart: () => void;
} = {
  cartItems: [],
  cartAmount: 0,
  totalDuration: 0,
  isEmpty: true,
  chosenDate: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addItemToCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeItemFromCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addDateToCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeDateFromCart: () => {},
};

const CartContext = createContext(context);

export default CartContext;
