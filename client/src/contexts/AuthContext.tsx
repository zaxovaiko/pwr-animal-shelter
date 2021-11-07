import { createContext, FC, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import { AuthContextValue, AuthContext as AuthContextType } from "../types/AuthContext";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenAndParseUser(token);
    }
  }, []);

  function setTokenAndParseUser(token: string | null) {
    if (token) {
      setAuth({
        token: "Bearer " + token,
        user: decode(token),
      });
      localStorage.setItem("token", "Bearer " + token);
    } else {
      setAuth(initialAuthContextValue);
      localStorage.removeItem("token");
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth: setTokenAndParseUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
