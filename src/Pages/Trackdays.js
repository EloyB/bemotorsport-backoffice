import React, { useEffect, useRef, useState } from "react";
import DropdownField from "../Components/DropdownField";
import TrackdayItem from "../Components/TrackdayItem";
import TrackdaysForm from "../Components/TrackdaysForm";
import { getTrackdays } from "../Data/TrackdaysData";
import { useStateValue } from "../StateProvider";

export default function Trackdays() {
  const [{ trackdays, filteredTrackdays, circuits }, dispatch] = useStateValue();
  const [selectedCircuit, setSelectedCircuit] = useState("");
  const trackdaysRef = useRef();

  useEffect(() => {
    getTrackdays().then((res) => {
      var sortedList = res.sort((a, b) => new Date(a.date) - new Date(b.date));
      dispatch({ type: "SET_TRACKDAYS", list: sortedList });
    });
  }, [dispatch]);

  return (
    <div
      ref={trackdaysRef}
      className="m-4 space-y-7 divide-y-2 md:flex md:w-full md:divide-y-0 md:divide-x-2 md:space-y-0 md:space-x-4"
    >
      <TrackdaysForm />
      <div className="py-4 md:w-1/2 md:px-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl md:text-2xl">Alle Trackdays</h1>
          <div className="w-1/2">
            <DropdownField
              selectOptions={circuits}
              setSelectedOption={(item) => {
                setSelectedCircuit(item.name);
                dispatch({ type: "FILTER_TRACKDAYS", id: item.id });
              }}
              placeholder="Choose a circuit"
              targetField="name"
              value={selectedCircuit}
            />
          </div>
        </div>
        {filteredTrackdays.length > 0 ? (
          filteredTrackdays.map((item, index) => (
            <TrackdayItem ref={trackdaysRef} key={index} trackday={item} />
          ))
        ) : trackdays.length > 0 ? (
          trackdays.map((item, index) => (
            <TrackdayItem ref={trackdaysRef} key={index} trackday={item} />
          ))
        ) : (
          <p>No trackdays yet. Fill in the form to add one.</p>
        )}
      </div>
    </div>
  );
}
