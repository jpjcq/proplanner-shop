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

interface EmailLoginProps {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleFormSubmit: (e: FormEvent) => void;
}

export default function EmailLogin({
  setEmail,
  setPassword,
  handleFormSubmit,
}: EmailLoginProps) {
  return (
    <StyledFormRoot onSubmit={handleFormSubmit}>
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
      </StyledFormField>
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
