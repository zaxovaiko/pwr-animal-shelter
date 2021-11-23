import {Container} from "react-bootstrap";
import styles_main from "./ReservationList.module.css";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";

import React, {useContext} from 'react';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {useQuery} from "react-query";
import {fetchReservedAnimals} from "../../../api/animals";
import {AuthContext} from "../../../contexts/AuthContext";

export default function ReservationList() {
    const { auth } = useContext(AuthContext);
    const {isLoading, isError, data} = useQuery(
        ["fetchReservedAnimals", auth.token],
        () => fetchReservedAnimals(auth.token as string)
    );

    if (isLoading) {
        return <></>;
    }

    if (isError) {
        return <></>;
    }

    const columns = [
        {
            Header: "ID",
            accessor: "id"
        },
        {
            Header: "Od",
            accessor: "date"
        },
        {
            Header: "Do",
            accessor: "date"
        },
        {
            Header: "Zwierzę",
            accessor: "chip_code"
        },
        {
            Header: "Osoba",
            accessor: "email"
        },
        {
            Header: "Status",
            accessor: "animal_status.value"
        },
    ];

    return (
        <>
            <HeaderTitle text={"Rezerwacje"} color="rgba(133, 175, 91, 0.23)"/>
            <Container className={styles_main["main-container"]}>
                <ReactTable className={styles_main["table"]}
                    data={data.results}
                    columns={columns}
                    defaultPageSize = {2}
                    pageSizeOptions = {[3,6, 9]}
                />
            </Container>
        </>
    )
}