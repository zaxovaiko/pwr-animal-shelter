import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchAnimals } from "../../../api/animals";
import MainAnimalCard from "../../../components/animals/AnimalMainCard/AnimalMainCard";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import { Animal } from "../../../types/Animal";
import styles from "./AnimalsList.module.css";

export default function AnimalList() {
  const { type } = useParams<{ type: string }>();
  const { isLoading, isError, data } = useQuery("getAnimals", () =>
    fetchAnimals()
  );

  if (isError) {
    return <>Error</>;
  }

  if (isLoading) {
    return <>Loading</>;
  }

  const filteredData = data.filter(
    (animal: Animal) =>
      animal.animal_status.value === "Do adopcji" &&
      animal.animal_type.value.toLowerCase() === type.toLowerCase()
  );

  return (
    <>
      <HeaderTitle
        text={"Adoptuj teraz: " + type}
        image="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1200-80.jpg"
      />
      <Container className={styles["animal-list"] + " gx-4"}>
        <Row className="gx-5">
          {filteredData.length === 0 && <h3>There is no any animal yet</h3>}
          {filteredData.length > 0 &&
            filteredData.map((animal: any, i: number) => (
              <Col key={i} xs={12} md={6}>
                <MainAnimalCard {...animal} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}
