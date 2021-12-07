import { Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderTitle from "../../components/header-title/HeaderTitle";
import styles_main from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <>
      <HeaderTitle
        text="O nas"
        image="https://www.purina.kz/sites/purina.ru/files/2017-12/Cat-To-Other-Pets_034dd014-2587-48af-ba78-72735facf4fe_2.jpg"
      />
      <Container className={styles_main["main-container"]}>
        <Row className={styles_main["text-header"]}>Czym się zajmujemy?</Row>

        <Row className={styles_main["activity-row"]}>
          <span className={styles_main["activity-element"]}>
            <Image
              src="https://image.flaticon.com/icons/png/512/64/64431.png"
              alt={"animal paw"}
              className={styles_main["activity-img"]}
            />
            wspieramy działalność schroniska
          </span>
          <span className={styles_main["activity-element"]}>
            <Image
              src="https://image.flaticon.com/icons/png/512/64/64431.png"
              alt={"animal paw"}
              className={styles_main["activity-img"]}
            />
            pomagamy zwierzętom bezdomnym i zagrożonym bezdomnością
          </span>
          <span className={styles_main["activity-element"]}>
            <Image
              src="https://image.flaticon.com/icons/png/512/64/64431.png"
              alt={"animal paw"}
              className={styles_main["activity-img"]}
            />
            działamy na rzecz ochrony zwierząt i przestrzegania ich praw
          </span>
        </Row>

        <Row className={styles_main["text-header"]}>Kim jesteśmy?</Row>

        <Row className={styles_main["text"]}>
          Pomagamy ciężko chorym podopiecznym schroniska: umieszcza je w domach
          tymczasowych, przeprowadza diagnostykę, leczenie i znajduje domy.
        </Row>

        <Image
          src="http://www.petcarriers.com.au/images/site-images/pets-variety.jpg"
          alt={"animals photo"}
          className={styles_main["style-img"]}
        />

        <Row className={styles_main["text-header"]}>Pomagaj z nami</Row>
        <Row className={styles_main["text"]}>
          Chcesz wspierać schronisko?{" "}
          <Link to="/charity" className={styles_main["link"]}>
            Sprawdź czym możesz pomóc
          </Link>
          . Każda pomóc jest dla nas ważna!
        </Row>
      </Container>
    </>
  );
}
