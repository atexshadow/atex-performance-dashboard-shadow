import React from "react";

export type BarChartSeries = {
  label: string;
  data: number[];     // positive or negative
  color?: string;     // bar color
};

export type BarChartProps = {
  labels?: string[];
  data?: number[];                // single dataset
  series?: BarChartSeries[];      // multiple datasets
  color?: string;                 // used when `data` is provided
  height?: number;
  width?: number;
  title?: string;
  groupGap?: number;              // space between label groups
  barGap?: number;                // space between bars within a group
  gridLines?: number;             // horizontal gridlines count
  vgridLines?: number;            // vertical gridlines count (even spacing)
};

const DEFAULT_LABELS = ["January", "February", "March", "April", "May", "June", "July"];
const DEFAULT_DATA = [90, 20, 45, 30, 80, 70, 15];

const BarChart: React.FC<BarChartProps> = ({
  labels = DEFAULT_LABELS,
  data = DEFAULT_DATA,
  series,
  color = "#4D96FF",
  height = 300,
  width = 250,                 // wider default so bars look proper
  title,
  groupGap = 8,
  barGap = 8,
  gridLines = 4,
  vgridLines = 0,
}) => {
  // paddings
  const paddingLeft = 40;       // extra space for y-axis labels
  const paddingRight = 1;
  const paddingTop = 30;
  const paddingBottom = 45;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;


  // Use a distinct variable to avoid shadowing/confusion
  const singleData: number[] = data ?? [];

  // Normalize: prefer `series` if provided; else build from single dataset
  const datasets: BarChartSeries[] =
    Array.isArray(series) && series.length > 0
      ? series
      : [{ label: "Dataset", data: singleData, color }];

  // Global min/max to support positive + negative values
  const allValues = datasets.flatMap((ds) => ds.data);
  const minVal = Math.min(...allValues, 0);
  const maxVal = Math.max(...allValues, 0);
  const range = maxVal - minVal || 1;

  // Map value to SVG Y coordinate
  const yForVal = (v: number) =>
    paddingTop + chartHeight - ((v - minVal) / range) * chartHeight;

  const yZero = yForVal(0); // baseline

  // Group sizing
  const groupCount = labels.length;
  const dsCount = datasets.length;
  const groupWidth = chartWidth / Math.max(groupCount, 1);
  const innerGroupWidth = Math.max(groupWidth - groupGap, 0);
  const barWidth = Math.max(
    (innerGroupWidth - (dsCount - 0) * barGap) / Math.max(dsCount, 1),
    1
  );

  // Horizontal gridlines
  const gridYs = Array.from({ length: gridLines + 1 }, (_, i) =>
    paddingTop + (chartHeight * i) / gridLines
  );
  
  // Vertical gridlines (even spacing across chart width)
  const vGridXs =
    vgridLines > 0
      ? Array.from({ length: vgridLines + 1 }, (_, i) =>
          paddingLeft + (chartWidth * i) / vgridLines
        )
      : [];

  // Alternatively, to align vertical lines to each label group left edge:
  // const groupXs = Array.from({ length: groupCount }, (_, i) => paddingLeft + i * groupWidth);

  return (
    <div style={{ background: "#fff" }}>
      <svg width={width} height={height}>
        {/* Title */}
        {title && (
          <text
            x={paddingLeft}
            y={paddingTop - 10}
            fontSize="14"
            fontWeight={600}
            fill="#334155"
          >
            {title}
          </text>
        )}

        {/* Horizontal gridlines */}
        {gridYs.map((gy, i) => (
          <line
            key={`h-${i}`}
            x1={paddingLeft}
            y1={gy}
            x2={width - paddingRight}
            y2={gy}
            stroke="#e5e7eb"
          />
        ))}

        {/* Vertical gridlines (even spacing) */}
        {vGridXs.map((gx, i) => (
          <line
            key={`v-${i}`}
            x1={gx}
            y1={paddingTop}
            x2={gx}
            y2={height - paddingBottom}
            stroke="#e5e7eb"
          />
        ))}

        {/* Axes */}
        {/* X-axis */}
        <line
          x1={paddingLeft}
          y1={height - paddingBottom}
          x2={width - paddingRight}
          y2={height - paddingBottom}
          stroke="#cbd5e1"
        />
        {/* Y-axis */}
        <line
          x1={paddingLeft}
          y1={paddingTop}
          x2={paddingLeft}
          y2={height - paddingBottom}
          stroke="#cbd5e1"
        />

        {/* Zero baseline (important for neg/pos) */}
        <line
          x1={paddingLeft}
          y1={yZero}
          x2={width - paddingRight}
          y2={yZero}
          stroke="#94a3b8"
          strokeDasharray="4 4"
        />

        {/* Bars */}
        {labels.map((label, i) => {
          const groupX = paddingLeft + i * groupWidth + groupGap / 2;

          return (
            <g key={i}>
              {datasets.map((ds, j) => {
                const val = ds.data[i] ?? 0;

                const x = groupX + j * (barWidth + barGap);
                const yVal = yForVal(val);
                const yTop = Math.min(yVal, yZero);
                const yBottom = Math.max(yVal, yZero);
                const barH = Math.max(yBottom - yTop, 0);

                return (
                  <rect
                    key={j}
                    x={x}
                    y={yTop}
                    width={barWidth}
                    height={barH}
                    rx={6}
                    fill={ds.color || "#4D96FF"}
                    opacity={0.9}
                  />
                );
              })}

              {/* X label */}
              <text
                x={groupX + innerGroupWidth / 2}
                y={height - paddingBottom + 18}
                fontSize="12"
                textAnchor="middle"
                fill="#64748b"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Y ticks (max, 0, min) */}
        {[maxVal, 0, minVal].map((v, idx) => (
          <text
            key={idx}
            x={paddingLeft - 10}
            y={yForVal(v) + 4}
            fontSize="11"
            textAnchor="end"
            fill="#64748b"
          >
            {Math.round(v)}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default BarChart;
