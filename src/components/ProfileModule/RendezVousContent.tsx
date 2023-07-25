import { styled } from "styled-components";
import FixedCenteringWrapper from "../utils/FixedCenteringWrapper";
import { SubHeader } from "../../theme/text";

const RdvCard = styled.div`
  min-width: 50%;
  max-width: 300px;
  min-height: 130px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.inputShadow};
`;

export default function RendezVousContent() {
  return (
    <FixedCenteringWrapper style={{ zIndex: "-1" }}>
      <RdvCard>
        <SubHeader fontWeight={500} fontSize={14}>Vous n'avez pas encore de rendez-vous</SubHeader>
      </RdvCard>
    </FixedCenteringWrapper>
  );
}
