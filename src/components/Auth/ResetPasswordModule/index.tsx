import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MediumHeader, SmallSubHeader } from "../../../theme/text";
import * as Form from "@radix-ui/react-form";
import {
  StyledFormButton,
  StyledFormField,
  StyledFormLabel,
  StyledFormMessage,
  StyledFormRoot,
} from "../../Form";
import { FormInput } from "../../Input";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import { ValidBox } from "../../Validation";

export default function ResetPasswordModule() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [showEmailSent, setShowEmailSent] = useState(false);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    void (async function () {
      try {
        await sendPasswordResetEmail(auth, email);
        setShowEmailSent(true);
        console.log(email);
        navigate(`/auth/login?tab=email&email=${email}`);
      } catch (e) {
        console.log(e);
      }
    })();
  }

  return (
    <>
      <MediumHeader fontWeight={700} style={{ marginBottom: "20px" }}>
        Réinitialiser mon mot de passe
      </MediumHeader>
      <SmallSubHeader
        fontWeight={400}
        style={{ textAlign: "center", maxWidth: "250px", marginBottom: "40px" }}
      >
        Un email vous sera envoyé afin de réinitialiser votre mot de passe.
      </SmallSubHeader>
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
        {showEmailSent && <ValidBox>Email envoyé</ValidBox>}
        <StyledFormButton
          buttonId="login-button"
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          style={{ marginTop: "40px" }}
        >
          Se connecter
        </StyledFormButton>
      </StyledFormRoot>
    </>
  );
}
