export function fetchLocation(animal_id: string, token: string) {
    return fetch(process.env.REACT_APP_SERVER_URI + "/animals-locations/" + animal_id, {
        headers: {
            Authorization: token,
        },
    }).then(
        (res) => res.json()
    );
}