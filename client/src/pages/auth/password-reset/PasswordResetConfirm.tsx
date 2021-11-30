import { useFormik } from "formik";
import { useEffect, createRef } from "react";
import { useAlert } from "react-alert";
import { Link, useHistory, useLocation } from "react-router-dom";
import { fetchPasswordResetConfirmation } from "../../../api/auth";
import styles from "../Login/Login.module.css";

let refToPassword: React.RefObject<any> = createRef();
let refToPasswordConfirmation: React.RefObject<any> = createRef();
let refToErrorUser: React.RefObject<any> = createRef();

const validate = (values: any) => {
  const errors: {
    password?: String;
    password_confirmation?: String;
  } = {};

  if (!values.password) {
    errors.password = "Podaj hasło";
  }

  if (!values.password_confirmation) {
    errors.password = "Podaj potwierdzenie hasła";
  }

  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = "Hasła muszą być jednakowe";
  }

  return errors;
};

export default function PasswordResetConfirm() {
  const alert = useAlert();
  const location = useLocation();
  const history = useHistory();
  let check = false;

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validate,
    onSubmit: (values) => {
      const token = new URLSearchParams(location.search).get("token");
      fetchPasswordResetConfirmation({
        password: values.password,
        token,
      } as any)
        .then((res) => {
          console.log(res);
          if (res.status === "OK") {
            alert.success("Teraz możesz zalogować się z nowych hasłem");
            return history.push("/login");
          }
          alert.error("Coś poszło nie tak. Spróbuj ponownie.");
          refToErrorUser.current.style.visibility = "visible";
        })
        .catch(() => alert.error("Coś poszło nie tak. Spróbuj ponownie."));
    },
  });

  useEffect(() => {
    if (formik.touched.password && formik.errors.password) {
      refToPassword.current.style.borderColor = "red";
    } else {
      refToPassword.current.style.borderColor = "#DADADA";
    }

    if (check) {
      refToErrorUser.current.style.visibility = "visible";
    }
  });

  return (
    <div className={styles.login}>
      <div className={styles["login__container"]}>
        <h1 className={styles["login__label-h1"]}>
          <strong>
            Wygenerowanie <br /> nowego hasła
          </strong>
        </h1>
        <form className={styles["login__form"]} onSubmit={formik.handleSubmit}>
          <input
            type="password"
            name="password"
            ref={refToPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={styles["login__form-input-email"]}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red", width: "80%" }}>
              {formik.errors.password}
            </div>
          ) : null}
          <input
            type="password"
            name="password_confirmation"
            ref={refToPasswordConfirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_confirmation}
            className={styles["login__form-input-email"]}
            placeholder="Password confirmation"
          />
          {formik.touched.password_confirmation &&
          formik.errors.password_confirmation ? (
            <div style={{ color: "red", width: "80%" }}>
              {formik.errors.password_confirmation}
            </div>
          ) : null}
          <button
            type="submit"
            className={"mt-5 " + styles["login__form-submit-button"]}
          >
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
            Hasło jest nieprawidłowe
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
