import { ReactNode } from "react";
import styled from "styled-components";
import { ValidationCaption } from "../../theme/text";
import WarningIcon from "./Icons/WarningIcon";
import ValidIcon from "./Icons/ValidIcon";
import ErrorIcon from "./Icons/ErrorIcon";
import InfoIcon from "./Icons/InfoIcon";

const IconWrapper = styled.div`
  height: 18px;
  width: 18px;
  margin-right: 3px;
`;

const ValidText = styled(ValidationCaption)`
  color: ${({ theme }) => theme.validation.green.text};
  margin-left: 7px !important;
`;

const WarningText = styled(ValidationCaption)`
  color: ${({ theme }) => theme.validation.orange.text};
  margin-left: 7px !important;
`;

const ErrorText = styled(ValidationCaption)`
  color: ${({ theme }) => theme.validation.red.text};
  margin-left: 7px !important;
`;

const InfoText = styled(ValidationCaption)`
  color: ${({ theme }) => theme.validation.purple.text};
  margin-left: 7px !important;
`;

const ValidDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 18px !important;
  padding: 5px 10px;
  border: 1.5px solid ${({ theme }) => theme.validation.green.regular};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.validation.green.light};
`;

const WarningDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 18px !important;
  padding: 5px 10px;
  border: 1.5px solid ${({ theme }) => theme.validation.orange.regular};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.validation.orange.light};
`;

const ErrorDiv = styled.div`
  max-width: 260px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 18px !important;
  padding: 5px 10px;
  border: 1.5px solid ${({ theme }) => theme.validation.red.regular};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.validation.red.light};
`;

const InfoDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 18px !important;
  padding: 5px 10px;
  border: 1.5px solid ${({ theme }) => theme.validation.purple.regular};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.validation.purple.light};
`;

export function ValidBox({ children }: { children: ReactNode }) {
  return (
    <ValidDiv>
      <IconWrapper>
        <ValidIcon />
      </IconWrapper>
      <ValidText fontWeight={700}>{children}</ValidText>
    </ValidDiv>
  );
}

export function WarningBox({ children }: { children: ReactNode }) {
  return (
    <WarningDiv>
      <IconWrapper>
        <WarningIcon />
      </IconWrapper>
      <WarningText fontWeight={700}>{children}</WarningText>
    </WarningDiv>
  );
}

export function ErrorBox({ children }: { children: ReactNode }) {
  return (
    <ErrorDiv>
      <IconWrapper>
        <ErrorIcon />
      </IconWrapper>
      <ErrorText fontWeight={700}>{children}</ErrorText>
    </ErrorDiv>
  );
}

export function InfoBox({ children }: { children: ReactNode }) {
  return (
    <InfoDiv>
      <IconWrapper>
        <InfoIcon />
      </IconWrapper>
      <InfoText fontWeight={700}>{children}</InfoText>
    </InfoDiv>
  );
}
