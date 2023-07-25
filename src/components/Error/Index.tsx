import styled from "styled-components";
import { BodySmall, LargeHeader } from "../../theme/text";
import { ReactNode } from "react";

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  margin-bottom: 40px;
`;

interface ErrorModuleProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export default function ErrorModule({
  title,
  description,
  children,
}: ErrorModuleProps) {
  return (
    <ErrorWrapper>
      <LargeHeader
        fontWeight={700}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        {title}
      </LargeHeader>
      <BodySmall style={{ textAlign: "center", marginBottom: "40px" }}>
        {description}
      </BodySmall>
      {children}
    </ErrorWrapper>
  );
}
