export function fetchLocation(animal_id: string) {
    return fetch(process.env.REACT_APP_SERVER_URI + "/animals-locations/" + animal_id).then(
        (res) => res.json()
    );
}