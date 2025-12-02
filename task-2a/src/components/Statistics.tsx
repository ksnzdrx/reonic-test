import { SimulationResult } from '../types';
import { StatCard } from './StatCard';

interface StatisticsProps {
  result: SimulationResult | null;
}

// statistics card (aka stat cards) were extracted also for increased maintainability as a separate component


export function Statistics({ result }: StatisticsProps) {
  const totalEvents = result?.events.length ?? 0;
  const eventsPerYear = totalEvents;
  const eventsPerMonth = totalEvents / 12;
  const eventsPerWeek = totalEvents / 52;
  const eventsPerDay = totalEvents / 365;

  return (
    <div className="bg-ui-card rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-ui-text-primary">Summary Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Energy Charged"
          value={result ? result.totalEnergy.toLocaleString() : '-'}
          unit="kWh"
          bgColor="bg-stat-energy-bg"
          labelColor="text-stat-energy-label"
          valueColor="text-stat-energy-value"
        />

        <StatCard
          title="Total Charging Events"
          value={result ? eventsPerYear.toLocaleString() : '-'}
          subtitle="Per year"
          bgColor="bg-stat-events-bg"
          labelColor="text-stat-events-label"
          valueColor="text-stat-events-value"
        />

        <StatCard
          title="Events Per Month"
          value={result ? Math.round(eventsPerMonth).toLocaleString() : '-'}
          subtitle="Average"
          bgColor="bg-stat-month-bg"
          labelColor="text-stat-month-label"
          valueColor="text-stat-month-value"
        />

        <StatCard
          title="Events Per Week"
          value={result ? Math.round(eventsPerWeek).toLocaleString() : '-'}
          subtitle="Average"
          bgColor="bg-stat-week-bg"
          labelColor="text-stat-week-label"
          valueColor="text-stat-week-value"
        />

        <StatCard
          title="Events Per Day"
          value={result ? eventsPerDay.toFixed(1) : '-'}
          subtitle="Average"
          bgColor="bg-stat-day-bg"
          labelColor="text-stat-day-label"
          valueColor="text-stat-day-value"
        />

        <StatCard
          title="Concurrency Factor"
          value={result ? `${(result.concurrencyFactorLastMonth * 100).toFixed(1)}% / ${(result.concurrencyFactorYear * 100).toFixed(1)}%` : '-'}
          subtitle="Last Month / Year"
          bgColor="bg-stat-average-bg"
          labelColor="text-stat-average-label"
          valueColor="text-stat-average-value"
        />
      </div>
    </div>
  );
}
