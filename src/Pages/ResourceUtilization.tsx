
// import React from "react";
// import { Typography, Container } from "@mui/material";

// const ResourceUtilization: React.FC = () => {
//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Resource Utilization
//       </Typography>
//       <Typography>
//         This is the Resource Utilization page. Show resource usage charts here.
//       </Typography>
//     </Container>
//   );
// };

// export default ResourceUtilization;



import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Title, Tooltip);

export type ResourceUtilizationProps = {
  labels?: string[];
  utilizationData?: number[];
  targetData?: number[];
  height?: number;
  title?: string;
};

const ResourceUtilization: React.FC<ResourceUtilizationProps> = ({
  labels = ['Shift 1', 'Shift 2', 'Shift 3', 'Shift 4', 'Shift 5'],
  utilizationData = [20, 15, 62, 22, 40],
  targetData = [50, 80, 10, 70, 75],
  height = 300,
  title = 'Reporting & Export',
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Resource Utilization (%)',
        data: utilizationData,
        borderColor: '#2563EB', // blue-600
        backgroundColor: 'rgba(37,99,235,0.15)',
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0,        // keep steps crisp
        stepped: true,     // stepped line
        fill: true,
      },
      {
        label: 'Target (%)',
        data: targetData,
        borderColor: '#10B981', // emerald-500
        backgroundColor: 'rgba(16,185,129,0.1)',
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
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 10, weight: 550 },
      },
      legend: { position: 'bottom' as const },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Shift' },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: 'Utilization (%)' },
        beginAtZero: true,
        max: 110,
        ticks: { stepSize: 5 },
        grid: { color: 'rgba(0,0,0,0.06)' },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ResourceUtilization;
