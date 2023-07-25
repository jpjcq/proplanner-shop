import { ReactNode, useState } from "react";
import UserContext from "./user-context";

export interface UserStateType {
  isConnected: boolean;
  displayName?: string;
}

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserStateType>({
    isConnected: false,
  });

  const context = {
    isConnected: user.isConnected,
    displayName: user.displayName,
    setUser(newState: UserStateType) {
      setUser((prevState) => ({ ...prevState, ...newState }));
    },
  };
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
