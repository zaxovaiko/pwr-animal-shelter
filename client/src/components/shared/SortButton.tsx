import { useState } from "react";
import { Button } from "react-bootstrap";
import {
  MdOutlineTextRotateUp,
  MdOutlineTextRotationDown,
} from "react-icons/md";
import styles from "./Button.module.css";

export type SortOrder = "asc" | "desc";

export default function SortButton({
  labels,
  refetchData,
}: {
  labels: { [key in SortOrder]: string };
  refetchData: (order: SortOrder) => void;
}) {
  const [order, setOrder] = useState<SortOrder>("asc");

  function changeOrder() {
    setOrder((p) => (p === "asc" ? "desc" : "asc"));
    refetchData(order);
  }

  return (
    <Button className={styles["button-green"]} onClick={changeOrder}>
      {order === "asc" ? (
        <>
          {labels.asc}
          <MdOutlineTextRotateUp className="ml-3 fs-2" />
        </>
      ) : (
        <>
          {labels.desc}
          <MdOutlineTextRotationDown className="ml-3 fs-2" />
        </>
      )}
    </Button>
  );
}
