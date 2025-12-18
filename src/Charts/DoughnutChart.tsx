 
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DEFAULT_LABELS = ["Red", "Blue", "Yellow", "Green", "Purple"];
const DEFAULT_VALUES = [12, 19, 3, 5, 2];
const DEFAULT_COLORS = [
  "rgba(255, 99, 132, 0.7)",
  "rgba(54, 162, 235, 0.7)",
  "rgba(255, 206, 86, 0.7)",
  "rgba(75, 192, 192, 0.7)",
  "rgba(153, 102, 255, 0.7)",
];

type DoughnutChartProps = {
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
      cutout: "60%", 
    },
  ],
});

const baseOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: { position: "bottom" },
    tooltip: { enabled: true },
  },
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  labels = DEFAULT_LABELS,
  values = DEFAULT_VALUES,
  colors = DEFAULT_COLORS,
  height = 300,
  showCenterText = true,
  centerText, 
}) => {
  const data = buildData(labels, values, colors);


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
      <Doughnut data={data} options={baseOptions} plugins={[centerTextPlugin]} />
    </div>
  );
};
export default DoughnutChart;
