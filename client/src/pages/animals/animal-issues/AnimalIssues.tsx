import styles from "./AnimalIssues.module.css";
import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { send } from "emailjs-com";
import { useFormik } from "formik";
import { init } from "emailjs-com";
import { useQuery } from "react-query";
import { fetchAnimal } from "../../../api/animals";
import { AuthContext } from "../../../contexts/AuthContext";
import { useAlert } from "react-alert";

init("user_jcVmieJrNckPINNxKG4Dj");

let refToTitle: React.RefObject<any> = React.createRef();
let refToContents: React.RefObject<any> = React.createRef();

const validate = (values: any) => {
  const errors: {
    title?: String;
    contents?: String;
  } = {};

  if (!values.contents) {
    errors.contents = "Podaj treść";
  }

  return errors;
};

export default function AnimalIssues() {
  const alert = useAlert();
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data } = useQuery(
    ["getAnimal", id],
    () => fetchAnimal(id),
    { retry: false }
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data == undefined ? "" : data.chip_code,
      contents: "",
    },
    validate,
    onSubmit() {
      send("service_m6f35x6", "template_8xa0ynk", {
        from_name: auth.user.email,
        message: formik.values.contents,
        reply_to: "UserEmail",
        topic: "Problem z " + formik.values.title,
      })
        .then((response) => {
          alert.success("Twoja wiadomość została wysłana!");
          if (response.status == 200) {
            history.push("/");
          }
          console.log("SUCCESS!", response.status, response.text);
        })
        .catch((err) => {
          console.log("FAILED...", err);
        });
    },
  });

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <h1>Error has occured</h1>;
  }

  return (
    <div className={styles.animalIssues}>
      <div className={styles["anIssues__container"]}>
        <h1 className={styles["anIssues__label-h1"]}>
          <strong>Zgłoś problem</strong>
        </h1>
        <form
          className={styles["anIssues__form"]}
          onSubmit={formik.handleSubmit}
        >
          <input
            type="text"
            name="title"
            ref={refToTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={styles["anIssues__form-input-title"]}
            placeholder="Tytuł"
            disabled={true}
            style={{ width: "100%" }}
          />
          {formik.touched.title && formik.errors.title ? (
            <div style={{ color: "red", width: "100%" }}>
              {formik.errors.title}
            </div>
          ) : null}
          <textarea
            name="contents"
            style={{ width: "100%", height: "30vh" }}
            ref={refToContents}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contents}
            className={styles["anIssues__form-input-contents"]}
          />
          {formik.touched.contents && formik.errors.contents ? (
            <div style={{ color: "red", width: "100%" }}>
              {formik.errors.contents}
            </div>
          ) : null}

          <button
            type="submit"
            className={styles["anIssues__form-submit-button"]}
          >
            Wyślij
          </button>
          <p style={{ width: "100vh", textAlign: "center" }}>lub</p>
          <button
            onClick={() => history.push("/")}
            className={styles["anIssues__form-cancel-button"]}
          >
            Anuluj
          </button>
        </form>
      </div>
    </div>
  );
}
