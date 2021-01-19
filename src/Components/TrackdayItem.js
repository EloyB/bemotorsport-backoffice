import React from "react";
import { ReactComponent as DeleteIcon } from "../Assets/delete.svg";
import { removeTrackday } from "../Data/TrackdaysData";
import { useStateValue } from "../StateProvider";

export default function TrackdayItem({ id, circuitName, city, country, date }) {
  const [{ circuits }, dispatch] = useStateValue();

  const handleDeleteTrackday = () => {
    removeTrackday(id).then(() => dispatch({ type: "DELETE_TRACKDAY", id: id }));
  };

  return (
    <div className="shadow-md bg-white rounded p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{circuitName}</h1>
          <p className="text-sm">
            {city} | {country}
          </p>
          <p className="text-sm font-bold mt-3">{date}</p>
        </div>
        <div className="pl-3 cursor-pointer" onClick={handleDeleteTrackday}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}
