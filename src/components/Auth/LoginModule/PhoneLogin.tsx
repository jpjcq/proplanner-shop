import { Dispatch, FormEvent, SetStateAction } from "react";
import { PhoneInput } from "../../Input";
import {
  StyledFormButton,
  StyledFormField,
  StyledFormLabel,
  StyledFormRoot,
} from "../../Form";
import { ErrorBox, InfoBox, WarningBox } from "../../Validation";

interface PhoneLoginProps {
  phone?: string;
  setPhone: Dispatch<SetStateAction<string>>;
  showPhoneExists: boolean;
  showPhoneInvalid: boolean;
  showInexistingAccount: boolean;
  showPhoneConnecting: boolean;
  handleFormSubmit: (e: FormEvent) => void;
}

export default function PhoneLogin({
  phone,
  setPhone,
  showPhoneExists,
  showPhoneInvalid,
  showInexistingAccount,
  showPhoneConnecting,
  handleFormSubmit,
}: PhoneLoginProps) {
  return (
    <>
      <StyledFormRoot onSubmit={handleFormSubmit} style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <StyledFormField name="phone">
          <StyledFormLabel>Téléphone</StyledFormLabel>
          <PhoneInput value={phone} setPhone={setPhone} />
        </StyledFormField>
      </StyledFormRoot>
      {showPhoneExists && (
        <ErrorBox>Un compte est déjà associé à ce numéro</ErrorBox>
      )}
      {showPhoneInvalid && (
        <WarningBox>Le numéro de téléphone fourni est invalide</WarningBox>
      )}
      {showInexistingAccount && (
        <ErrorBox>Aucun compte pour ce numéro. Veuillez vous inscrire</ErrorBox>
      )}
      {showPhoneConnecting && <InfoBox>Connexion..</InfoBox>}
      <StyledFormButton
        buttonId="login-button"
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        style={{ marginTop: "40px" }}
      >
        Se connecter
      </StyledFormButton>
    </>
  );
}
