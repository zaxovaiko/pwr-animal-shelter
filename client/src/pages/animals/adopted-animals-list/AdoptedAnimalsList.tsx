import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { fetchAdoptedAnimals } from "../../../api/animals";
import AdoptedAnimalCard from "../../../components/animals/adopted-animal-card/AdoptedAnimalCard";
import HeaderTitle from "../../../components/header-title/HeaderTitle";
import { AuthContext } from "../../../contexts/AuthContext";
import ErrorPage from "../../errors/ErrorPage";
import LoadingPage from "../../errors/LoadingPage";

export default function AdoptedAnimalsList() {
  const { auth } = useContext(AuthContext);
  const { isLoading, isError, data } = useQuery(
    ["getAdoptedByMe", auth.token],
    () => fetchAdoptedAnimals(auth.token as string)
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <>
      <HeaderTitle text="Moje zwierzęta" color="#ddd" />

      <Container className="mt-5">
        <Row>
          {data.map((elem: any, i: number) => (
            <Col xs={12} sm={{ offset: 2, span: 8 }} key={i} className="mt-5">
              <AdoptedAnimalCard {...elem.animal} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
