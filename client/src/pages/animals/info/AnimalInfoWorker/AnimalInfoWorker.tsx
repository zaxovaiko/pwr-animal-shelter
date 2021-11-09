import { Container, Row, Image, Button } from "react-bootstrap";
import styles_main from "./AnimalInfoWorker.module.css";
import styles_photo from "../AnimalPhotoContainer.module.css";
import styles_button from "../../buttons/Button.module.css";
import { Animal } from "../../../../types/Animal";
import {useParams} from "react-router";
import {useQuery} from "react-query";
import {fetchAnimal} from "../../../../api/animals";

export default function AnimalInfoWorker () {
  const animalPhotos = [
    "https://thumbs.dreamstime.com/b/dog-golden-retriever-jumping-autumn-leaves-autumnal-sunlight-77861618.jpg",
    "https://thumbs.dreamstime.com/b/retriever-%D1%81%D0%BE%D0%B1%D0%B0%D0%BA%D0%B8-%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%B8%D1%81%D1%82%D1%8B%D0%B9-21668976.jpg",
    "https://thumbs.dreamstime.com/b/retriever-%D1%81%D0%BE%D0%B1%D0%B0%D0%BA%D0%B8-%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%B8%D1%81%D1%82%D1%8B%D0%B9-683752.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFv4rsjjJZd23tvUTxzzBQRi-XGDf8_n1vJvP1RMN0_6Q2CgHY_UY5lQh87NwHRXp10F8&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMvZFqb35VZYb6ZyuSDs37F6L9gduGexaFEai_cbY2f7R-IiCR2dBzWmEKRIE-Yh0Olo&usqp=CAU",
  ];

  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data } = useQuery<Animal>("fetchAnimal", () =>
      fetchAnimal(id)
  );

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <>Error</>;
  }

  if (!data) {
    return <>Something went wrong</>;
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
            {data.chip_code}
          </p>
          <p>
            <b>Typ: </b>
            {data.animal_type.value}
          </p>
          <p>
            <b>Imię: </b>
            {data.name}
          </p>
          <p>
            <b>Wiek: </b>
            {data.age} lat
          </p>
          <p>
            <b>Wzrost: </b>
            {data.height} cm
          </p>
          <p>
            <b>Płeć: </b>
            {data.animal_gender.value}
          </p>
          <p>
            <b>Rasa: </b>
            {data.animal_breed.value}
          </p>
          <p>
            <b>Status: </b>
            {data.animal_status.value}
          </p>
          <p>
            <b>Kolor: </b>
            {data.color}
          </p>

          <hr />
        </Row>

        <p className={styles_main["text-header"]}>Charakterystyka</p>

        <Row className={styles_main["animal-description"]}>
          {data.description}
          <br />
          <hr />
        </Row>

        <p className={styles_main["text-header"]}>Dane wetyrynaryjne</p>

        <Row className={styles_main["animal-description"]}>
          {data.vaccinations}
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
