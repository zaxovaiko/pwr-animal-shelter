import { Container } from "react-bootstrap";
import styles_main from "./ReservationList.module.css";
import HeaderTitle from "../../../components/header-title/HeaderTitle";
import { useContext } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { useQuery } from "react-query";
import { fetchReservedAnimals } from "../../../api/animals";
import { AuthContext } from "../../../contexts/AuthContext";
import ErrorPage from "../../errors/ErrorPage";

export default function ReservationList() {
  const { auth } = useContext(AuthContext);
  const { isLoading, isError, data } = useQuery(
    ["fetchReservedAnimals", auth.token],
    () => fetchReservedAnimals(auth.token as string)
  );

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      minWidth: 40
    },
    {
      Header: "Od",
      accessor: "date",
      minWidth: 80,
      Cell: (row: { original: { date: any; }; }) => {
        const date = row.original.date
        if (!date) return "";
        return date.substring(0, 10) + " ,g.  " + date.substring(11, 16);
      }
    },
    {
      Header: "Do",
      accessor: "date",
      minWidth: 50,
      Cell: (row: { original: { date: any; }; }) => {
        const date = row.original.date
        if (!date) return "";
        const date_d: Date = new Date(date.substring(0, 10));
        const date_to = new Date(date_d.getTime()+(3*24*60*60*1000));
        return date_to.getFullYear()+"-"+(date_to.getMonth()+1) + "-"+date_to.getDate();
      }
    },
    {
      Header: "Zwierzę",
      accessor: "animal.chip_code",
    },
    {
      Header: "Osoba",
      accessor: "user.email",
    },
    {
      Header: "Status",
      accessor: "reservation_status.value",
    },
  ];

  return (
    <>
      <HeaderTitle text={"Rezerwacje"} color="rgba(133, 175, 91, 0.23)" />
      <Container className={styles_main["main-container"]}>
        <ReactTable data={data.results} columns={columns} defaultPageSize={5} />
      </Container>
    </>
  );
}
