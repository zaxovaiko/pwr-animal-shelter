import {Container} from "react-bootstrap";
import styles_main from "./ReservationList.module.css";
import HeaderTitle from "../../../components/header-title/HeaderTitle";
import {useContext} from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {useQuery} from "react-query";
import {fetchReservedAnimals, fetchUpdateAnimaleData} from "../../../api/animals";
import {AuthContext} from "../../../contexts/AuthContext";
import ErrorPage from "../../errors/ErrorPage";
import {setReservationStatus} from "../../../api/reservations";
import {useAlert} from "react-alert";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ReservationList() {
    const alert = useAlert();
    const {auth} = useContext(AuthContext);
    const {isLoading, isError, data} = useQuery(
        ["fetchReservedAnimals", auth.token],
        () => fetchReservedAnimals(auth.token as string)
    );

    if (isLoading) {
        return <></>;
    }

    if (isError) {
        return <ErrorPage/>;
    }

    const columns = [
        {
            Header: () => <strong className={styles_main['table-header']}>ID</strong>,
            accessor: "id",
            minWidth: 40,
            Cell: (row: any) => <p className={styles_main['table-text']}>{row.value}</p>
        },
        {
            Header: () => <strong className={styles_main['table-header']}>Od</strong>,
            accessor: "date",
            minWidth: 80,
            Cell: (row: { original: { date: any; }; }) => {
                const date = row.original.date
                if (!date) return "";
                return <p className={styles_main['table-text']}>{date.substring(0, 10)}  ,g.  {date.substring(11, 16)}</p>;
            }
        },
        {
            Header: () => <strong className={styles_main['table-header']}>Do</strong>,
            accessor: "date",
            minWidth: 50,
            Cell: (row: { original: { date: any; }; }) => {
                const date = row.original.date
                if (!date) return "";
                const date_d: Date = new Date(date.substring(0, 10));
                const date_to = new Date(date_d.getTime() + (2 * 24 * 60 * 60 * 1000));
                return <p className={styles_main['table-text']}>{date_to.getFullYear()}-{date_to.getMonth() + 1}-{date_to.getDate()}</p>;
            }
        },
        {
            Header: () => <strong className={styles_main['table-header']}>Zwierzę</strong>,
            id: "animal.id",
            type: "animal.type",
            accessor: "animal.chip_code",
            Cell: (row: any) => <p className={styles_main['table-text-comb']}>Chip code: <a href={`/animal/${row.original.id}`}
                                                 className={styles_main["table-cell-link"]}>  {row.value} </a></p>
        },
        {
            Header: () => <strong className={styles_main['table-header']}>Osoba</strong>,
            accessor: "user.email",
            Cell: (row: any) => <p className={styles_main['table-text']}>{row.value}</p>
        },
        {
            Header: () => <strong className={styles_main['table-header']}>Status</strong>,
            accessor: "reservation_status.value",
            Cell: (row: any) => <p className={styles_main['table-text']}>{row.value}</p>
        },
        {
            Header: () => <strong className={styles_main['table-header']}>Anulowanie</strong>,
            accessor: "id",
            Cell: (row: any) => {
                if (row.original.reservation_status.value !== "Anulowana") {
                    return <p
                        onClick={() => submitReservationSet(row.value)}
                        className={styles_main["table-cell-set"]}>Anuluj rezerwacje</p>
            }else {
                    return <></>
                }
            }
        },
    ];

    function submitReservationSet(id: string) {
        confirmAlert({
            title: 'Rezerwacja ma być anulowana?',
            buttons: [
                {
                    label: 'Tak',
                    onClick: () => {
                        setReservationStatus(auth.token as string, id, "2")
                        window.location.reload();
                    }
                },
                {
                    label: 'Nie',
                    onClick: () => alert.error("Rezerwacja nie została anulowana.")
                }
            ]
        });
    }

    return (
        <>
            <HeaderTitle text={"Rezerwacje"} color="rgba(133, 175, 91, 0.23)"/>
            <Container className={styles_main["main-container"]}>
                <ReactTable data={data.results} columns={columns} defaultPageSize={5}/>
            </Container>
        </>
    );
}
