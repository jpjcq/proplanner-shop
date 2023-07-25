import { FormEvent } from "react";
import { FormInput } from "../../Input";
import * as Form from "@radix-ui/react-form";
import {
  StyledFormButton,
  StyledFormField,
  StyledFormLabel,
  StyledFormMessage,
  StyledFormRoot,
} from "../../Form";
import { ErrorBox } from "../../Validation";
import { SmallSubHeader } from "../../../theme/text";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";

interface EmailLoginProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleFormSubmit: (e: FormEvent) => void;
  showEmailPasswordInvalid: boolean;
}

export default function EmailLogin({
  email,
  setEmail,
  setPassword,
  handleFormSubmit,
  showEmailPasswordInvalid,
}: EmailLoginProps) {
  const theme = useTheme();

  return (
    <StyledFormRoot onSubmit={handleFormSubmit} style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
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
            defaultValue={email}
            required
            onChange={(e) => setEmail(e.target.value)}
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
        </div>
        <Form.Control asChild>
          <FormInput
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Control>
        <SmallSubHeader style={{ marginTop: "20px" }} color="textSecondary">
            <Link to="/reset-password" style={{ color: theme.textSecondary }}>
              Mot de passe oublié ?
            </Link>
          </SmallSubHeader>
      </StyledFormField>
      {showEmailPasswordInvalid && (
        <ErrorBox>Email et/ou mot de passe érroné</ErrorBox>
      )}
      <StyledFormButton
        buttonId="login-button"
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        style={{ marginTop: "40px" }}
      >
        Se connecter
      </StyledFormButton>
    </StyledFormRoot>
  );
}
