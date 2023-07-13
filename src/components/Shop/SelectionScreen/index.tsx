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
          <span>1.&nbsp;</span>
          <div>
            Choix de la
            <br />
            prestation:
          </div>
        </>
      )}
      {activePicker === "date" && (
        <>
          <span>2.&nbsp;</span>
          <div>
            Choix de la
            <br />
            date:
          </div>
        </>
      )}
    </SelectionTitle>
  );
}
