import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MainAnimalCard from "../../../components/animals/MainAnimalCard/AnimalMainCard";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./AnimalsList.module.css";

const exampleData = Array.from(Array(6)).map(() => ({
  chip_code: "x",
  name: "Karus",
  age: 10,
  animal_type: "dog",
  animal_gender: "male",
  animal_breed: "english",
  color: "black",
  height: 120,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem iure maiores praesentium aliquid cumque enim voluptatum fuga dolor ipsam aut! Et sapiente autem enim saepe corporis officia, inventore molestiae tempore?",
  vaccinations: "no",
  animal_status: "drunk",
}));

export default function AnimalList() {
  const { type } = useParams<{ type: string }>();
  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    Promise.resolve(exampleData).then((animals) => setAnimals(animals));
  }, []);

  if (animals.length === 0) {
    return <>"Loading"</>;
  }

  return (
    <>
      <HeaderTitle
        text={"Adoptuj teraz: " + type}
        image="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1200-80.jpg"
      />
      <Container className={styles["animal-list"] + " gx-4"}>
        <Row className="gx-5">
          {animals.map((data, i) => (
            <Col key={i} xs={12} md={6}>
              <MainAnimalCard {...data} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
