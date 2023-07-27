import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import {
  AuthError,
  User,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../../firebase";
import * as Form from "@radix-ui/react-form";
import { MediumHeader, ValidationCaption } from "../../../theme/text";
import {
  StyledFormButton,
  StyledFormField,
  StyledFormLabel,
  StyledFormRoot,
} from "../../Form";
import { FormInput } from "../../Input";
import capitalizeFirstChar from "../../utils/capitalizeFirstChar";
import { InfoBox } from "../../Validation";

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  margin-bottom: 20px;
`;

interface NameFormProps {
  user: User | null;
  email: string;
  password: string;
  last: string;
  setLast: React.Dispatch<React.SetStateAction<string>>;
  first: string;
  setFirst: React.Dispatch<React.SetStateAction<string>>;
  setShowNameForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWelcomeUser: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFatalError: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NameForm({
  user,
  email,
  password,
  last,
  setLast,
  first,
  setFirst,
  setShowNameForm,
  setShowWelcomeUser,
  setShowFatalError,
}: NameFormProps) {
  const [showWait, setShowWait] = useState(false);

  function handleNameFormSubmit(e: FormEvent) {
    e.preventDefault();
    void (async function () {
      try {
        setShowWait(true);
        const userRef = doc(db, "users", user?.uid as string);
        await setDoc(userRef, {
          phone: user?.phoneNumber as string,
          email: email,
          last: capitalizeFirstChar(last),
          first: capitalizeFirstChar(first),
        });
        if (user)
          await updateProfile(user, {
            displayName: capitalizeFirstChar(first),
          });
        if (user) await updateEmail(user, email);
        if (user) await updatePassword(user, password);
        sessionStorage.setItem("isConnected", "true");
        setShowNameForm(false);
        setShowWelcomeUser(true);
      } catch (e) {
        console.log("Error creating firestore document: ", e);
        if ((e as AuthError).code === "auth/requires-recent-login") {
          setShowFatalError(true);
        }
      }
    })();
  }

  return (
    <NameWrapper>
      <MediumHeader fontWeight={700} style={{ marginBottom: "8px" }}>
        Dernière étape
      </MediumHeader>
      <ValidationCaption style={{ textAlign: "center", marginBottom: "20px" }}>
        Veuillez entrer votre nom et prénom afin de terminer votre inscription
      </ValidationCaption>
      <StyledFormRoot onSubmit={handleNameFormSubmit}>
        <StyledFormField name="last">
          <StyledFormLabel>Nom</StyledFormLabel>
          <Form.Message match="valueMissing">
            Veuillez entrer votre nom
          </Form.Message>
          <Form.Control asChild>
            <FormInput
              type="text"
              required
              onChange={(e) => setLast(e.target.value)}
            />
          </Form.Control>
        </StyledFormField>
        <StyledFormField name="first">
          <StyledFormLabel>Prénom</StyledFormLabel>
          <Form.Message match="valueMissing">
            Veuillez entrer votre prénom
          </Form.Message>
          <Form.Control asChild>
            <FormInput
              type="text"
              required
              onChange={(e) => setFirst(e.target.value)}
            />
          </Form.Control>
        </StyledFormField>
        {showWait && <InfoBox>Patientez..</InfoBox>}
        <StyledFormButton>Envoyer</StyledFormButton>
      </StyledFormRoot>
    </NameWrapper>
  );
}
