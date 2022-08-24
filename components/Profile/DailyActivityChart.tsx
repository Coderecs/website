import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
            labels: {
                color: "white",
                fontSize: 18,
            },
        },
        title: {
            display: false,
            text: "You last 10 active days",
        },
    },
    scales: {
        y: {
            ticks: {
                color: "white",
                font: { size: 16 },
                stepSize: 1,
                beginAtZero: false,
            },
        },
        x: {
            ticks: {
                color: "white",
                font: { size: 12 },
                stepSize: 100,
                beginAtZero: false,
            },
        },
    },
};
function DailyActivityChart({ activity }: any) {
    let DATESubmissionMap = new Map<string, number>(JSON.parse(activity));
    const labels = Array.from(DATESubmissionMap.keys());
    const frequency = labels.map((label: string) => {
        return DATESubmissionMap.get(label);
    });
    const data = {
        labels,
        datasets: [
            {
                label: "Submissions",
                data: frequency,
                borderColor: "rgb(255, 255, 255)",
                backgroundColor: "rgba(255, 255, 255, 1)",
            },
        ],
    };
    return (
        <div className="w-full h-full text-white">
            <Line data={data} options={options} />
        </div>
    );
}

export default DailyActivityChart;
