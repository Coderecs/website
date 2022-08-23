import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function TagsChart({ tags }: any) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "right" as const,
            },
        },
    };
    const labels = Object.keys(tags);
    const data = {
        labels,
        datasets: [
            {
                data: labels.map((label: string) => tags[label]),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className="w-full h-full text-white">
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default TagsChart;
