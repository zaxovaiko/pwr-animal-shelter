import { Card } from "react-bootstrap";
import { AnimalReservation } from "../../../types/AnimalReservation";
import styles from "./ReservedAnimalCard.module.css";
import { fetchDeleteReservation } from "../../../api/reservations";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export default function ReservedAnimalCard({
  id,
  animal,
  date,
  reservation_status,
}: AnimalReservation) {
  function addThreeDays(date: string) {
    const result = new Date(date);
    result.setDate(result.getDate() + 3);
    return result.toISOString().substring(0, 10);
  }
  const { auth } = useContext(AuthContext);

  function handleClick() {
    fetchDeleteReservation(auth.token, id);
  }

  return (
    <Card className={styles["animal-card"]} body>
      <div className={styles["animal-card__top"]}>
        <div className={styles["animal-card__top__title"]}>
          <p>Chip: {animal.chip_code}</p>
          <p>Zwierzę: {animal.name}</p>
          <p>Data od: {date.substring(0, 10)}</p>
          <p>Data do: {addThreeDays(date)}</p>
        </div>
        <div className={styles["animal-card__top__status"]}>
          {reservation_status.value}
        </div>
      </div>
      <button
        className={styles["animal-card__link"]}
        onClick={() => handleClick()}
      >
        <u>
          <strong>Anuluj</strong>
        </u>
      </button>
    </Card>
  );
}
