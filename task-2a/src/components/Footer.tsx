import { EVChargingStation } from "./EVChargingStation";

// footer component with EV charging station image and some dummy buttons
// for simplicity, I did not link buttons to other pages, nor did I create those pages
// I coloured the svg in canva to match the color of the app

// not opitmal passage of the width prop, but I decided to keep it simple for now
// ideally, I would pass them from the App.tsx or to make the function component stateless.

export function Footer() {
  return (
    <footer className="w-full bg-ui-primary py-4 mt-8 text-center">
      <div className="container mx-auto px-4 flex flex-col items-center gap-2">
        <span className="text-ui-text-secondary mb-2">This is my view of the <b>EV Charging Simulator.</b> The dummy buttons below should take you to a <b>"Contact Us"</b>, <b>"Learn More"</b>, <b>"About"</b> and other parts of the application, but they do not exist yet :{')'}</span>
        <EVChargingStation width="150px"/>
        <nav className="space-x-4">
          <button className="px-4 py-2 text-ui-button-text font-semibold hover:text-ui-text-primary transition">Lorem</button>
          <button className="px-4 py-2 text-ui-button-text font-semibold hover:text-ui-text-primary transition">Ipsum Dolor</button>
          <button className="px-4 py-2 text-ui-button-text font-semibold hover:text-ui-text-primary transition">Sit Amet</button>
        </nav>
      </div>
    </footer>
  );
}