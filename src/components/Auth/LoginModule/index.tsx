import { FormEvent, useState, useEffect } from "react";
import { auth } from "../../../firebase";
import {
  AuthError,
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { MediumHeader, SmallSubHeader } from "../../../theme/text";
import EmailLogin from "./EmailLogin";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import PhoneLogin from "./PhoneLogin";
import {
  StyledContent,
  StyledList,
  StyledRoot,
  StyledTrigger,
} from "../../Tabs";
import SmsCode from "../SmsCode";
import SignupError from "../SignupModule/SignupError";
import { isValidPhoneNumber } from "react-phone-number-input";

export default function LoginModule() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  // Phone Verification
  const [confirmationResultState, setConfirmationResultState] =
    useState<ConfirmationResult>();
  const [codeErrorCounter, setCodeErrorCounter] = useState(0);
  const [codeErrorTrigger, setCodeErrorTrigger] = useState(false);

  // Layout
  const [showCodeInput, setShowCodeInput] = useState(false);

  // Validation boxes
  const [showPhoneInvalid, setShowPhoneInvalid] = useState(false);
  const [showCodeSent, setShowCodeSent] = useState(false);
  const [showWrongCode, setShowWrongCode] = useState(false);

  // Error page
  const [showPhoneExists, setShowPhoneExists] = useState(false);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (activeTab === "email") {
      void (async function () {
        try {
          const credentials = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log(credentials);
          navigate("/shop/service");
        } catch (error) {
          console.error(error);
        }
      })();
    }
    if (activeTab === "phone") {
      if (isValidPhoneNumber(phone)) {
        void (async function () {
          const verifier = new RecaptchaVerifier(auth, "login-button", {
            size: "invisible",
          });
          const confirmationResult = await signInWithPhoneNumber(
            auth,
            phone,
            verifier
          );
          console.log("here")
          setConfirmationResultState(confirmationResult);
          setShowCodeInput(true);
        })();
      } else {
        setShowPhoneInvalid(true);
      }
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
            if (userCredential) {
              navigate("/shop/service");
            }
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
            setShowPhoneExists(true);
            return;
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
    confirmationResultState,
    navigate,
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
      {!showCodeInput && !showPhoneExists && (
        <>
          <MediumHeader fontWeight={700} style={{ marginBottom: "40px" }}>
            Se connecter
          </MediumHeader>

          <StyledRoot
            defaultValue="email"
            onValueChange={(value) => setActiveTab(value as "email" | "phone")}
          >
            <StyledList>
              <StyledTrigger value="email">Email</StyledTrigger>
              <StyledTrigger value="phone">Tel</StyledTrigger>
            </StyledList>
            <StyledContent value="phone">
              <PhoneLogin
                setPhone={setPhone}
                showPhoneInvalid={showPhoneInvalid}
                handleFormSubmit={handleFormSubmit}
              />
            </StyledContent>
            <StyledContent value="email">
              <EmailLogin
                setEmail={setEmail}
                setPassword={setPassword}
                handleFormSubmit={handleFormSubmit}
              />
            </StyledContent>
          </StyledRoot>
          <SmallSubHeader style={{ marginTop: "20px" }} color="textSecondary">
            Pas encore de compte ?{" "}
            <Link to="/auth/signup" style={{ color: theme.textSecondary }}>
              S'inscrire
            </Link>
          </SmallSubHeader>
        </>
      )}

      {showCodeInput && !showPhoneExists && (
        <SmsCode
          setCode={setCode}
          showCodeSent={showCodeSent}
          showWrongCode={showWrongCode}
        />
      )}

      {!showCodeInput && showPhoneExists && (
        <SignupError phoneExists setShowPhoneExists={setShowPhoneExists} />
      )}
    </>
  );
}
