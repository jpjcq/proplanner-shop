import { FormEvent, useState, useEffect, useContext } from "react";
import { auth, db } from "../../../firebase";
import {
  AuthError,
  ConfirmationResult,
  RecaptchaVerifier,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { MediumHeader, SmallSubHeader } from "../../../theme/text";
import EmailLogin from "./EmailLogin";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import PhoneLogin from "./PhoneLogin";
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
import UserContext from "../../../contexts/user/user-context";

export default function LoginModule() {
  const theme = useTheme();
  const navigate = useNavigate();
  const toastCtx = useContext(ToastContext);
  const userCtx = useContext(UserContext);

  // User creds
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
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Validation boxes
  const [showEmailPasswordInvalid, setShowEmailPasswordInvalid] =
    useState(false);
  const [showPhoneInvalid, setShowPhoneInvalid] = useState(false);
  const [showCodeSent, setShowCodeSent] = useState(false);
  const [showWrongCode, setShowWrongCode] = useState(false);
  const [showInexistingAccount, setShowInexistingAccount] = useState(false);
  const [showPhoneConnecting, setShowPhoneConnecting] = useState(false);
  const [showPhoneExists, setShowPhoneExists] = useState(false);

  // Automatic tab
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tab")) {
      setActiveTab(params.get("tab") as "email" | "phone");
    }
    if (params.get("email")) {
      setEmail(params.get("email") as string);
    }
  }, [setActiveTab, location.search]);

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
          const userDocRef = doc(db, "users", credentials.user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            userCtx.setUser({
              isConnected: true,
              displayName: credentials.user.displayName
                ? credentials.user.displayName
                : undefined,
            });
          }
          navigate("/shop/service");
          if (docSnap.exists()) {
            toastCtx.showConnectedToast(docSnap.data().first as string);
          }
        } catch (error) {
          console.error(error);
          setShowEmailPasswordInvalid(true);
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
              const userDocRef = doc(db, "users", userCredential.user.uid);
              const docSnap = await getDoc(userDocRef);
              if (docSnap.exists()) {
                if (docSnap.data().last && docSnap.data().first) {
                  setShowInexistingAccount(false);
                  setShowPhoneConnecting(true);
                  userCtx.setUser({
                    isConnected: true,
                    displayName: userCredential.user.displayName
                      ? userCredential.user.displayName
                      : undefined,
                  });
                  navigate("/shop/service");
                  toastCtx.showConnectedToast(docSnap.data().first as string);
                } else {
                  setShowInexistingAccount(true);
                  await signOut(auth);
                  setShowCodeInput(false);
                  setActiveTab("phone");
                }
              } else {
                setShowInexistingAccount(true);
                setShowCodeInput(false);
                setActiveTab("phone");
                await signOut(auth);
              }
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
    toastCtx,
    userCtx,
  ]);

  // Reset code error trigger
  useEffect(() => {
    if (code.length < 6 && codeErrorTrigger) {
      setCodeErrorTrigger(false);
      setShowWrongCode(false);
    }
  }, [code, codeErrorTrigger]);

  // Check if already logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        void (async function () {
          try {
            const userDocRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
              setIsConnected(true);
            }
          } catch (e) {
            console.log(e);
          }
        })();
      }
    });
  }, []);

  return (
    <>
      {
        isConnected && !showInexistingAccount && (
          <Navigate to="/profile" />
        ) /* /!\ MODIFIER ET REDIRIGER VERS USER ACCOUNT PAGE /!\ */
      }

      {/* DEFAULT SCREEN */}
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
              <PhoneLogin
                phone={phone}
                setPhone={setPhone}
                showPhoneInvalid={showPhoneInvalid}
                showPhoneExists={showPhoneExists}
                showInexistingAccount={showInexistingAccount}
                showPhoneConnecting={showPhoneConnecting}
                handleFormSubmit={handleFormSubmit}
              />
            </StyledTabContent>
            <StyledTabContent value="email">
              <EmailLogin
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

      {/* SMS CODE INPUT SCREEN */}
      {showCodeInput && (
        <SmsCode
          setCode={setCode}
          showCodeSent={showCodeSent}
          showWrongCode={showWrongCode}
        />
      )}
    </>
  );
}
