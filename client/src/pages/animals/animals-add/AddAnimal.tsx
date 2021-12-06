import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useContext, useEffect, useState } from "react";
import styles from "./AddAnimal.module.css";
import { AuthContext } from "../../../contexts/AuthContext";

import {
  fetchAddAnimalData,
  fetchAnimalBreeds,
  fetchAnimalGenders,
  fetchAnimalStatuses,
  fetchAnimalTypes,
} from "../../../api/animals";
import { useFormik } from "formik";
import React from "react";
import { Container, Image } from "react-bootstrap";

let refToChipCode: React.RefObject<any> = React.createRef();
let refToName: React.RefObject<any> = React.createRef();
let refToAge: React.RefObject<any> = React.createRef();
let refToHeight: React.RefObject<any> = React.createRef();
let refToWeight: React.RefObject<any> = React.createRef();
let refToColor: React.RefObject<any> = React.createRef();
let refToDescription: React.RefObject<any> = React.createRef();
let refToVaccinations: React.RefObject<any> = React.createRef();

const validate = (values: any) => {
  function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
  }

  function isInDesiredForm(number: string) {
    return /^\+?(0|[1-9]\d*)$/.test(number);
  }

  const errors: {
    chip_code?: String;
    type?: String;
    name?: String;
    age?: String;
    height?: String;
    weight?: String;
    gender?: String;
    breed?: String;
    status?: String;
    color?: String;
    description?: String;
    vaccinations?: String;
  } = {};

  if (!values.chip_code) {
    errors.chip_code = "*Pole jest obowiązkowe";
  }

  if (!values.type) {
    errors.type = "*Pole jest obowiązkowe";
  }

  if (!values.name) {
    errors.name = "*Pole jest obowiązkowe";
  }

  if (!values.age) {
    errors.age = "*Pole jest obowiązkowe";
  } else if (!isNumeric(values.age)) {
    errors.age = "*Pole musi zawierać wyłącznie cyfry";
  }

  if (!isInDesiredForm(values.weight)) {
    errors.weight = "*Masa musi być większa lub równa 0";
  }

  if (!isInDesiredForm(values.height)) {
    errors.height = "*Wzrost musi być większy lub równy 0";
  }

  if (!values.gender) {
    errors.gender = "*Pole jest obowiązkowe";
  }

  if (!values.breed) {
    errors.breed = "*Pole jest obowiązkowe";
  }

  if (!values.status) {
    errors.status = "*Pole jest obowiązkowe";
  }

  if (!values.color) {
    errors.color = "*Pole jest obowiązkowe";
  }

  if (!values.description) {
    errors.description = "*Pole jest obowiązkowe";
  }

  if (!values.vaccinations) {
    errors.vaccinations = "*Pole jest obowiązkowe";
  }
  return errors;
};

export default function AddAnimal() {
  const alert = useAlert();
  const history = useHistory();
  const infoToGoBack: string = "/";
  const { auth } = useContext(AuthContext);

  const [selectedFiles, setSelectedFile] = useState([]);
  const [mainAnimalImage, setMainAnimalImage] = useState("");

  function fileChangedHandler(event: any) {
    setSelectedFile(event.target.files);
  }
  function mainImageChangedHandler(event: any) {
    setMainAnimalImage(event.target.files[0]);
  }

  const typesQuery = useQuery("getAnimalTypes", () => fetchAnimalTypes());
  const breedsQuery = useQuery("getAnimalBreeds", () => fetchAnimalBreeds());
  const statusesQuery = useQuery("getAnimalStatuses", () =>
    fetchAnimalStatuses()
  );
  const gendersQuery = useQuery("getAnimalGenders", () => fetchAnimalGenders());

  const formik = useFormik({
    initialValues: {
      chip_code: "",
      type: "1",
      name: "",
      age: "",
      height: "",
      weight: "",
      gender: "1",
      breed: "1",
      status: "1",
      color: "",
      description: "",
      vaccinations: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values)
      const formData = new FormData();
      if (selectedFiles != []) {
        for (var x = 0; x < selectedFiles.length; x++) {
          formData.append("images", selectedFiles[x]);
        }
      }
      if (mainAnimalImage != "") {
        formData.append("image", mainAnimalImage);
      }
      formData.append("chip_code", values.chip_code);
      formData.append("animal_type_id", values.type);
      formData.append("name", values.name);
      formData.append("age", values.age);
      formData.append("height", values.height);
      formData.append("weight", values.weight);
      formData.append("animal_gender_id", values.gender);
      formData.append("animal_breed_id", values.breed);
      formData.append("animal_status_id", values.status);
      formData.append("color", values.color);
      formData.append("description", values.description);
      formData.append("vaccinations", values.vaccinations);
      fetchAddAnimalData(formData, auth.token)
        .then((res: any) => {
          console.log(res)
          if (res.id) {
            alert.success("Zwierzę zostało dodane!");
            return history.push(infoToGoBack);
          } else if(res.chip_code) {
            alert.error("Podany chip już istnieje!");
          }
        })
        .catch(console.error);
    },
  });

  useEffect(() => {
    if (auth.token) {
      if (formik.touched.chip_code && formik.errors.chip_code) {
        refToChipCode.current.style.borderColor = "red";
      } else {
        refToChipCode.current.style.borderColor = "#DADADA";
      }

      if (formik.touched.name && formik.errors.name) {
        refToName.current.style.borderColor = "red";
      } else {
        refToName.current.style.borderColor = "#DADADA";
      }

      if (formik.touched.age && formik.errors.age) {
        refToAge.current.style.borderColor = "red";
      } else {
        refToAge.current.style.borderColor = "#DADADA";
      }

      if (formik.touched.height && formik.errors.height) {
        refToHeight.current.style.borderColor = "red";
      } else {
        refToHeight.current.style.borderColor = "#DADADA";
      }

      if (formik.touched.weight && formik.errors.weight) {
        refToWeight.current.style.borderColor = "red";
      } else {
        refToWeight.current.style.borderColor = "#DADADA";
      }

      if (formik.touched.color && formik.errors.color) {
        refToColor.current.style.borderColor = "red";
      } else {
        refToColor.current.style.borderColor = "#DADADA";
      }

      if (formik.touched.description && formik.errors.description) {
        refToDescription.current.style.borderColor = "red";
      } else {
        refToDescription.current.style.borderColor = "#DADADA";
      }

      if (formik.touched.vaccinations && formik.errors.vaccinations) {
        refToVaccinations.current.style.borderColor = "red";
      } else {
        refToVaccinations.current.style.borderColor = "#DADADA";
      }
    }
  });

  const optionsBreedsExample = [
    {
      label: "Bulldog",
      value: "1",
    },
  ];

  const optionsTypesExample = [
    {
      label: "Pies",
      value: "1",
    },
  ];

  const optionsStatusesExample = [
    {
      label: "Brak",
      value: "1",
    },
  ];

  const optionsGenders = [
    {
      label: "Samiec",
      value: "1",
    },
    {
      label: "Samica",
      value: "2",
    },
    {
      label: "Brak",
      value: "3",
    },
  ];

  const optionsTypes =
  typesQuery.data == undefined
      ? optionsTypesExample
      : typesQuery.data?.results.map(
          ({ id, value }: { id: string; value: string }) => ({
            label: value,
            value: id,
          })
        );

  const optionsBreeds =
    breedsQuery.data == undefined
      ? optionsBreedsExample
      : breedsQuery.data?.results.map(
          ({ id, value }: { id: string; value: string }) => ({
            label: value,
            value: id,
          })
        );

  const optionsStatuses =
    statusesQuery.data == undefined
      ? optionsStatusesExample
      : statusesQuery.data?.results.map(
          ({ id, value }: { id: string; value: string }) => ({
            label: value,
            value: id,
          })
        );

  return (
    <div className={styles.modProfile}>
      <div className={styles["mod-animal-profile__container"]}>
        <h1 className={styles["mod-animal-profile__label-h1"]}>
          <strong>Dodaj zwierzę</strong>
        </h1>
        <form
          className={styles["mod-animal-profile__form"]}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles["mod-animal-profile_form-input-div-first"]}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                className={styles["mod-animal__image"]}
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
                htmlFor={styles["mod-animal-profile__form-input-div-weight"]}
                style={{ position: "absolute" }}
              >
                Dodaj:
              </label>
              <input
                name="image"
                type="file"
                onChange={mainImageChangedHandler}
                id={styles["mod-animal-profile__form-input-div-weight"]}
                accept="image/png, image/jpeg"
              />
            </div>
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-chip"]}
              style={{ position: "absolute" }}
            >
              *Chip:
            </label>
            <input
              type="text"
              ref={refToChipCode}
              name="chip_code"
              id={styles["mod-animal-profile__form-input-div-chip"]}
              onBlur={formik.handleBlur}
              value={formik.values.chip_code}
              onChange={formik.handleChange}
            />
            {formik.touched.chip_code && formik.errors.chip_code ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.chip_code}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-type"]}
              style={{ position: "absolute" }}
            >
              *Typ:
            </label>
            <select
              id={styles["mod-animal-profile__form-input-div-type"]}
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
            >
              {optionsTypes.map((option: any) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-name"]}
              style={{ position: "absolute" }}
            >
              *Imię:
            </label>
            <input
              type="text"
              ref={refToName}
              name="name"
              id={styles["mod-animal-profile__form-input-div-name"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-age"]}
              style={{ position: "absolute" }}
            >
              *Wiek:
            </label>
            <input
              name="age"
              type="text"
              ref={refToAge}
              id={styles["mod-animal-profile__form-input-div-age"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.age}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-height"]}
              style={{ position: "absolute" }}
            >
              *Wzrost (cm):
            </label>
            <input
              name="height"
              type="text"
              ref={refToHeight}
              id={styles["mod-animal-profile__form-input-div-height"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.height}
            />
            {formik.touched.height && formik.errors.height ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.height}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-weight"]}
              style={{ position: "absolute" }}
            >
              *Masa (kg):
            </label>
            <input
              name="weight"
              type="text"
              ref={refToWeight}
              id={styles["mod-animal-profile__form-input-div-weight"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.weight}
            />
            {formik.touched.weight && formik.errors.weight ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.weight}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-gender"]}
              style={{ position: "absolute" }}
            >
              *Płeć:
            </label>
            <select
              id={styles["mod-animal-profile__form-input-div-gender"]}
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
            >
              {optionsGenders.map((option: any) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-breed"]}
              style={{ position: "absolute" }}
            >
              *Rasa:
            </label>
            <select
              id={styles["mod-animal-profile__form-input-div-breed"]}
              name="breed"
              onChange={formik.handleChange}
              value={formik.values.breed}
            >
              {optionsBreeds.map((option: any) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-status"]}
              style={{ position: "absolute" }}
            >
              *Status:
            </label>
            <select
              id={styles["mod-animal-profile__form-input-div-status"]}
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
            >
              {optionsStatuses.map((option: any) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-color"]}
              style={{ position: "absolute" }}
            >
              *Kolor:
            </label>
            <input
              type="text"
              name="color"
              ref={refToColor}
              id={styles["mod-animal-profile__form-input-div-color"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.color}
            />
            {formik.touched.color && formik.errors.color ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.color}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-email"]}
              style={{ position: "absolute" }}
            >
              *Harakterystyka:
            </label>
            <textarea
              name="description"
              ref={refToDescription}
              style={{ width: "100%", height: "30vh" }}
              id={styles["mod-animal__form-input-info"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.description}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-email"]}
              style={{ position: "absolute" }}
            >
              *Szczepienia:
            </label>
            <textarea
              name="vaccinations"
              ref={refToVaccinations}
              style={{ width: "100%", height: "30vh" }}
              id={styles["mod-animal__form-input-info"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.vaccinations}
            />
            {formik.touched.vaccinations && formik.errors.vaccinations ? (
              <div style={{ color: "red", position: "absolute" }}>
                {formik.errors.vaccinations}
              </div>
            ) : null}
          </div>

          <div className={styles["mod-animal-profile_form-input-div"]}>
            <label
              htmlFor={styles["mod-animal-profile__form-input-div-weight"]}
              style={{ position: "absolute", width: "5%" }}
            >
              Dodaj zdjęcia:
            </label>
            <input
              name="images"
              type="file"
              onChange={fileChangedHandler}
              id={styles["mod-animal-profile__form-input-div-weight"]}
              accept="image/png, image/jpeg"
              style={{ marginTop: "3%" }}
              multiple
            />
          </div>

          <button
            type="submit"
            className={styles["mod-animal-profile__form-submit-button"]}
          >
            Dodaj zwierzę
          </button>
          <p style={{ width: "100vh", textAlign: "center" }}>lub</p>
          <button
            onClick={() => history.push(infoToGoBack)}
            className={styles["mod-animal-profile__form-cancel-button"]}
          >
            Anuluj
          </button>
        </form>
      </div>
    </div>
  );
}
