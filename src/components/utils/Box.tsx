import styled from "styled-components";

interface BoxProps {
  display?: string;
  direction?: string;
  justify?: string;
  align?: string;
  width?: string;
  margin?: string;
  padding?: string;
}

const Box = styled.div<BoxProps>`
  display: ${({ display }: BoxProps) => (display ? display : "flex")};
  flex-direction: ${({ direction }: BoxProps) => direction};
  justify-content: ${({ justify }: BoxProps) => (justify ? justify : "center")};
  align-items: ${({ align }: BoxProps) => (align ? align : "center")};
  width: ${({ width }: BoxProps) => width};
  margin: ${({ margin }: BoxProps) => margin};
  padding: ${({ padding }: BoxProps) => padding};
`;

export default Box;
