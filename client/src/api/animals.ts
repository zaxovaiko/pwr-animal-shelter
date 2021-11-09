export function fetchAnimalTypes() {
  return fetch(process.env.REACT_APP_SERVER_URI + "/animal-types?page=1").then(
    (res) => res.json()
  );
}

export function fetchAnimals(type: number) {
  return fetch(
    process.env.REACT_APP_SERVER_URI +
      "/animals?page=1&animal_type=" +
      type +
      "&animal_status=3"
  ).then((res) => res.json());
}

export function fetchAnimal(id: string) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/animals/" + id).then(
    (res) => res.json()
  );
}

export function fetchAdoptedAnimals(token: string) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/adopted", {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());
}

export function fetchAnimalType(id: number) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/animal-types/" + id).then(
    (res) => res.json()
  );
}
