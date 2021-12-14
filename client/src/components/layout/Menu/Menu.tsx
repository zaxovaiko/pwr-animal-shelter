import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchAnimalTypes } from "../../../api/animals";
import styles from "./Menu.module.css";
import SubMenu, { MenuLink } from "./SubMenu";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Menu({ isOpened }: { isOpened: boolean }) {
  const [current, setCurrent] = useState<number | undefined>(undefined);
  const { isError, isLoading, data } = useQuery("getAnimalTypes", () =>
    fetchAnimalTypes()
  );
  const { auth } = useContext(AuthContext);

  if (isError || isLoading) {
    return <></>;
  }

  const submenu = data?.results.map(
    ({ id, value }: { id: string; value: string }) => ({
      path: "/" + id,
      text: value,
    })
  );

  function permissionCheck() {
    let links: MenuLink[] & { submenu?: MenuLink[] } = [];

    if (auth.user) {
      if (auth.user.is_staff) {
        links = [
          { path: "/adoption", text: "Adopcja", submenu },
          { path: "/contact", text: "Kontakt" },
          { path: "/reservations", text: "Rezerwacje" },
          { path: "/forms", text: "Formularzy" },
          { path: "/animals-add", text: "Dodać zwierzę" },
        ];
      } else {
        links = [
          { path: "/adoption", text: "Adopcja", submenu },
          { path: "/contact", text: "Kontakt" },
          { path: "/charity", text: "Jak pomóc?" },
          { path: "/about-us", text: "O nas" },
          { path: "/reserved-animals", text: "Moje rezerwacje" },
          { path: "/adopted-animals", text: "Moje zwierzęta" },
        ];
        return links;
      }
    } else {
      links = [
        { path: "/adoption", text: "Adopcja", submenu },
        { path: "/contact", text: "Kontakt" },
        { path: "/charity", text: "Jak pomóc?" },
        { path: "/about-us", text: "O nas" },
      ];
    }
    return links;
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
