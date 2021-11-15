export function fetchProfileData(id: string) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/users/" + id, {}).then(
    (res) => res.json()
  );
}

export function fetchUpdateProfileData(body: any, id: string, token: any) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/users/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
    method: "PUT",
  }).then((res) => res.json());
}