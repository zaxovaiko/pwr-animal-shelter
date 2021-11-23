import { Container, Row, Image, Button } from "react-bootstrap";
import styles_main from "./AnimalInfoClient.module.css";
import styles_button from "../../../../components/shared/Button.module.css";
import { Animal } from "../../../../types/Animal";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchAnimal } from "../../../../api/animals";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

export default function AnimalInfoClient() {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const alert = useAlert();
  const redirect = () => {
    if (auth.user) {
      history.push("/animal-reservation/" + id);
    } else {
      alert.error("Musisz być zalogowany!");
    }
  };

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
          src={data.image}
          className={styles_main["animal-photo"]}
          alt=""
        />
        <p className={styles_main["text-header"]}>
          <p>
            <b>{data.name}</b>
          </p>
          <hr />
          <p>{data.age} lat</p>
        </p>
      </Container>

      <Container className={styles_main["main-container"]}>
        <Row className={styles_main["animal-description"]}>
          {data.description}
        </Row>

        <Container className={styles_main["main-info-container"]}>
          <Container className={styles_main["info-decoration-container"]}>
            <span />
            <hr />
          </Container>

          <Container className={styles_main["info"]}>
            <p>
              <b>Status: </b>
              {data.animal_status.value}
            </p>
            <p>
              <b>Rasa: </b>
              {data.animal_breed.value}
            </p>
            <p>
              <b>Płeć: </b>
              {data.animal_gender.value}
            </p>
            <p>
              <b>Wzrost: </b>
              {data.height ? data.height + "cm" : "Brak"}
            </p>
            <p>
              <b>Waga: </b>
              {data.weight ? data.weight + "kg" : "Brak"}
            </p>
          </Container>
        </Container>

        <Container
          className={" d-flex flex-row flex-wrap justify-content-center"}
        >
          {data.images.map((photo, i) => (
            <div
              key={i}
              className="mx-4 rounded mt-5"
              style={{
                backgroundImage: `url(${photo.image})`,
                height: "150px",
                width: "200px",
                backgroundSize: "cover",
              }}
            />
          ))}
        </Container>
      </Container>

      <Container className={styles_main["nav-area"]}>
        <Button className={styles_button["button-green"]} onClick={redirect}>
          Zarezerwuj
        </Button>
      </Container>
    </>
  );
}
