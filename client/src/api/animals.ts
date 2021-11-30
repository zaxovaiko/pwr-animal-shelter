export function fetchAnimalTypes() {
  return fetch(process.env.REACT_APP_SERVER_URI + "/animal-types?page=1").then(
    (res) => res.json()
  );
}

export function fetchAnimalBreeds() {
  return fetch(process.env.REACT_APP_SERVER_URI + "/animal-breeds?page=1").then(
    (res) => res.json()
  );
}

export function fetchAnimalStatuses() {
  return fetch(
    process.env.REACT_APP_SERVER_URI + "/animal-statuses?page=1"
  ).then((res) => res.json());
}

export function fetchAnimalGenders() {
  return fetch(
    process.env.REACT_APP_SERVER_URI + "/animal-genders?page=1"
  ).then((res) => res.json());
}

export function fetchAnimals(type: number) {
  return fetch(
    process.env.REACT_APP_SERVER_URI +
      "/animals?page=1&animal_type=" +
      type +
      "&animal_status=1"
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

export function fetchNewAnimals() {
  return fetch(
    process.env.REACT_APP_SERVER_URI + "/animals-arrivals?ordering=-date"
  ).then((res) => res.json());
}

export function fetchReservedAnimals(token: string) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/animals-reservations", {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());
}

export function fetchUpdateAnimaleData(body: any, id: string, token: any) {
  return fetch(process.env.REACT_APP_SERVER_URI + "/animals/" + id, {
    headers: {
      Authorization: token,
    },
    body: body,
    method: "PATCH",
  }).then((res) => res.json());
}
