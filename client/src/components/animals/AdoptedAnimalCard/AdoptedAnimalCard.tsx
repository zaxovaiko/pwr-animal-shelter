import { Card, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Animal } from "../../../types/Animal";
import styles from "./AdoptedAnimalCard.module.css";

export default function AdoptedAnimalCard({ name }: Animal) {
  const history = useHistory();
  return (
    <Card className={styles["adopted-animal-card"]}>
      <Image
        className={styles["adopted-animal-card__img"]}
        alt="Animal image"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
      />
      <p className={styles["adopted-animal-card__name"]}>{name}</p>
      <button
        onClick={() => history.push("/animal-issues")}
        className={styles["adopted-animal-card__btn"] + " c-btn"}
      >
        Zgłoś problem
      </button>
    </Card>
  );
}
