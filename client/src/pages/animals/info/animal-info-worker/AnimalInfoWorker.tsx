import { useContext } from "react";
import { Container, Row, Image, Button } from "react-bootstrap";
import styles_main from "./AnimalInfoWorker.module.css";
import styles_photo from "../../AnimalPhotoContainer.module.css";
import styles_button from "../../../../components/shared/Button.module.css";
import { Animal } from "../../../../types/Animal";
import { AnimalLocation } from "../../../../types/Location";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchAnimal } from "../../../../api/animals";
import { fetchLocation } from "../../../../api/location";
import { AuthContext } from "../../../../contexts/AuthContext";
import ErrorPage from "../../../errors/ErrorPage";
import { Link } from "react-router-dom";

export default function AnimalInfoWorker() {
  const { id } = useParams<{ id: string }>();
  const infoToEdit: string = "/animal/edit/" + id;
  const { auth } = useContext(AuthContext);

  const animalQuery = useQuery<Animal>(["fetchAnimal", id], () =>
    fetchAnimal(id)
  );
  const locationQuery = useQuery<AnimalLocation>(
    ["fetchLocation", id, auth.token],
    () => fetchLocation(id, auth.token as string)
  );

  if (animalQuery.isError || locationQuery.isError) {
    return <ErrorPage />;
  }

  if (animalQuery.isLoading || locationQuery.isLoading || !animalQuery.data) {
    return <>Loading</>;
  }

  if (!auth.token) {
    return <>Nie masz uprawnień do przeglądu</>;
  }

  return (
    <>
      <Container fluid className={styles_main["top-header"]} />
      <Container fluid className={styles_main["header-animal-info"]}>
        <Image
          src="https://image.flaticon.com/icons/png/512/64/64431.png"
          className={styles_main["animal-photo"]}
          alt={"animal paw"}
        />
      </Container>

      <Container className={styles_main["main-container"]}>
        <p className={styles_main["text-header"]}>Informacje ogólne</p>

        <Row>
          <p>
            <b>Identyfikator: </b>
            {animalQuery.data?.chip_code}
          </p>
          <p>
            <b>Typ: </b>
            {animalQuery.data?.animal_type.value}
          </p>
          <p>
            <b>Imię: </b>
            {animalQuery.data?.name}
          </p>
          <p>
            <b>Wiek: </b>
            {animalQuery.data?.age
              ? animalQuery.data?.age + " lat"
              : "Brak danych"}
          </p>
          <p>
            <b>Wzrost: </b>
            {animalQuery.data?.height
              ? animalQuery.data?.height + " cm"
              : "Brak danych"}
          </p>
          <p>
            <b>Waga: </b>
            {animalQuery.data?.weight
              ? animalQuery.data?.weight + " kg"
              : "Brak danych"}
          </p>
          <p>
            <b>Płeć: </b>
            {animalQuery.data?.animal_gender.value || "Brak danych"}
          </p>
          <p>
            <b>Rasa: </b>
            {animalQuery.data?.animal_breed.value}
          </p>
          <p>
            <b>Status: </b>
            {animalQuery.data?.animal_status.value}
          </p>
          <p>
            <b>Kolor: </b>
            {animalQuery.data?.color}
          </p>

          <hr />
        </Row>

        <p className={styles_main["text-header"]}>Charakterystyka</p>

        <Row className={styles_main["animal-description"]}>
          {animalQuery.data?.description}
          <br />
          <hr />
        </Row>

        <p className={styles_main["text-header"]}>Lokalizacja</p>

        <Row className={styles_main["animal-description"]}>
          <span>
            {" "}
            <b> Data od: </b>
            {locationQuery.data?.date_from?.split("T")[0]}{" "}
          </span>
          <span>
            {" "}
            <b>Lokalizacja: </b>ul. {locationQuery.data?.building.street}, p.{" "}
            {locationQuery.data?.room.number}
          </span>
          <br />
          <hr />
        </Row>

        <p className={styles_main["text-header"]}>Dane wetyrynaryjne</p>

        <Row className={styles_main["animal-description"]}>
          {animalQuery.data?.vaccinations}
          <br />
          <hr />
        </Row>

        {animalQuery.data.images.length > 0 && (
          <>
            <p className={styles_main["text-header"]}>Zdjęcia</p>
            <Container className={styles_photo["photo-container"]}>
              {animalQuery.data?.images.map((photo, i) => (
                <Image
                  key={i}
                  className={styles_photo["photo"]}
                  src={photo.image}
                  alt="animal photo"
                  onClick={() => window.open(photo.image)}
                />
              ))}
            </Container>
          </>
        )}
      </Container>

      <Container className={styles_main["nav-area"]}>
        <Link to={infoToEdit} className="text-decoration-none">
          <Button className={styles_button["button-green"]}>Modyfikuj</Button>
        </Link>
      </Container>
    </>
  );
}
