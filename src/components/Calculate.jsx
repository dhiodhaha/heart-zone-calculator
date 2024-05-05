"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, CircleHelp } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";
import { Modal } from "./Modal";

const zones = [
  { id: 5, name: "Zone 5 - VO²  Max" },
  { id: 4, name: "Zone 4 - Anaerobic" },
  { id: 3, name: "Zone 3 - Aerobic" },
  { id: 2, name: "Zone 2 - Fat Burn" },
  { id: 1, name: "Zone 1 - Warm Up" },
];

export const Calculate = () => {
  const [age, setAge] = useState();
  const [showResetButton, setShowResetButton] = useState(false);

  const [maxBPM, setMaxBPM] = useState(220 - age);
  const [error, setError] = useState("");

  const [selectedZone, setSelectedZone] = useState(zones[3]);

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

  const handleZoneChange = (zone) => {
    setSelectedZone(zone);
  };

  const handleAgeChange = ({ target: { value: rawAge } }) => {
    const parsedAge = parseInt(rawAge, 10);
    const isValid = parsedAge >= 0 && parsedAge <= 99;
    const displayAge = isValid ? parsedAge : age;
    setAge(displayAge);
    setMaxBPM(isValid ? 220 - displayAge : maxBPM);
    setError(isValid ? "" : "Please enter value between 0 and 99");
    setShowResetButton(rawAge !== "");
  };

  return (
    <div
      id="Data"
      className="flex flex-col items-center w-full text-white min-h-screen justify-between md:h-[calc(100vh-64px)] "
    >
      <div className="w-full max-w-2xl mx-auto pt-4">
        <div className="flex justify-between items-center px-8 text-md md:text-xl">
          <div>HRZ Calculator</div>
          <div className="size-12 flex justify-center items-center">
            <Modal />
            <CircleHelp className="size-6 opacity-60" />
          </div>
        </div>
      </div>{" "}
      <div>
        <div className="flex flex-col items-center justify-center ">
          {error && (
            <span className="mb-4 relative inline-block bg-red-600 py-1.5 px-3  text-zinc-50 text-sm">
              {error}
            </span>
          )}{" "}
          <div className="text-xl">Age</div>{" "}
          <div className="flex flex-col items-center border-b-2 border-b-indigo-500">
            <input
              type="number"
              className="select-all flex flex-wrap text-center group-focus border-none outline-none focus:ring-transparent text-zinc-50 text-8xl bg-transparent w-48 focus:outline-none mr-2"
              value={age}
              onChange={handleAgeChange}
            />{" "}
          </div>{" "}
          <div className="w-full text-zinc-900">
            <Listbox value={selectedZone} onChange={handleZoneChange}>
              <div className="relative mt-1">
                <Listbox.Button className="mt-2 relative w-full cursor-pointer rounded-lg bg-zinc-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
                  <span className="block truncate">{selectedZone.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {zones.map((zone, zonesId) => (
                      <Listbox.Option
                        key={zone.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-indigo-100 text-indigo-900"
                              : "text-gray-900"
                          }`
                        }
                        value={zone}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {zone.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">
                                <CheckIcon
                                  className="size-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          {showResetButton && (
            <button
              className=" bg-indigo-500 hover:bg-indigo-300 border-black/40 text-white font-light w-full py-3 px-20 rounded-xl my-4 transition-colors druation-300 shadow-md"
              onClick={() => {
                setAge("");
                setShowResetButton(false);
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <div
        id="dataCard"
        className="px-12 md:px-16 flex flex-col bg-zinc-50 pb-12 w-screen md:w-full md:max-w-2xl text-zinc-500 items-center rounded-t-3xl  mx-auto "
      >
        <div className="text-xl py-4">Heart Rate Zone</div>

        <div className="flex flex-col gap-2 text-sm md:text-lg w-full md:pb-0 pb-20">
          <div className="flex justify-between rounded-xl px-4 pt-2">
            <div className="w-24">Zone</div>
            <div className="w-24">Effort</div>
            <div className="w-32">Rate</div>
          </div>
          <div
            className={`  flex justify-between border border-red-600 p-3 pl-6 rounded-xl cursor-pointer ${
              selectedZone === zones[0] ? "bg-red-500 text-zinc-50" : ""
            }`}
            onClick={() => setSelectedZone(zones[0])}
          >
            <div className="w-24">5</div>
            <div className="w-24">Max</div>
            <div className="w-32">
              {age ? calculateHeartRateZone(5) : "0"}{" "}
              <span
                className={`text-sm ${
                  selectedZone === zones[0] ? "text-zinc-50" : "text-zinc-400"
                }`}
              >
                bpm
              </span>
            </div>
          </div>
          <div
            className={` flex justify-between border border-orange-500 p-3 pl-6 rounded-xl cursor-pointer ${
              selectedZone === zones[1] ? "bg-orange-600 text-zinc-50" : ""
            }`}
            onClick={() => setSelectedZone(zones[1])}
          >
            <div className="w-24">4</div>
            <div className="w-24">Hard</div>
            <div className="w-32">
              {age ? calculateHeartRateZone(4) : "0"}{" "}
              <span
                className={`text-sm ${
                  selectedZone === zones[1] ? "text-zinc-50" : "text-zinc-400"
                }`}
              >
                bpm
              </span>
            </div>
          </div>
          <div
            className={` flex justify-between border border-green-500 p-3 pl-6 rounded-xl cursor-pointer ${
              selectedZone === zones[2] ? "bg-green-600 text-zinc-50" : ""
            }`}
            onClick={() => setSelectedZone(zones[2])}
          >
            <div className="w-24">3</div>
            <div className="w-24">Moderate</div>
            <div className="w-32">
              {age ? calculateHeartRateZone(3) : "0"}{" "}
              <span
                className={`text-sm ${
                  selectedZone === zones[2] ? "text-zinc-50" : "text-zinc-400"
                }`}
              >
                bpm
              </span>
            </div>
          </div>
          <div
            className={` flex justify-between border border-blue-500 p-3 pl-6 rounded-xl cursor-pointer ${
              selectedZone === zones[3] ? "bg-blue-600 text-zinc-50" : ""
            }`}
            onClick={() => setSelectedZone(zones[3])}
          >
            <div className="w-24">2</div>
            <div className="w-24">Light</div>
            <div className="w-32">
              {age ? calculateHeartRateZone(2) : "0"}{" "}
              <span
                className={`text-sm ${
                  selectedZone === zones[3] ? "text-zinc-50" : "text-zinc-400"
                }`}
              >
                bpm
              </span>
            </div>
          </div>
          <div
            className={` flex justify-between border border-gray-300 p-3 pl-6 rounded-xl cursor-pointer ${
              selectedZone === zones[4] ? "bg-gray-400 text-zinc-50" : ""
            }`}
            onClick={() => setSelectedZone(zones[4])}
          >
            <div className="w-24">1</div>
            <div className="w-24">Very Light</div>
            <div className="w-32">
              {age ? calculateHeartRateZone(1) : "0"}{" "}
              <span
                className={`text-sm ${
                  selectedZone === zones[4] ? "text-zinc-50" : "text-zinc-400"
                }`}
              >
                bpm
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
