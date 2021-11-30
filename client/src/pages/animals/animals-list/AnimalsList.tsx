import {Button, Col, Container, Row} from "react-bootstrap";
import {useQuery} from "react-query";
import { useState } from 'react';
import {useParams} from "react-router-dom";
import {fetchAnimals, fetchAnimalType} from "../../../api/animals";
import MainAnimalCard from "../../../components/animals/animal-main-card/AnimalMainCard";
import HeaderTitle from "../../../components/header-title/HeaderTitle";
import styles from "./AnimalsList.module.css";
import styles_button from "../../../components/shared/Button.module.css";

export default function AnimalList() {
    const {type} = useParams<{ type: string }>();
    const [sortBy, setSortBy] = useState(['age', 'weight']);
    const {isLoading, isError, data} = useQuery(["getAnimals", type], () =>
        fetchAnimals(+type)
    )
    const animalTypeQuery = useQuery(["getAnimalType", type], () =>
        fetchAnimalType(+type)
    );

    if (isError || animalTypeQuery.isError) {
        return <>Error</>;
    }

    if (isLoading || animalTypeQuery.isLoading) {
        return <>Loading</>;
    }

    return (
        <>
            <HeaderTitle
                text={"Adoptuj teraz: " + animalTypeQuery.data.value}
                image="https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1200-80.jpg"
            />

            <Container className={styles["sort-area"]}>
                <p>Sortuj:</p>
                <Button
                    className={styles_button["button-green"]}
                    onClick={() => setSortBy(p => {
                        const r = [...p];
                        r[0] = r[0].startsWith('-') ? 'age' : '-age';
                        return r;
                    })}
                >
                    Na początku mołode
                </Button>
                <Button
                    className={styles_button["button-green"]}
                    onClick={() => setSortBy(p => {
                        const r = [...p];
                        r[1] = r[1].startsWith('-') ? 'age' : '-age';
                        return r;
                    })}
                >
                    Na początku małe
                </Button>
            </Container>

            <Container className={styles["animal-list"] + " gx-4"}>
                <Row className="gx-5">
                    {data.results.length === 0 && <h3>There is no any animal yet</h3>}
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