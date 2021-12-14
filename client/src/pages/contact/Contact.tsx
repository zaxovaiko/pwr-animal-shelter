import { Container, Image, Row } from "react-bootstrap";
import HeaderTitle from "../../components/header-title/HeaderTitle";
import styles_main from "./Contact.module.css";

export default function Contact() {
  return (
    <>
      <HeaderTitle
        text="Kontakt"
        image="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1200-80.jpg"
      />
      <Container fluid className={styles_main["main-container"]}>
        <Row className={styles_main["info-row"]}>
          <Image
            className={styles_main["image-icon"]}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQlUG1X2bLCPy0-gDqKkDg50nEFQzeY3svO5Kw3zomcXyVEVwbKr7cVucv0Mt_y7TjvDU&usqp=CAU"
            alt="Working time"
          />
          Godziny pracy biura:
          <br />
          <br />
          pn-pt: 9:00 - 17:00
          <br />
          sob-niedz: 9:00 - 15:00
          <br />
        </Row>

        <Row className={styles_main["info-row"]}>
          <Image
            className={styles_main["image-icon"]}
            src="https://lnp-lnr.ru/uploads/adres.png"
            alt="Adress"
          />
          Polska, Wrocław
          <br />
          ul. Slazowa 2<br />
          51-007
        </Row>

        <Row className={styles_main["info-row"]}>
          <Image
            className={styles_main["image-icon"]}
            src="https://b.kisscc0.com/20180813/ujw/kisscc0-st-peter-all-hallows-church-download-email-comp-contact-5b714ca614eb14.9243318615341518460857.png"
            alt="Telefon oraz email"
          />
          +48 71 362-56-74 - Biuro adopcji
          <br />
          +48 71 501-334-268 - Kierowca pogotowia
          <br />
          <br />
          schronisko.ola@gmail.com
        </Row>
      </Container>
    </>
  );
}
