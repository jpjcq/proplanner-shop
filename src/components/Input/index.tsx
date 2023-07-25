import React from "react";
import { styled } from "styled-components";
import ReactPhoneInput from "react-phone-number-input";
import countryCodes from "./countryCodes";

export const FormInput = styled.input`
  all: unset;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  padding: 0 10px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.blackA.blackA6};
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.inputShadow};

  &:hover {
    border: 2px solid black;
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.olive.olive7};
  }

  &::selection {
    background-color: ${({ theme }) => theme.blackA.blackA9};
  }
`;

export function PhoneInput({
  setPhone,
  value,
}: {
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
}) {
  return (
    <ReactPhoneInput
      value={value}
      countries={countryCodes}
      onChange={(phone) => {
        setPhone(phone as string);
        console.log("phone ", phone);
      }}
      defaultCountry="FR"
    />
  );
}
