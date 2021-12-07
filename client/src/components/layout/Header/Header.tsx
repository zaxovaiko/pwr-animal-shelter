import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { Container, Nav, Navbar } from "react-bootstrap";
import {
  MdAccountCircle,
  MdApps,
  MdClear,
  MdLiveHelp,
  MdLogin,
  MdLogout,
} from "react-icons/md";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Menu from "../Menu/Menu";
import styles from "./Header.module.css";

export default function Header() {
  const alert = useAlert();
  const history = useHistory();
  const [isOpened, setIsOpened] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  function logout() {
    setAuth(null);
    history.push("/login");
    alert.success("Zostałeś wylogowany ze swojego konta.");
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
              {!isOpened ? <MdApps /> : <MdClear />}
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="text-white fs-5">
              Główna strona
            </Nav.Link>
          </Nav>
          <Nav className={styles["c-header__icon-links"]}>
            <Nav.Link
              as={Link}
              className={styles["c-header__icon-links__link"]}
              to="/contact"
            >
              <MdLiveHelp />
            </Nav.Link>
            {auth.user && (
              <>
                <Nav.Link
                  as={Link}
                  className={styles["c-header__icon-links__link"]}
                  to={"/profile/" + auth.user.id}
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
                as={Link}
                className={styles["c-header__icon-links__link"]}
                to="/login"
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
