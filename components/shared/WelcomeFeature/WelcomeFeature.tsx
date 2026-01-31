interface WelcomeFeatureProps {
  icon: string;
  text: string;
}

export default function WelcomeFeature({ icon, text }: WelcomeFeatureProps) {
  return (
    <div className="welcome-feature">
      <i className={icon}></i>
      <span>{text}</span>
    </div>
  );
}
