import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderTitle from "../../../components/header-title/HeaderTitle";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Animal } from "../../../types/Animal";
import { fetchAnimal } from "../../../api/animals";
import { AuthContext } from "../../../contexts/AuthContext";
import { fetchProfileData } from "../../../api/profile";
import styles from "./ReservationClient.module.css";
import styles_button from "../../../components/shared/Button.module.css";
import { User } from "../../../types/User";
import { useContext } from "react";

export default function Reservation() {
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const animalQuery = useQuery<Animal>(["fetchAnimal", id], () =>
    fetchAnimal(id)
  );
  const profileQuery = useQuery<User>(["getProfileData", auth.user.id], () =>
    fetchProfileData(auth.user.id)
  );

  if (animalQuery.isLoading || profileQuery.isLoading) {
    return <>Loading</>;
  }

  if (
    animalQuery.isError ||
    profileQuery.isError ||
    !animalQuery.data ||
    !profileQuery.data
  ) {
    return <>Error with loading data</>;
  }

  function handleReservation() {
    fetch(process.env.REACT_APP_SERVER_URI + "/animals-reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token as string,
      },
      body: JSON.stringify({
        user_id: profileQuery.data?.id,
        animal_id: id,
        reservation_status_id: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          history.push("/animals/" + id);
        }
      });
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
          <p>
            <span className={styles["bolder"]}>Typ:</span>{" "}
            {animalQuery.data.animal_type.value}
          </p>
          <p>
            <span className={styles["bolder"]}>Identyfikator:</span>{" "}
            {animalQuery.data.chip_code}
          </p>
          <p>
            <span className={styles["bolder"]}>Imię:</span>{" "}
            {animalQuery.data.name}
          </p>
          <p>
            <span className={styles["bolder"]}>Wiek:</span>{" "}
            {animalQuery.data.age} lat
          </p>
          <p>
            <span className={styles["bolder"]}>Płeć:</span>{" "}
            {animalQuery.data.animal_gender.value}
          </p>
          <p>
            <span className={styles["bolder"]}>Rasa:</span>{" "}
            {animalQuery.data.animal_breed.value}
          </p>
          <p>
            <span className={styles["bolder"]}>Wzrost:</span>{" "}
            {animalQuery.data.height} cm
          </p>
          <p>
            <span className={styles["bolder"]}>Masa:</span>{" "}
            {animalQuery.data.weight} kg
          </p>
        </Container>

        <Container className={styles["info-reservation-container"]}>
          <p className={styles["text-sub-header"]}>Dane rezerwacji</p>
          <p id="date_current">
            <span className={styles["bolder"]}>Data od:</span>{" "}
            {new Date().toISOString().split("T")[0]}
          </p>
          <p id="date_end">
            <span className={styles["bolder"]}>Data do:</span>{" "}
            {
              new Date(Date.now() + 1000 * 3 * 24 * 3600)
                .toISOString()
                .split("T")[0]
            }
          </p>
          <p>
            <span className={styles["bolder"]}>Osoba rezerwująca: </span>
            {profileQuery.data.first_name} {profileQuery.data.last_name}
          </p>
        </Container>
      </Container>

      <Container className={styles["nav-area"]}>
        <Button
          className={styles_button["button-green"]}
          onClick={handleReservation}
        >
          Zarezerwuj
        </Button>
        <p className={styles["p"]}>lub</p>
        <Link to={"/animals/" + id} className={styles["link"]}>
          <Button className={styles_button["button-blue"]}>Anuluj</Button>
        </Link>
      </Container>
    </>
  );
}
