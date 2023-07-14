import { Field, Label, Message, Root, Submit } from "@radix-ui/react-form";
import { ReactNode } from "react";
import { styled } from "styled-components";
import { ThemeType } from "../../theme";

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
`;

export const StyledFormMessage = styled(Message)`
  font-size: 13px;
  opacity: 0.8;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  padding: 10px 18px;
  background-color: ${({ theme }) => (theme as ThemeType).olive.olive7};
  color: white;
  font-weight: 600;
`;

export function StyledFormButton({ children }: { children: ReactNode }) {
  return (
    <Submit asChild>
      <StyledButton>{children}</StyledButton>
    </Submit>
  );
}
