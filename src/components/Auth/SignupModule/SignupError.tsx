import styled from "styled-components";
import { LargeHeader, BodySmall } from "../../../theme/text";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  padding: 10px 18px;
  background-color: ${({ theme }) => theme.olive.olive7};
  color: white;
  font-weight: 600;
`;

interface PhoneAlreadyExistsProps {
  phoneExists?: boolean;
  showTooManyRequests?: boolean;
  showAccountAlreadyExists?: boolean;
  showFatalError?: boolean;
  setShowCodeInput?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPhoneExists?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTooManyRequests?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAccountAlreadyExists?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFatalError?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignupError({
  phoneExists,
  showTooManyRequests,
  showAccountAlreadyExists,
  showFatalError,
  setShowCodeInput,
  setShowPhoneExists,
  setShowTooManyRequests,
  setShowAccountAlreadyExists,
  setShowFatalError,
}: PhoneAlreadyExistsProps) {
  function handleReturnButton() {
    setShowCodeInput?.(false);
    setShowPhoneExists?.(false);
    setShowTooManyRequests?.(false);
    setShowAccountAlreadyExists?.(false);
    void (async function () {
      if (showFatalError) {
        try {
          await signOut(auth);
          setShowFatalError?.(false);
        } catch (e) {
          console.log(e);
          setShowFatalError?.(false);
        }
      }
    })();
  }

  return (
    <>
      {phoneExists && (
        <WelcomeWrapper>
          <LargeHeader fontWeight={700} style={{ marginBottom: "15px" }}>
            Création impossible
          </LargeHeader>
          <BodySmall style={{ textAlign: "center", marginBottom: "20px" }}>
            Le numéro que vous nous avez renseigné est déjà utilisé, veuillez
            recommencer.
          </BodySmall>
          <StyledButton onClick={handleReturnButton}>Retour</StyledButton>
        </WelcomeWrapper>
      )}
      {showTooManyRequests && (
        <WelcomeWrapper>
          <LargeHeader fontWeight={700} style={{ marginBottom: "15px" }}>
            Trop de requêtes
          </LargeHeader>
          <BodySmall style={{ textAlign: "center", marginBottom: "20px" }}>
            Vous avez atteint le nombre maximum de requêtes. Merci de réessayer
            ultérieurement.
          </BodySmall>
          <StyledButton onClick={handleReturnButton}>Retour</StyledButton>
        </WelcomeWrapper>
      )}
      {showAccountAlreadyExists && (
        <WelcomeWrapper>
          <LargeHeader fontWeight={700} style={{ marginBottom: "15px" }}>
            Le compte existe déjà
          </LargeHeader>
          <BodySmall style={{ textAlign: "center", marginBottom: "20px" }}>
            Un compte associé au numéro de téléphone que vous avez entré existe
            déjà. Nous vous y avons connecté.
          </BodySmall>
          <StyledButton onClick={handleReturnButton}>Retour</StyledButton>
        </WelcomeWrapper>
      )}
      {showFatalError && (
        <WelcomeWrapper>
          <LargeHeader fontWeight={700} style={{ marginBottom: "15px" }}>
            Erreur fatale
          </LargeHeader>
          <BodySmall style={{ textAlign: "center", marginBottom: "20px" }}>
            Une erreur s'est produite lors du processus d'inscription. Veuillez
            recommencer.
          </BodySmall>
          <StyledButton onClick={handleReturnButton}>Retour</StyledButton>
        </WelcomeWrapper>
      )}
    </>
  );
}
