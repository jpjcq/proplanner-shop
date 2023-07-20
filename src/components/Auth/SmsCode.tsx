import styled from "styled-components";
import { MediumHeader, SmallSubHeader } from "../../theme/text";
import ReactCodeInput from "react-code-input";
import { ErrorBox, InfoBox } from "../Validation";

const SmsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  margin-bottom: 20px;
`;

interface SmsCodeProps {
  setCode: React.Dispatch<React.SetStateAction<string>>;
  showCodeSent: boolean;
  showWrongCode: boolean;
}

export default function SmsCode({
  setCode,
  showCodeSent,
  showWrongCode,
}: SmsCodeProps) {
  return (
    <>
      <SmsWrapper>
        <MediumHeader fontWeight={700} style={{ marginBottom: "20px" }}>
          Code SMS
        </MediumHeader>
        <SmallSubHeader style={{ textAlign: "center" }}>
          Veuiller entrer le code qui vous a été envvoyé par sms
        </SmallSubHeader>
      </SmsWrapper>
      <ReactCodeInput
        name="code-input"
        type="number"
        fields={6}
        inputMode="numeric"
        onChange={(code) => setCode(code)}
      />
      {showCodeSent && <InfoBox>Patientez..</InfoBox>}
      {showWrongCode && <ErrorBox>Code éronné</ErrorBox>}
    </>
  );
}
