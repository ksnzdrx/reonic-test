import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { HourlyData } from '../types';
import { CHART_COLORS } from '../chartColors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PowerLineChartProps {
  dayData: HourlyData[];
  numChargePoints: number;
  chargePointColors: string[];
}

// colors are not taken from the tailwind-css, since there is no support for it with this charting library
// I already figured out that this was a suboptimal charts library to use, but changing it now would be too much work given the time constraints

// for each charging point the (bright) colors are generated dynamically per number of charge points in DayView component and passed as props here

export function PowerLineChart({ dayData, numChargePoints, chargePointColors }: PowerLineChartProps) {
  const labels = dayData.map((data) => data.hour % 24);

  const datasets = [
    {
      label: 'Total Power',
      data: dayData.map((data) => data.totalPower),
      borderColor: CHART_COLORS.totalPowerLine,
      backgroundColor: CHART_COLORS.totalPowerLine,
      borderWidth: 2,
      pointRadius: 0,
      stepped: false as const,
    },
    ...Array.from({ length: numChargePoints }, (_, i) => ({
      label: `Charge Point ${i + 1}`,
      data: dayData.map((data) => data.chargePoints[i]),
      borderColor: chargePointColors[i],
      backgroundColor: chargePointColors[i],
      borderWidth: 1,
      pointRadius: 0,
      borderDash: [],
    })),
  ];

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y ?? 0;
            return `${context.dataset.label}: ${value.toFixed(1)} kW`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hour of Day',
        },
        grid: {
          color: CHART_COLORS.gridLines,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Power (kW)',
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
      <Line data={{ labels, datasets }} options={options} />
    </div>
  );
}
