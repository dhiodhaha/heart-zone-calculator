"use client";

import { Settings } from "lucide-react";
import { useState } from "react";

export const Calculate = () => {
  const [age, setAge] = useState(0);
  const [maxBPM, setMaxBPM] = useState(220 - age);
  const [error, setError] = useState("");
  const [selectedZone, setSelectedZone] = useState(2);

  const calculateHeartRateZone = (zoneNumber) => {
    const zoneRanges = {
      5: [0.9 * maxBPM, 1.0 * maxBPM],
      4: [0.8 * maxBPM, 0.9 * maxBPM],
      3: [0.7 * maxBPM, 0.8 * maxBPM],
      2: [0.6 * maxBPM, 0.7 * maxBPM],
      1: [0.5 * maxBPM, 0.6 * maxBPM],
    };
    const min = zoneRanges[zoneNumber][0].toFixed(0);
    const max = zoneRanges[zoneNumber][1].toFixed(0);

    return `${Math.round(min)}-${Math.round(max)} `;
  };

  const handleAgeChange = (event) => {
    const parsedAge = parseInt(event.target.value || 0, 10);
    const isValidAge = parsedAge >= 0 && parsedAge <= 99;

    setError(isValidAge ? "" : "Please enter a valid age between 0 and 99");
    setAge(isValidAge ? parsedAge : age);
    setMaxBPM(isValidAge ? 220 - parsedAge : maxBPM);
  };

  const handleZoneSelect = (event) => {
    const zoneNumber = parseInt(event.target.value);
    setSelectedZone(zoneNumber); // Update the selected zone state
  };

  //   const handleCalculate = () => {
  //     // You can add logic here to handle the calculation
  //     // For now, let's just log the results for each zone
  //     console.log("Zone 5:", calculateHeartRateZone(5));
  //     console.log("Zone 4:", calculateHeartRateZone(4));
  //     console.log("Zone 3:", calculateHeartRateZone(3));
  //     console.log("Zone 2:", calculateHeartRateZone(2));
  //     console.log("Zone 1:", calculateHeartRateZone(1));
  //   };

  return (
    <div
      id="Data"
      className="flex flex-col items-center w-full text-white h-screen justify-between"
    >
      <div className="w-full max-w-2xl mx-auto pt-4">
        <div className="flex justify-between px-8 text-xl">
          <div>Heart Rate Zone Calculator</div>
          <div>
            <Settings size={28} />
          </div>
        </div>
      </div>{" "}
      <section></section>
      <div>
        <div className="flex flex-col items-center justify-center ">
          <div className="text-xl">Age</div>
          <div className="flex flex-col items-center border-b">
            <input
              type="number"
              className="flex text-center group-focus border-none outline-none focus:ring-transparent text-zinc-50 text-9xl bg-transparent w-48 focus:outline-none mr-2"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          {error && <p className="text-zinc-50 text-sm mt-4">{error}</p>}
          {/* Input select for zone selection */}
        </div>
        <div>
          <select
            type="select"
            value={selectedZone}
            onChange={handleZoneSelect}
            className="group-focus border-none outline-none   w-60 focus:ring-transparent text-zinc-50 text-xl bg-transparent focus:outline-none  cursor-pointer"
          >
            <option className="text-zinc-500 text-justify" value={5}>
              Zone 5 - VO2 Max
            </option>
            <option className="text-zinc-500 text-justify" value={4}>
              Zone 4 - Anaerobic
            </option>
            <option className="text-zinc-500 text-justify" value={3}>
              Zone 3 - Aerobic
            </option>
            <option className="text-zinc-500 text-justify" value={2}>
              Zone 2 - Fat Burn
            </option>
            <option className="text-zinc-500 text-justify" value={1}>
              Zone 1 - Warm Up
            </option>
          </select>
        </div>
      </div>
      <div
        id="dataCard"
        className="flex flex-col bg-zinc-50 pb-12 w-screen md:w-full md:max-w-2xl text-zinc-500 items-center rounded-t-3xl text-lg mx-auto px-4"
      >
        <div className="text-3xl py-8">Heart Rate Zone</div>

        <div className="flex flex-col gap-4 text-xl w-full">
          <div className="flex justify-between rounded-xl bg-white p-4">
            <div className="w-24">Zone</div>
            <div className="w-24">Effort</div>
            <div className="w-32">Rate</div>
          </div>
          <div
            className={`zoneList flex justify-between border border-red-500 p-4 rounded-xl cursor-pointer ${
              selectedZone === 5 ? "bg-red-500 text-zinc-50" : ""
            }`}
            onClick={() => setSelectedZone(5)}
          >
            <div className="w-24">5</div>
            <div className="w-24">Max</div>
            <div className="w-32">
              {calculateHeartRateZone(5)}{" "}
              <span
                className={`text-sm ${
                  selectedZone === 5 ? "text-zinc-50" : "text-zinc-400"
                }`}
              >
                bpm
              </span>
            </div>
          </div>
          {/* <div
            className={`flex justify-between w-full border border-orange-500 py-4 px-8 rounded-xl cursor-pointer ${
              selectedZone === 4 ? "bg-orange-500 text-zinc-50" : ""
            }`}
            onClick={() => setSelectedZone(4)}
          >
            <div className="w-32 ">4</div>
            <div className="w-32">Hard</div>
            <div className="w-32">
              {calculateHeartRateZone(4)}{" "}
              <span
                className={`text-sm ${
                  selectedZone === 4 ? "text-zinc-50" : "text-zinc-400"
                }`}
              >
                bpm
              </span>
            </div>
          </div>
          <div
            className={`flex justify-between w-full border border-green-500 py-4 px-8 rounded-xl cursor-pointer ${
              selectedZone === 3 ? "bg-green-500 text-zinc-50" : ""
            }`}
            onClick={() => setSelectedZone(3)}
          >
            <div className="w-32 ">3</div>
            <div className="w-32">Moderate</div>
            <div className="w-32">
              {calculateHeartRateZone(3)}{" "}
              <span
                className={`text-sm ${
                  selectedZone === 3 ? "text-zinc-50" : "text-zinc-400"
                }`}
              >
                bpm
              </span>
            </div>
          </div>
          <div
            className={`flex justify-between w-full border border-blue-500 py-4 px-8 rounded-xl cursor-pointer ${
              selectedZone === 2 ? "bg-blue-500 text-zinc-50" : ""
            }`}
            onClick={() => setSelectedZone(2)}
          >
            <div className="w-32 ">2</div>
            <div className="w-32">Light</div>
            <div className="w-32">
              {calculateHeartRateZone(2)}{" "}
              <span
                className={`text-sm ${
                  selectedZone === 2 ? "text-zinc-50" : "text-zinc-400"
                }`}
              >
                bpm
              </span>
            </div>
          </div>
          <div
            className={`flex justify-between w-full border border-gray-500 py-4 px-8 rounded-xl cursor-pointer ${
              selectedZone === 1 ? "bg-gray-500 text-zinc-50" : ""
            }`}
            onClick={() => setSelectedZone(1)}
          >
            <div className="w-32 ">1</div>
            <div className="w-32">Very Light</div>
            <div className="w-32">
              {calculateHeartRateZone(1)}{" "}
              <span
                className={`text-sm ${
                  selectedZone === 1 ? "text-zinc-50" : "text-zinc-400"
                }`}
              >
                bpm
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
