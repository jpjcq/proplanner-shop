import { ReactNode, useReducer } from "react";
import { SecondaryServices } from "../../types/services";
import CartContext from "./cart-context";

export interface ItemInCart extends SecondaryServices {
  quantity: number;
}

const initialCartState = {
  cartItems: [],
  cartAmount: 0,
  totalDuration: 0,
  isEmpty: true,
};

interface StateType {
  cartItems: ItemInCart[];
  cartAmount: number;
  totalDuration: number;
  isEmpty: boolean;
}

interface ActionType {
  type: string;
  payload: ItemInCart | ItemInCart["_id"] | ItemInCart[];
}

function cartReducer(state: StateType, action: ActionType) {
  function getTotalDuration(cartItems: ItemInCart[]): number {
    let totalDuration = 0;
    cartItems.forEach((item) => {
      const duration = item.duration * item.quantity;
      totalDuration += duration;
    });
    return totalDuration;
  }
  switch (action.type) {
    case "ADD":
      // eslint-disable-next-line no-case-declarations
      const existingCartItem = state.cartItems.find(
        (item) => item.short === (action.payload as ItemInCart).short
      );
      // eslint-disable-next-line no-case-declarations
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.short === (action.payload as ItemInCart).short
      );
      // eslint-disable-next-line no-case-declarations
      let updatedCartItems: ItemInCart[];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedCartItems = [...state.cartItems];
        updatedCartItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedCartItems = state.cartItems.concat(action.payload as never[]);
      }
      return {
        isEmpty: false,
        cartItems: updatedCartItems,
        cartAmount: state.cartAmount + (action.payload as ItemInCart)?.price,
        totalDuration: getTotalDuration(updatedCartItems),
      };
    case "REMOVE":
      // eslint-disable-next-line no-case-declarations
      const idToRemove = action.payload;
      // eslint-disable-next-line no-case-declarations
      const itemToDecrement = state.cartItems.find(
        (item) => item._id === idToRemove
      );
      if (itemToDecrement) {
        // eslint-disable-next-line no-case-declarations
        const itemDecremented = {
          ...itemToDecrement,
          quantity: itemToDecrement.quantity - 1,
        };
        const newCartItems = state.cartItems
          .map((item) => {
            if (item._id === idToRemove) {
              return itemDecremented;
            } else {
              return item;
            }
          })
          .filter((item) => item.quantity > 0);
        return {
          isEmpty: newCartItems.length === 0 ? true : false,
          cartItems: newCartItems,
          cartAmount: state.cartAmount - itemToDecrement.price,
          totalDuration: getTotalDuration(newCartItems),
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    initialCartState
  );

  const cartContext = {
    cartItems: cartState.cartItems,
    cartAmount: cartState.cartAmount,
    totalDuration: cartState.totalDuration,
    isEmpty: cartState.isEmpty,
    addItemToCart: (item: ItemInCart) =>
      dispatchCartState({ type: "ADD", payload: item }),
    removeItemFromCart: (id: ItemInCart["_id"]) =>
      dispatchCartState({ type: "REMOVE", payload: id }),
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
