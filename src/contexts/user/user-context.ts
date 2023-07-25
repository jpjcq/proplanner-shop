import { createContext } from "react";
import { UserStateType } from "./UserProvider";

interface UserContextType {
  isConnected: boolean;
  displayName?: string;
  setUser: (user: UserStateType) => void;
}

const context: UserContextType = {
  isConnected: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser() {},
};

const UserContext = createContext(context);

export default UserContext;
