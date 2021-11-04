import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./FormList.module.css";

export default function FormList() {
  return (
    <>
      <Container fluid className={styles["top-header"]} />
      <Container fluid className={styles["header-container"]}>
        <Row>
          <Col xs={{ offset: 1, span: 10 }}>
            <Card className="h-title" body>
              Formularzy
            </Card>
          </Col>
        </Row>
      </Container>

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
