interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureItem({
  icon,
  title,
  description,
}: FeatureItemProps) {
  // Check if icon is a Font Awesome class or emoji
  const isFontAwesome = icon.includes("fa-") || icon.includes("fas ");

  return (
    <div className="feature-item">
      <div className="feature-icon">
        {isFontAwesome ? (
          <i className={icon}></i>
        ) : (
          <span className="emoji-icon">{icon}</span>
        )}
      </div>
      <div className="feature-text">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
