import {Col, Container, Image, Row} from "react-bootstrap";
import Slider from "react-slick";
import HeaderTitle from "../components/HeaderTitle/HeaderTitle";
import styles from "./Home.module.css";

export default function Home() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const animalSlider = Array.from(Array(4)).map(
        () =>
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Calico_tabby_cat_-_Savannah.jpg/1200px-Calico_tabby_cat_-_Savannah.jpg"
    );

    return (
        <>
            <HeaderTitle
                text="Witamy!"
                //image="http://www.petcarriers.com.au/images/site-images/pets-variety.jpg"
                image="https://www.purina.kz/sites/purina.ru/files/2017-12/Cat-To-Other-Pets_034dd014-2587-48af-ba78-72735facf4fe_2.jpg"
                //image="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1200-80.jpg"
            />
            <Container fluid>
                <Row className={styles["c-navbar__c-animals-slider"] + " mb-5"}>
                    <Col className="px-5">
                        <p className={styles["c-navbar__c-animals-slider__title"]}>
                            Nowi w schronisku
                        </p>
                        <Slider {...settings}>
                            {animalSlider.map((animalImg, i) => (
                                <div key={i} className={styles["c-navbar__c-animals-slider__item"]}>
                                    <Image
                                        rounded
                                        className={styles["c-navbar__c-animals-slider__item__img"]}
                                        src={animalImg}
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
