import Image from "./Image";

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
    <div className="testimonial-card">
      <div className="testimonial-content">
        <div className="quote-icon">
          <i className="fas fa-quote-left"></i>
        </div>
        <p>{quote}</p>
        <div className="testimonial-author">
          <div className="author-avatar">
            <Image
              src={authorImage}
              alt={authorName}
              width={100}
              height={100}
            />
          </div>
          <div className="author-info">
            <h5>{authorName}</h5>
            <span>{authorRole}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
