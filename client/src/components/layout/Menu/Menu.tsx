import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import SubMenu, { MenuLink } from "./SubMenu";

export default function Menu({ isOpened }: { isOpened: boolean }) {
  const [current, setCurrent] = useState<number | undefined>(undefined);

  const submenu = [
    { path: "/dogs", text: "Psy" },
    { path: "/cats", text: "Koty" },
    { path: "/other", text: "Inne" },
  ];

  const links: MenuLink[] & { submenu?: MenuLink[] } = [
    { path: "/adoption", text: "Adopcja", submenu },
    { path: "/contact", text: "Kontakt" },
    { path: "/charity", text: "Jak pomóc?" },
  ];

  return (
    <ul className={styles["c-header__menu"] + (!isOpened ? " d-none" : " d-block")}>
      {links.map(({ path, text, submenu }, i) => (
        <li key={i} onClick={() => setCurrent(i)}>
          <Link to={submenu ? "#" : path}>{text}</Link>
          <SubMenu parentPath={path} isOpened={current === i} links={submenu} />
        </li>
      ))}
    </ul>
  );
}
