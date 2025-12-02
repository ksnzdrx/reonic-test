import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { CHART_COLORS } from '../chartColors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type AggregationLevel = 'day' | 'week' | 'month';

interface AggregatedData {
  label: string;
  events: number;
}

interface EventsBarChartProps {
  data: AggregatedData[];
  aggregation: AggregationLevel;
}

// colors are not taken from the tailwind-css, since there is no support for it with this charting library

export function EventsBarChart({ data, aggregation }: EventsBarChartProps) {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: 'Successful chargings',
        data: data.map((d) => d.events),
        backgroundColor: CHART_COLORS.eventsBar,
        borderColor: CHART_COLORS.eventsBar,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y ?? 0;
            return `Successful chargings: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: (aggregation === "day" || aggregation === "week"),
          maxRotation: (aggregation === "day" || aggregation === "week") ? 45 : 0,
          minRotation: (aggregation === "day" || aggregation === "week") ? 45 : 0,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of successful chargings',
        },
        grid: {
          color: CHART_COLORS.gridLines,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Bar data={chartData} options={options} />
    </div>
  );
}
