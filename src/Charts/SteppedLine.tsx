
// // src/Charts/SteppedLineu.tsx
// import React from 'react';
// import LineChart from './LineChart'; // adjust if it's a named export

// export type SteppedLineProps = {
//   labels?: string[];
//   utilizationData?: number[];
//   targetData?: number[];
//   height?: number;
// };

// const SteppedLine: React.FC<SteppedLineProps> = ({
//   labels = ['Shift 1', 'Shift 2', 'Shift 3', 'Shift 4', 'Shift 5', 'Shift 6', 'Shift 7'],
//   utilizationData = [65, 65, 72, 72, 80, 80, 75],
//   targetData = [70, 70, 70, 70, 75, 75, 75],
//   height = 200,
// }) => {
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Resource Utilization (%)',
//         data: utilizationData,
//         borderColor: '#2563EB',
//         backgroundColor: 'rgba(37,99,235,0.15)',
//         borderWidth: 2,
//         pointRadius: 3,
//         pointHoverRadius: 5,
//         tension: 0,
//         stepped: true,
//         fill: true,
//       },
//       {
//         label: 'Target (%)',
//         data: targetData,
//         borderColor: '#10B981',
//         backgroundColor: 'rgba(16,185,129,0.1)',
//         borderDash: [6, 4],
//         borderWidth: 2,
//         pointRadius: 0,
//         tension: 0,
//         stepped: true,
//         fill: false,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       title: { display: true, text: 'Resource Utilization (Stepped Line)' },
//       legend: { position: 'bottom' },
//       tooltip: {
//         mode: 'index' as const,
//         intersect: false,
//         callbacks: { label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%` },
//       },
//     },
//     scales: {
//       x: { title: { display: true, text: 'Shift' }, grid: { display: false } },
//       y: {
//         title: { display: true, text: 'Utilization (%)' },
//         beginAtZero: true,
//         max: 100,
//         ticks: { stepSize: 8 },
//         grid: { color: 'rgba(0,0,0,0.06)' },
//       },
//     },
//   };

//    return (
//     <div style={{ height }}>
//       <LineChart data={data} options={options} />
//     </div>
//   );
// };

// export default SteppedLine;



// src/Charts/SteppedLine.tsx
import React from "react";
import LineChart from "./LineChart"; // adjust if it's a named export

export type SteppedLineProps = {
  labels?: string[];
  utilizationData?: number[];
  targetData?: number[];
  height?: number;
};

const SteppedLine: React.FC<SteppedLineProps> = ({
  labels = [
    "Shift 1",
    "Shift 2",
    "Shift 3",
    "Shift 4",
    "Shift 5",
    "Shift 6",
    "Shift 7",
  ],
  utilizationData = [65, 65, 72, 72, 80, 80, 75],
  targetData = [70, 70, 70, 70, 75, 75, 75],
  height = 220, // ✅ Default height
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Resource Utilization (%)",
        data: utilizationData,
        borderColor: "#2563EB",
        backgroundColor: "rgba(37,99,235,0.15)",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0,
        stepped: true,
        fill: true,
      },
      {
        label: "Target (%)",
        data: targetData,
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.1)",
        borderDash: [6, 4],
        borderWidth: 2,
        pointRadius: 0,
        tension: 0,
        stepped: true,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ Important for fixed height
    plugins: {
      title: { display: true, text: "Resource Utilization (Stepped Line)" },
      legend: { position: "bottom" },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Shift" }, grid: { display: false } },
      y: {
        title: { display: true, text: "Utilization (%)" },
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 8 },
        grid: { color: "rgba(0,0,0,0.06)" },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%", // ✅ Full width
        height: `${height}px`, // ✅ Fixed height
        overflow: "hidden", // ✅ Prevent tooltip overflow
               position: "relative", // ✅ Required for clipping
      }}
    >
      <LineChart data={data} options={options} />
    </div>
  );
};
export default SteppedLine;
