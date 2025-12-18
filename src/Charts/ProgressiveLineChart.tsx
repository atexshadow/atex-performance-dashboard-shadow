
// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const ProgressiveLineChart: React.FC = () => {
//   const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Anomaly Detection",
//         data: [10, 20, 30, 40, 50, 60], // Progressive increase
//         borderColor: "#4D96FF",
//         backgroundColor: "rgba(77,150,255,0.2)",
//         tension: 0.4,
//         pointRadius: 5,
//         pointBackgroundColor: "#FF6B6B"
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" as const },
//       title: { display: true, text: "Progressive Line Chart - Anomaly Detection" }
//     }
//    };

//   return <Line data={data} options={options} />;
// };
// export default  ProgressiveLineChart;



import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressiveLineChart: React.FC = () => {
    const data = [];
const data2 = [];
let prev = 100;
let prev2 = 80;
for (let i = 0; i < 1000; i++) {
  prev += 5 - Math.random() * 10;
  data.push({x: i, y: prev});
  prev2 += 5 - Math.random() * 10;
  data2.push({x: i, y: prev2});
}
  const chartData = {
    // labels,
    datasets: [
      {
        label: "Series A",
        data: data,
        borderColor: "red",
        borderWidth: 1,
        radius: 0
      },
      {
        label: "Series B",
        data: data2,
        borderColor: "blue",
        borderWidth: 1,
        radius: 0
      }
    ]
  };

  const totalDuration = 100;
//   const delayBetweenPoints = totalDuration / labels.length;
  

  const previousY = (ctx: any) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(["y"], true).y;

  const animation = {
    x: {
      y: {
      type: "number",
      easing: "linear",
    //   duration: delayBetweenPoints,
      from: previousY,
      delay(ctx: any) {
        if (ctx.type !== "data" || ctx.yStarted) return 0;
        ctx.yStarted = true;
        // return (ctx.index as number) * delayBetweenPoints;
      }
    }
  }
  };
  const options = {
    responsive: true,
    animations: animation as any, // ✅ Correct property name
    interaction: {
      intersect: false
    },
    plugins: {
      legend: { display: false }
    },

    
scales: {
  x: {
    type: "linear" as const // ✅ Fix type
  },
  y: {
    min: 0,
    max: 200,
    beginAtZero: false // ✅ Add a valid property
  }
}

};

  return <Line data={chartData} options={options} />;
};



export default ProgressiveLineChart;
