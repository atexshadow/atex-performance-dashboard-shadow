 
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

type MixedChartProps = {
  labels?: string[];
  barValues?: number[];
  lineValues?: number[];
  barColor?: string;
  lineColor?: string;
  height?: number;
  showCenterText?: boolean;
  centerText?: string;
  stacked?: boolean;
  showSecondaryAxis?: boolean;
};

const DEFAULT_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const DEFAULT_BAR_VALUES = [12, 19, 3, 5, 2, 9];
const DEFAULT_LINE_VALUES = [8, 14, 6, 10, 4, 12];

const MixedChart: React.FC<MixedChartProps> = ({
  labels = DEFAULT_LABELS,
  barValues = DEFAULT_BAR_VALUES,
  lineValues = DEFAULT_LINE_VALUES,
  barColor = "rgba(54, 162, 235, 0.6)", // blue
  lineColor = "rgba(255, 99, 132, 0.9)", // red
  height = 320,
  showCenterText = true,
  centerText,
  stacked = false,
  showSecondaryAxis = false,
}) => {
  const len = labels.length;
  const safeBar = (barValues ?? []).slice(0, len).map((v) => (Number.isFinite(v) ? v : 0));
  const safeLine = (lineValues ?? []).slice(0, len).map((v) => (Number.isFinite(v) ? v : 0));

  if (safeBar.length < len) safeBar.push(...Array(len - safeBar.length).fill(0));
  if (safeLine.length < len) safeLine.push(...Array(len - safeLine.length).fill(0));

  // ✅ Allow both bar and line datasets
  const data: ChartData<"bar" | "line"> = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Bar Series",
        data: safeBar,
        backgroundColor: barColor,
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        borderRadius: 6,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Line Series",
        data: safeLine,
        borderColor: lineColor,
        backgroundColor: lineColor,
        tension: 0,
        pointRadius: 4,
        pointHoverRadius: 5,
        fill: false,
        yAxisID: showSecondaryAxis ? "y1" : "y",
      },
    ],
  };

  // ✅ Options also allow both chart types
  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked,
        grid: { display: false },
      },
      y: {
        stacked,
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { padding: 6 },
      },
      ...(showSecondaryAxis
        ? {
            y1: {
              beginAtZero: true,
              position: "right",
              grid: { drawOnChartArea: false },
              ticks: { padding: 6 },
            },
          }
        : {}),
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    afterDatasetsDraw(chart: any) {
      if (!showCenterText) return;
      const { ctx, chartArea } = chart;
      if (!chartArea) return;

      const totalBar = safeBar.reduce((a: number, b: number) => a + b, 0);
      const totalLine = safeLine.reduce((a: number, b: number) => a + b, 0);
      const defaultText = `Bar: ${totalBar} | Line: ${totalLine}`;
      const text = centerText ?? defaultText;

      ctx.save();
      ctx.font = "600 15px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        text,
        (chartArea.left + chartArea.right) / 2,
        (chartArea.top + chartArea.bottom) / 2
      );
      ctx.restore();
    },
  };

  return (
    <div style={{ width: "100%", height }}>
      {/* Base type "bar" is fine; datasets define the mix */}
      <Chart type="bar" data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default MixedChart;
