import { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { MdAccountCircle, MdLiveHelp, MdLogin, MdLogout } from "react-icons/md";
import { useHistory } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import Menu from "../Menu/Menu";
import styles from "./Header.module.css";

export default function Header() {
  const history = useHistory();
  const [isOpened, setIsOpened] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  function logout() {
    setAuth(null);
    history.push("/login");
  }

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
            <Nav.Link
              className={styles["c-header__icon-links__link"]}
              href="/contact"
            >
              <MdLiveHelp />
            </Nav.Link>
            {auth.user && (
              <>
                <Nav.Link
                  className={styles["c-header__icon-links__link"]}
                  href={"/profile/" + auth.user.id}
                >
                  <MdAccountCircle />
                </Nav.Link>
                <Nav.Link
                  className={styles["c-header__icon-links__link"]}
                  href="#"
                  onClick={() => logout()}
                >
                  <MdLogout />
                </Nav.Link>
              </>
            )}
            {!auth.user && (
              <Nav.Link
                className={styles["c-header__icon-links__link"]}
                href="/login"
              >
                <MdLogin />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Menu isOpened={isOpened} />
    </Navbar>
  );
}
