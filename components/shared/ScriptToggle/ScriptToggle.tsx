"use client";

import { useScript } from "../ScriptProvider/ScriptProvider";
import styles from "./ScriptToggle.module.css";

export default function ScriptToggle() {
  const { script, setScript } = useScript();

  return (
    <div className={styles.toggle} role="group" aria-label="Писмо: ћирилица или latinica">
      <button
        type="button"
        className={script === "cyr" ? styles.active : undefined}
        onClick={() => setScript("cyr")}
        aria-pressed={script === "cyr"}
      >
        Ћир
      </button>
      <span className={styles.divider} aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={script === "lat" ? styles.active : undefined}
        onClick={() => setScript("lat")}
        aria-pressed={script === "lat"}
      >
        Lat
      </button>
    </div>
  );
}
