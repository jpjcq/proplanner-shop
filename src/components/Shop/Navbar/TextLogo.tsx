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
  color: ${({theme}) => theme.textPrimary};
`;

const LogoBottom = styled.span`
  font-family: "Raleway SemiBold";
  font-size: 10px;
  letter-spacing: 0;
  color: ${({theme}) => theme.textPrimary};
`;

export default function TextLogo() {
  return (
    <LogoWrapper >
      <LogoTop>L'ONGLERIE</LogoTop>
      <LogoBottom>DE JULIE</LogoBottom>
    </LogoWrapper>
  );
}
