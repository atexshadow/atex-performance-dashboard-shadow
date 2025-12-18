
import React from "react";

export type LineSeries = {
  label: string;
  data: number[];
  color?: string;
};

export type LineChartProps = {
  labels?: string[];
  series?: LineSeries[];              // multiple lines
  title?: string;
  height?: number;                    // SVG viewport height
  width?: number;
  showLegend?: boolean;
  gridLines?: number;
  data?: any;
  chartData?: any;      // backward compatible if you already used chartData elsewhere
  options?: any;

};

const DEFAULT_LABELS = ["W1", "W2", "W3", "W4", "W5"];
const DEFAULT_SERIES: LineSeries[] = [
  { label: "Critical", data: [4, 3, 6, 2, 5], color: "#FF6B6B" },
  { label: "Minor", data: [10, 8, 12, 7, 9], color: "#4D96FF" },
  { label: "Neutral", data: [110, 8, 12, 7, 9], color: "#4D96FF" },
];

const LineChart: React.FC<LineChartProps> = ({
  labels = DEFAULT_LABELS,
  series = DEFAULT_SERIES,
  title,
  height = 280,
  width,                 // if undefined, we use viewBox to scale to container
  showLegend = true,
  gridLines = 4,
}) => {
  const padding = 20;                      // larger padding for labels
  const innerW = (width ?? 400) - padding * 2;
  const innerH = height - padding * 2;

  // Local state for legend toggles and tooltip
  const [visible, setVisible] = React.useState<boolean[]>(
    () => series.map(() => true)
  );
  const [hover, setHover] = React.useState<{
    x?: number;
    y?: number;
    label?: string;
    values?: { label: string; color: string; value: number }[];
  }>({});

  // Max value across visible series (fallback to 1)
  const maxVal = Math.max(
    ...series
      .map((s, i) => (visible[i] ? s.data : []))
      .flat(),
    1
  );

  // Coordinate helpers
  const xForIdx = (i: number) =>
    padding + (i * innerW) / Math.max(labels.length - 1, 1);
  const yForVal = (v: number) => padding + innerH - (v / maxVal) * innerH;

  // Build paths for each series
  const paths = series.map((s, si) => {
    const points = s.data.map((v, i) => ({ x: xForIdx(i), y: yForVal(v) }));
    // Straight segments (simple and crisp). If you want smooth curves, switch to a cubic Bezier.
    const d = points
      .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    return { d, color: s.color || "#0ea5e9" };
  });

  // Handle mouse move for tooltip: find closest x-index
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const onMouseMove: React.MouseEventHandler<SVGSVGElement> = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    // Find nearest label index by comparing x positions
    const xs = labels.map((_, i) => xForIdx(i));
    let nearestIdx = 0;
    let minDist = Infinity;
    xs.forEach((x, i) => {
      const d = Math.abs(mouseX - x);
      if (d < minDist) {
        minDist = d;
        nearestIdx = i;
      }
    });

    // Prepare tooltip info
    const x = xs[nearestIdx];
    const values = series
      .map((s, si) => ({
        label: s.label,
        color: s.color || "#0ea5e9",
        value: s.data[nearestIdx],
        show: visible[si],
      }))
      .filter((v) => v.show);

    // y to position tooltip roughly above the max among visible series at this index
    const maxAtIdx = Math.max(
      ...series.map((s, si) => (visible[si] ? s.data[nearestIdx] : -Infinity)),
      0
    );
    const y = yForVal(maxAtIdx);

    setHover({ x, y, label: labels[nearestIdx], values });
  };

  const onMouseLeave: React.MouseEventHandler<SVGSVGElement> = () => {
    setHover({});
  };

  // Toggle series visibility
  const toggleSeries = (idx: number) => {
    setVisible((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  // Gridlines (horizontal only)
  const gridYVals = Array.from({ length: gridLines + 1 }, (_, i) =>
    padding + (innerH * i) / gridLines
  );

  const viewW = width ?? 600; // used in viewBox
  const viewH = height;

  return (
    <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden" }}>
      {/* Legend */}
      {showLegend && (
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: "8px 10px 0",
            flexWrap: "wrap",
          }}
        >
          {series.map((s, si) => {
            const color = s.color || "#0ea5e9";
            const active = visible[si];
            return (
              <button
                key={si}
                onClick={() => toggleSeries(si)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 10px",
                  borderRadius: 20,
                  border: "1px solid #e5e7eb",
                  background: active ? "#f1f5fe" : "#fafafa",
                  color: active ? "#1f2937" : "#6b7280",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: color,
                    opacity: active ? 1 : 0.4,
                    display: "inline-block",
                  }}
                />
                {s.label}
              </button>
            );
          })}
        </div>
      )}

      <svg
        ref={svgRef}
        // Responsive: viewBox makes the SVG scale to parent width
        viewBox={`0 0 ${viewW} ${viewH}`}
        width={width ? width : "100%"}
        height={height}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ display: "block" }}
      >
        {/* Title */}
        {title && (
          <text
            x={padding}
            y={padding - 10}
            fontSize="14"
            fontWeight={600}
            fill="#334155"
          >
            {title}
          </text>
        )}

        {/* Gridlines (horizontal) */}
        {gridYVals.map((gy, i) => (
          <line
            key={i}
            x1={padding}
            y1={gy}
            x2={viewW - padding}
            y2={gy}
            stroke="#e5e7eb"
          />
        ))}

        {/* Axes */}
        <line
          x1={padding}
          y1={viewH - padding}
          x2={viewW - padding}
          y2={viewH - padding}
          stroke="#cbd5e1"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={viewH - padding}
          stroke="#cbd5e1"
        />

        {/* Visible series */}
        {paths.map((p, si) =>
          visible[si] ? (
            <g key={si}>
              <path d={p.d} fill="none" stroke={p.color} strokeWidth={2} />
              {series[si].data.map((v, i) => (
                <circle
                  key={i}
                  cx={xForIdx(i)}
                  cy={yForVal(v)}
                  r={3}
                  fill={p.color}
                />
              ))}
            </g>
          ) : null
        )}

        {/* X labels */}
        {labels.map((label, i) => (
          <text
            key={i}
            x={xForIdx(i)}
            y={viewH - padding + 16}
            fontSize="12"
            textAnchor="middle"
            fill="#64748b"
          >
            {label}
          </text>
        ))}

        {/* Tooltip (render when hovering) */}
        {hover.x !== undefined && hover.y !== undefined && (
          <>
            {/* Vertical guide line */}
            <line
              x1={hover.x}
              y1={padding}
              x2={hover.x}
              y2={viewH - padding}
              stroke="#d1d5db"
              strokeDasharray="3 3"
            />
            {/* Tooltip box */}
            <g transform={`translate(${Math.min(hover.x + 12, viewW - 160)}, ${Math.max(hover.y - 40, padding)})`}>
              <rect
                x={0}
                y={0}
                width={150}
                height={hover.values && hover.values.length ? 22 + hover.values.length * 18 : 32}
                rx={6}
                fill="#ffffff"
                stroke="#e5e7eb"
                opacity={0.95}
              />
              <text x={8} y={16} fontSize="12" fill="#111827" fontWeight={600}>
                {hover.label}
              </text>
              {hover.values?.map((v, idx) => (
                <g key={idx}>
                  <circle cx={10} cy={30 + idx * 18} r={4} fill={v.color} />
                  <text x={20} y={34 + idx * 18} fontSize="12" fill="#374151">
                    {v.label}: {v.value}
                  </text>
                </g>
              ))}
            </g>
          </>
        )}
      </svg>
    </div>
  );
};

export default LineChart;