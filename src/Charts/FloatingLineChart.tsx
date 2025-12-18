
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import type { ChartOptions, Plugin } from "chart.js";

export type FloatingLineChartProps = {
  labels: string[];
  data: number[];
  title?: string;
  color?: string;
  height?: number | string;
  shadowColor?: string;
  shadowBlur?: number;
};

const FloatingLineChart: React.FC<FloatingLineChartProps> = ({
  labels,
  data,
  title = "Floating Line",
  color = "#4D96FF",
  height = 320,
  shadowColor = "rgba(0,0,0,0.25)",
  shadowBlur = 8,
}) => {
  // Plugin to draw a shadow under the line strokes
  const shadowLinePlugin: Plugin<"line"> = useMemo(
    () => ({
      id: "shadowLine",
      beforeDatasetsDraw: (chart) => {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        ctx.save();
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
      },
      afterDatasetsDraw: (chart) => {
        chart.ctx.restore();
      },
    }),
    [shadowColor, shadowBlur]
  );

  // Gradient fill plugin (creates vertical gradient from color -> transparent)
  const gradientFillPlugin: Plugin<"line"> = useMemo(
    () => ({
      id: "gradientFill",
      beforeDatasetDraw: (chart, args) => {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, `${color}66`); // top semi-opaque
        gradient.addColorStop(1, `${color}00`); // bottom transparent
        const dataset = chart.data.datasets[args.index];
      
        dataset.backgroundColor = gradient;
        dataset.fill = true;
      },
    }),
    [color]
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: color,
        // backgroundColor set by gradientFillPlugin
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
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
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: "#f5f5f5" },
        title: { display: true, text: "Values" },
      },
    },
  };

  return (
    <div style={{ width: "100%", height }}>
      <Line
        data={chartData}
        options={options}
        plugins={[shadowLinePlugin, gradientFillPlugin]}
      />
    </div>
  );
};

export default FloatingLineChart;
