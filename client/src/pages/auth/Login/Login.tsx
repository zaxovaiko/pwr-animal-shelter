import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import { AuthContext } from "../../../contexts/AuthContext";
import { fetchLoginData } from "../../../api/auth";

let refToEmail: React.RefObject<any> = React.createRef();
let refToPassword: React.RefObject<any> = React.createRef();
let refToErrorUser: React.RefObject<any> = React.createRef();

const validate = (values: any) => {
  const errors: {
    email?: String;
    password?: String;
  } = {};

  if (!values.email) {
    errors.email = "Podaj email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "*Niepoprawne dane";
  }

  if (!values.password) {
    errors.password = "Podaj hasło";
  }

  return errors;
};

export default function Login() {
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  let check = false;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      fetchLoginData({
        email: values.email,
        password: values.password,
      })
        .then((res) => {
          if (res.access) {
            setAuth(res.access);
            history.push("/");
          } else {
            refToErrorUser.current.style.visibility = "visible";
          }
        })
        .catch(console.error);
    },
  });

  useEffect(() => {
    if (formik.touched.email && formik.errors.email) {
      refToEmail.current.style.borderColor = "red";
    } else {
      refToEmail.current.style.borderColor = "#DADADA";
    }

    if (formik.touched.password && formik.errors.password) {
      refToPassword.current.style.borderColor = "red";
    } else {
      refToPassword.current.style.borderColor = "#DADADA";
    }

    if (check) {
      alert(check);
      refToErrorUser.current.style.visibility = "visible";
    }
  });
  return (
    <div className={styles.login}>
      <div className={styles["login__container"]}>
        <h1 className={styles["login__label-h1"]}>
          <strong>Zaloguj się</strong>
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
          <input
            name="password"
            type="password"
            ref={refToPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={styles["login__form-input-password"]}
            placeholder="Hasło"
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red", width: "80%" }}>
              {formik.errors.password}
            </div>
          ) : null}
          <div className={styles["login__text-pass"]}>
            <a href="/" className={styles["login__a-text-pass"]}>
              Nie pamiętam hasła
            </a>
          </div>
          <button type="submit" className={styles["login__form-submit-button"]}>
            Zaloguj
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
          <a href="/registration" className={styles["login__a-text-reg"]}>
            <strong>Zarejestruj się</strong>
          </a>
        </div>
      </div>
    </div>
  );
}
