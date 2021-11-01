import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import SubMenu, { MenuLink } from "./SubMenu";

export default function Menu({ isOpened }: { isOpened: boolean }) {
  const [current, setCurrent] = useState<number | undefined>(undefined);

  const submenu = [
    { path: "/", text: "Psy" },
    { path: "/", text: "Koty" },
    { path: "/", text: "Inne" },
  ];

  const links: MenuLink[] & { submenu?: MenuLink[] } = [
    { path: "#", text: "Adopcja", submenu },
    { path: "/contact", text: "Kontakt" },
    { path: "/charity", text: "Jak pomóc?" },
    { path: "/forms", text: "Formulary" },
  ];

  return (
    <ul className={styles["c-header__menu"] + (!isOpened ? " d-none" : " d-block")}>
      {links.map(({ path, text, submenu }, i) => (
        <li key={i} onClick={() => setCurrent(i)}>
          <Link to={path}>{text}</Link>
          <SubMenu isOpened={current === i} links={submenu} />
        </li>
      ))}
    </ul>
  );
}
