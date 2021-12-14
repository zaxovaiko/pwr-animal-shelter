import { Card, Image } from "react-bootstrap";
import { AnimalReservation } from "../../../types/AnimalReservation";
import styles from "./ReservedAnimalCard.module.css";
import { fetchDeleteReservation } from "../../../api/reservations";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  const alert = useAlert();
  const history = useHistory();
  const contentStyle = {
    maxWidth: "600px",
    width: "90%",
    borderRadius: "25px",
  };

  function handleClick() {
    fetchDeleteReservation(auth.token, id).then((res) => {
      if (res) {
        alert.success("Rezerwacja została anulowana.");
        history.go(0);
      }
    });
  }

  return (
    <Card className={styles["animal-card"]} body>
      <div className={styles["animal-card__top"]}>
        <div className={styles["animal-card__top__title"]}>
          <p>Chip: {animal.chip_code}</p>
          <p>Zwierzę: {animal.name}</p>
          <p>Data od: {date.substring(0, 10)}</p>
          <p>Data do: {addThreeDays(date)}</p>
          <br />
          <p className={styles["bold"]}>
            Status rezerwacji: {reservation_status.value}
          </p>
        </div>
        <Image
          src={animal.image}
          className={styles["animal-card__top__image"]}
          alt="Animal photo"
        />
      </div>
      <Popup
        trigger={
          <button className={styles["animal-card__link"]}>
            <u>
              <strong>Anuluj</strong>
            </u>
          </button>
        }
        modal
        contentStyle={contentStyle}
      >
        <div>
          <h5
            style={{
              textAlign: "center",
              marginTop: "6vh",
              marginBottom: "6vh",
            }}
          >
            <strong style={{ marginBottom: "14vh" }}>
              Czy napewno chcesz anulować rezerwację?
            </strong>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: "50px",
              }}
            >
              <button
                className={styles["mod-animal-profile__form-submit-button"]}
                onClick={() => handleClick()}
              >
                Tak
              </button>
              <button
                className={styles["mod-animal-profile__form-cancel-button"]}
                onClick={() => {
                  history.go(0);
                }}
              >
                Nie
              </button>
            </div>
          </h5>
        </div>
      </Popup>
    </Card>
  );
}
