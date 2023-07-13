import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoTop = styled.span`
  font-family: "Raleway SemiBold";
  font-size: 24px;
  letter-spacing: 0.06em;
  line-height: 28px;
`;

const LogoBottom = styled.span`
  font-family: "Raleway SemiBold";
  font-size: 10px;
  letter-spacing: 0;
`;

export default function TextLogo() {
  return (
    <LogoWrapper>
      <LogoTop>L'ONGLERIE</LogoTop>
      <LogoBottom>DE CHARLOTTE</LogoBottom>
    </LogoWrapper>
  );
}
