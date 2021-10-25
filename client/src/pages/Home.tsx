import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Slider from "react-slick";
import styles from "./Home.module.css";

export default function Home() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const animalSlider = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Calico_tabby_cat_-_Savannah.jpg/1200px-Calico_tabby_cat_-_Savannah.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Calico_tabby_cat_-_Savannah.jpg/1200px-Calico_tabby_cat_-_Savannah.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Calico_tabby_cat_-_Savannah.jpg/1200px-Calico_tabby_cat_-_Savannah.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Calico_tabby_cat_-_Savannah.jpg/1200px-Calico_tabby_cat_-_Savannah.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Calico_tabby_cat_-_Savannah.jpg/1200px-Calico_tabby_cat_-_Savannah.jpg",
  ];

  return (
    <>
      <Container fluid className={styles["p-home__top-img"]} />
      <Container fluid>
        <Row>
          <Col xs={{ offset: 1, span: 10 }}>
            <Card className={styles["c-navbar__title"]} body>
              Witamy!
            </Card>
          </Col>
        </Row>
        <Row className={styles["c-navbar__c-animals-slider"]}>
          <Col className="px-5">
            <p className={styles["c-navbar__c-animals-slider__title"]}>
              Nowi w schronisku
            </p>
            <Slider {...settings}>
              {animalSlider.map((animalImg) => (
                <div className={styles["c-navbar__c-animals-slider__item"]}>
                  <Image rounded className={styles["c-navbar__c-animals-slider__item__img"]} src={animalImg} alt=""></Image>
                </div>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </>
  );
}
