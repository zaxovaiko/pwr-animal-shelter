import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import { AuthContext } from "../../../contexts/AuthContext";
import { fetchLoginData } from "../../../api/auth";
import { useAlert } from "react-alert";

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
  //const alert = useAlert();
  const history = useHistory();
  const [loginError, setLoginError] = useState(false);
  const { setAuth } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      errorVal: false,
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
            //alert.success("Zostałeś zalogowany do swojego konta.");
            return history.push("/");
          }
          //alert.error("Coś poszło nie tak. Spróbuj ponownie.");
          setLoginError(true);
          refToErrorUser.current.style.visibility = "visible";
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
    if (formik.errors.errorVal) {
      formik.values.errorVal = true
    }
  });
  return (
    <div className={styles.login}>
      <div className={styles["login__container"]}>
        <h1 className={styles["login__label-h1"]}>
          <strong>Zaloguj się</strong>
        </h1>
        <form className={styles["login__form"]} onSubmit={formik.handleSubmit} data-testid="form">
          <input
            type="email"
            name="email"
            data-testid="email"
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
            data-testid="password"
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
            <Link className={styles["login__a-text-pass"]} to="/password-reset">
              Nie pamiętam hasła
            </Link>
          </div>
          <button data-testid="button" type="submit" className={styles["login__form-submit-button"]}>
            Zaloguj
          </button>
          {loginError ? (
            <div style={{ color: "red", width: "80%", textAlign: "center" }}>
              E-mail lub hasło są nieprawidłowe
            </div>
          ) : null}
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
