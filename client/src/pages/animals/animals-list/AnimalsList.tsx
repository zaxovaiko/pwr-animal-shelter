import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchAnimals, fetchAnimalType } from "../../../api/animals";
import MainAnimalCard from "../../../components/animals/animal-main-card/AnimalMainCard";
import HeaderTitle from "../../../components/header-title/HeaderTitle";
import styles from "./AnimalsList.module.css";
import ErrorPage from "../../errors/ErrorPage";
import LoadingPage from "../../errors/LoadingPage";
import SortButton, { SortOrder } from "../../../components/shared/SortButton";
import { useState } from "react";

export type SortBy = {
  field: "age" | "height" | "";
  order: SortOrder;
};

export default function AnimalList() {
  const { type } = useParams<{ type: string }>();
  const [sortBy, setSortBy] = useState<SortBy>({
    field: "",
    order: "asc",
  });
  const { isLoading, isError, data, refetch } = useQuery(
    ["getAnimals", type],
    () => fetchAnimals(+type, sortBy.field, sortBy.order)
  );
  const animalTypeQuery = useQuery(["getAnimalType", type], () =>
    fetchAnimalType(+type)
  );

  if (isError || animalTypeQuery.isError) {
    return <ErrorPage />;
  }

  if (isLoading || animalTypeQuery.isLoading) {
    return <LoadingPage />;
  }

  function refetchData(field: "age" | "height") {
    return function (order: SortOrder) {
      setSortBy(() => {
        refetch();
        return {
          field,
          order,
        };
      });
    };
  }

  return (
    <>
      <HeaderTitle
        text={"Adoptuj teraz: " + animalTypeQuery.data.value}
        image="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1200-80.jpg"
      />

      <Container className={styles["sort-area"]}>
        <p>Sortuj:</p>
        <SortButton
          refetchData={refetchData("age")}
          labels={{ asc: "Wiek rosnąco", desc: "Wiek malejąco" }}
        />
        <SortButton
          refetchData={refetchData("height")}
          labels={{ asc: "Wzrost rosnąco", desc: "Wzrost malejąco" }}
        />
      </Container>

      <Container className={styles["animal-list"] + " gx-4"}>
        <Row className="gx-5">
          {data.results.length === 0 && (
            <h3>Nie ma żadnych zwierząt do wyświetlenia</h3>
          )}
          {data.results.length > 0 &&
            data.results.map((animal: any, i: number) => (
              <Col key={i} xs={12} md={6}>
                <MainAnimalCard {...animal} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}
