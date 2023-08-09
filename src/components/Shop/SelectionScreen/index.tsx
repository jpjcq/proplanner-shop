import styled from "styled-components";
import { LargeHeader } from "../../../theme/text";

const SelectionTitle = styled(LargeHeader)`
  line-height: 33px;
  letter-spacing: 0.06em;

  display: flex;
  justify-content: center;
  padding-top: 170px;
`;

export default function SelectionScreen({ activePicker }: { activePicker: string }) {
  return (
    <SelectionTitle>
      {activePicker === "service" && (
        <>
          <span style={{fontSize: "20px"}}>1.&nbsp;</span>
          <div style={{fontSize: "20px"}}>
            Choix de la
            <br />
            prestation:
          </div>
        </>
      )}
      {activePicker === "date" && (
        <>
          <span style={{fontSize: "20px"}}>2.&nbsp;</span>
          <div style={{fontSize: "20px"}}>
            Choix de la
            <br />
            date:
          </div>
        </>
      )}
      {activePicker === "summary" && (
        <>
          <span style={{fontSize: "20px"}}>3.&nbsp;</span>
          <div style={{fontSize: "20px"}}>
            Résumé et
            <br />
            paiement:
          </div>
        </>
      )}
    </SelectionTitle>
  );
}
