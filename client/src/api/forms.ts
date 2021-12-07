export function fetchRegistrationForm(body: any, token: any) {
  return fetch(
    process.env.REACT_APP_SERVER_URI +
      "/animals-reservations/generate_document",
    {
      headers: {
        Authorization: token,
      },
      body: body,
      method: "POST",
    }
  )
    .then((res) => res.blob())
    .then((blob) => {
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    });
}
