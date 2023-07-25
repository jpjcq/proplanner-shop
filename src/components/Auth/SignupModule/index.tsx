import { FormEvent, useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  AuthError,
  RecaptchaVerifier,
  User,
  signInWithPhoneNumber,
  deleteUser,
  ConfirmationResult,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { isValidPhoneNumber } from "react-phone-number-input";
import SmsCode from "../SmsCode";
import SignupForm from "./SignupForm";
import NameForm from "./NameForm";
import WelcomeUser from "./WelcomeUser";
import ErrorModule from "../../Error/Index";

const StyledButton = styled.button`
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  padding: 10px 18px;
  background-color: ${({ theme }) => theme.olive.olive7};
  color: white;
  font-weight: 600;
`;

export default function SignupModule() {
  // User infos
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [last, setLast] = useState("");
  const [first, setFirst] = useState("");

  // Phone verification processus
  const [userState, setUserState] = useState<User | null>(null);
  const [confirmationResultState, setConfirmationResultState] =
    useState<ConfirmationResult>();
  const [codeErrorCounter, setCodeErrorCounter] = useState(0);
  const [codeErrorTrigger, setCodeErrorTrigger] = useState(false);

  // Layout
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);

  // Error page
  // const [showPhoneExists, setShowPhoneExists] = useState(false);
  const [showTooManyRequests, setShowTooManyRequests] = useState(false);
  const [showAccountAlreadyExists, setShowAccountAlreadyExists] =
    useState(false);
  const [showFatalError, setShowFatalError] = useState(false);

  // Validation boxes
  const [showPhoneInvalid, setShowPhoneInvalid] = useState(false);
  const [showCodeSent, setShowCodeSent] = useState(false);
  const [showWrongCode, setShowWrongCode] = useState(false);

  // Submit button click
  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (isValidPhoneNumber(phone)) {
      void (async function () {
        try {
          // Create user with phone number
          const verifier = new RecaptchaVerifier(auth, "sign-in-button", {
            size: "invisible",
          });
          const confirmationResult = await signInWithPhoneNumber(
            auth,
            phone,
            verifier
          );
          setConfirmationResultState(confirmationResult);

          setShowCodeInput(true);
        } catch (e) {
          console.error(e);
          if ((e as AuthError).code === "auth/too-many-requests") {
            setShowCodeInput(false);
            setShowTooManyRequests(true);
          }
        }
      })();
    } else {
      setShowPhoneInvalid(true);
    }
  }

  // After code was typed
  useEffect(() => {
    if (code.length === 6 && showCodeInput && !codeErrorTrigger) {
      setShowCodeSent(true);
      setShowWrongCode(false);
      void (async function () {
        try {
          if (confirmationResultState) {
            const userCredential = await confirmationResultState.confirm(code);
            setUserState(userCredential.user);

            const userRef = doc(db, "users", userCredential.user.uid);
            const userDocSnapshot = await getDoc(userRef);
            if (userDocSnapshot.exists()) {
              if (userDocSnapshot.data().last && userDocSnapshot.data().first) {
                setShowAccountAlreadyExists(true);
                setShowCodeInput(false);
              } else {
                setShowNameForm(true);
                setShowCodeInput(false);
              }
            } else {
              setShowNameForm(true);
              setShowCodeInput(false);
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
            const deletedUser = await deleteUser(userState as User);
            console.log("User deleted: ", deletedUser);
            setShowCodeInput(false);
            setShowWelcomeUser(false);
            setCodeErrorCounter(0);
            return;
          }
        }
      })();
    }
  }, [
    code,
    userState,
    codeErrorCounter,
    showCodeInput,
    codeErrorTrigger,
    confirmationResultState,
  ]);

  // Reset code error trigger
  useEffect(() => {
    if (code.length < 6 && codeErrorTrigger) {
      setCodeErrorTrigger(false);
      setShowWrongCode(false);
    }
  }, [code, codeErrorTrigger]);

  return (
    <>
      {!showCodeInput &&
        !showNameForm &&
        !showWelcomeUser &&
        !showTooManyRequests &&
        !showAccountAlreadyExists &&
        !showFatalError && (
          <SignupForm
            setPhone={setPhone}
            setEmail={setEmail}
            setPassword={setPassword}
            handleFormSubmit={handleFormSubmit}
            showPhoneInvalid={showPhoneInvalid}
            showAccountAlreadyExists={showAccountAlreadyExists}
          />
        )}
      {showCodeInput && (
        <SmsCode
          setCode={setCode}
          showCodeSent={showCodeSent}
          showWrongCode={showWrongCode}
        />
      )}
      {!showCodeInput && showTooManyRequests && (
        <ErrorModule
          title="Trop de requêtes"
          description="Vous avez atteint le nombre maximum de requêtes. Merci de réessayer
        ultérieurement."
        >
          <StyledButton onClick={() => setShowTooManyRequests(false)}>
            Retour
          </StyledButton>
        </ErrorModule>
      )}
      {!showCodeInput && showFatalError && (
        <ErrorModule
          title="Erreur fatale"
          description="Une erreur s'est produite lors du processus d'inscription. Veuillez
        recommencer."
        >
          <StyledButton
            onClick={() =>
              void (async function () {
                try {
                  await signOut(auth);
                  setShowFatalError?.(false);
                } catch (e) {
                  console.log(e);
                  setShowFatalError?.(false);
                }
              })()
            }
          >
            Retour
          </StyledButton>
        </ErrorModule>
      )}
      {!showCodeInput && showNameForm && (
        <NameForm
          user={userState}
          email={email}
          password={password}
          last={last}
          setLast={setLast}
          first={first}
          setFirst={setFirst}
          setShowNameForm={setShowNameForm}
          setShowWelcomeUser={setShowWelcomeUser}
          setShowFatalError={setShowFatalError}
        />
      )}
      {!showCodeInput && !showNameForm && showWelcomeUser && (
        <WelcomeUser first={first} />
      )}
    </>
  );
}
