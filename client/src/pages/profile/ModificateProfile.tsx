import styles from "./ModificateProfile.module.css";
import React, { useEffect, useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { AuthContext } from "../../contexts/AuthContext";
import { Image } from "react-bootstrap";
import { useQuery } from "react-query";
import { fetchProfileData, fetchUpdateProfileData } from "../../api/profile";
import { useAlert } from "react-alert";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import ErrorPage from "../errors/ErrorPage";
import LoadingPage from "../errors/LoadingPage";

let refTofirst_name: React.RefObject<any> = React.createRef();
let refTolast_name: React.RefObject<any> = React.createRef();
let refToPesel: React.RefObject<any> = React.createRef();
let refToEmail: React.RefObject<any> = React.createRef();
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
    first_name?: String;
    last_name?: String;
    street?: String;
    buildingNumber?: String;
    apartmentNumber?: String;
    city?: String;
    zip?: String;
    pesel?: String;
    phone?: String;
    email?: String;
  } = {};
  if (!values.first_name) {
    errors.first_name = "*Pole jest obowiązkowe";
  } else if (values.first_name.length > 50) {
    errors.first_name = "*Pole musi mieć nie więcej niż 50 znaków";
  }

  if (!values.last_name) {
    errors.last_name = "*Pole jest obowiązkowe";
  } else if (values.last_name.length > 50) {
    errors.last_name = "*Pole musi mieć nie więcej niż 50 znaków";
  }

  if (!values.pesel) {
    errors.pesel = "*Pole jest obowiązkowe";
  } else if (values.pesel.length !== 11) {
    errors.pesel = "*Pole musi mieć 11 znaków";
  } else if (!isNumeric(values.pesel)) {
    errors.pesel = "*Pole musi zawierać wyłącznie cyfry";
  }

  if (!values.phone) {
    errors.phone = "*Pole jest obowiązkowe";
  } else if (values.phone.length < 11) {
    errors.phone = "*Niepoprawne dane";
  }

  if (!values.email) {
    errors.email = "*Pole jest obowiązkowe";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "*Niepoprawne dane";
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
  return errors;
};

export default function ModificateProfile() {
  const alert = useAlert();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const infoToGoBack: string = "/profile/" + id;
  const { auth } = useContext(AuthContext);
  const { isLoading, isError, data } = useQuery(
    ["getProfileData", id],
    () => fetchProfileData(id),
    { retry: false }
  );
  const [phoneNumber, setPhone] = useState(
    !data ? "" : data.phone
  );
  const [mainUserImage, setMainUserImage] = useState("");
  function mainImageChangedHandler(event: any) {
    setMainUserImage(event.target.files[0]);
  }
  function handleOnChangePhone(value: any) {
    setPhone(value);
    formik.values.phone = value;
  }

  const addressInfo = !data ? "" : data.address.split(",");
  const streetAndBuilding = !data ? "" : addressInfo[0].split(" ");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: !data ? "" : data.first_name,
      last_name: !data ? "" : data.last_name,
      street: !data ? "" : streetAndBuilding[0],
      buildingNumber: !data ? "" : streetAndBuilding[1],
      apartmentNumber: !data ? "" : addressInfo[1],
      city: !data ? "" : addressInfo[2],
      zip: !data ? "" : addressInfo[3],
      pesel: !data ? "" : data.pesel,
      phone: phoneNumber,
      email: !data ? "" : data.email,
    },
    validate,
    onSubmit: (values) => {
      const formData = new FormData();
      if (mainUserImage !== "") {
        formData.append("image", mainUserImage);
      }
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append(
        "address",
        values.street +
          " " +
          values.buildingNumber +
          "," +
          values.apartmentNumber +
          "," +
          values.city +
          "," +
          values.zip
      );
      formData.append("pesel", values.pesel);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      fetchUpdateProfileData(formData, data.id, auth.token)
        .then((res: any) => {
          if (res.id) {
            alert.success("Twoje dane zostały zmodyfikowane!");
            return history.push(infoToGoBack);
          }
          if (res.pesel) {
            alert.error(
              "W systemie istnieje już użytkownik z podanym numerem PESEL"
            );
          } else if (res.email) {
            alert.error("W systemie istnieje już użytkownik z podanym e-mail");
          } else {
            alert.error("Coś poszło nie tak. Spróbuj ponownie.");
          }
        })
        .catch(console.error);
    },
  });

  useEffect(() => {
    if (!isLoading && !isError && auth.token) {
      if (formik.touched.first_name && formik.errors.first_name) {
        refTofirst_name.current.style.borderColor = "red";
      } else {
        refTofirst_name.current.style.borderColor = "#DADADA";
      }

      if (formik.touched.last_name && formik.errors.last_name) {
        refTolast_name.current.style.borderColor = "red";
      } else {
        refTolast_name.current.style.borderColor = "#DADADA";
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
    }
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (!auth.token) {
    return <>Nie masz uprawnień do przeglądu</>;
  }

  return (
    <div className={styles.modProfile}>
      <div className={styles["mod-profile__container"]}>
        <h1 className={styles["mod-profile__label-h1"]}>
          <strong>Modyfikuj dane</strong>
        </h1>
        <form
          className={styles["mod-profile__form"]}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles["mod-profile_form-input-div-first"]}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={data.image}
                className={styles["mod-profile__image"]}
                alt="Brak zdjęcia"
              />
            </div>

            <div
              style={{
                marginTop: "10%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <label
                htmlFor={styles["mod-profile__form-input-div-surname"]}
                style={{ position: "absolute" }}
              >
                Zmień:
              </label>
              <input
                name="image"
                type="file"
                onChange={mainImageChangedHandler}
                id={styles["mod-profile__form-input-div-surname"]}
                accept="image/png, image/jpeg"
              />
            </div>
          </div>

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-name"]}
              style={{ position: "absolute" }}
            >
              *Imię:
            </label>
            <input
              type="text"
              ref={refTofirst_name}
              name="first_name"
              id={styles["mod-profile__form-input-div-name"]}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.first_name}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-surname"]}
              style={{ position: "absolute" }}
            >
              *Nazwisko:
            </label>
            <input
              type="text"
              ref={refTolast_name}
              name="last_name"
              id={styles["mod-profile__form-input-div-surname"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.last_name}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-pesel"]}
              style={{ position: "absolute" }}
            >
              *PESEL:
            </label>
            <input
              type="text"
              ref={refToPesel}
              name="pesel"
              id={styles["mod-profile__form-input-div-pesel"]}
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

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-tel"]}
              style={{ position: "absolute" }}
            >
              *Tel:
            </label>
            <PhoneInput
              country={"pl"}
              placeholder={""}
              specialLabel="*Numer telefonu"
              value={phoneNumber}
              onChange={handleOnChangePhone}
              inputProps={{
                name: "phone",
                id: styles["mod-profile__form-input-div-tel"],
                onBlur: formik.handleBlur,
              }}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-adress"]}
              style={{ position: "absolute" }}
            >
              *Ulica:
            </label>
            <input
              name="street"
              type="text"
              ref={refToStreet}
              id={styles["mod-profile__form-input-div-adress"]}
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

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-adress-building"]}
              style={{ position: "absolute" }}
            >
              *Numer budynku:
            </label>
            <input
              name="buildingNumber"
              type="text"
              ref={refToBuilding}
              id={styles["mod-profile__form-input-div-adress-building"]}
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

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-adress-apartment"]}
              style={{ position: "absolute" }}
            >
              *Numer mieszkania:
            </label>
            <input
              name="apartmentNumber"
              type="text"
              ref={refToApartment}
              id={styles["mod-profile__form-input-div-adress-apartment"]}
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

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-adress-city"]}
              style={{ position: "absolute" }}
            >
              *Miasto:
            </label>
            <input
              name="city"
              type="text"
              ref={refToCity}
              id={styles["mod-profile__form-input-div-adress-city"]}
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

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-adress-zip"]}
              style={{ position: "absolute" }}
            >
              *Kod pocztowy:
            </label>
            <input
              name="zip"
              type="text"
              ref={refToZip}
              id={styles["mod-profile__form-input-div-adress-zip"]}
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

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-email"]}
              style={{ position: "absolute" }}
            >
              *Email:
            </label>
            <input
              type="email"
              name="email"
              ref={refToEmail}
              id={styles["mod-profile__form-input-div-email"]}
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
          <button
            type="submit"
            className={styles["mod-profile__form-submit-button"]}
          >
            Zmodifikuj
          </button>
          <p style={{ width: "100vh", textAlign: "center" }}>lub</p>
          <button
            onClick={() => history.push(infoToGoBack)}
            className={styles["mod-profile__form-cancel-button"]}
          >
            Anuluj
          </button>
        </form>
      </div>
    </div>
  );
}
