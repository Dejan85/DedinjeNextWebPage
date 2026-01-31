interface ScheduleRow {
  days: string;
  hours: string;
}

interface InfoBoxProps {
  icon: string;
  title: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  schedule?: ScheduleRow[];
  emergencyPhone?: string;
  emergencyNote?: string;
  className?: string;
}

export default function InfoBox({
  icon,
  title,
  description,
  linkText,
  linkHref,
  schedule,
  emergencyPhone,
  emergencyNote,
  className = "",
}: InfoBoxProps) {
  return (
    <div className={`info-box ${className}`}>
      <div className="info-box-icon">
        <i className={icon}></i>
      </div>
      <div className="info-box-content">
        <h3>{title}</h3>

        {/* Schedule section */}
        {schedule && (
          <div className="schedule">
            {schedule.map((row, index) => (
              <div key={index} className="schedule-row">
                <span>{row.days}</span>
                <span>{row.hours}</span>
              </div>
            ))}
          </div>
        )}

        {/* Description section */}
        {description && <p>{description}</p>}

        {/* Emergency phone section */}
        {emergencyPhone && (
          <>
            <div className="emergency-phone">{emergencyPhone}</div>
            {emergencyNote && <p>{emergencyNote}</p>}
          </>
        )}

        {/* Link section */}
        {linkText && linkHref && (
          <a href={linkHref} className="info-box-link">
            {linkText} <i className="fas fa-arrow-right"></i>
          </a>
        )}
      </div>
    </div>
  );
}
