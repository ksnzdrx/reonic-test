import { useState, useEffect, useRef } from 'react';
import { SimulationParams, SimulationResult } from './types';
import { runSimulation } from './simulation';

import { InputControls } from './components/InputControls';
import { Statistics } from './components/Statistics';
import { DayView } from './components/DayView';
import { EventsChart } from './components/EventsChart';

import { Header } from './components/Header';
import { Footer } from './components/Footer';


const defaultParams: SimulationParams = {
  numChargePoints: 15,
  arrivalMultiplier: 100,
  consumption: 18,
  chargingPower: 11,
};

function App() {
  const [params, setParams] = useState<SimulationParams>(defaultParams);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [hideHeader, setHideHeader] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Validate params before running simulation
    const isValid =
      params.numChargePoints > 0 &&
      params.consumption > 0 &&
      params.chargingPower > 0 &&
      params.arrivalMultiplier >= 20 &&
      params.arrivalMultiplier <= 200 &&
      (params.seed === undefined || params.seed >= 0);

    if (isValid) {
      const simulationResult = runSimulation(params);
      setResult(simulationResult);
    } else {
      setResult(null);
    }
  }, [params]);

  // added intersection observer to hide header when footer is in view
  // improves user experience especially on smaller screens if two things containing basically 
  // the same info / functionale are visible at the same time

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setHideHeader(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      }
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-ui-bg1 flex flex-col">
      {!hideHeader && <Header />}
      <div className="flex-1 w-full">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <InputControls params={params} onParamsChange={setParams} />
          <Statistics result={result} />
          <DayView
            hourlyData={result?.hourlyData ?? []}
            selectedDay={selectedDay}
            numChargePoints={params.numChargePoints}
            seed={params.seed}
            onDayChange={setSelectedDay}
          />
          <EventsChart result={result} />
        </div>
      </div>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
