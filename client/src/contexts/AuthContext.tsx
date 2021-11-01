import { createContext, FC, useState } from "react";
import { decode } from "jsonwebtoken";
import {
  AuthContextValue,
  AuthContext as AuthContextType,
} from "../types/AuthContext";

export const initialAuthContextValue: AuthContextValue = {
  user: undefined,
  token: undefined,
};

export const AuthContext = createContext<AuthContextType>({
  auth: initialAuthContextValue,
  setAuth: (token: string) => {},
});

const AuthProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthContextValue>(initialAuthContextValue);

  function setTokenAndParseUser(token: string) {
    setAuth({
      token,
      user: decode(token),
    });
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth: setTokenAndParseUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;