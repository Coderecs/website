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
                    "#2A9D8F",
                    "#32823B",
                    "#355389",
                    "#F4A261",
                    "#E76F51",
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
