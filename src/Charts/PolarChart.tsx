
import React from "react";
import { PolarArea } from "react-chartjs-2";
import "chart.js/auto";
import type { ChartOptions } from "chart.js";

export type PolarChartProps = {
  labels: string[];
  data: number[];
  title?: string;
  colors?: string[];
  height?: number | string;
};

const DEFAULT_COLORS = [
  "#4D96FF",
  "#F67280",
  "#6C5B7B",
  "#355C7D",
  "#99B898",
  "#E84A5F",
  "#2A9D8F",
  "#F4A261",
];

const PolarChart: React.FC<PolarChartProps> = ({
  labels,
  data,
  title = "Polar Area Chart",
  colors = DEFAULT_COLORS,
  height = 320,
}) => {
  // Cycle colors to match data length
  const bgColors = data.map((_, i) => colors[i % colors.length] + "55"); // add alpha
  const borderColors = data.map((_, i) => colors[i % colors.length]);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"polarArea"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "right" },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      r: {
        angleLines: { display: true, color: "#ddd" },
        grid: { color: "#eee" },
        ticks: { backdropColor: "transparent" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height }}>
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default PolarChart;
