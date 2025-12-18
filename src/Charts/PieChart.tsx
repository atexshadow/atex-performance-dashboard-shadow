 
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Default props (you can override from parent)
const DEFAULT_LABELS = ["Red", "Blue", "Yellow", "Green", "Purple"];
const DEFAULT_VALUES = [20, 19, 3, 5, 2];
const DEFAULT_COLORS = [
  "rgba(255, 99, 132, 0.7)",
  "rgba(54, 162, 235, 0.7)",
  "rgba(255, 206, 86, 0.7)",
  "rgba(75, 192, 192, 0.7)",
  "rgba(153, 102, 255, 0.7)",
];

type PieChartProps = {
  labels?: string[];
  values?: number[];
  colors?: string[];
  height?: number;
  showCenterText?: boolean;
  centerText?: string;
};

const buildData = (labels: string[], values: number[], colors: string[]) => ({
  labels,
  datasets: [
    {
      label: "Distribution",
      data: values,
      backgroundColor: colors,
      borderColor: "#fff",
      borderWidth: 2,
      // no cutout for pie (that's for doughnut)
    },
  ],
});

const baseOptions: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false, // use container height
  plugins: {
    legend: { position: "bottom" },
    tooltip: { enabled: true },
  },
};

const PieChart: React.FC<PieChartProps> = ({
  labels = DEFAULT_LABELS,
  values = DEFAULT_VALUES,
  colors = DEFAULT_COLORS,
  height = 300,
  showCenterText = true,
  centerText, // e.g., "62%" or "Total: 41"
}) => {
  const data = buildData(labels, values, colors);

  // Optional center text plugin
  const centerTextPlugin = {
    id: "centerText",
    afterDraw(chart: any) {
      if (!showCenterText) return;
      const { ctx, chartArea } = chart;
      const text = centerText ?? `Total: ${values.reduce((a, b) => a + b, 0)}`;

      ctx.save();
      ctx.font = "600 16px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const x = (chartArea.left + chartArea.right) / 2;
      const y = (chartArea.top + chartArea.bottom) / 2;
      ctx.fillText(text, x, y);
      ctx.restore();
    },
  };

  
const options = {
  responsive: true,
  maintainAspectRatio: false, // ✅ Important
}
  return (
    <div style={{ width: "100%", height }}>
      <Pie data={data} options={baseOptions} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default PieChart;
