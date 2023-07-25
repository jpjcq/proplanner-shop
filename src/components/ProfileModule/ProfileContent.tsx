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
  AuthError,
  PhoneAuthProvider,
  RecaptchaVerifier,
  User,
  onAuthStateChanged,
  updateEmail,
  updatePhoneNumber,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import SmsCode from "../Auth/SmsCode";
import { ValidBox } from "../Validation";

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

export default function ProfileContent({
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
  const [verificationIdState, setVerificationIdState] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [showCodeSent, setShowCodeSent] = useState(false);
  const [showWrongCode, setShowWrongCode] = useState(false);
  const [codeErrorTrigger, setCodeErrorTrigger] = useState(false);
  const [codeErrorCounter, setCodeErrorCounter] = useState(0);

  // Validation box
  const [showModifOk, setShowModifOk] = useState(false);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
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
    } else {
      void (async function () {
        try {
          const verifier = new RecaptchaVerifier(
            auth,
            "profile-update-button",
            {
              size: "invisible",
            }
          );
          const provider = new PhoneAuthProvider(auth);
          const verificationId = await provider.verifyPhoneNumber(
            phone,
            verifier
          );
          setVerificationIdState(verificationId);
          setShowCodeInput(true);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }

  // After code was typed
  useEffect(() => {
    if (code.length === 6 && showCodeInput && !codeErrorTrigger) {
      setShowCodeSent(true);
      setShowWrongCode(false);
      void (async function () {
        try {
          if (verificationIdState) {
            const phoneCredential = PhoneAuthProvider.credential(
              verificationIdState,
              code
            );
            if (userState) {
              await updatePhoneNumber(userState, phoneCredential);
              const userDocRef = doc(db, "users", userState.uid);
              await setDoc(userDocRef, {
                phone,
                email,
                last,
                first,
              });
              setShowModifOk(true);
            }
          }
        } catch (e) {
          setCodeErrorTrigger(true);
          console.log((e as AuthError).code);
          if ((e as AuthError).code === "auth/invalid-verification-code") {
            setShowCodeSent(false);
            setShowWrongCode(true);
          }

          setCodeErrorCounter((code) => code + 1);
          if (codeErrorCounter === 2) {
            setShowCodeInput(false);
            setCodeErrorCounter(0);
            return;
          }
        }
      })();
    }
  }, [
    code,
    codeErrorCounter,
    showCodeInput,
    codeErrorTrigger,
    phone,
    email,
    last,
    first,
    userState,
    verificationIdState,
  ]);

  // Get user doc from firestore
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        void (async function () {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserState(user);
            setDocPhone(docSnap.data().phone as string);
            setPhone(docSnap.data().phone as string);
            setEmail(docSnap.data().email as string);
            setLast(docSnap.data().last as string);
            setFirst(docSnap.data().first as string);
          }
        })();
      }
    });
  }, [setUserState, setDocPhone, setPhone, setEmail, setLast, setFirst]);

  return (
    <>
      {showCodeInput ? (
        <SmsCode
          setCode={setCode}
          showCodeSent={showCodeSent}
          showWrongCode={showWrongCode}
        />
      ) : (
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
            <StyledFormButton
              style={{ padding: "13px 40px", marginTop: "40px" }}
              buttonId="profile-update-button"
            >
              Modifier
            </StyledFormButton>
          </StyledFormRoot>
        </>
      )}
    </>
  );
}
