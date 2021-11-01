import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./HeaderTitle.module.css";

export default function Title({
  text,
  color,
  image,
}: {
  text: string;
  image?: string;
  color?: string;
}) {
  return (
    <>
      <Container
        fluid
        className={styles["header__image"]}
        style={color ? { backgroundColor: color } : { backgroundImage: `url(${image})` }}
      />
      <Container fluid>
        <Row>
          <Col xs={{ offset: 1, span: 10 }}>
            <Card className={styles["header__title"]} body>
              {text}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
