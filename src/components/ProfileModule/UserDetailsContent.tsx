import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../../firebase";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  User,
  onAuthStateChanged,
  updateEmail,
} from "firebase/auth";
import {
  StyledFormButton,
  StyledFormField,
  StyledFormLabel,
  StyledFormMessage,
  StyledFormRoot,
} from "../Form";
import { FormInput, PhoneInput } from "../Input";
import { MediumHeader } from "../../theme/text";
import * as Form from "@radix-ui/react-form";
import { doc, getDoc, setDoc } from "firebase/firestore";
import SmsCode from "../Auth/SmsCode";
import { ValidBox } from "../Validation";
import isEmail from "validator/es/lib/isEmail";
import { styled } from "styled-components";

const UserDetailsContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface ProfileContentProps {
  userState: User;
  docPhone: string;
  phone: string;
  email: string;
  last: string;
  first: string;
  setUserState: Dispatch<SetStateAction<User | undefined>>;
  setDocPhone: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setLast: Dispatch<SetStateAction<string>>;
  setFirst: Dispatch<SetStateAction<string>>;
}

export default function UserDetailsContent({
  userState,
  docPhone,
  phone,
  email,
  last,
  first,
  setUserState,
  setDocPhone,
  setPhone,
  setEmail,
  setLast,
  setFirst,
}: ProfileContentProps) {
  // Phone verif
  const [code, setCode] = useState("");
  // const [verifierState, setVerifierState] = useState<RecaptchaVerifier>();
  const [verificationIdState, setVerificationIdState] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [resendCode, setResendCode] = useState(false);

  // Validation box
  const [showModifOk, setShowModifOk] = useState(false);
  const [showWait, setShowWait] = useState(false);
  const [showCodeResent, setShowCodeResent] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  function handleFormSubmit(e?: FormEvent) {
    e?.preventDefault();
    if (docPhone === phone) {
      if (userState) {
        void (async function () {
          await updateEmail(userState, email);
          const docRef = doc(db, "customers", userState.uid);
          await setDoc(docRef, {
            phone,
            email,
            last,
            first,
          });
        })();
        setShowModifOk(true);
      }
    }
    if (docPhone != phone) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "profile-update-button",
        {
          size: "invisible",
        }
      );
      void (async function () {
        try {
          const provider = new PhoneAuthProvider(auth);
          if (window.recaptchaVerifier) {
            const verificationId = await provider.verifyPhoneNumber(
              phone,
              window.recaptchaVerifier
            );
            setVerificationIdState(verificationId);
            setShowCodeInput(true);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }

  // Get user doc from firestore
  useEffect(() => {
    let localUser: User;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(user);
        localUser = user;
      }
      void (async function () {
        const docRef = doc(db, "customers", localUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocPhone(docSnap.data().phone as string);
          setPhone(docSnap.data().phone as string);
          setEmail(docSnap.data().email as string);
          setLast(docSnap.data().last as string);
          setFirst(docSnap.data().first as string);
        }
      })();
    });
  }, [setUserState, setDocPhone, setPhone, setEmail, setLast, setFirst]);

  // Resend sms code button
  function handleResendCode() {
    void (function () {
      setShowWait(true);
      window.recaptchaVerifier?.clear();
      window.recaptchaVerifier = null;
      setShowCodeInput(false);
      setResendCode(true);
    })();
  }

  /* Resend code in an effect to let "profile-update-button" 
  render before recatcha is built */
  useEffect(() => {
    if (resendCode) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "profile-update-button",
        {
          size: "invisible",
        }
      );
      void (async function () {
        try {
          const provider = new PhoneAuthProvider(auth);
          if (window.recaptchaVerifier) {
            const verificationId = await provider.verifyPhoneNumber(
              phone,
              window.recaptchaVerifier
            );
            setVerificationIdState(verificationId);
            setResendCode(false);
            setShowWait(false);
            setShowCodeInput(true);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [resendCode, phone]);

  // Show code resent in sms input
  useEffect(() => {
    if (showWait) setShowCodeResent(true);
  }, [showWait]);

  return (
    <>
      {!showCodeInput && (
        <UserDetailsContentWrapper>
          <MediumHeader fontWeight={700} style={{ margin: "70px 0 40px 0" }}>
            Mes coordonnées
          </MediumHeader>
          <StyledFormRoot onSubmit={handleFormSubmit}>
            <StyledFormField name="phone">
              <StyledFormLabel>Téléphone</StyledFormLabel>
              <PhoneInput value={phone} setPhone={setPhone} />
            </StyledFormField>
            <StyledFormField name="email">
              <StyledFormLabel>Email</StyledFormLabel>
              <Form.Control asChild>
                <FormInput
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    isEmail(e.target.value)
                      ? setIsInvalidEmail(false)
                      : setIsInvalidEmail(true);
                  }}
                  autoComplete="email"
                />
              </Form.Control>
              {isInvalidEmail && (
                <StyledFormMessage>
                  Veuillez entrer un email valide
                </StyledFormMessage>
              )}
            </StyledFormField>
            <StyledFormField name="last">
              <StyledFormLabel>Nom</StyledFormLabel>
              <Form.Message match="valueMissing">
                Veuillez entrer votre nom
              </Form.Message>
              <Form.Control asChild>
                <FormInput
                  value={last}
                  type="text"
                  required
                  onChange={(e) => setLast(e.target.value)}
                  autoComplete="family-name"
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
                  value={first}
                  type="text"
                  required
                  onChange={(e) => setFirst(e.target.value)}
                  autoComplete="given-name"
                />
              </Form.Control>
            </StyledFormField>
            {showModifOk && <ValidBox>Informations mises à jour</ValidBox>}
            <StyledFormButton
              style={{ padding: "13px 40px", marginTop: "40px" }}
              buttonId="profile-update-button"
            >
              Modifier
            </StyledFormButton>
          </StyledFormRoot>
        </UserDetailsContentWrapper>
      )}

      {showCodeInput && (
        <SmsCode
          origin="update"
          code={code}
          setCode={setCode}
          verificationId={verificationIdState}
          showCodeInput={showCodeInput}
          user={userState}
          setShowCodeInput={setShowCodeInput}
          handleResendCode={handleResendCode}
          setShowModifOk={setShowModifOk}
          userDetails={{ phone, email, last, first }}
          showWait={showWait}
          showCodeResent={showCodeResent}
          setShowCodeResent={setShowCodeResent}
          setShowInvalidEmail={setIsInvalidEmail}
        />
      )}
    </>
  );
}
