import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <Navbar expand="lg" className={styles["c-navbar"]}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
