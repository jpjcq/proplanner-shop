import { useContext, useEffect } from "react";
import UserContext from "../contexts/user/user-context";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * - Hook defining isConnected in user context.
 * - Depends on onAuthStateChanged AND presence of user's doc in firestore.
 * @returns {boolean} isConnected.
 */
export default function useSetIsConnected(): boolean {
  const { isConnected, setUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if ((user && isConnected) || (!user && !isConnected)) return;
      if (user && !isConnected) {
        void (async function () {
          try {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
              setUser({ isConnected: true });
            }
          } catch (e) {
            console.log(e);
          }
        })();
      }
      if (!user && isConnected) {
        setUser({ isConnected: false });
      }
    });
    return () => unsubscribe();
  }, [setUser, isConnected]);

  return isConnected;
}
