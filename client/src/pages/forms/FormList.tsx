import { Container } from "react-bootstrap";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import styles from "./FormList.module.css";

export default function FormList() {
  return (
    <>
      <HeaderTitle text="Formularze" color="#ddd" />

      <Container className={styles["form-list-row"]}>
        <ul>
          <li className={styles["form-list-item"]}>
            <a href="/linkAdopt" className={styles["link"]}>
              Formularz adoptacyjny
            </a>
          </li>
          <li className={styles["form-list-item"]}>
            <a href="/linkAdopt" className={styles["link"]}>
              Formularz rejestracyjny
            </a>
          </li>
        </ul>
      </Container>
    </>
  );
}
