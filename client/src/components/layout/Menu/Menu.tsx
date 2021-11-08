import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchAnimalTypes } from "../../../api/animals";
import styles from "./Menu.module.css";
import SubMenu, { MenuLink } from "./SubMenu";

export default function Menu({ isOpened }: { isOpened: boolean }) {
  const [current, setCurrent] = useState<number | undefined>(undefined);
  const { isError, isLoading, data } = useQuery("getAnimalTypes", () =>
    fetchAnimalTypes()
  );

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <></>;
  }

  const submenu = data?.map(({ id, value }: { id: string; value: string }) => ({
    path: "/" + value.toLowerCase(),
    text: value,
  }));

  const links: MenuLink[] & { submenu?: MenuLink[] } = [
    { path: "/adoption", text: "Adopcja", submenu },
    { path: "/contact", text: "Kontakt" },
    { path: "/charity", text: "Jak pomóc?" },
    { path: "/forms", text: "Formulary" },
  ];

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
