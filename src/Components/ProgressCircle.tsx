
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  /** 0..100 */
  value: number;
  /** Optional text shown in the center, defaults to `${value}%` */
  text?: string;
  /** Path (progress) color */
  color?: string;
  /** Extra class names */
  className?: string;
};

const ProgressCircle: React.FC<Props> = ({ value, text, color = "#4a6cf7", className }) => {
  return (
    <div className={["progress-circle", className || ""].join(" ").trim()}>
      <CircularProgressbar
        value={value}
        text={text ?? `${value}%`}
        styles={buildStyles({
          pathColor: color,
          textColor: "#333",
          trailColor: "#eee",
        })}
      />
    </div>
  );
};

export default ProgressCircle;
export { ProgressCircle };
