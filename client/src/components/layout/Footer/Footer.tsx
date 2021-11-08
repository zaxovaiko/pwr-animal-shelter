import styles from "./Footer.module.css";
import {ReactComponent as BubbleLeft} from "../../../assets/footer/svg/bubble-left.svg";
import {ReactComponent as BubbleRight} from "../../../assets/footer/svg/bubble-right.svg";
import {Container, Image, Row} from "react-bootstrap";

export default function Footer() {
  return (
    <div className={styles["c-footer"]}>
      <BubbleLeft className={styles["c-footer__circle-left"]} />
      <BubbleRight className={styles["c-footer__circle-right"]} />
        <Container className={styles["main-container"]}>
            <Container className={styles["info"]}>
                <span>KONTAKT</span>
                <span>JAK POMÓC?</span>
                <span>ADOPCJA</span>
            </Container>
            <Image className={styles["image"]} src="https://www.schroniskowroclaw.pl/images/logo-footer.png" />
            <Image className={styles["image"]} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0jHL_iZit9md7y_hCNIh7DCUbFSXFH6r2a4Z2xqFsz6Va1HdqM9ZeLlbArlpArWazb_s&usqp=CAU" />
            <Row className={styles["text"]}>Schronisko dla bezdomnych zwierąt we Wrocławiu</Row>
        </Container>
    </div>
  );
}
