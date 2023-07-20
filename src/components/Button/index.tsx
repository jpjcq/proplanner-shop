import { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";
import { Button as RebassButton } from "rebass/styled-components";
import styled from "styled-components";

export const ShopButtonPrimary = styled(RebassButton)`
  display: flex;
  place-items: center;
  background-color: #6e7d59;
  border: none;
  border-radius: 2px;
  color: ${({ theme }) => theme.white};
  font-size: 12px;
  font-weight: 600;
  padding: 0.3125rem 0.8125rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const ShopButtonSecondary = styled(RebassButton)`
  display: flex;
  place-items: center;
  background-color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 2px;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 12px;
  font-weight: 600;
  padding: 0.3125rem 0.8125rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const QuantityCartButton = styled(RebassButton)`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 10px;
  font-weight: 800;
  border: 1px solid ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.white};
  padding: 0 11px;
  margin: 9px 0;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
export const MotionShopButtonPrimary = motion(ShopButtonPrimary);

export const MotionShopButtonSecondary = motion(ShopButtonSecondary);

export const MotionQuantityCartButton = motion(QuantityCartButton);

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}

export function AnimatedShopButtonPrimary({
  children,
  onClick,
}: AnimatedButtonProps) {
  return (
    <MotionShopButtonPrimary
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
      onClick={onClick}
    >
      {children}
    </MotionShopButtonPrimary>
  );
}

export function AnimatedShopButtonSecondary({
  children,
  onClick,
}: AnimatedButtonProps) {
  return (
    <MotionShopButtonSecondary
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
      onClick={onClick}
    >
      {children}
    </MotionShopButtonSecondary>
  );
}

export function AnimatedQuantityCartButton({
  children,
  onClick,
  style,
}: AnimatedButtonProps) {
  return (
    <MotionQuantityCartButton
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
      onClick={onClick}
      style={style}
    >
      {children}
    </MotionQuantityCartButton>
  );
}
