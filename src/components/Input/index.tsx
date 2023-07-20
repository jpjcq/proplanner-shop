import { styled } from "styled-components";

export const FormInput = styled.input`
  all: unset;
  font-size: 15px;
  font-weight: 500;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  padding: 0 10px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.blackA.blackA6};
  border-radius: 4px;
  box-shadow: ${({theme}) => theme.shadows.inputShadow};

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
