interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  linkHref: string;
  featured?: boolean;
  featuredLabel?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  linkHref,
  featured = false,
  featuredLabel = "Најтраженије",
}: ServiceCardProps) {
  return (
    <div className={`service-card ${featured ? "featured" : ""}`}>
      {featured && <div className="featured-badge">{featuredLabel}</div>}
      <div className="service-icon-wrapper">
        <div className="service-icon">
          <i className={icon}></i>
        </div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="service-list">
        {features.map((feature, index) => (
          <li key={index}>
            <i className="fas fa-angle-right"></i> {feature}
          </li>
        ))}
      </ul>
      <a href={linkHref} className="service-link">
        Сазнајте више <i className="fas fa-long-arrow-alt-right"></i>
      </a>
    </div>
  );
}
