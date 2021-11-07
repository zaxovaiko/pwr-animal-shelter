import {Container, Row, Image, Button} from "react-bootstrap";
import React from 'react';
import styles_main from "./AnimalInfoClient.module.css";
import styles_button from "../../buttons/Button.module.css";

class AnimalInfoClient extends React.Component {

    // TODO: add interface

    render() {

        const animalPhotos = ["https://thumbs.dreamstime.com/b/dog-golden-retriever-jumping-autumn-leaves-autumnal-sunlight-77861618.jpg",
            "https://thumbs.dreamstime.com/b/retriever-%D1%81%D0%BE%D0%B1%D0%B0%D0%BA%D0%B8-%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%B8%D1%81%D1%82%D1%8B%D0%B9-21668976.jpg",
            "https://thumbs.dreamstime.com/b/retriever-%D1%81%D0%BE%D0%B1%D0%B0%D0%BA%D0%B8-%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%B8%D1%81%D1%82%D1%8B%D0%B9-683752.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFv4rsjjJZd23tvUTxzzBQRi-XGDf8_n1vJvP1RMN0_6Q2CgHY_UY5lQh87NwHRXp10F8&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMvZFqb35VZYb6ZyuSDs37F6L9gduGexaFEai_cbY2f7R-IiCR2dBzWmEKRIE-Yh0Olo&usqp=CAU"]

        return (
            <>
                <Container fluid className={styles_main["top-header"]}/>
                <Container fluid className={styles_main["header-animal-info"]}>
                    <Image
                        src="https://ieltsninja.com/content/wp-content/uploads/2021/01/Describe-an-Interesting-Animal-Dog.jpg"
                        className={styles_main["animal-photo"]} alt={"animal photo"} />
                    <p className={styles_main["text-header"]}>
                        <p><b>Karuś</b></p>
                        <hr/>
                        <p>5 lat</p>
                    </p>

                </Container>

                <Container className={styles_main["main-container"]}>

                    <Row className={styles_main["animal-description"]}>
                        Karuś to duży psiak. Do schroniska trafił jako znaleziony.
                        Jest bardzo energiczny- uwielbia długie przechadzki, podczas którzych grzecznie chodzi na
                        smyczy.
                        Jest przyjazny do ludzi, a do psów bywa konfliktowy. Karuś zaprasza na zapoznawczy spacer!
                    </Row>

                    <Container className={styles_main["main-info-container"]}>
                        <Container className={styles_main["info-decoration-container"]}>
                            <span/>
                            <hr/>
                        </Container>

                        <Container className={styles_main["info"]}>
                            <p><b>W schronisku od: </b>10-10-2021</p>
                            <p><b>Status: </b>Kwarantanna</p>
                            <p><b>Rasa: </b>Mieszaniec</p>
                            <p><b>Płeć: </b>M</p>
                            <p><b>Wzrost: </b>40 cm</p>
                        </Container>
                    </Container>

                    <Container className={styles_main["photo-container"]}>
                        {animalPhotos.map((photo) =>
                            <Image className={styles_main["photo"]} src={photo} alt="animal photo" onClick={() => window.open(photo)}/>
                        )}
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