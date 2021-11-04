import {Container, Row, Image, Button} from "react-bootstrap";
import React from 'react';
import styles_main from "./AnimalInfoClient.module.css";
import styles_button from "../../buttons/Button.module.css";

class AnimalInfoClient extends React.Component {

    // TODO: add interface

    render() {

        return (
            <>
                <Container fluid className={styles_main["top-header"]}/>
                <Container fluid className={styles_main["header-animal-info"]}>
                    <Image
                        src="https://ieltsninja.com/content/wp-content/uploads/2021/01/Describe-an-Interesting-Animal-Dog.jpg"
                        className={styles_main["animal-photo"]} alt={"animal photo"}/>
                    <p className={styles_main["text-header"]}>
                        <p><b>Karuś</b></p>
                        <hr />
                        <p>5 lat</p>
                    </p>

                </Container>

                <Container className={styles_main["main-container"]}>

                    <Row className={styles_main["animal-description"]}>
                        Karuś to duży psiak. Do schroniska trafił jako znaleziony.
                        Jest bardzo energiczny- uwielbia długie przechadzki, podczas którzych grzecznie chodzi na smyczy.
                        Jest przyjazny do ludzi, a do psów bywa konfliktowy.  Karuś zaprasza na zapoznawczy spacer!
                    </Row>

                    <Container className={styles_main["main-info-container"]}>
                        <Container className={styles_main["info-decoration-container"]}>
                            <span />
                            <hr />
                        </Container>

                        <Container className={styles_main["info"]} >
                            <p><b>W schronisku od: </b>10-10-2021</p>
                            <p><b>Status: </b>Kwarantanna</p>
                            <p><b>Rasa: </b>Mieszaniec</p>
                            <p><b>Płeć: </b>M</p>
                            <p><b>Wzrost: </b>40 cm</p>
                        </Container>
                    </Container>

                    <Container className={styles_main["photo-container"]}>
                        {/*TODO: add photos*/}
                    </Container>

                </Container>

                <Container className={styles_main["nav-area"]}>
                    <Button className={styles_button["button-green"]}>Zarezerwuj</Button>
                </Container>

            </>
        )
    }
}
export default AnimalInfoClient;