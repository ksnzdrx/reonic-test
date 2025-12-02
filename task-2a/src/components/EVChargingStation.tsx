
import React from "react";

type EVChargingStationProps = {
  width: string;
};

// reusable picture component for the EV charging station image used in the header and footer
// width prop allows to set the width of the image, height is adjusted automatically to keep aspect ratio

export const EVChargingStation: React.FC<EVChargingStationProps> = (props) => {
  const width = props.width || '150px';
  return (
    <img
      src="/src/images/ev-charging-station.svg"
      alt="EV Charging Station"
      style={{ maxWidth: width, width, height: 'auto', display: 'inline-block', verticalAlign: 'middle' }}
    />
  );
};
