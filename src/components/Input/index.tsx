import { Dispatch, SetStateAction } from "react";
import { styled, useTheme } from "styled-components";
import ReactPhoneInput from "react-phone-number-input";
import countryCodes from "./countryCodes";
import { isValidPhoneNumber } from "react-phone-number-input";

export const FormInput = styled.input<{ $invalid?: boolean }>`
  all: unset;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  padding: 0 10px;
  background-color: white;
  border: ${({ theme, $invalid }) =>
    $invalid
      ? "2px solid " + theme.validation.red.regular
      : "1px solid " + theme.blackA.blackA6};
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.inputShadow};

  &:hover {
    border: 2px solid black;
  }

  &:focus {
    border: 2px solid
      ${({ theme, $invalid }) =>
        $invalid ? theme.validation.red.regular : theme.olive.olive7};
  }

  &::selection {
    background-color: ${({ theme }) => theme.blackA.blackA9};
  }
`;

export function PhoneInput({
  value,
  setPhone,
  setIsInvalidPhone,
  $isInvalid,
}: {
  value?: string;
  setPhone: Dispatch<SetStateAction<string>>;
  setIsInvalidPhone?: Dispatch<SetStateAction<boolean>>;
  $isInvalid?: boolean;
}) {
  const theme = useTheme();

  const inputStyle = $isInvalid
    ? {
        border: `2px solid ${theme.validation.red.regular}`,
        borderRadius: "4px",
      }
    : undefined;
  return (
    <ReactPhoneInput
      value={value}
      countries={countryCodes}
      onChange={(phone) => {
        setPhone(phone as string);
        if (phone) {
          isValidPhoneNumber(phone as string)
            ? setIsInvalidPhone?.(false)
            : setIsInvalidPhone?.(true);
        }
      }}
      defaultCountry="FR"
      style={inputStyle}
    />
  );
}
