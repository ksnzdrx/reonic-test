import { SimulationParams } from '../types';
import { InputField } from './InputField';

interface InputControlsProps {
  params: SimulationParams;
  onParamsChange: (params: SimulationParams) => void;
}

export function InputControls({ params, onParamsChange }: InputControlsProps) {
  const handleChange = (field: keyof SimulationParams, value: number | undefined) => {
    onParamsChange({ ...params, [field]: value });
  };

  // extracted the InputFields into a separate component for better readability and maintainability
  return (
    <div className="bg-ui-card rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-ui-text-primary">
        Input Parameters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InputField
          label="Number of Charge Points"
          type="number"
          value={params.numChargePoints}
          onChange={(value) => handleChange('numChargePoints', value)}
        />

        <InputField
          label="Arrival Multiplier (%)"
          type="number"
          value={params.arrivalMultiplier}
          onChange={(value) => handleChange('arrivalMultiplier', value)}
          min={20}
          max={200}
          helperText="Range: 20–200%"
        />

        <InputField
          label="Car Consumption per 100km (kWh)"
          type="number"
          value={params.consumption}
          onChange={(value) => handleChange('consumption', value)}
        />

        <InputField
          label="Charging Power per Point (kW)"
          type="number"
          value={params.chargingPower}
          onChange={(value) => handleChange('chargingPower', value)}
        />

        <InputField
          label="Random Seed (optional)"
          type="number"
          value={params.seed}
          onChange={(value) => handleChange('seed', value)}
          min={0}
          placeholder="Leave empty for random"
          helperText="For reproducible results"
        />

      </div>
    </div>
  );
}
