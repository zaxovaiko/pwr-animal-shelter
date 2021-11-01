import { Image, Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AnimalMainCard.module.css";

interface AnimalProps {
  //TODO: add all object data to interface and verify types
  chip_code: string;
  name: string;
  age: number;
  animal_type: string;
  animal_gender: string;
  animal_breed: string;
  color: string;
  height: number;
  description: string;
  vaccinations: string;
  animal_status: string;
}

//TODO: add info about link and id
//TODO: change static photo link to animal custom one
export default function AnimalMainCard({
  chip_code,
  name,
  age,
  description,
}: AnimalProps) {
  return (
    <Card className={styles["animal-card"]} body>
      <div className={styles["animal-card__top"]}>
        <div className={styles["animal-card__top__title"]}>
          <p className={styles["animal-card__top__title__name"]}>{name}</p>
          <hr className={styles["line"]} />
          <p className={styles["animal-card__top__title__age"]}>{age} lat</p>
        </div>
        <Image
          src="https://static8.depositphotos.com/1377527/943/i/600/depositphotos_9431737-stock-photo-portrait-of-gray-striped-cat.jpg"
          className={styles["animal-card__top__image"]}
          alt="Animal photo"
        />
      </div>
      <p className={styles["animal-card__desc"]}>{description}</p>
      <Nav.Link as={Link} to="/link" className={styles["animal-card__link"]}>
        <u>Więcej</u>
      </Nav.Link>
    </Card>
  );
}
