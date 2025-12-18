
import React from "react";

type Trend = {
  value: number;            // e.g., +12 or -5
  label?: string;           // e.g., "vs last week"
};

type Props = {
  title: string;            // "Lorem ipsum"
  value: string | number;   // 1974
  subtitle?: string;        // "Week"
  icon?: React.ReactNode;   // optional icon node
  trend?: Trend;            // optional trend badge
  footer?: React.ReactNode; // optional small footer
  onClick?: () => void;
  loading?: boolean;
  variant?: "default" | "primary" | "warning" | "success";
  className?: string;
};

const Card: React.FC<Props> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  footer,
  onClick,
  loading = false,
  variant = "default",
  className,
}) => {
  return (
    <div
      className={[
        "card",
        `card--${variant}`,
        onClick ? "card--clickable" : "",
        className || "",
      ].join(" ")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {/* Header: icon + title + trend */}
      <div className="card__header">
        <div className="card__titleRow">
          {icon && <div className="card__icon">{icon}</div>}
          <div className="card__titleBlock">
            <div className="card__title">{title}</div>
            {subtitle && <div className="card__subtitle">{subtitle}</div>}
          </div>
        </div>

        {trend && (
          <div
            className={[
              "card__trend",
              trend.value >= 0 ? "card__trend--up" : "card__trend--down",
            ].join(" ")}
            aria-label={`Trend ${trend.value}% ${trend.label || ""}`}
            title={`Trend ${trend.value}% ${trend.label || ""}`}
          >
            {trend.value > 0 ? "▲" : trend.value < 0 ? "▼" : "•"} {trend.value}%
          </div>
        )}
      </div>

      {/* Main value / skeleton */}
      <div className="card__valueArea">
        {loading ? (
          <div className="card__skeleton">
            <div className="card__skeletonLine card__skeletonLine--lg" />
            <div className="card__skeletonLine card__skeletonLine--sm" />
          </div>
        ) : (
          <div className="card__value">{value}</div>
        )}
      </div>

      {/* Footer */}
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
};

export default Card;
export { Card };
