import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  User,
  onAuthStateChanged,
  updateEmail,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import SmsCode from "../Auth/SmsCode";
import { ErrorBox, ValidBox } from "../Validation";

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
  const [showInvalidEmail, setShowInvalidEmail] = useState(false);

  function handleFormSubmit(e?: FormEvent) {
    e?.preventDefault();
    if (docPhone === phone) {
      if (userState) {
        void (async function () {
          await updateEmail(userState, email);
          const docRef = doc(db, "users", userState.uid);
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
        const docRef = doc(db, "users", localUser.uid);
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
        <>
          <MediumHeader fontWeight={700} style={{ margin: "70px 0 40px 0" }}>
            Mes coordonnées
          </MediumHeader>
          <StyledFormRoot onSubmit={handleFormSubmit}>
            <StyledFormField name="phone">
              <StyledFormLabel>Téléphone</StyledFormLabel>
              <PhoneInput value={phone} setPhone={setPhone} />
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Control>
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
                />
              </Form.Control>
            </StyledFormField>
            {showModifOk && <ValidBox>Informations mises à jour</ValidBox>}
            {showInvalidEmail && <ErrorBox>Email invalide</ErrorBox>}
            <StyledFormButton
              style={{ padding: "13px 40px", marginTop: "40px" }}
              buttonId="profile-update-button"
            >
              Modifier
            </StyledFormButton>
          </StyledFormRoot>
        </>
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
          setShowInvalidEmail={setShowInvalidEmail}
        />
      )}
    </>
  );
}
