import styles from "./ModificateProfile.module.css";
import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { AuthContext } from "../../contexts/AuthContext";
import { useQuery } from "react-query";
import { fetchProfileData, fetchUpdateProfileData } from "../../api/profile";
import { useAlert } from "react-alert";

let refTofirst_name: React.RefObject<any> = React.createRef();
let refTolast_name: React.RefObject<any> = React.createRef();
let refToPesel: React.RefObject<any> = React.createRef();
let refTophone: React.RefObject<any> = React.createRef();
let refToEmail: React.RefObject<any> = React.createRef();
let refToPassword: React.RefObject<any> = React.createRef();

const validate = (values: any) => {
  function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
  }

  const errors: {
    first_name?: String;
    last_name?: String;
    address?: String;
    pesel?: String;
    phone?: String;
    email?: String;
    password?: String;
  } = {};
  if (!values.first_name) {
    errors.first_name = "*Pole jest obowiązkowe";
  } else if (values.first_name.length > 15) {
    errors.first_name = "*Pole musi mieć nie więcej niż 15 znaków";
  }

  if (!values.last_name) {
    errors.last_name = "*Pole jest obowiązkowe";
  } else if (values.last_name.length > 20) {
    errors.last_name = "*Pole musi mieć nie więcej niż 20 znaków";
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
  } else if (values.phone.length !== 9) {
    errors.phone = "*Pole musi mieć 9 znaków";
  } else if (!isNumeric(values.phone)) {
    errors.phone = "*Pole musi zawierać wyłącznie cyfry";
  }

  if (!values.email) {
    errors.email = "*Pole jest obowiązkowe";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "*Niepoprawne dane";
  }

  if (!values.password) {
    errors.password = "*Pole jest obowiązkowe";
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
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: data == undefined ? "" : data.first_name,
      last_name: data == undefined ? "" : data.last_name,
      address: data == undefined ? "" : data.address,
      pesel: data == undefined ? "" : data.pesel,
      phone: data == undefined ? "" : data.phone,
      email: data == undefined ? "" : data.email,
      password: "",
    },
    validate,
    onSubmit: (values) => {
      fetchUpdateProfileData(
        {
          first_name: values.first_name,
          last_name: values.last_name,
          address: values.address,
          pesel: values.pesel,
          phone: values.phone,
          email: values.email,
          password: values.password,
        },
        data.id,
        auth.token
      )
        .then((res: any) => {
          if (res) {
            alert.success("Twoje dane zostały zmodyfikowane!");
            return history.push(infoToGoBack);
          }
          alert.error("Coś poszło nie tak. Spróbuj ponownie.");
        })
        .catch(console.error);
    },
  });

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <h1>Error has occured</h1>;
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
            <input
              name="phone"
              id={styles["mod-profile__form-input-div-tel"]}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              ref={refTophone}
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
              Adres:
            </label>
            <input
              name="address"
              type="text"
              id={styles["mod-profile__form-input-div-adress"]}
              onChange={formik.handleChange}
              value={formik.values.address}
            />
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

          <div className={styles["mod-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-profile__form-input-div-password"]}
              style={{ position: "absolute" }}
            >
              *Hasło:
            </label>
            <input
              type="password"
              name="password"
              ref={refToPassword}
              id={styles["mod-profile__form-input-div-password"]}
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
