import { Container, Nav, Navbar } from "react-bootstrap";
import { MdAccountCircle, MdGTranslate, MdLiveHelp } from "react-icons/md";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <Navbar expand="sm" className={styles["c-header"]}>
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" className="me-auto" />
        <Navbar.Collapse id="navbar-nav">
          <Nav>
            <Nav.Link className={styles["c-header__menu-btn"]} href="#">
              Menu
            </Nav.Link>
          </Nav>
          <Nav className={styles["c-header__icon-links"]}>
            <Nav.Link className={styles["c-header__icon-links__link"]} href="#">
              <MdLiveHelp />
            </Nav.Link>
            <Nav.Link className={styles["c-header__icon-links__link"]} href="#">
              <MdAccountCircle />
            </Nav.Link>
            <Nav.Link className={styles["c-header__icon-links__link"]} href="#">
              <MdGTranslate />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
