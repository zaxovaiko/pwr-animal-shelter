import { Container, Button } from "react-bootstrap";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./ReservationClient.module.css";

export default function Reservation() {
  return (
    <>
      <HeaderTitle text="Szczeguły rezerwacji" />

      <Container className={styles["main-container"]}>
        <Container className={styles["info-animal-container"]}>
          <p className={styles["text-sub-header"]}>Dane zwierzęcia</p>
          <p>Typ: Pies</p>
          <p>Identyfikator: 3426194369</p>
          <p>Imię: Karuś</p>
          <p>Wiek: 5 lat</p>
          <p>Płeć: M</p>
          <p>Rasa: Mieszaniec</p>
          <p>Wzrost: 40 cm</p>
        </Container>

        <Container className={styles["info-reservation-container"]}>
          <p className={styles["text-sub-header"]}>Dane rezerwacji</p>
          <p id="date_current">Data od: {new Date().toISOString().split('T')[0]}</p>
          <p id="date_end">Data do: {new Date(Date.now() * 1000 * 3 * 24 * 3600).toISOString().split('T')[0]}</p>
          <p>Osoba rezerwująca: Kamil Doruś</p>
        </Container>
      </Container>

      <Container className={styles["nav-area"]}>
        <Button className={styles["button-green"]}>Zarezerwuj</Button>
        <p className={styles["p"]}>lub</p>
        <Button className={styles["button-blue"]}>Anuluj</Button>
      </Container>
    </>
  );
}
