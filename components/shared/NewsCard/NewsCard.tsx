import Image from "../Image/Image";
import styles from "./NewsCard.module.css";

interface NewsCardProps {
  image: string;
  category: string;
  date: string;
  author?: string;
  title: string;
  description?: string;
  linkHref: string;
  size?: "large" | "small";
}

export default function NewsCard({
  image,
  category,
  date,
  author,
  title,
  description,
  linkHref,
  size = "large",
}: NewsCardProps) {
  return (
    <div
      className={`${styles.newsCard} ${size === "large" ? styles.large : styles.small}`}
    >
      <div className={styles.newsImage}>
        <Image
          src={image}
          alt={title}
          width={size === "large" ? 800 : 400}
          height={size === "large" ? 500 : 300}
        />
        {size === "large" && (
          <div className={styles.newsCategory}>{category}</div>
        )}
      </div>
      <div className={styles.newsContent}>
        <div className={styles.newsMeta}>
          <span>
            <i className="far fa-calendar-alt"></i> {date}
          </span>
          {author && size === "large" && (
            <span>
              <i className="far fa-user"></i> {author}
            </span>
          )}
        </div>
        {size === "large" ? <h3>{title}</h3> : <h4>{title}</h4>}
        {description && <p>{description}</p>}
        <a href={linkHref} className={styles.newsLink}>
          {size === "large" ? "Прочитајте више" : "Сазнајте више"}{" "}
          <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
}
