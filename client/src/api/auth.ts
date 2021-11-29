import { User } from "../types/User";

const options = {
  headers: { "Content-Type": "application/json", mode: "no-cors" },
  method: "POST",
};

export function fetchRegisterData(body: Partial<User>) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/register", {
    ...options,
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function fetchLoginData(body: Pick<User, "email" & "password">) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/login", {
    ...options,
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function fetchPasswordResetToken(email: Pick<User, "email">) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/password_reset", {
    ...options,
    body: JSON.stringify({ email }),
  }).then((res) => res.json());
}

export function fetchPasswordResetConfirmation({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/password_resetconfirm/", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: new URLSearchParams({
      token: token,
      password: password,
    }),
  }).then((res) => res.json());
}
