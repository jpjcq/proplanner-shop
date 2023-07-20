import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { ShopButtonPrimary } from "../Button";
import { SmallSubHeader } from "../../theme/text";
import { Link } from "react-router-dom";

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
  background-color: ${({ theme }) => theme.olive.olive3};
  padding: 15px 23px;
  border-radius: 5px;
`;

const SignUpButton = styled(Link)`
  all: unset;
  width: 55%;
  text-align: center;
  color: ${({ theme }) => theme.olive.olive3};
  background-color: transparent;
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.olive.olive3};
  padding: 15px 23px;
  margin-top: 15px;
  border-radius: 5px;
`;

const DisconnectButton = styled(ShopButtonPrimary)`
  position: absolute;
  bottom: 10px;
  padding: 10px 15px;
  align-self: center;
  margin-bottom: 20px;
`;

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
  const [user, setUser] = useState<null | User>(null);
  console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

  function handleDisconnectButton() {
    void (async function () {
      await signOut(auth);
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

        {!user && (
          <>
            <ConnectButton to="/auth/login">Se connecter</ConnectButton>
            <SignUpButton to="/auth/signup">S'inscrire</SignUpButton>
          </>
        )}

        {user && (
          <DisconnectButton onClick={handleDisconnectButton}>
            <SmallSubHeader color={"white"}>Déconnexion</SmallSubHeader>
          </DisconnectButton>
        )}
      </Content>
    </>
  );
}
