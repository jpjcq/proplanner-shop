import { styled } from "styled-components";
import * as Toast from "@radix-ui/react-toast";

export const StyledToastRoot = styled(Toast.Root)`
  background-color: white;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.shadows.inputShadow};
  padding: 15px;
  display: grid;
  grid-template-areas: "title action" "description action";
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;

  &[data-state="open"] {
    animation: slideIn 1000ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state="closed"] {
    animation: swipeOut 1000ms cubic-bezier(0.3, 1, 0.16, 1);
  }
  &[data-swipe="move"] {
    transform: translateY(var(--radix-toast-swipe-move-Y));
  }
  &[data-swipe="cancel"] {
    animation: swipeOut 1000ms cubic-bezier(0.3, 1, 0.16, 1);

  }
  &[data-swipe="end"] {
    animation: swipeOut 100ms ease-out;
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(calc(0 + var(--viewport-padding)));
    }
  }

  @keyframes swipeOut {
    from {
      transform: translateX(var(--radix-toast-swipe-end-Y));
    }
    to {
      transform: translateY(calc(-100% - var(--viewport-padding)));
    }
  }
`;

export const StyledToastViewport = styled(Toast.Viewport)`
  --viewport-padding: 25px;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;

export const StyledToastTitle = styled(Toast.Title)`
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: black; /* TO CHANGE */
  font-size: 15px;
`;

export const StyledToastDescription = styled(Toast.Description)`
  grid-area: description;
  margin: 0;
  color: gray; /* TO CHANGE */
  font-size: 13px;
  line-height: 1.3;
`;

export const StyledToastAction = styled(Toast.Action)`
  grid-area: action;
`;
