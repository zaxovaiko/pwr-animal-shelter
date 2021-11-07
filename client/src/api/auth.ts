export function fetchRegisterData(body: any) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/register", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body,
  }).then((res) => res.json());
}
