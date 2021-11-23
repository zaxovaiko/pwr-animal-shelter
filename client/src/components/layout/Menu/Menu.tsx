import {useContext, useState} from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchAnimalTypes } from "../../../api/animals";
import styles from "./Menu.module.css";
import SubMenu, { MenuLink } from "./SubMenu";
import {useParams} from "react-router";
import {AuthContext} from "../../../contexts/AuthContext";

export default function Menu({ isOpened }: { isOpened: boolean }) {
  const [current, setCurrent] = useState<number | undefined>(undefined);
  const { isError, isLoading, data } = useQuery("getAnimalTypes", () =>
    fetchAnimalTypes()
  );

    const { id } = useParams<{ id: string }>();
    const { auth } = useContext(AuthContext);
    const { isError: isError2, isLoading: isLoading2, data: User } = useQuery("fetchProfileData", () =>
        fetch(id)
    );

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <></>;
  }

  const submenu = data?.results.map(({ id, value }: { id: string; value: string }) => ({
    path: "/" + id,
    text: value,
  }));

  function permissionCheck() {
    let links : MenuLink[] & { submenu?: MenuLink[] } = [];

    if (auth.user) {
      if (auth.user.is_staff) {
        links = [
          { path: "/adoption", text: "Adopcja", submenu },
          { path: "/about-us", text: "O nas"},
          { path: "/contact", text: "Kontakt" },
          { path: "/charity", text: "Jak pomóc?" },
          { path: "/reservations", text: "Rezerwacje"},
          { path: "/forms", text: "Formularzy" },
          { path: "/", text: "Strona główna"},
        ]
      }else {
        links = [
          { path: "/adoption", text: "Adopcja", submenu },
          { path: "/about-us", text: "O nas"},
          { path: "/contact", text: "Kontakt" },
          { path: "/charity", text: "Jak pomóc?" },
          { path: "/reserved-animals", text: "Moje rezerwacje" },
          { path: "/", text: "Strona główna"},
        ]
        return links
      }
    } else {
      links = [
        { path: "/adoption", text: "Adopcja", submenu },
        { path: "/contact", text: "Kontakt" },
        { path: "/charity", text: "Jak pomóc?" },
        { path: "/", text: "Strona główna"},
      ]
    }
    return links
  }

  const links: MenuLink[] & { submenu?: MenuLink[] } = permissionCheck();

  return (
    <ul
      className={
        styles["c-header__menu"] + (!isOpened ? " d-none" : " d-block")
      }
    >
      {links.map(({ path, text, submenu }, i) => (
        <li key={i} onClick={() => setCurrent(i)}>
          <Link to={submenu ? "#" : path}>{text}</Link>
          <SubMenu parentPath={path} isOpened={current === i} links={submenu} />
        </li>
      ))}
    </ul>
  );
}
