import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { SiWappalyzer } from "react-icons/si";

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
    const freq = labels.map((label: string) => tags[label]);

    for(let i = 0; i < labels.length; i++){
        // loop invariant: sorted till i - 1 bring i to it's correct position

        for(let j = i - 1; j >= 0; j--){
            if(freq[j] < freq[j + 1]){
                let t = labels[j + 1]; labels[j + 1] = labels[j]; labels[j] = t;

                t = freq[j + 1]; freq[j + 1] = freq[j]; freq[j] = t;
            }
            else break;
        }
    }

    const data = {
        labels,
        datasets: [
            {
                data: freq,
                backgroundColor: [
                    "#355389",
                    "#6817e3",
                    "#2A9D8F",
                    "#F4A261",
                    "#E76F51",
                    "#179be3",
                    "#433bad",
                    "#ad3b6d",
                    "#ad3b93"
                ],
                borderWidth: 0.1,
            },
        ],
    };
    return (
        <div className="w-full h-[70%] text-white">
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default TagsChart;
