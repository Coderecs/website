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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                color: "white",
                fontSize: 18,
            },
        },
    },
    scales: {
        y: {
            ticks: {
                color: "white",
                font: { size: 16 },
                stepSize: 10,
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

function RatingsChart({ ratings }: any) {
    const labels = ratings.map((r: string, i: number) => i * 100 + 800);
    const data = {
        labels,
        datasets: [
            {
                label: "Questions",
                data: labels.map(
                    (label: number) => ratings[(label - 800) / 100]
                ),
                backgroundColor: "rgba(255, 255, 255, 1)",
            },
        ],
    };
    return (
        <div className="w-full h-full text-white">
            <Bar data={data} options={options} />
        </div>
    );
}

export default RatingsChart;
