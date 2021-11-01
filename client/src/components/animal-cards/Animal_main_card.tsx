import { Container, Image, NavLink, Nav} from "react-bootstrap";
import React, {FC} from 'react';
import styles_main from "./Animal_main_card.module.css";

interface AnimalProps {
    //TODO: add all object data to interface and verify types
    chip_code: String
    name: String,
    age: Number,
    animal_type: String,
    animal_gender: String,
    animal_breed: String,
    color: String,
    height: Number,
    description: String,
    vaccinations: String,
    animal_status: String;
}
//TODO: add info about link and id
//TODO: change static photo link to animal custom one
const Animal_main_card: FC <AnimalProps> = ({chip_code, name, age, description }) => {
    return (
        <>
            <Container className={styles_main["main-container"]}>
                <Container className={styles_main["info-container"]}>
                    <p className={styles_main["animal-name"]}>{name}</p>
                    <hr className={styles_main["line"]}/>
                    <p className={styles_main["animal-age"]}>{age} lat</p>
                    <p className={styles_main["animal-description"]}>{description}</p>
                    <p className={styles_main["nav-area"]}>
                        <Nav.Link as={NavLink} to={"/link/"} className={styles_main["nav-link"]}><u>Więcej</u></Nav.Link>
                    </p>
                </Container>
                <Image src="https://ieltsninja.com/content/wp-content/uploads/2021/01/Describe-an-Interesting-Animal-Dog.jpg" className={styles_main["animal-photo"]} alt={"animal photo"}/>
            </Container>
        </>
    )
}
