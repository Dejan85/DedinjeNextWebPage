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
    <div className="department-card">
      <div className="department-image">
        <img src={image} alt={title} />
        <div className="department-overlay">
          <a href={linkHref} className="department-link">
            <i className="fas fa-plus"></i>
          </a>
        </div>
      </div>
      <div className="department-info">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
