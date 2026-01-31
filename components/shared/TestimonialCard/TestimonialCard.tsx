import Image from "../Image/Image";
import styles from "./TestimonialCard.module.css";

interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
}

export default function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorImage,
}: TestimonialCardProps) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.testimonialContent}>
        <div className={styles.quoteIcon}>
          <i className="fas fa-quote-left"></i>
        </div>
        <p>{quote}</p>
        <div className={styles.testimonialAuthor}>
          <div className={styles.authorAvatar}>
            <Image
              src={authorImage}
              alt={authorName}
              width={100}
              height={100}
            />
          </div>
          <div className={styles.authorInfo}>
            <h5>{authorName}</h5>
            <span>{authorRole}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
