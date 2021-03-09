import moment from "moment";
import React from "react";
import { ReactComponent as DeleteIcon } from "../Assets/delete.svg";
import { removeTrackday } from "../Data/TrackdaysData";
import { useStateValue } from "../StateProvider";

export default function TrackdayItem({ trackday }) {
  const [{ circuits }, dispatch] = useStateValue();

  const handleDeleteTrackday = () => {
    removeTrackday(trackday.id).then(() => dispatch({ type: "DELETE_TRACKDAY", id: trackday.id }));
  };

  return (
    <div className="shadow-md bg-white rounded p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{trackday.circuit.name}</h1>
          <p className="text-sm">
            {trackday.circuit.city} | {trackday.circuit.country}
          </p>
          <p className="text-sm text-motorblue font-bold mt-3">
            {moment(trackday.date).format("DD-MM-YYYY")}
          </p>
        </div>
        <div className="flex space-x-2">
          <div
            className="cursor-pointer"
            onClick={() =>
              dispatch({
                type: "EDIT_TRACKDAY",
                trackday,
              })
            }
          >
            <svg
              className="w-6 h-6 text-motorblue"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </div>
          <div className="pl-3 cursor-pointer" onClick={handleDeleteTrackday}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
