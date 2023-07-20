import { FormEvent } from "react";
import { MediumHeader, SmallSubHeader } from "../../../theme/text";
import { Link } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import {
  StyledFormButton,
  StyledFormField,
  StyledFormLabel,
  StyledFormMessage,
  StyledFormRoot,
} from "../../Form";
import { FormInput } from "../../Input";
import PhoneInput from "react-phone-number-input";
import "./phoneInput.css";
import { WarningBox } from "../../Validation";
import { useTheme } from "styled-components";
import countryCodes from "./countryCodes";

interface SignupFormProps {
  handleFormSubmit: (e: FormEvent) => void;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPhoneInvalid: boolean;
}

export default function SignupForm({
  handleFormSubmit,
  setPhone,
  setEmail,
  setPassword,
  showPhoneInvalid,
}: SignupFormProps) {
  const theme = useTheme();
  return (
    <>
      <MediumHeader fontWeight={700} style={{ marginBottom: "20px" }}>
        S'inscrire
      </MediumHeader>
      <StyledFormRoot onSubmit={handleFormSubmit}>
        <StyledFormField name="phone">
          <StyledFormLabel>Téléphone</StyledFormLabel>
          <PhoneInput
            countries={countryCodes}
            onChange={(phone) => {
              setPhone(phone as string);
              console.log("phone ", phone);
            }}
            defaultCountry="FR"
          />
        </StyledFormField>
        <StyledFormField name="email">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <StyledFormLabel>Email</StyledFormLabel>
            <StyledFormMessage match="typeMismatch">
              Veuillez entrer un email valide
            </StyledFormMessage>
          </div>
          <Form.Control asChild>
            <FormInput
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Control>
        </StyledFormField>
        <StyledFormField name="password">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <StyledFormLabel>Mot de passe</StyledFormLabel>
            <StyledFormMessage match="tooShort">
              Min. 6 charactères
            </StyledFormMessage>
          </div>
          <Form.Control asChild>
            <FormInput
              type="password"
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Control>
        </StyledFormField>
        {showPhoneInvalid && (
          <WarningBox>Le numéro de téléphone fourni est invalide</WarningBox>
        )}
        <StyledFormButton
          buttonId="sign-in-button"
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        >
          S'inscrire
        </StyledFormButton>
        <SmallSubHeader style={{ marginTop: "20px" }} color="textSecondary">
          Déjà un compte ?{" "}
          <Link to="/auth/login" style={{ color: theme.textSecondary }}>
            Se connecter
          </Link>
        </SmallSubHeader>
      </StyledFormRoot>
    </>
  );
}
