import { useFormik } from "formik";
import { useEffect, createRef } from "react";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import { fetchPasswordResetToken } from "../../../api/auth";
import styles from "../login/Login.module.css";

let refToEmail: React.RefObject<any> = createRef();
let refToErrorUser: React.RefObject<any> = createRef();

const validate = (values: any) => {
  const errors: {
    email?: String;
  } = {};

  if (!values.email) {
    errors.email = "Podaj email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "*Niepoprawne dane";
  }

  return errors;
};

export default function PasswordReset() {
  const alert = useAlert();
  const history = useHistory();
  let check = false;

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      fetchPasswordResetToken(values.email as any)
        .then((res) => {
          console.log(res);
          if (res.status === "OK") {
            alert.success("Sprawdź swojego maila, który podałeś wcześniej.");
            return history.push("/login");
          }
          alert.error("Coś poszło nie tak. Spróbuj ponownie.");
          refToErrorUser.current.style.visibility = "visible";
        })
        .catch(() => alert.error("Coś poszło nie tak. Spróbuj ponownie."));
    },
  });

  useEffect(() => {
    if (formik.touched.email && formik.errors.email) {
      refToEmail.current.style.borderColor = "red";
    } else {
      refToEmail.current.style.borderColor = "#DADADA";
    }

    if (check) {
      refToErrorUser.current.style.visibility = "visible";
    }
  });

  return (
    <div className={styles.login}>
      <div className={styles["login__container"]}>
        <h1 className={styles["login__label-h1"]}>
          <strong>Resetowanie hasła</strong>
        </h1>
        <form className={styles["login__form"]} onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            ref={refToEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={styles["login__form-input-email"]}
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red", width: "80%" }}>
              {formik.errors.email}
            </div>
          ) : null}
          <button type="submit" className={styles["login__form-submit-button"]}>
            Wyślij link
          </button>
          <div
            ref={refToErrorUser}
            style={{
              color: "red",
              width: "80%",
              textAlign: "center",
              visibility: "hidden",
              marginTop: "0.5vh",
            }}
          >
            E-mail lub hasło są nieprawidłowe
          </div>
        </form>
        <div className={styles["login__text-reg"]}>
          Nie masz konta?&nbsp;
          <Link to="/registration" className={styles["login__a-text-reg"]}>
            <strong>Zarejestruj się</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}
