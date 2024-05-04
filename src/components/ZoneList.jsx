import React from "react";
import ZoneList from "./ZoneList";

const HeartRateZone = ({ calculateZone, selectedZone, setSelectedZone }) => {
  const zones = [
    { zoneNumber: 5, name: "Max" },
    { zoneNumber: 4, name: "Hard" },
    { zoneNumber: 3, name: "Moderate" },
    { zoneNumber: 2, name: "Light" },
    { zoneNumber: 1, name: "Very Light" },
  ];

  return (
    <div className="flex flex-col bg-zinc-50 pb-12 w-screen md:w-full md:max-w-2xl text-zinc-500 items-center rounded-t-3xl text-lg mx-auto px-4">
      <h2 className="text-3xl py-8">Heart Rate Zone</h2>
      <ZoneList
        zones={zones}
        calculateZone={calculateZone}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
      />
    </div>
  );
};

export default HeartRateZoneComponent;
