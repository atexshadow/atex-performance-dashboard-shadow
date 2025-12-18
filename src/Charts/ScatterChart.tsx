//ScatterChart.tsx
import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ScatterPoint = { x: number; y: number };

type ScatterDataset = {
  label: string;
  data: ScatterPoint[];
  color?: string;        // stroke color
  pointColor?: string;   // point fill
};

type ScatterChartProps = {
  datasets: ScatterDataset[];   // multiple series e.g., teams/resources
  title?: string;
  height?: number | string;
  xLabel?: string;
  yLabel?: string;
};

const ScatterChart: React.FC<ScatterChartProps> = ({
  datasets,
  title = "Capacity vs Utilization",
  height = "40vh",
  xLabel = "Capacity (hours)",
  yLabel = "Utilization (%)",
}) => {
  const chartData = {
    datasets: datasets.map((d) => ({
      label: d.label,
      data: d.data,
      showLine: false,                 // keep it as pure scatter (no connecting line)
      borderColor: d.color ?? "#2563eb",
      backgroundColor: d.pointColor ?? (d.color ?? "#2563eb"),
      pointRadius: 4,                  // point size
      pointHoverRadius: 6,
    })),
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: !!title, text: title },
      tooltip: {
        enabled: true,
        callbacks: {
          // Custom tooltip text: (x, y)
          label: function (ctx: any) {
            const x = ctx.raw.x;
            const y = ctx.raw.y;
            return `${ctx.dataset.label}: (${x}, ${y})`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        title: { display: true, text: xLabel },
        grid: { color: "#eee" },
        beginAtZero: true,
      },
      y: {
        type: "linear",
        title: { display: true, text: yLabel },
        grid: { color: "#eee" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height }}>
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default ScatterChart;




// // src/Charts/ScatterChart.tsx
// import React from "react";
// import { Scatter } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";

// ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

// type ScatterPoint = { x: number; y: number };
// type ScatterSet = { label: string; data: ScatterPoint[]; color?: string };

// type Props = {
//   datasets: ScatterSet[];
//   title?: string;
//   xLabel?: string;
//   yLabel?: string;
//   height?: number | string;
// };

// const ScatterChart: React.FC<Props> = ({ datasets, title, xLabel, yLabel, height = 300 }) => {
//   const chartData = {
//     datasets: datasets.map(ds => ({
//       label: ds.label,
//       data: ds.data,
//       backgroundColor: ds.color ?? "#4D96FF",
//       pointRadius: 4,
//     })),
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: true },
//       title: { display: !!title, text: title },
//       tooltip: { enabled: true },
//     },
//     scales: {
//       x: { type: "linear", title: { display: !!xLabel, text: xLabel } },
//       y: { type: "linear", title: { display: !!yLabel, text: yLabel }, beginAtZero: true },
//     },
//   };

//   return <div style={{ height }}><Scatter data={chartData} options={options} /></div>;
// };

// export default ScatterChart;

 