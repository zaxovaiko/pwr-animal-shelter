export function fetchReservations(token: any) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/animals-reservations", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then((res) => res.json());
}

export function fetchDeleteReservation(token: any, id: any) {
  return fetch(
    process.env.REACT_APP_SERVER_URI + "/animals-reservations/" + id,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "DELETE",
    }
  );
}
