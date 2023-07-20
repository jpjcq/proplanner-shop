import { Field, Label, Message, Root, Submit } from "@radix-ui/react-form";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";
import { styled } from "styled-components";

export const StyledFormRoot = styled(Root)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 260px;
`;

export const StyledFormField = styled(Field)`
  display: grid;
  width: 100%;
  margin-bottom: 10px;
`;

export const StyledFormLabel = styled(Label)`
  font-size: 15px;
  font-weight: 600;
  line-height: 35px;
  color: ${({ theme }) => theme.textSecondary};
`;

export const StyledFormMessage = styled(Message)`
  font-size: 13px;
  opacity: 0.8;
`;

const StyledButton = styled(motion.button)`
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  padding: 10px 18px;
  background-color: #6e7d59;
  box-shadow: ${({ theme }) => theme.shadows.shallowShadow};
  color: white;
  font-weight: 600;
`;

interface StyledFormButtonProps extends MotionProps {
  children: ReactNode;
  buttonId?: string;
}

export function StyledFormButton({
  children,
  buttonId,
  ...props
}: StyledFormButtonProps) {
  return (
    <Submit asChild>
      <StyledButton id={buttonId} {...props}>
        {children}
      </StyledButton>
    </Submit>
  );
}
