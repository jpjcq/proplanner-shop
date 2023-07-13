import { useState } from "react";
import styled from "styled-components";
import { SmallHeadline, SubHeader } from "../../../theme/text";
import { ShopButtonPrimary } from "../../Button";
import { ShopWelcomeNavbar } from "../Navbar";

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SelectionTitle = styled(SmallHeadline)`
  line-height: 33px;
  letter-spacing: 0.06em;

  display: flex;
  justify-content: center;
`;

export default function Welcome() {
  const [isConnected, setIsConnected] = useState(false);
  return (
    <>
      <ShopWelcomeNavbar />
      <Wrapper>
        <SelectionTitle>Bienvenue</SelectionTitle>
        {isConnected ? (
          <ShopButtonPrimary>Continuer</ShopButtonPrimary>
        ) : (
          <>
            <SubHeader style={{ marginTop: "20px" }}>
              Pour continuer, veuillez vous connecter
            </SubHeader>
            <ShopButtonPrimary
              style={{ width: "fit-content", marginTop: "30px" }}
            >
              Se connecter
            </ShopButtonPrimary>
          </>
        )}
      </Wrapper>
    </>
  );
}
