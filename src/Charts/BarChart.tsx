//Barhart.tsx

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarChartProps = {
  labels: string[];
  data: number[];
  title?: string;
  color?: string;
  height?: number | string;
  barThickness?: number; 
};

const BarChart: React.FC<BarChartProps> = ({
  labels,
  data,
  title = "Data Sheet Bar Chart",
  color = "#fac106ff",
  height = "10vh",                 
  barThickness = 22,               
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: color,
        borderRadius: 4,
        barThickness,              
        maxBarThickness: 24,       
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: false },
      tooltip: { enabled: true },
    },
    layout: { padding: 0 },
    scales: {
      x: {
        title: { display: false },
        grid: { display: false },
        
        categoryPercentage: 0.55,  
        barPercentage: 0.6,        
      },
      y: {
        title: { display: true, text: "Values" },
        beginAtZero: true,
        grid: { color: "#b43939ff" },
      },
    },
  };

  return (
    <div style={{ width: "100%", height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;



// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// type Props = { labels: string[]; data: number[]; title?: string; color?: string; height?: number | string; };

// const BarChart: React.FC<Props> = ({ labels, data, title, color = "#4D96FF", height = 300 }) => {
//   const chartData = {
//     labels,
//     datasets: [{ label: title ?? "Bar", data, backgroundColor: color, borderRadius: 6 }],
//   };
//   const options = {
//     responsive: true,
//     plugins: { legend: { display: !!title }, title: { display: !!title, text: title } },
//     scales: { x: { grid: { display: false } }, y: { grid: { color: "#eee" }, beginAtZero: true } },
//   };
//   return <div style={{ height }}><Bar data={chartData} options={options} /></div>;
// };

// export default BarChart;

 