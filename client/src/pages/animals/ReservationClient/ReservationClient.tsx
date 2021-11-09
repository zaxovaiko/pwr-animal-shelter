import {Container, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./ReservationClient.module.css";
import {useParams} from "react-router";
import {useQuery} from "react-query";
import {Animal} from "../../../types/Animal";
import {fetchAnimal} from "../../../api/animals";
import {useContext} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import {fetchProfileData} from "../../../api/profile";
import styles_button from "../../../components/shared/Button.module.css"

export default function Reservation() {

    const {id} = useParams<{ id: string }>();
    const {isLoading: isLoading, isError: isError, data: dataAnimal} = useQuery<Animal>("fetchAnimal", () =>
        fetchAnimal(id)
    );
    const {auth} = useContext(AuthContext);
    const {isLoading: isLoading2, isError: isError2, data: dataPerson} = useQuery(
        "getProfileData",
        () => fetchProfileData(auth.user.id),
        {retry: false}
    );

    if (isLoading) {
        return <>Loading</>;
    }

    if (isError) {
        return <>Error with loading animal data</>;
    }

    if (!dataAnimal) {
        return <>Something went wrong</>;
    }

    if (isLoading2) {
        return <>Loading</>;
    }

    if (isError2) {
        return <>Error with loading person data</>;
    }

    if (!dataPerson) {
        return <>Something went wrong</>;
    }

    function handleReservation() {
        const t = auth.user.id;
        fetch(process.env.REACT_APP_SERVER_URI + "/animals-reservations", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + t,
            },
            body: JSON.stringify({
                user_id: dataPerson.id,
                animal_id: id,
                reservation_status_id: '1',
            })
        }).then(res => res.json()).then(response => {
            if (response.redirected) {
                window.location.href = "/animals/" + id;
            }
        })
    }

    return (
        <>
            <HeaderTitle
                text="Szczeguły rezerwacji"
                image="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1200-80.jpg"
            />

            <Container className={styles["main-container"]}>
                <Container className={styles["info-animal-container"]}>
                    <p className={styles["text-sub-header"]}>Dane zwierzęcia</p>
                    <p><span className={styles["bolder"]}>Typ:</span> {dataAnimal.animal_type.value}</p>
                    <p><span className={styles["bolder"]}>Identyfikator:</span> {dataAnimal.chip_code}</p>
                    <p><span className={styles["bolder"]}>Imię:</span> {dataAnimal.name}</p>
                    <p><span className={styles["bolder"]}>Wiek:</span> {dataAnimal.age} lat</p>
                    <p><span className={styles["bolder"]}>Płeć:</span> {dataAnimal.animal_gender.value}</p>
                    <p><span className={styles["bolder"]}>Rasa:</span> {dataAnimal.animal_breed.value}</p>
                    <p><span className={styles["bolder"]}>Wzrost:</span> {dataAnimal.height} cm</p>
                </Container>

                <Container className={styles["info-reservation-container"]}>
                    <p className={styles["text-sub-header"]}>Dane rezerwacji</p>
                    <p id="date_current"><span
                        className={styles["bolder"]}>Data od:</span> {new Date().toISOString().split('T')[0]}</p>
                    <p id="date_end"><span
                        className={styles["bolder"]}>Data do:</span> {new Date(Date.now() + 1000 * 3 * 24 * 3600).toISOString().split('T')[0]}
                    </p>
                    <p><span
                        className={styles["bolder"]}>Osoba rezerwująca: </span>{dataPerson.name} {dataPerson.last_name}
                    </p>
                </Container>
            </Container>

            <Container className={styles["nav-area"]}>
                <Button className={styles_button["button-green"]} onClick={handleReservation}>Zarezerwuj</Button>
                <p className={styles["p"]}>lub</p>
                <Link to={"/animals/" + id} className={styles["link"]}>
                    <Button className={styles_button["button-blue"]}>Anuluj</Button>
                </Link>

            </Container>
        </>
    );
}
