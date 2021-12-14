import { Col, Container, Image, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { fetchNewAnimals } from "../../api/animals";
import HeaderTitle from "../../components/header-title/HeaderTitle";
import { Animal } from "../../types/Animal";
import styles from "./Home.module.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

export default function Home() {
  const { isLoading, isError, data } = useQuery("getNewAnimals", () =>
    fetchNewAnimals()
  );

  return (
    <>
      <HeaderTitle
        text="Witamy!"
        image="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1200-80.jpg"
      />
      <Container fluid>
        <Row className={styles["c-navbar__c-animals-slider"] + " mb-5"}>
          <Col className="px-5">
            <p className={styles["c-navbar__c-animals-slider__title"]}>
              Nowi w schronisku
            </p>
            <Slider {...settings}>
              {!isLoading &&
                !isError &&
                data?.results
                  .slice(0, 7)
                  .filter(({ animal }: { animal: Animal }) => animal.image)
                  .map(({ animal }: { animal: Animal }, i: number) => (
                    <div
                      key={i}
                      className={styles["c-navbar__c-animals-slider__item"]}
                    >
                      <Image
                        rounded
                        className={
                          styles["c-navbar__c-animals-slider__item__img"]
                        }
                        src={animal.image}
                        alt=""
                      ></Image>
                    </div>
                  ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </>
  );
}
