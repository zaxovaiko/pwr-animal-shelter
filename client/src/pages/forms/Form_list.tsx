import { Card, Col, Container, Row } from "react-bootstrap";
import styles_main from "./Form_list.module.css";

export default function Form_list() {
    return (
        <>
            <Container fluid className={styles_main["top-header"]} />
            <Container fluid className={styles_main["header-container"]}>
                <Row>
                    <Col xs={{ offset: 1, span: 10 }}>
                        <Card className="h-title" body>
                            Formulary
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className={styles_main["form-list-row"]}>
                <ul>
                    <li className={styles_main["form-list-item"]}><a href="/linkAdopt" className={styles_main["link"]}>Formularz adoptacyjny</a></li>
                    <li className={styles_main["form-list-item"]}><a href="/linkAdopt" className={styles_main["link"]}>Formularz rejestracyjny</a></li>
                </ul>
            </Container>

        </>
    )
}