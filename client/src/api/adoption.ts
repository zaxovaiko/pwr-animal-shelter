export function fetchAdoption(token: any, animal_id: string) {
    return fetch(process.env.REACT_APP_SERVER_URI + "/animals-adoptions?animal=" + animal_id, {
        headers: {
            Authorization: token,
        },
    }).then(
        (res) => res.json());
}