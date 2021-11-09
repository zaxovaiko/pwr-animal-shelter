import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ReservedAnimalCard from "../../../components/animals/ReservedAnimalCard/ReservedAnimalCard";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./ReservedAnimalsList.module.css";
import { fetchReservations } from "../../../api/reservations";

export default function ReservedAnimalsList() {
  const { auth } = useContext(AuthContext);
  const { isLoading, isError, data } = useQuery(
    ["getReservations", auth.token],
    () => fetchReservations(auth.token)
  );
  if (isError) {
    return <>Error</>;
  }

  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <>
      <HeaderTitle text={"Moje rezerwacje"} color="#ddd" />
      <Container className={styles["animal-list"] + " gx-4"}>
        <Row className="gx-5">
          {data.length === 0 && <h3>There is no any reservation yet</h3>}
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
