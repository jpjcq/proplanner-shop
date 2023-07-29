import { ReactNode, useState } from "react";
import ValidationBoxesContext from "./validationBoxes-context";

export default function ValidationBoxesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [validationBoxesState, setValidationBoxesState] = useState({
    showAccountAlreadyExists: false,
    showCodeResent: false,
    showCodeSent: false,
    showEmailPasswordInvalid: false,
    showEmailSent: false,
    showInexistingAccount: false,
    showInvalidEmail: false,
    showModifOk: false,
    showPhoneExists: false,
    showPhoneInvalid: false,
    showTooManyRequests: false,
    showWait: false,
    showWrongCode: false,
  });

  const validationBoxesContext = {
    showAccountAlreadyExists: validationBoxesState.showAccountAlreadyExists,
    showCodeResent: validationBoxesState.showCodeResent,
    showCodeSent: validationBoxesState.showCodeSent,
    showEmailPasswordInvalid: validationBoxesState.showEmailPasswordInvalid,
    showEmailSent: validationBoxesState.showEmailSent,
    showInexistingAccount: validationBoxesState.showInexistingAccount,
    showInvalidEmail: validationBoxesState.showInvalidEmail,
    showModifOk: validationBoxesState.showModifOk,
    showPhoneExists: validationBoxesState.showPhoneExists,
    showPhoneInvalid: validationBoxesState.showPhoneInvalid,
    showTooManyRequests: validationBoxesState.showTooManyRequests,
    showWait: validationBoxesState.showWait,
    showWrongCode: validationBoxesState.showWrongCode,

    setShowAccountAlreadyExists(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showAccountAlreadyExists: boolean,
      }));
    },
    setShowCodeResent(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showCodeResent: boolean,
      }));
    },
    setShowCodeSent(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showCodeSent: boolean,
      }));
    },
    setShowEmailPasswordInvalid(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showEmailPasswordInvalid: boolean,
      }));
    },
    setShowEmailSent(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showEmailSent: boolean,
      }));
    },
    setShowInexistingAccount(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showInexistingAccount: boolean,
      }));
    },
    setShowInvalidEmail(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showInvalidEmail: boolean,
      }));
    },
    setShowModifOk(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showModifOk: boolean,
      }));
    },
    setShowPhoneExists(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showPhoneExists: boolean,
      }));
    },
    setShowPhoneInvalid(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showPhoneInvalid: boolean,
      }));
    },
    setShowTooManyRequests(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showTooManyRequests: boolean,
      }));
    },
    setShowWait(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showWait: boolean,
      }));
    },
    setShowWrongCode(boolean: boolean) {
      setValidationBoxesState((prevState) => ({
        ...prevState,
        showWrongCode: boolean,
      }));
    },
  };

  return (
    <ValidationBoxesContext.Provider value={validationBoxesContext}>
      {children}
    </ValidationBoxesContext.Provider>
  );
}
