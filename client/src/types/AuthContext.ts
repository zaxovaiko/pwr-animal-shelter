export type AuthContextValue = {
  user: any | undefined;
  token: string | undefined;
};

export type AuthContext = {
  auth: AuthContextValue;
  setAuth(token: string): void;
};
