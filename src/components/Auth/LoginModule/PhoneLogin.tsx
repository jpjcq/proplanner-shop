import { Dispatch, FormEvent, SetStateAction } from "react";
import { PhoneInput } from "../../Input";
import { StyledFormButton, StyledFormField, StyledFormLabel, StyledFormRoot } from "../../Form";
import { WarningBox } from "../../Validation";

export default function PhoneLogin({
  setPhone,
  showPhoneInvalid,
  handleFormSubmit
}: {
  setPhone: Dispatch<SetStateAction<string>>;
  showPhoneInvalid: boolean;
  handleFormSubmit: (e: FormEvent) => void;
}) {
  return (
    <>
      <StyledFormRoot onSubmit={handleFormSubmit}>
        <StyledFormField name="phone">
          <StyledFormLabel>Téléphone</StyledFormLabel>
          <PhoneInput setPhone={setPhone} />
        </StyledFormField>
        <StyledFormButton
            buttonId="login-button"
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            style={{ marginTop: "40px" }}
          >
            Se connecter
          </StyledFormButton>
      </StyledFormRoot>
      {showPhoneInvalid && (
        <WarningBox>Le numéro de téléphone fourni est invalide</WarningBox>
      )}
    </>
  );
}
