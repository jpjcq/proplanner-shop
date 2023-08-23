import {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import { MediumHeader, SmallSubHeader } from "../../theme/text";
import ReactCodeInput from "react-code-input";
import { ErrorBox, InfoBox, ValidBox } from "../Validation";
import {
  AuthError,
  ConfirmationResult,
  PhoneAuthProvider,
  User,
  signOut,
  updateEmail,
  updatePhoneNumber,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import ToastContext from "../../contexts/toast/toast-context";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

//zindex 9

const SmsWrapper = styled.div`
  z-index: 9;
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const SmsHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  all: unset;
`;

interface SmsCodeProps {
  origin: "login" | "signup" | "update";
  // BOTH LOGIN AND SIGNUP PROPS
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  showCodeInput?: boolean;
  setShowCodeInput: Dispatch<SetStateAction<boolean>>;
  confirmationResultState?: ConfirmationResult;
  handleResendCode: () => void;
  // SIGNUP PROPS
  setShowPhoneExists?: Dispatch<SetStateAction<boolean>>;
  setUserState?: Dispatch<SetStateAction<User | null>>;
  setShowNameForm?: Dispatch<SetStateAction<boolean>>;
  setShowAccountAlreadyExists?: Dispatch<SetStateAction<boolean>>;
  setShowWelcomeUser?: Dispatch<SetStateAction<boolean>>;
  showWait?: boolean;
  showCodeResent?: boolean;
  setShowCodeResent?: Dispatch<SetStateAction<boolean>>;
  // LOGIN PROPS
  setShowInexistingAccount?: Dispatch<SetStateAction<boolean>>;
  setActiveTab?: Dispatch<SetStateAction<"phone" | "email">>;
  // UPDATE PROPS
  verificationId?: string;
  user?: User;
  setShowModifOk?: Dispatch<SetStateAction<boolean>>;
  userDetails?: { phone: string; email: string; last: string; first: string };
  setShowInvalidEmail?: Dispatch<SetStateAction<boolean>>;
}

export default function SmsCode({
  origin,
  code,
  setCode,
  showCodeInput,
  setShowCodeInput,
  setShowPhoneExists,
  setShowInexistingAccount,
  setActiveTab,
  confirmationResultState,
  handleResendCode,
  setUserState,
  setShowNameForm,
  setShowAccountAlreadyExists,
  setShowWelcomeUser,
  showWait,
  showCodeResent,
  setShowCodeResent,
  verificationId,
  user,
  setShowModifOk,
  userDetails,
  setShowInvalidEmail,
}: SmsCodeProps) {
  const navigate = useNavigate();
  // Contexts
  const toastCtx = useContext(ToastContext);
  // Validation boxes
  const [showCodeSent, setShowCodeSent] = useState(false);
  const [showWrongCode, setShowWrongCode] = useState(false);
  // Wrong code handling
  const [codeErrorCounter, setCodeErrorCounter] = useState(0);
  const [codeErrorTrigger, setCodeErrorTrigger] = useState(false);

  // After code was typed
  useEffect(() => {
    if (code.length === 6 && showCodeInput && !codeErrorTrigger) {
      setShowCodeSent(true);
      setShowCodeResent?.(false);
      setShowWrongCode(false);
      void (async function () {
        try {
          if ((origin === "login" || "signup") && confirmationResultState) {
            const userCredential = await confirmationResultState.confirm(code);
            setUserState?.(userCredential.user);
            const userDocRef = doc(db, "customers", userCredential.user.uid);
            const docSnap = await getDoc(userDocRef);
            if (origin === "login") {
              if (docSnap.exists()) {
                if (docSnap.data().last && docSnap.data().first) {
                  sessionStorage.setItem("isConnected", "true");
                  navigate("/profile?tab=rendez-vous");
                  toastCtx.showToast({
                    title: "Connecté",
                    text: `Bonjour ${docSnap.data().first as string}`,
                  });
                } else {
                  setShowInexistingAccount?.(true);
                  await signOut(auth);
                  setShowCodeInput(false);
                  setActiveTab?.("phone");
                }
              } else {
                setShowInexistingAccount?.(true);
                setShowCodeInput(false);
                setActiveTab?.("phone");
                await signOut(auth);
              }
            }
            if (origin === "signup") {
              if (docSnap.exists()) {
                if (docSnap.data().last && docSnap.data().first) {
                  setShowAccountAlreadyExists?.(true);
                  setShowCodeInput(false);
                } else {
                  setShowNameForm?.(true);
                  setShowCodeInput(false);
                }
              } else {
                setShowNameForm?.(true);
                setShowCodeInput(false);
              }
            }
          }
          if (origin === "update") {
            void (async function () {
              try {
                if (verificationId) {
                  const phoneCredential = PhoneAuthProvider.credential(
                    verificationId,
                    code
                  );
                  if (user) {
                    console.log(userDetails);
                    await updatePhoneNumber(user, phoneCredential);
                    await updateEmail(user, userDetails?.email as string);
                    const userDocRef = doc(db, "customers", user.uid);
                    await setDoc(userDocRef, {
                      phone: userDetails?.phone,
                      email: userDetails?.email,
                      last: userDetails?.last,
                      first: userDetails?.first,
                    });
                    setShowCodeInput(false);
                    setShowModifOk?.(true);
                  }
                }
              } catch (e) {
                setCodeErrorTrigger(true);
                console.log((e as AuthError).code);
                if (
                  (e as AuthError).code === "auth/invalid-verification-code"
                ) {
                  setShowCodeSent(false);
                  setShowWrongCode(true);
                }
                if ((e as AuthError).code === "auth/invalid-email")
                  setShowInvalidEmail?.(true);

                setCodeErrorCounter((code) => code + 1);
                if (codeErrorCounter === 2) {
                  setShowCodeInput(false);
                  setCodeErrorCounter(0);
                  return;
                }
              }
            })();
          }
        } catch (e) {
          setCodeErrorTrigger(true);
          console.log((e as AuthError).code);
          if ((e as AuthError).code === "auth/invalid-verification-code") {
            setShowCodeSent(false);
            setShowWrongCode(true);
          }
          if (
            (e as AuthError).code ===
            "auth/account-exists-with-different-credential"
          ) {
            setShowCodeInput(false);
            setShowPhoneExists?.(true);
            return;
          }
          setCodeErrorCounter((code) => code + 1);
          if (codeErrorCounter === 2) {
            setShowCodeInput(false);
            setShowWelcomeUser?.(false);
            setCodeErrorCounter(0);
            return;
          }
        }
      })();
    }
  }, [
    origin,
    code,
    codeErrorCounter,
    showCodeInput,
    codeErrorTrigger,
    confirmationResultState,
    navigate,
    toastCtx,
    verificationId,
    setActiveTab,
    setShowCodeInput,
    setShowInexistingAccount,
    setShowPhoneExists,
    setUserState,
    setShowNameForm,
    setShowAccountAlreadyExists,
    setShowWelcomeUser,
    setShowCodeResent,
    setShowModifOk,
    user,
    userDetails,
    setShowInvalidEmail,
  ]);

  // Reset code error trigger
  useEffect(() => {
    if (code.length < 6 && codeErrorTrigger) {
      setCodeErrorTrigger(false);
      setShowWrongCode(false);
    }
  }, [code, codeErrorTrigger]);

  return (
    <SmsWrapper>
      <SmsHeader>
        <MediumHeader fontWeight={700} style={{ marginBottom: "20px" }}>
          Code SMS
        </MediumHeader>
        <SmallSubHeader style={{ textAlign: "center" }}>
          Veuiller entrer le code qui vous a été envoyé par sms
        </SmallSubHeader>
      </SmsHeader>
      <ReactCodeInput
        name="code-input"
        type="number"
        fields={6}
        inputMode="numeric"
        onChange={(code) => setCode(code)}
      />
      {showCodeResent && <ValidBox>Code renvoyé</ValidBox>}
      {(showCodeSent || showWait) && <InfoBox>Patientez..</InfoBox>}
      {showWrongCode && <ErrorBox>Code éronné</ErrorBox>}
      <StyledButton onClick={handleResendCode} style={{ marginTop: "20px" }}>
        <SmallSubHeader
          style={{ textDecoration: "underline" }}
          color="textSecondary"
        >
          Renvoyer le code
        </SmallSubHeader>
      </StyledButton>
    </SmsWrapper>
  );
}
