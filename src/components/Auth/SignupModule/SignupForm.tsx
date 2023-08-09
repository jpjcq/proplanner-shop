import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTheme } from "styled-components";
import { Link } from "react-router-dom";
import { Control } from "@radix-ui/react-form";
import { MediumHeader, SmallSubHeader } from "../../../theme/text";
import {
  StyledFormButton,
  StyledFormField,
  StyledFormLabel,
  StyledFormMessage,
  StyledFormRoot,
} from "../../Form";
import { FormInput } from "../../Input";
import { PhoneInput } from "../../Input";
import { ErrorBox } from "../../Validation";
import isEmail from "validator/es/lib/isEmail";
import isStrongPassword from "validator/es/lib/isStrongPassword";

import "./phoneInput.css";

interface SignupFormProps {
  phone: string;
  email: string;
  password: string;
  setPhone: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleFormSubmit: (e: FormEvent) => void;
  showPhoneInvalid: boolean;
  showAccountAlreadyExists: boolean;
  setIsFormValid: Dispatch<SetStateAction<boolean>>;
}

export default function SignupForm({
  phone,
  email,
  password,
  handleFormSubmit,
  setPhone,
  setEmail,
  setPassword,
  showPhoneInvalid,
  showAccountAlreadyExists,
  setIsFormValid,
}: SignupFormProps) {
  const theme = useTheme();
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);

  // Check if form is entirely valid
  useEffect(() => {
    if (!isInvalidEmail && !isInvalidPassword && !isInvalidPhone) {
      setIsFormValid(true);
    }
  });

  return (
    <>
      <MediumHeader fontWeight={700} style={{ marginBottom: "20px" }}>
        S'inscrire
      </MediumHeader>
      <StyledFormRoot onSubmit={handleFormSubmit}>
        <StyledFormField name="phone">
          <StyledFormLabel>Téléphone</StyledFormLabel>
          <PhoneInput
            value={phone}
            setPhone={setPhone}
            setIsInvalidPhone={setIsInvalidPhone}
            $isInvalid={isInvalidPhone}
          />
          {(isInvalidPhone || showPhoneInvalid) && (
            <StyledFormMessage>
              Veuillez entrer un numéro valide
            </StyledFormMessage>
          )}
        </StyledFormField>
        <StyledFormField name="email">
          <StyledFormLabel>Email</StyledFormLabel>
          <Control asChild>
            <FormInput
              type="email"
              required
              value={email}
              $invalid={isInvalidEmail}
              onChange={(e) => {
                setEmail(e.target.value);
                isEmail(e.target.value)
                  ? setIsInvalidEmail(false)
                  : setIsInvalidEmail(true);
              }}
              autoComplete="email"
            />
          </Control>
          {isInvalidEmail && (
            <StyledFormMessage>
              Veuillez entrer un email valide
            </StyledFormMessage>
          )}
        </StyledFormField>
        <StyledFormField name="password">
          <StyledFormLabel>Mot de passe</StyledFormLabel>
          <Control asChild>
            <FormInput
              value={password}
              type="password"
              required
              $invalid={isInvalidPassword}
              onChange={(e) => {
                setPassword(e.target.value);
                isStrongPassword(e.target.value)
                  ? setIsInvalidPassword(false)
                  : setIsInvalidPassword(true);
              }}
              autoComplete="new-password"
            />
          </Control>
          {isInvalidPassword && (
            <StyledFormMessage>
              Mot de passe trop faible (min a, A, €)
            </StyledFormMessage>
          )}
        </StyledFormField>
        {showAccountAlreadyExists && (
          <ErrorBox>Un compte est déjà associé à ce numéro</ErrorBox>
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
