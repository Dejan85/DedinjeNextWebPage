import Image from "./Image";

interface SocialLink {
  platform: "facebook" | "linkedin" | "email";
  url: string;
}

interface TeamCardProps {
  image: string;
  name: string;
  role: string;
  description: string;
  socialLinks?: SocialLink[];
}

const socialIcons = {
  facebook: "fab fa-facebook-f",
  linkedin: "fab fa-linkedin-in",
  email: "fas fa-envelope",
};

export default function TeamCard({
  image,
  name,
  role,
  description,
  socialLinks = [],
}: TeamCardProps) {
  return (
    <div className="team-card">
      <div className="team-image">
        <Image src={image} alt={name} width={400} height={500} />
        <div className="team-overlay">
          <div className="team-social">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.url}>
                <i className={socialIcons[link.platform]}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="team-info">
        <h4>{name}</h4>
        <span className="team-role">{role}</span>
        <p>{description}</p>
      </div>
    </div>
  );
}
