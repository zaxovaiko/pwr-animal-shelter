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

export default function AnimalInfoWorker() {
  const animalPhotos = [
    "https://thumbs.dreamstime.com/b/dog-golden-retriever-jumping-autumn-leaves-autumnal-sunlight-77861618.jpg",
    "https://thumbs.dreamstime.com/b/retriever-%D1%81%D0%BE%D0%B1%D0%B0%D0%BA%D0%B8-%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%B8%D1%81%D1%82%D1%8B%D0%B9-21668976.jpg",
    "https://thumbs.dreamstime.com/b/retriever-%D1%81%D0%BE%D0%B1%D0%B0%D0%BA%D0%B8-%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%B8%D1%81%D1%82%D1%8B%D0%B9-683752.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFv4rsjjJZd23tvUTxzzBQRi-XGDf8_n1vJvP1RMN0_6Q2CgHY_UY5lQh87NwHRXp10F8&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMvZFqb35VZYb6ZyuSDs37F6L9gduGexaFEai_cbY2f7R-IiCR2dBzWmEKRIE-Yh0Olo&usqp=CAU",
  ];

  const { id } = useParams<{ id: string }>();
  const { auth } = useContext(AuthContext);
  console.log(auth);
  const animalQuery = useQuery<Animal>(["fetchAnimal", id], () =>
    fetchAnimal(id)
  );
  const locationQuery = useQuery<AnimalLocation>(["fetchLocation", id, auth.token], () =>
    fetchLocation(id, auth.token as string)
  );

  if (animalQuery.isError || locationQuery.isError) {
    return <>Error</>;
  }

  if (animalQuery.isLoading || locationQuery.isLoading) {
    return <>Loading</>;
  }

  if (!auth.token) {
    return <>Nie masz uprawnień do przeglądu</>;
  }
  console.log(animalQuery.data, locationQuery.data);

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
            {animalQuery.data?.age} lat
          </p>
          <p>
            <b>Wzrost: </b>
            {animalQuery.data?.height} cm
          </p>
          <p>
            <b>Płeć: </b>
            {animalQuery.data?.animal_gender.value}
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
            <b>Lokalizacja: </b>, p. {locationQuery.data?.room.number}
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

        <p className={styles_main["text-header"]}>Zdjęcia</p>

        <Container className={styles_photo["photo-container"]}>
          {animalPhotos.map((photo) => (
            <Image
              className={styles_photo["photo"]}
              src={photo}
              alt="animal photo"
              onClick={() => window.open(photo)}
            />
          ))}
        </Container>
      </Container>

      <Container className={styles_main["nav-area"]}>
        <Button className={styles_button["button-green"]}>Modyfikuj</Button>
      </Container>
    </>
  );
}
