import { FormEvent, useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  AuthError,
  RecaptchaVerifier,
  User,
  signInWithPhoneNumber,
  ConfirmationResult,
  signOut,
} from "firebase/auth";
import { auth } from "../../../firebase";
import SmsCode from "../SmsCode";
import SignupForm from "./SignupForm";
import NameForm from "./NameForm";
import WelcomeUser from "./WelcomeUser";
import ErrorModule from "../../Error/Index";
import { isValidPhoneNumber } from "react-phone-number-input";

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
  const [verifierState, setVerifierState] = useState<RecaptchaVerifier>();
  const [confirmationResultState, setConfirmationResultState] =
    useState<ConfirmationResult>();
  const [codeErrorTrigger, setCodeErrorTrigger] = useState(false);

  // Layout
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);
  const [showWelcomeUser, setShowWelcomeUser] = useState(false);

  // Error page
  const [showTooManyRequests, setShowTooManyRequests] = useState(false);
  const [showAccountAlreadyExists, setShowAccountAlreadyExists] =
    useState(false);
  const [showFatalError, setShowFatalError] = useState(false); // a voir, autant transformer en error page

  // Validation boxes
  const [showPhoneInvalid, setShowPhoneInvalid] = useState(false);
  const [showWait, setShowWait] = useState(false);
  const [showCodeResent, setShowCodeResent] = useState(false);

  // Form validity
  const [isFormValid, setIsFormValid] = useState(false);

  // Submit button click
  const handleFormSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      if (isFormValid && isValidPhoneNumber(phone)) {
        void (async function () {
          try {
            const verifier = new RecaptchaVerifier(auth, "sign-in-button", {
              size: "invisible",
            });
            const confirmationResult = await signInWithPhoneNumber(
              auth,
              phone,
              verifier
            );
            setConfirmationResultState(confirmationResult);
            setVerifierState(verifier);
            setShowCodeInput(true);
            setShowWait(false);
          } catch (e) {
            console.log(e);
            if ((e as AuthError).code === "auth/too-many-requests") {
              setShowCodeInput(false);
              setShowTooManyRequests(true);
            }
          }
        })();
      } else {
        setShowPhoneInvalid(true);
      }
    },
    [phone, isFormValid]
  );

  // Reset code error trigger
  useEffect(() => {
    if (code.length < 6 && codeErrorTrigger) {
      setCodeErrorTrigger(false);
    }
  }, [code, codeErrorTrigger]);

  // Resend code button handler
  function handleResendCode() {
    void (async function () {
      setShowWait(true);
      setShowCodeInput(false);
      verifierState?.clear();
      setVerifierState(undefined);
      try {
        await signOut(auth);
      } catch (e) {
        console.log("Error while signing out: ", e);
      }
      handleFormSubmit();
    })();
  }

  useEffect(() => {
    if (showWait) setShowCodeResent(true);
  }, [showWait]);

  return (
    <>
      {!showCodeInput &&
        !showNameForm &&
        !showWelcomeUser &&
        !showTooManyRequests &&
        !showAccountAlreadyExists &&
        !showFatalError && (
          <SignupForm
            phone={phone}
            email={email}
            password={password}
            setPhone={setPhone}
            setEmail={setEmail}
            setPassword={setPassword}
            handleFormSubmit={handleFormSubmit}
            showPhoneInvalid={showPhoneInvalid}
            showAccountAlreadyExists={showAccountAlreadyExists}
            setIsFormValid={setIsFormValid}
          />
        )}
      {showCodeInput && (
        <SmsCode
          origin="signup"
          code={code}
          setCode={setCode}
          showCodeInput={showCodeInput}
          confirmationResultState={confirmationResultState}
          setUserState={setUserState}
          setShowNameForm={setShowNameForm}
          setShowWelcomeUser={setShowWelcomeUser}
          setShowCodeInput={setShowCodeInput}
          setShowAccountAlreadyExists={setShowAccountAlreadyExists}
          showWait={showWait}
          setShowCodeResent={setShowCodeResent}
          showCodeResent={showCodeResent}
          handleResendCode={handleResendCode}
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
