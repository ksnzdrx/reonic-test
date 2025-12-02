import { HourlyData } from '../types';
import { generateBrightColors } from '../utils/colorGenerator';
import { useMemo } from 'react';
import { PowerLineChart } from '../charts/DayViewChart';

interface DayViewProps {
  hourlyData: HourlyData[];
  selectedDay: number;
  numChargePoints: number;
  seed?: number;
  onDayChange: (day: number) => void;
}

export function DayView({ hourlyData, selectedDay, numChargePoints, seed, onDayChange }: DayViewProps) {
  const dayStart = selectedDay * 24;
  const dayEnd = dayStart + 24;
  const dayData = hourlyData.slice(dayStart, dayEnd);

  // generate bright colors for charge points, memoized to avoid regeneration on every render
  // uses provided seed in the inputs or defaults to 6733
  const chargePointColors = useMemo(
    () => generateBrightColors(numChargePoints, seed ?? 6733),
    [numChargePoints, seed]
  );

  return (
    <div className="bg-ui-card rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-ui-text-primary">Day {selectedDay + 1}</h2>

      <PowerLineChart
        dayData={dayData}
        numChargePoints={numChargePoints}
        chargePointColors={chargePointColors}
      />

      <div className="mt-4">
        <label className="block text-sm font-medium text-ui-text-secondary mb-2">
          Select Day for Detail View: Day {selectedDay + 1}
        </label>
        <input
          type="range"
          min="0"
          max="364"
          value={selectedDay}
          onChange={(e) => onDayChange(parseInt(e.target.value))}
          className="w-full h-2 bg-ui-slider rounded-full appearance:none accent-ui-daySelector cursor-pointer"
        />
      </div>
    </div>
  );
}
