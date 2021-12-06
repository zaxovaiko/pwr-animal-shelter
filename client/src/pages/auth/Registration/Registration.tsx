import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import styles from "./Registration.module.css";
import { fetchRegisterData } from "../../../api/auth";
import { useAlert } from "react-alert";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

let refToFirstName: React.RefObject<any> = React.createRef();
let refToLastName: React.RefObject<any> = React.createRef();
let refToPesel: React.RefObject<any> = React.createRef();
let refToEmail: React.RefObject<any> = React.createRef();
let refToPassword: React.RefObject<any> = React.createRef();
let refToRepeatPassword: React.RefObject<any> = React.createRef();
let refToStreet: React.RefObject<any> = React.createRef();
let refToBuilding: React.RefObject<any> = React.createRef();
let refToApartment: React.RefObject<any> = React.createRef();
let refToCity: React.RefObject<any> = React.createRef();
let refToZip: React.RefObject<any> = React.createRef();

const validate = (values: any) => {
  function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
  }

  function validateZip(zipCode: string) {
    var zip = require("zippo");
    return zip.validate(zipCode);
  }
  function isInDesiredForm(number: string) {
    return /^\+?(0|[1-9]\d*)$/.test(number);
  }

  const errors: {
    firstName?: String;
    lastName?: String;
    pesel?: String;
    phoneNumber?: String;
    street?: String;
    buildingNumber?: String;
    apartmentNumber?: String;
    city?: String;
    zip?: String;
    email?: String;
    password?: String;
    repeatPassword?: String;
    checkbox1?: String;
    checkbox2?: String;
  } = {};

  if (!values.firstName) {
    errors.firstName = "*Pole jest obowiązkowe";
  } else if (values.firstName.length > 50) {
    errors.firstName = "*Pole musi mieć nie więcej niż 50 znaków";
  }

  if (!values.lastName) {
    errors.lastName = "*Pole jest obowiązkowe";
  } else if (values.lastName.length > 50) {
    errors.lastName = "*Pole musi mieć nie więcej niż 50 znaków";
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
  } else if (values.phoneNumber.length < 11) {
    errors.phoneNumber = "*Niepoprawne dane";
  }

  if (!values.street) {
    errors.street = "*Pole jest obowiązkowe";
  }

  if (!values.buildingNumber) {
    errors.buildingNumber = "*Pole jest obowiązkowe";
  }

  if (!values.apartmentNumber) {
    errors.apartmentNumber = "*Pole jest obowiązkowe";
  } else if (!isNumeric(values.apartmentNumber)) {
    errors.apartmentNumber = "*Pole musi zawierać wyłącznie cyfry";
  } else if (!isInDesiredForm(values.apartmentNumber)) {
    errors.apartmentNumber = "*Niepoprawne dane";
  }

  if (!values.city) {
    errors.city = "*Pole jest obowiązkowe";
  }

  if (!values.zip) {
    errors.zip = "*Pole jest obowiązkowe";
  } else if (!validateZip(values.zip)) {
    errors.zip = "*Niepoprawny kod pocztowy";
  }

  if (!values.email) {
    errors.email = "*Pole jest obowiązkowe";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "*Niepoprawne dane";
  }

  if (!values.password) {
    errors.password = "*Pole jest obowiązkowe";
  } else if (values.password.length < 6) {
    errors.password = "*Pole musi mieć więcej niż 5 znaków";
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
  const alert = useAlert();
  const history = useHistory();
  const [phone, setPhone] = useState("");
  function handleOnChangePhone(value: any) {
    setPhone(value);
    formik.values.phoneNumber = value;
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      pesel: "",
      phoneNumber: "",
      apartmentNumber: "",
      buildingNumber: "",
      city: "",
      street: "",
      zip: "",
      email: "",
      password: "",
      repeatPassword: "",
      checkbox1: undefined,
      checkbox2: undefined,
    },
    validate,
    onSubmit: (values) => {
      fetchRegisterData({
        ...values,
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phoneNumber,
        address: `${values.street} ${values.buildingNumber}, ${values.apartmentNumber}, ${values.city}, ${values.zip}`,
      })
        .then((res) => {
          if (res.id) {
            alert.success("Teraz juz możesz zalogować się.");
            return history.push("/login");
          }
          if (res.pesel) {
            alert.error(
              "W systemie istnieje już użytkownik z podanym numerem PESEL"
            );
          } else if (res.email) {
            alert.error("W systemie istnieje już użytkownik z podanym e-mail");
          } else {
            alert.error(res.error);
          }
        })
        .catch(() => {});
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

    if (formik.touched.street && formik.errors.street) {
      refToStreet.current.style.borderColor = "red";
    } else {
      refToStreet.current.style.borderColor = "#DADADA";
    }

    if (formik.touched.buildingNumber && formik.errors.buildingNumber) {
      refToBuilding.current.style.borderColor = "red";
    } else {
      refToBuilding.current.style.borderColor = "#DADADA";
    }

    if (formik.touched.apartmentNumber && formik.errors.apartmentNumber) {
      refToApartment.current.style.borderColor = "red";
    } else {
      refToApartment.current.style.borderColor = "#DADADA";
    }

    if (formik.touched.city && formik.errors.city) {
      refToCity.current.style.borderColor = "red";
    } else {
      refToCity.current.style.borderColor = "#DADADA";
    }

    if (formik.touched.zip && formik.errors.zip) {
      refToZip.current.style.borderColor = "red";
    } else {
      refToZip.current.style.borderColor = "#DADADA";
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
            <PhoneInput
              country={"pl"}
              placeholder={""}
              specialLabel="*Numer telefonu"
              value={phone}
              onChange={handleOnChangePhone}
              inputProps={{
                name: "phoneNumber",
                id: styles["registration__form-input-div-tel"],
                onBlur: formik.handleBlur,
              }}
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
              *Ulica:
            </label>
            <input
              name="street"
              type="text"
              ref={refToStreet}
              id={styles["registration__form-input-div-adress"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.street}
            />
            {formik.touched.street && formik.errors.street ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.street}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div"]}>
            <label
              htmlFor={styles["registration__form-input-div-adress-building"]}
              style={{ position: "absolute" }}
            >
              *Numer budynku:
            </label>
            <input
              name="buildingNumber"
              type="text"
              ref={refToBuilding}
              id={styles["registration__form-input-div-adress-building"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.buildingNumber}
            />
            {formik.touched.buildingNumber && formik.errors.buildingNumber ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.buildingNumber}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div"]}>
            <label
              htmlFor={styles["registration__form-input-div-adress-apartment"]}
              style={{ position: "absolute" }}
            >
              *Numer mieszkania:
            </label>
            <input
              name="apartmentNumber"
              type="text"
              ref={refToApartment}
              id={styles["registration__form-input-div-adress-apartment"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apartmentNumber}
            />
            {formik.touched.apartmentNumber && formik.errors.apartmentNumber ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.apartmentNumber}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div"]}>
            <label
              htmlFor={styles["registration__form-input-div-adress-city"]}
              style={{ position: "absolute" }}
            >
              *Miasto:
            </label>
            <input
              name="city"
              type="text"
              ref={refToCity}
              id={styles["registration__form-input-div-adress-city"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.city}
              </div>
            ) : null}
          </div>

          <div className={styles["registration_form-input-div"]}>
            <label
              htmlFor={styles["registration__form-input-div-adress-zip"]}
              style={{ position: "absolute" }}
            >
              *ZIP:
            </label>
            <input
              name="zip"
              type="text"
              ref={refToZip}
              id={styles["registration__form-input-div-adress-zip"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zip}
            />
            {formik.touched.zip && formik.errors.zip ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.zip}
              </div>
            ) : null}
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
          <Link to="/login" className={styles["registration__a-text-reg"]}>
            <strong>logowania się</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}
