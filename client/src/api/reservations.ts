export function fetchReservations(token: any) {
  return fetch(
    process.env.REACT_APP_SERVER_URI + "/animals-reservations/users",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  ).then((res) => res.json());
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

export function setReservationStatus(token: string, id: any, status: string) {
  const formData = new FormData();
  formData.append("reservation_status_id", status);
  return fetch(
    process.env.REACT_APP_SERVER_URI + "/animals-reservations/" + id,
    {
      headers: {
        Authorization: token,
      },
      body: formData,
      method: "PATCH",
    }
  );
}
