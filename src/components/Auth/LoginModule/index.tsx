import { FormEvent, useState, useEffect, useContext, useCallback } from "react";
import { useTheme } from "styled-components";
import { auth, db } from "../../../firebase";
import {
  AuthError,
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { MediumHeader, SmallSubHeader } from "../../../theme/text";
import EmailLoginForm from "./EmailLoginForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PhoneLoginForm from "./PhoneLoginForm";
import {
  StyledTabContent,
  StyledTabList,
  StyledTabRoot,
  StyledTabTrigger,
} from "../../Tabs";
import SmsCode from "../SmsCode";
import { isValidPhoneNumber } from "react-phone-number-input";
import ToastContext from "../../../contexts/toast/toast-context";
import { doc, getDoc } from "firebase/firestore";

export default function LoginModule() {
  const theme = useTheme();
  const navigate = useNavigate();
  const toastCtx = useContext(ToastContext);

  // User creds
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  // Layout
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  const [showCodeInput, setShowCodeInput] = useState(false);

  // Phone verif. logic
  const [verifierState, setVerifierState] = useState<RecaptchaVerifier>();
  const [confirmationResultState, setConfirmationResultState] =
    useState<ConfirmationResult>();

  // Validation boxes
  const [showEmailPasswordInvalid, setShowEmailPasswordInvalid] =
    useState(false);
  const [showPhoneInvalid, setShowPhoneInvalid] = useState(false);
  const [showInexistingAccount, setShowInexistingAccount] = useState(false);
  const [showPhoneExists, setShowPhoneExists] = useState(false);
  const [showTooManyRequests, setShowTooManyRequests] = useState(false);
  const [showWait, setShowWait] = useState(false);
  const [showCodeResent, setShowCodeResent] = useState(false);

  // Login form submit
  const handleFormSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      if (activeTab === "email") {
        void (async function () {
          try {
            const credentials = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            const userDocRef = doc(db, "users", credentials.user.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
              sessionStorage.setItem("isConnected", "true");
            }
            navigate("/profile?tab=rendez-vous");
            if (docSnap.exists()) {
              toastCtx.showToast({
                title: "Connecté",
                text: `Bonjour ${docSnap.data().first as string}`,
              });
            }
          } catch (e) {
            console.log(e);
            if (
              (e as AuthError).code === "auth/wrong-password" ||
              (e as AuthError).code === "auth/user-not-found" ||
              (e as AuthError).code === "auth/invalid-email"
            ) {
              setShowEmailPasswordInvalid(true);
            }
          }
        })();
      }
      if (activeTab === "phone") {
        setShowTooManyRequests(false);
        if (isValidPhoneNumber(phone)) {
          void (async function () {
            try {
              const verifier = new RecaptchaVerifier(auth, "login-button", {
                size: "invisible",
              });
              const confirmationResult = await signInWithPhoneNumber(
                auth,
                phone,
                verifier
              );
              setVerifierState(verifier);
              setConfirmationResultState(confirmationResult);
              setShowCodeInput(true);
              setShowWait(false);
            } catch (e) {
              console.log(e);
              if ((e as AuthError).code === "auth/too-many-requests") {
                setShowTooManyRequests(true);
              }
            }
          })();
        } else {
          setShowPhoneInvalid(true);
        }
      }
    },
    [activeTab, phone, email, navigate, password, toastCtx]
  );

  // Automatic tab
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tab")) {
      setActiveTab(params.get("tab") as "email" | "phone");
    }
  }, [setActiveTab, location.search, handleFormSubmit]);

  // Resend sms code button
  function handleResendCode() {
    void (async function () {
      setShowWait(true);
      verifierState?.clear();
      setVerifierState(undefined);
      setShowCodeInput(false);
      try {
        await signOut(auth);
      } catch (e) {
        console.log("Error while signing out: ", e);
      }
      handleFormSubmit();
    })();
  }

  // Show code resent in sms input
  useEffect(() => {
    if (showWait) setShowCodeResent(true);
  }, [showWait]);

  return (
    <>
      {!showCodeInput && (
        <>
          <MediumHeader fontWeight={700} style={{ marginBottom: "40px" }}>
            Se connecter
          </MediumHeader>
          <StyledTabRoot
            defaultValue="email"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "email" | "phone")}
          >
            <StyledTabList>
              <StyledTabTrigger value="email">Email</StyledTabTrigger>
              <StyledTabTrigger value="phone">Tel</StyledTabTrigger>
            </StyledTabList>
            <StyledTabContent value="phone">
              <PhoneLoginForm
                phone={phone}
                setPhone={setPhone}
                showPhoneInvalid={showPhoneInvalid}
                showPhoneExists={showPhoneExists}
                showInexistingAccount={showInexistingAccount}
                handleFormSubmit={handleFormSubmit}
                showTooManyRequests={showTooManyRequests}
              />
            </StyledTabContent>
            <StyledTabContent value="email">
              <EmailLoginForm
                email={email}
                setEmail={setEmail}
                setPassword={setPassword}
                handleFormSubmit={handleFormSubmit}
                showEmailPasswordInvalid={showEmailPasswordInvalid}
              />
            </StyledTabContent>
          </StyledTabRoot>
          <SmallSubHeader style={{ marginTop: "20px" }} color="textSecondary">
            Pas encore de compte ?{" "}
            <Link to="/auth/signup" style={{ color: theme.textSecondary }}>
              S'inscrire
            </Link>
          </SmallSubHeader>
        </>
      )}
      {showCodeInput && (
        <SmsCode
          origin="login"
          code={code}
          setCode={setCode}
          showWait={showWait}
          showCodeResent={showCodeResent}
          setShowCodeResent={setShowCodeResent}
          showCodeInput={showCodeInput}
          setShowCodeInput={setShowCodeInput}
          setShowPhoneExists={setShowPhoneExists}
          setActiveTab={setActiveTab}
          setShowInexistingAccount={setShowInexistingAccount}
          confirmationResultState={confirmationResultState}
          handleResendCode={handleResendCode}
        />
      )}
    </>
  );
}
