import { useContext, useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Profile.module.css";

const fakeUser = {
  first_name: "Mirina",
  last_name: "Kowal",
  pesel: 11111111111,
  address: "Wrocław, ul. Wiśniowa 14/1",
  phone: "234-123-123",
  email: "marina@gmail.com",
};

export default function Profile() {
  // Need to load a user by id
  const { id } = useParams<{ id: string }>();
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Example api fetch
    Promise.resolve(fakeUser).then((u) => {
      setUser(u);
    });
  }, []);

  // TODO: Replace with preloader
  if (!user) {
    return <>Loading</>;
  }

  return (
    <>
      <Container fluid className={styles["top-page"]} />
      <div className="mx-auto text-center">
        <Image
          roundedCircle
          className={styles["top-page__header__user-img"]}
          src="https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg"
          alt="User's image"
        />
        <h1 className={styles["top-page__header__title"]}>Moje dane</h1>
      </div>
      <Container className={styles["user-info"]}>
        <p>
          Imię: <span>{user.first_name}</span>
        </p>
        <p>
          Nazwisko: <span>{user.last_name}</span>
        </p>
        <p>
          PESEL: <span>{user.pesel}</span>
        </p>
        <p>
          Adres: <span>{user.address}</span>
        </p>
        <p>
          Tel.: <span>{user.phone}</span>
        </p>
        <p>
          Email: <span>{user.email}</span>
        </p>
      </Container>
      {auth.user && (
        <Link to="/profile/2" className="text-decoration-none">
          <Button className={styles["btn-modify"]}>Modyfikuj</Button>
        </Link>
      )}
    </>
  );
}
