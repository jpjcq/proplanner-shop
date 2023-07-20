import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import * as Form from "@radix-ui/react-form";
import { MediumHeader } from "../../theme/text";
import {
  StyledFormButton,
  StyledFormField,
  StyledFormLabel,
  StyledFormMessage,
  StyledFormRoot,
} from "../Form";
import { FormInput } from "../Input";
import { SmallSubHeader } from "../../theme/text";
import { useTheme } from "styled-components";

export default function LoginModule() {
  const theme = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    void (async function () {
      try {
        const credentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(credentials);
      } catch (error) {
        console.error(error);
      }
    })();
  }

  return (
    <>
      <MediumHeader fontWeight={700} style={{ marginBottom: "20px" }}>
        Se connecter
      </MediumHeader>
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
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        >
          Se connecter
        </StyledFormButton>
        <SmallSubHeader style={{ marginTop: "20px" }} color="textSecondary">
          Pas encore de compte ?{" "}
          <Link to="/auth/signup" style={{ color:  theme.textSecondary}}>
            S'inscrire
          </Link>
        </SmallSubHeader>
      </StyledFormRoot>
    </>
  );
}
