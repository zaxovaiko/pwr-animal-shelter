import {Card, Image, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {Animal} from "../../../types/Animal";
import styles from "./AdoptedAnimalCard.module.css";
import {useContext} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import {useQuery} from "react-query";
import ErrorPage from "../../../pages/errors/ErrorPage";
import {fetchAdoption} from "../../../api/adoption";
import {AnimalAdoption} from "../../../types/AnimalAdoption";

export default function AdoptedAnimalCard({name, id, image}: Animal) {

    const {auth} = useContext(AuthContext);
    const history = useHistory();
    const {isLoading, isError, data} = useQuery(
        ["fetchAdoption", auth.token],
        () => fetchAdoption(auth.token as string, id)
    );

    if (isLoading) {
        return <>Loading</>;
    }

    if (isError) {
        return <ErrorPage/>;
    }

    const list: AnimalAdoption[] = data.results;
    const date: string = list[0].date.substring(0, 10);

    return (
        <Card className={styles["adopted-animal-card"]}>
            <Image
                className={styles["adopted-animal-card__img"]}
                alt="Brak zdjęcia"
                src={image}
            />
            <Row>
                <p className={styles["adopted-animal-card__name"]}>{name}</p>
                <p className={styles["adopted-animal-card__date"]}>Data adopcji: {date}</p>
            </Row>

            <button
                onClick={() => history.push("/animal-issue/" + id)}
                className={styles["adopted-animal-card__btn"] + " c-btn"}
            >
                Zgłoś problem
            </button>
        </Card>
    );
}
