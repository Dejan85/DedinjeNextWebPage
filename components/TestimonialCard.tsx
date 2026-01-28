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
            <img src={authorImage} alt={authorName} />
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
