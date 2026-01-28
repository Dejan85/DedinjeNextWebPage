import Image from "./Image";

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
        <Image src={image} alt={title} width={600} height={400} />
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
