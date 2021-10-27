import styles from "./Footer.module.css";
import { ReactComponent as BubbleLeft } from "../../../assets/footer/svg/bubble-left.svg";
import { ReactComponent as BubbleRight } from "../../../assets/footer/svg/bubble-right.svg";

export default function Footer() {
  return (
    <div className={styles["c-footer"]}>
      <BubbleLeft className={styles["c-footer__circle-left"]} />
      <BubbleRight className={styles["c-footer__circle-right"]} />
    </div>
  );
}
