import { Container, Image } from "react-bootstrap";
import styles_main from "./ErrorPage.module.css";

export default function LoadingPage() {
  return (
    <>
      <Container className={styles_main["main-container"]}>
        <Image
          className={styles_main["image"]}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YwEAcjd968f-pEwkML01xG7cIDdtqnpmfg&usqp=CAU"
          alt="sad dog photo"
        />
        <span className={styles_main["text"]}>
          Ładowanie...
          <br />
          Proszę czekać
        </span>
      </Container>
    </>
  );
}
