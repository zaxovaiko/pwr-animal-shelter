const options = {
  headers: { "Content-Type": "application/json" },
  method: "POST",
};

export function fetchRegisterData(body: any) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/register", {
    ...options,
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function fetchLoginData(body: { email: string; password: string }) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/login", {
    ...options,
    body: JSON.stringify(body),
  }).then((res) => res.json());
}
