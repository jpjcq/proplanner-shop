import { ReactNode } from "react";
import { SubHeader } from "../../../theme/text";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  margin-bottom: 40px;
`;

const Item = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

interface DetailProps {
  title: string;
  children: ReactNode;
}

export default function Detail({ title, children }: DetailProps) {
  return (
    <Wrapper>
      <SubHeader
        fontWeight={700}
        style={{ marginLeft: "30px", marginBottom: "20px" }}
      >
        {title}
      </SubHeader>
      <Item>{children}</Item>
    </Wrapper>
  );
}
