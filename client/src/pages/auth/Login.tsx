import React, { Props, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { user } from "./user_example_data";
import { useFormik } from "formik";

let refToEmail: React.RefObject<any> = React.createRef();
let refToPassword: React.RefObject<any> = React.createRef();

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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit() {
      signIn();
    },
  });

  function signIn() {
    if (user.email == formik.values.email && user.password == formik.values.password) {
      history.push("/");
    } else {
      alert("Invalid data!");
    }
  }

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
            autoFocus
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red", width: "80%" }}>{formik.errors.email}</div>
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
            <div style={{ color: "red", width: "80%" }}>{formik.errors.password}</div>
          ) : null}
          <div className={styles["login__text-pass"]}>
            <a href="/" className={styles["login__a-text-pass"]}>
              Nie pamiętam hasła
            </a>
          </div>
          <button type="submit" className={styles["login__form-submit-button"]}>
            Zaloguj
          </button>
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
