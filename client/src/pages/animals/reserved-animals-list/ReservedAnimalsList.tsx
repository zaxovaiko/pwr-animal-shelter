import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import ReservedAnimalCard from "../../../components/animals/reserved-animal-card/ReservedAnimalCard";
import HeaderTitle from "../../../components/header-title/HeaderTitle";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./ReservedAnimalsList.module.css";
import { fetchReservations } from "../../../api/reservations";
import ErrorPage from "../../errors/ErrorPage";
import LoadingPage from "../../errors/LoadingPage";

export default function ReservedAnimalsList() {
  const { auth } = useContext(AuthContext);
  const { isLoading, isError, data } = useQuery(
    ["getReservations", auth.token],
    () => fetchReservations(auth.token)
  );
  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <HeaderTitle text={"Moje rezerwacje"} color="#ddd" />
      <Container className={styles["animal-list"] + " gx-4"}>
        <Row className="gx-5">
          {data.length === 0 && <h3>Nie ma jeszcze żadnej rezerwacji</h3>}
          {data.length > 0 &&
            data.map((reservation: any, i: number) => (
              <Col key={i} xs={12} md={6}>
                <ReservedAnimalCard {...reservation} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}
