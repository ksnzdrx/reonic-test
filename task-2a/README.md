# EV Charging Simulation Visualizer

```bash
npm install
npm run dev
```


## Stack

- **React 18** with **TypeScript** for type-safe component development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for clean, responsive styling
- **Chart.js** for interactive data visualizations

## Usage

1. Adjust the input parameters using the controls at the top
2. The simulation automatically runs and updates visualizations
3. Explore the summary statistics for high-level insights
4. Use the day slider to examine charging patterns for specific days
5. Switch between daily (for this month), weekly, and monthly views in the events distribution chart

## Simulation Logic

The simulation models a year of EV charging activity with:
- Quarter-hourly time steps (15-minute intervals, 35040 ticks per year)
- Time-dependent arrival probabilities based on provided tables
- In this task, the simulation is not working ideally and is mostly an adjusted version of that used in task 1 (and vibecoded, as this wasn't the point of this task)
- Has some helper functions, such as dynamic color geeration, which also gets fed the seed if it is provided in the inputs.

## Project Structure

```
task-2a/
├── src/
│   ├── components/          # React components
│   │   ├── InputControls.tsx
│   │   ├── Statistics.tsx
│   │   ├── StatCard.tsx
│   │   ├── DayView.tsx
│   │   ├── EventsChart.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── EVChargingStation.tsx
│   │   └── InputField.tsx
│   ├── charts/              # Chart components
│   │   ├── DayViewChart.tsx
│   │   └── EventsBarChart.tsx
│   ├── simulation/          # Simulation logic
│   │   ├── index.ts
│   │   ├── simulation.ts
│   │   ├── distributions.ts
│   │   ├── random.ts
│   │   └── util.ts
│   ├── utils/               # Utility functions
│   │   └── colorGenerator.ts
│   ├── images/
│   │   └── ev-charging-station.svg
│   ├── types.ts             # TypeScript definitions
│   ├── chartColors.ts       # Chart color configuration
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind imports
├── index.html
├── package.json
└── README.md
```
