import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { ShopButtonPrimary } from "../Button";
import { MediumHeader, SmallSubHeader } from "../../theme/text";
import UserContext from "../../contexts/user/user-context";
import ToastContext from "../../contexts/toast/toast-context";

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: #080b117f;
  z-index: 20;
`;

const Content = styled(motion.div)<{ isMenuOpen: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 310px;
  padding: 40px;

  top: 0;
  bottom: 0;
  background-color: white;
  z-index: 30;
`;

const ConnectButton = styled(Link)`
  all: unset;
  width: 55%;
  text-align: center;
  color: white;
  font-weight: 600;
  background-color: ${({ theme }) => theme.accent};
  padding: 15px 23px;
  border-radius: 5px;
`;

const SignUpButton = styled(Link)`
  all: unset;
  width: 55%;
  text-align: center;
  color: ${({ theme }) => theme.accent};
  background-color: transparent;
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.accent};
  padding: 15px 23px;
  margin-top: 15px;
  border-radius: 5px;
`;

const DisconnectButton = styled(ShopButtonPrimary)`
  width: fit-content;
  position: absolute;
  bottom: 10px;
  padding: 10px 15px;
  align-self: center;
  margin-bottom: 10px;
`;

const Separator = styled.div`
  height: 2px;
  width: 50%;
  border-bottom: 2px solid ${({ theme }) => theme.accent};
  margin-bottom: 40px;
`;

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
  const userCtx = useContext(UserContext);
  const toastCtx = useContext(ToastContext);

  function handleDisconnectButton() {
    void (async function () {
      await signOut(auth);
      userCtx.setUser({
        isConnected: false,
      });
      setIsMenuOpen(false);
      toastCtx.showToast({
        title: "Déconnecté",
        text: "Vous êtes déconnecté",
      });
    })();
  }
  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      <Content
        isMenuOpen={isMenuOpen}
        initial={{ x: -310 }}
        animate={{ x: isMenuOpen ? 0 : -310 }}
        transition={{ type: "tween" }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close"
          style={{
            border: "none",
            backgroundColor: "transparent",
            position: "absolute",
            top: "25px",
            right: "25px",
          }}
        >
          <Cross2Icon height={20} width={20} />
        </button>

        {!userCtx.isConnected && (
          <>
            <ConnectButton to="/auth/login">Se connecter</ConnectButton>
            <SignUpButton to="/auth/signup">S'inscrire</SignUpButton>
          </>
        )}

        {userCtx.isConnected && (
          <>
            <Link
              to="/profile?tab=rendez-vous"
              onClick={() => setIsMenuOpen(false)}
              style={{ marginBottom: "40px", textDecoration: "none" }}
            >
              <MediumHeader fontWeight={700}>Mes rendez-vous</MediumHeader>
            </Link>
            <Separator />
            <Link
              to="/profile?tab=profile"
              onClick={() => setIsMenuOpen(false)}
              style={{ textDecoration: "none" }}
            >
              <MediumHeader fontWeight={700}>Mon profile</MediumHeader>
            </Link>

            <DisconnectButton onClick={handleDisconnectButton}>
              <SmallSubHeader color={"white"}>Déconnexion</SmallSubHeader>
            </DisconnectButton>
          </>
        )}
      </Content>
    </>
  );
}
