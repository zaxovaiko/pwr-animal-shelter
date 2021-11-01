import { Container, Image, NavLink, Nav } from "react-bootstrap";
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
    <>
      <Container className={styles["main-container"]}>
        <Container className={styles["info-container"]}>
          <p className={styles["animal-name"]}>{name}</p>
          <hr className={styles["line"]} />
          <p className={styles["animal-age"]}>{age} lat</p>
          <p className={styles["animal-description"]}>{description}</p>
          <p className={styles["nav-area"]}>
            <Nav.Link as={NavLink} to={"/link/"} className={styles["nav-link"]}>
              <u>Więcej</u>
            </Nav.Link>
          </p>
        </Container>
        <Image
          src="https://ieltsninja.com/content/wp-content/uploads/2021/01/Describe-an-Interesting-Animal-Dog.jpg"
          className={styles["animal-photo"]}
          alt={"animal photo"}
        />
      </Container>
    </>
  );
}
