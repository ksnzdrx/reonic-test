import { SimulationResult } from '../types';
import { useState } from 'react';
import { EventsBarChart, AggregationLevel } from '../charts/EventsBarChart';

interface EventsChartProps {
  result: SimulationResult | null;
}

// component to display the EventsBarChart with aggregation controls on daily, weekly and monthly basis
// opted to go for this view rather that daily within a week/month view,
// as it provides a better overview of the charging occurances over time
// for simplicity not working with dates and pretending that the year has 365 days exactly
// also assuming that it is always the same year and the first element in eventsPerDay corresponds to Jan 1st
// and the last to Dec 31st of a non-leap year

export function EventsChart({ result }: EventsChartProps) {
  const [aggregation, setAggregation] = useState<AggregationLevel>('week');

  const getAggregatedData = () => {
    if (!result) {
      // Return empty data when result is null
      switch (aggregation) {
        case 'day':
          return Array.from({ length: 30 }, (_, idx) => ({
            label: `Day ${idx + 1}`,
            events: 0,
          }));
        case 'week':
          return Array.from({ length: 52 }, (_, idx) => ({
            label: `Week ${idx + 1}`,
            events: 0,
          }));
        case 'month':
          return Array.from({ length: 12 }, (_, idx) => ({
            label: new Date(2024, idx).toLocaleDateString('en-US', { month: 'short' }),
            events: 0,
          }));
      }
    }

    switch (aggregation) {
      case 'day':
        return result.eventsPerDay.slice(0, 30).map((count, idx) => ({
          label: `Day ${idx + 1}`,
          events: count,
        }));
      case 'week':
        const weekData = [];
        for (let week = 0; week < 52; week++) {
          const weekStart = week * 7;
          const weekEnd = Math.min(weekStart + 7, 365);
          const weekEvents = result.eventsPerDay
            .slice(weekStart, weekEnd)
            .reduce((sum, count) => sum + count, 0);
          weekData.push({ label: `Week ${week + 1}`, events: weekEvents });
        }
        return weekData;
      case 'month':
        const monthData = [];
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let dayIndex = 0;
        for (let month = 0; month < 12; month++) {
          const monthEvents = result.eventsPerDay
            .slice(dayIndex, dayIndex + daysInMonth[month])
            .reduce((sum, count) => sum + count, 0);
          monthData.push({
            // using 2024 for simplicity. In real use case would udse current year etc.
            label: new Date(2024, month).toLocaleDateString('en-US', { month: 'short' }),
            events: monthEvents,
          });
          dayIndex += daysInMonth[month];
        }
        return monthData;
    }
  };

  const data = getAggregatedData();
  // selected aggregation is assigned a different colour to indicate active aggregation level and which is selected 
  // set hover effect over buttns that are being hovered over for a more responsive user experience
  return (
    <div className="bg-ui-card rounded-2xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-ui-text-primary">Charging Occurances</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setAggregation('day')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              aggregation === 'day' ? 'bg-ui-button-bg text-ui-button-text' : 'bg-ui-button-inactive text-ui-text-secondary hover:bg-ui-button-hover'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setAggregation('week')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              aggregation === 'week' ? 'bg-ui-button-bg text-ui-button-text' : 'bg-ui-button-inactive text-ui-text-secondary hover:bg-ui-button-hover'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setAggregation('month')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              aggregation === 'month' ? 'bg-ui-button-bg text-ui-button-text' : 'bg-ui-button-inactive text-ui-text-secondary hover:bg-ui-button-hover'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <EventsBarChart data={data} aggregation={aggregation} />
    </div>
  );
}
