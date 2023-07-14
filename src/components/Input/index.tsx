import { styled } from "styled-components";
import { ThemeType } from "../../theme";

export const FormInput = styled.input`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  font-size: 15px;
  background-color: ${({theme}) => (theme as ThemeType).blackA.blackA5};
  box-shadow: 0 0 0 1px ${({theme}) => (theme as ThemeType).blackA.blackA9};

  padding: 0 10px;
  height: 35px;
  line-height: 1;

  &:hover {
    box-shadow: 0 0 0 1px black;
  }

  &:focus {
    box-shadow: 0 0 0 2px black;
  }

  &::selection {
    background-color: ${({theme}) => (theme as ThemeType).blackA.blackA9};
  }
`;
