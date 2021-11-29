import { Image, Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AnimalMainCard.module.css";
import { Animal } from "../../../types/Animal";
import {useContext} from "react";
import {AuthContext} from "../../../contexts/AuthContext";

export default function MainAnimalCard({
  id,
  name,
  age,
  description,
  image,
}: Animal) {
    const { auth } = useContext(AuthContext);

    function permissionCheck(id: string) {
        if (auth.user) {
            if (auth.user.is_staff) {
                return "/animal/" + id
            }else {
                return "/animals/" + id
            }
        } else {
            return "/login"
        }
    }


  return (
    <Card className={styles["animal-card"]} body>
      <div className={styles["animal-card__top"]}>
        <div className={styles["animal-card__top__title"]}>
          <p className={styles["animal-card__top__title__name"]}>{name}</p>
          <hr className={styles["line"]} />
          <p className={styles["animal-card__top__title__age"]}>{age} lat</p>
        </div>
        <Image
          src={image}
          className={styles["animal-card__top__image"]}
          alt="Animal photo"
        />
      </div>
      <p className={styles["animal-card__desc"]}>{description}</p>
      <Nav.Link
        as={Link}
        to={permissionCheck(id)}
        className={styles["animal-card__link"]}
      >
        <u>Więcej</u>
      </Nav.Link>
    </Card>
  );
}
