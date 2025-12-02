import React from "react";
import { EVChargingStation } from "./EVChargingStation";

// not opitmal passage of the width prop, but I decided to keep it simple for now
// ideally, I would pass them from the App.tsx or to make the function component stateless.

export const Header: React.FC = () => (
  <header className="w-full bg-ui-primary py-4 shadow-md sticky top-0 z-50">
    <div className="container mx-auto flex justify-center items-center px-4">
      <EVChargingStation width="50px"/>
      <h1 className="text-2xl font-bold text-ui-text-secondary text-center ml-4">EV Charging Simulator</h1>
    </div>
  </header>
);
