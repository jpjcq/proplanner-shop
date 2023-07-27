import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * - Hook defining isConnected in user context.
 * - Depends on onAuthStateChanged AND presence of user's doc in firestore.
 * @returns {boolean} isConnected.
 */
export default function useSetIsConnected(): boolean {
  let isConnected = false;
  if (sessionStorage.getItem("isConnected") === "true") {
    isConnected = true;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !isConnected) {
        void (async function () {
          try {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
              sessionStorage.setItem("isConnected", "true");
            }
          } catch (e) {
            console.log(e);
          }
        })();
      }
      if (!user && isConnected) {
        sessionStorage.setItem("isConnected", "false");
      }
    });
    return () => unsubscribe();
  }, [isConnected]);

  return isConnected;
}
