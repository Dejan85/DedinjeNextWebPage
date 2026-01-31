import Image from "../Image/Image";
import styles from "./DepartmentCard.module.css";

interface DepartmentCardProps {
  image: string;
  title: string;
  description: string;
  linkHref: string;
}

export default function DepartmentCard({
  image,
  title,
  description,
  linkHref,
}: DepartmentCardProps) {
  return (
    <div className={styles.departmentCard}>
      <div className={styles.departmentImage}>
        <Image src={image} alt={title} width={600} height={400} />
        <div className={styles.departmentOverlay}>
          <a href={linkHref} className={styles.departmentLink}>
            <i className="fas fa-plus"></i>
          </a>
        </div>
      </div>
      <div className={styles.departmentInfo}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
