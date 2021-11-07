export function fetchProfileData(id: string) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/users/" + id, {}).then(
    (res) => res.json()
  );
}
