"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./page.module.css";

export default function KontaktForm() {
  const t = useTranslations("KontaktForm");
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    poruka: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>
          <i className="fas fa-check-circle" aria-hidden />
        </div>
        <h3>{t("successTitle")}</h3>
        <p>{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="ime">
            {t("firstNameLabel")} <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="ime"
            required
            value={formData.ime}
            onChange={(e) => setFormData({ ...formData, ime: e.target.value })}
            placeholder={t("firstNamePlaceholder")}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="prezime">{t("lastNameLabel")}</label>
          <input
            type="text"
            id="prezime"
            value={formData.prezime}
            onChange={(e) => setFormData({ ...formData, prezime: e.target.value })}
            placeholder={t("lastNamePlaceholder")}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">
          {t("emailLabel")} <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={t("emailPlaceholder")}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="poruka">
          {t("messageLabel")} <span className={styles.required}>*</span>
        </label>
        <textarea
          id="poruka"
          required
          rows={5}
          value={formData.poruka}
          onChange={(e) => setFormData({ ...formData, poruka: e.target.value })}
          placeholder={t("messagePlaceholder")}
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        <i className="fas fa-paper-plane" aria-hidden />
        {t("submit")}
      </button>
    </form>
  );
}
