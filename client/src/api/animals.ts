export function fetchAnimalTypes() {
  return fetch(process.env.REACT_APP_SERVER_URI + "/animal-types").then((res) =>
    res.json()
  );
}

export function fetchAnimals() {
  return fetch(process.env.REACT_APP_SERVER_URI + "/animals").then((res) =>
    res.json()
  );
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