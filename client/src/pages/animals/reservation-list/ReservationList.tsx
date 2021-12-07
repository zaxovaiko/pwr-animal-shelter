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
import { useAlert } from "react-alert";
import { useHistory } from "react-router";
import { fetchRegistrationForm } from "../../../api/forms";

export default function ReservationList() {
  const { auth } = useContext(AuthContext);
  const alert = useAlert();
  const history = useHistory();
  const { isLoading, isError, data } = useQuery(
    ["fetchReservedAnimals", auth.token],
    () => fetchReservedAnimals(auth.token as string)
  );

  function handleClick(animal_id: any, user_id: any) {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("animal_id", animal_id);
    fetchRegistrationForm(formData, auth.token).then((res) => {
      console.log(res);
    });
  }

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const columns = [
    {
      Header: () => <strong className={styles_main["table-header"]}>ID</strong>,
      accessor: "id",
      minWidth: 40,
    },
    {
      Header: () => <strong className={styles_main["table-header"]}>Od</strong>,
      accessor: "date",
      minWidth: 80,
      Cell: (row: { original: { date: any } }) => {
        const date = row.original.date;
        if (!date) return "";
        return date.substring(0, 10) + " ,g.  " + date.substring(11, 16);
      },
    },
    {
      Header: () => <strong className={styles_main["table-header"]}>Do</strong>,
      accessor: "date",
      minWidth: 50,
      Cell: (row: { original: { date: any } }) => {
        const date = row.original.date;
        if (!date) return "";
        const date_d: Date = new Date(date.substring(0, 10));
        const date_to = new Date(date_d.getTime() + 3 * 24 * 60 * 60 * 1000);
        return (
          date_to.getFullYear() +
          "-" +
          (date_to.getMonth() + 1) +
          "-" +
          date_to.getDate()
        );
      },
    },
    {
      Header: () => (
        <strong className={styles_main["table-header"]}>Zwierzę</strong>
      ),
      id: "animal.id",
      type: "animal.type",
      accessor: "animal.chip_code",
      Cell: (row: any) => (
        <a>
          Chip code:{" "}
          <a
            href={`/animal/${row.original.id}`}
            className={styles_main["table-cell-link"]}
          >
            {" "}
            {row.value}{" "}
          </a>
        </a>
      ),
    },
    {
      Header: () => (
        <strong className={styles_main["table-header"]}>Osoba</strong>
      ),
      accessor: "user.email",
    },
    {
      Header: () => (
        <strong className={styles_main["table-header"]}>Status</strong>
      ),
      accessor: "reservation_status.value",
    },
    {
      Header: () => (
        <strong className={styles_main["table-header"]}>
          Formularz rejestracyjny
        </strong>
      ),
      id: "animal.id",
      type: "animal.type",
      accessor: "animal.chip_code",
      Cell: (row: any) =>
        row.original.reservation_status.id == "2" ? (
          <button
            onClick={() => handleClick(row.original.id, row.original.user.id)}
            className={styles_main["table-cell-form-button"]}
          >
            Generuj
          </button>
        ) : null,
    },
  ];

  return (
    <>
      <HeaderTitle text={"Rezerwacje"} color="rgba(133, 175, 91, 0.23)" />
      <Container className={styles_main["main-container"]}>
        <ReactTable
          data={data.results}
          columns={columns}
          defaultPageSize={5}
          style={{ textAlign: "center" }}
        />
      </Container>
    </>
  );
}
