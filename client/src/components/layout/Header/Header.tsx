import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { MdAccountCircle, MdGTranslate, MdLiveHelp } from "react-icons/md";
import Menu from "../Menu/Menu";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <Navbar expand="sm" className={styles["c-header"]}>
      <Container fluid>
        <Navbar.Toggle aria-controls="navbar-nav" className="me-auto" />
        <Navbar.Collapse id="navbar-nav">
          <Nav>
            <Nav.Link
              className={styles["c-header__menu-btn"]}
              href="#"
              onClick={() => setIsOpened((p) => !p)}
            >
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

      <Menu isOpened={isOpened} />
    </Navbar>
  );
}
