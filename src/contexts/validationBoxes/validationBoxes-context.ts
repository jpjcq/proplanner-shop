import { createContext } from "react";

const context = {
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowAccountAlreadyExists(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowCodeResent(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowCodeSent(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowEmailPasswordInvalid(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowEmailSent(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowInexistingAccount(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowInvalidEmail(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowModifOk(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowPhoneExists(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowPhoneInvalid(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowTooManyRequests(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowWait(_boolean: boolean) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setShowWrongCode(_boolean: boolean) {},
};

const ValidationBoxesContext = createContext(context);

export default ValidationBoxesContext;
