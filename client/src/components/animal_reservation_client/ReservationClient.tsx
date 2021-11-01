import {Container, Row, Image, Button} from "react-bootstrap";
import React from 'react';
import styles_main from "./ReservationClient.module.css";


//add interface

class Reservation extends React.Component {

    render() {

        function addDays(date: Date, days: number) {
            const copy = new Date(Number(date))
            copy.setDate(date.getDate() + days)
            return copy
        }

        const today = new Date(),
            date_current = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const next_day = addDays(today, 3);
        const date_end = next_day.getFullYear() + '-' + (next_day.getMonth() + 1) + '-' + next_day.getDate();

        return (
            <>
                <Container fluid className={styles_main["top-header"]}/>
                <Container fluid className={styles_main["header-reservation"]}>
                    <Image
                        src="https://ieltsninja.com/content/wp-content/uploads/2021/01/Describe-an-Interesting-Animal-Dog.jpg"
                        className={styles_main["animal-photo"]} alt={"animal photo"}/>
                    <Row className={styles_main["text-header"]}>Szczeguły rezerwacji</Row>
                </Container>

                <Container className={styles_main["main-container"]}>
                    <Container className={styles_main["info-animal-container"]}>
                        <p className={styles_main["text-sub-header"]}>Dane zwierzęcia</p>

                        <p>Typ: Pies</p>
                        <p>Identyfikator: 3426194369</p>
                        <p>Imię: Karuś</p>
                        <p>Wiek: 5 lat</p>
                        <p>Płeć: M</p>
                        <p>Rasa: Mieszaniec</p>
                        <p>Wzrost: 40 cm</p>
                    </Container>

                    <Container className={styles_main["info-reservation-container"]}>
                        <p className={styles_main["text-sub-header"]}>Dane rezerwacji</p>

                        <p id="date_current">Data od: {date_current}</p>
                        <p id="date_end">Data do: {date_end}</p>
                        <p>Osoba rezerwująca: Kamil Doruś</p>
                    </Container>

                </Container>

                <Container className={styles_main["nav-area"]}>
                    <Button className={styles_main["button-green"]}>Zarezerwuj</Button>
                    <p className={styles_main["p"]}>lub</p>
                    <Button className={styles_main["button-blue"]}>Anuluj</Button>
                </Container>

            </>
        )
    }
}
export default Reservation;
