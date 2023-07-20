import { useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export default function AuthPage({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setIsConnected(true);
    });
  });

  return <>{isConnected ? <Navigate to="/shop/service" /> : children}</>;
}
