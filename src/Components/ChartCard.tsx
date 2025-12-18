
// import React from "react";

// type Props = {
//   title?: string;
//   subtitle?: string;
//   headerRight?: React.ReactNode; // e.g., dropdown/actions
//   children: React.ReactNode;     // chart/content goes here
//   footer?: React.ReactNode;
//   className?: string;
// };

// const ChartCard: React.FC<Props> = ({
//   title,
//   subtitle,
//   headerRight,
//   children,
//   footer,
//   className,
// }) => {
//   return (
//     <div className={["card", "chart-card", className || ""].join(" ").trim()}>
//       {(title || subtitle || headerRight) && (
//         <div className="card__header">
//           <div className="card__titleBlock">
//             {title && <div className="card__title">{title}</div>}
//             {subtitle && <div className="card__subtitle">{subtitle}</div>}
//           </div>
//           {headerRight && <div className="card__headerRight">{headerRight}</div>}
//         </div>
//       )}

//       <div className="chart-card__body">{children}</div>

//       {footer && <div className="card__footer">{footer}</div>}
//     </div>
//   );
// };

// export default ChartCard;
// export { ChartCard };




import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  headerRight?: React.ReactNode; // e.g., dropdown/actions
  children: React.ReactNode;     // chart/content goes here
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;   // ✅ Added style prop
};

const ChartCard: React.FC<Props> = ({
  title,
  subtitle,
  headerRight,
  children,
  footer,
  className,
  style,
}) => {
  return (
    <div
      className={["card", "chart-card", className || ""].join(" ").trim()}
      style={style} // ✅ Apply custom style
    >
      {(title || subtitle || headerRight) && (
        <div className="card__header">
          <div className="card__titleBlock">
            {title && <div className="card__title">{title}</div>}
            {subtitle && <div className="card__subtitle">{subtitle}</div>}
                   </div>
          {headerRight && <div className="card__headerRight">{headerRight}</div>}
        </div>
      )}

      <div className="chart-card__body">{children}</div>

      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
};

export default ChartCard;

