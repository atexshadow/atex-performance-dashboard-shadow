
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import type { ChartOptions } from "chart.js";

export type LineChartProps = {
  labels: string[];
  data: number[];
  title?: string;
  color?: string;
  height?: number | string;
  tension?: number;      // curve smoothness
  fill?: boolean;        // area fill
  showPoints?: boolean;
};

const LineChart: React.FC<LineChartProps> = ({
  labels,
  data,
  title = "Line Chart",
  color = "#4D96FF",
  height = 320,
  tension = 0.4,
  fill = false,
  showPoints = true,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: color,
        backgroundColor: fill ? `${color}33` : undefined, // add alpha if filling
        tension,
        fill,
        pointRadius: showPoints ? 3 : 0,
        pointHoverRadius: showPoints ? 5 : 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: false },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: "Values" },
        beginAtZero: true,
        grid: { color: "#eee" },
      },
    },
    elements: {
      line: { borderWidth: 2 },
      point: { hitRadius: 8 },
    },
  };

  return (
    <div style={{ width: "100%", height }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
 
