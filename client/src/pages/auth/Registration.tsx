import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import styles from "./Registration.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { fetchRegisterData } from "../../api/auth";

let refToFirstName: React.RefObject<any> = React.createRef();
let refToLastName: React.RefObject<any> = React.createRef();
let refToPesel: React.RefObject<any> = React.createRef();
let refToPhoneNumber: React.RefObject<any> = React.createRef();
let refToEmail: React.RefObject<any> = React.createRef();
let refToPassword: React.RefObject<any> = React.createRef();
let refToRepeatPassword: React.RefObject<any> = React.createRef();

const validate = (values: any) => {
  function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
  }

  const errors: {
    firstName?: String;
    lastName?: String;
    pesel?: String;
    phoneNumber?: String;
    address?: String;
    email?: String;
    password?: String;
    repeatPassword?: String;
    checkbox1?: String;
    checkbox2?: String;
  } = {};

  if (!values.firstName) {
    errors.firstName = "*Pole jest obowiązkowe";
  } else if (values.firstName.length > 15) {
    errors.firstName = "*Pole musi mieć nie więcej niż 15 znaków";
  }

  if (!values.lastName) {
    errors.lastName = "*Pole jest obowiązkowe";
  } else if (values.lastName.length > 20) {
    errors.lastName = "*Pole musi mieć nie więcej niż 20 znaków";
  }

  if (!values.pesel) {
    errors.pesel = "*Pole jest obowiązkowe";
  } else if (values.pesel.length !== 11) {
    errors.pesel = "*Pole musi mieć 11 znaków";
  } else if (!isNumeric(values.pesel)) {
    errors.pesel = "*Pole musi zawierać wyłącznie cyfry";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "*Pole jest obowiązkowe";
  } else if (values.phoneNumber.length !== 9) {
    errors.phoneNumber = "*Pole musi mieć 9 znaków";
  } else if (!isNumeric(values.phoneNumber)) {
    errors.phoneNumber = "*Pole musi zawierać wyłącznie cyfry";
  }

  if (!values.email) {
    errors.email = "*Pole jest obowiązkowe";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "*Niepoprawne dane";
  }

  if (!values.password) {
    errors.password = "*Pole jest obowiązkowe";
  } else if (values.password.length > 11) {
    errors.password = "*Pole musi mieć więcej niż 11 znaków";
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = "*Pole jest obowiązkowe";
  } else if (values.repeatPassword !== values.password) {
    errors.repeatPassword = "*Hasła nie są identyczne";
    errors.password = "*Hasła nie są identyczne";
  }

  if (!values.checkbox1) {
    errors.checkbox1 = "*Zaakceptuj regulamin";
  }

  if (!values.checkbox2) {
    errors.checkbox2 = "*Zaakceptuj zgodę";
  }

  return errors;
};

export default function Registration() {
  const { setAuth } = useContext(AuthContext);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      pesel: "",
      phoneNumber: "",
      address: "",
      email: "",
      password: "",
      repeatPassword: "",
      checkbox1: undefined,
      checkbox2: undefined,
    },
    validate,
    onSubmit: (values) => {
      fetch(process.env.REACT_APP_SERVER_URI + "/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          ...values,
          first_name: values.firstName,
          last_name: values.lastName,
          phone: values.phoneNumber,
        }),
      })
        .then((res) => res.json())
        })
      )
        .then((res) => {
          alert(res.email);
          history.push("/");
        })
        .catch(console.error);
      // history.push("/");
    },
  });

  useEffect(() => {
    if (formik.touched.firstName && formik.errors.firstName) {
      refToFirstName.current.style.borderColor = "red";
    } else {
      refToFirstName.current.style.borderColor = "#DADADA";
    }

    if (formik.touched.lastName && formik.errors.lastName) {
      refToLastName.current.style.borderColor = "red";
    } else {
      refToLastName.current.style.borderColor = "#DADADA";
    }

    if (formik.touched.pesel && formik.errors.pesel) {
      refToPesel.current.style.borderColor = "red";
    } else {
      refToPesel.current.style.borderColor = "#DADADA";
    }

    if (formik.touched.phoneNumber && formik.errors.phoneNumber) {
      refToPhoneNumber.current.style.borderColor = "red";
    } else {
      refToPhoneNumber.current.style.borderColor = "#DADADA";
    }

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

    if (formik.touched.repeatPassword && formik.errors.repeatPassword) {
      refToRepeatPassword.current.style.borderColor = "red";
    } else {
      refToRepeatPassword.current.style.borderColor = "#DADADA";
    }
  });

  return (
    <div className={styles.registration}>
      <div className={styles["registration__container"]}>
        <h1 className={styles["registration__label-h1"]}>
          <strong>Zarejestruj się</strong>
        </h1>
        <form
          className={styles["registration__form"]}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles["registration_form-input-div-first"]}>
            <label
              htmlFor={styles["registration__form-input-div-name"]}
              style={{ position: "absolute" }}
            >
              *Imię:
            </label>
            <input
              type="text"
              ref={refToFirstName}
              name="firstName"
              id={styles["registration__form-input-div-name"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div"]}>
            <label
              htmlFor={styles["registration__form-input-div-surname"]}
              style={{ position: "absolute" }}
            >
              *Nazwisko:
            </label>
            <input
              type="text"
              ref={refToLastName}
              name="lastName"
              id={styles["registration__form-input-div-surname"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div"]}>
            <label
              htmlFor={styles["registration__form-input-div-pesel"]}
              style={{ position: "absolute" }}
            >
              *PESEL:
            </label>
            <input
              type="text"
              ref={refToPesel}
              name="pesel"
              id={styles["registration__form-input-div-pesel"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pesel}
            />
            {formik.touched.pesel && formik.errors.pesel ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.pesel}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div"]}>
            <label
              htmlFor={styles["registration__form-input-div-tel"]}
              style={{ position: "absolute" }}
            >
              *Tel:
            </label>
            <input
              name="phoneNumber"
              id={styles["registration__form-input-div-tel"]}
              value={formik.values.phoneNumber}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              ref={refToPhoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.phoneNumber}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div"]}>
            <label
              htmlFor={styles["registration__form-input-div-adress"]}
              style={{ position: "absolute" }}
            >
              Adres:
            </label>
            <input
              name="address"
              type="text"
              id={styles["registration__form-input-div-adress"]}
              onChange={formik.handleChange}
              value={formik.values.address}
              type="text"
              id={styles["registration__form-input-div-adress"]}
            />
          </div>

          <div className={styles["registration_form-input-div"]}>
            <label
              htmlFor={styles["registration__form-input-div-email"]}
              style={{ position: "absolute" }}
            >
              *Email:
            </label>
            <input
              type="email"
              name="email"
              ref={refToEmail}
              id={styles["registration__form-input-div-email"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div-pass"]}>
            <label
              htmlFor={styles["registration__form-input-div-password"]}
              style={{ position: "absolute" }}
            >
              *Hasło:
            </label>
            <input
              type="password"
              name="password"
              ref={refToPassword}
              id={styles["registration__form-input-div-password"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div"]}>
            <label
              htmlFor={styles["registration__form-input-div-password-repeat"]}
              style={{ position: "absolute" }}
            >
              *Powtórz hasło:
            </label>
            <input
              type="password"
              name="repeatPassword"
              ref={refToRepeatPassword}
              id={styles["registration__form-input-div-password-repeat"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatPassword}
            />
            {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.repeatPassword}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div"]}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "1.5vh",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  name="checkbox1"
                  className={styles["registration__form-input-div-checkbox"]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.checkbox1}
                />
              </div>
              <label style={{ width: "30vh" }}>
                *Zapoznałem się i akceptuję{" "}
                <a href="/login" className={styles["registration__a-text-reg"]}>
                  <strong>regulamin</strong>
                </a>
              </label>
            </div>
            {formik.touched.checkbox1 && formik.errors.checkbox1 ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.checkbox1}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div-last"]}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "1.5vh",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  name="checkbox2"
                  className={styles["registration__form-input-div-checkbox"]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.checkbox2}
                />
              </div>
              <label style={{ width: "30vh" }}>
                *Wyrażam zgodę na przetwarzanie moich danych osobowych
              </label>
            </div>
            {formik.touched.checkbox2 && formik.errors.checkbox2 ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.checkbox2}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className={styles["registration__form-submit-button"]}
          >
            Zarejestruj
          </button>
        </form>
        <div className={styles["registration__text-reg"]}>
          Masz konto?&nbsp;Wróć na stronę&nbsp;
          <a href="/login" className={styles["registration__a-text-reg"]}>
            <strong>logowania się</strong>
          </a>
        </div>
      </div>
    </div>
  );
}
