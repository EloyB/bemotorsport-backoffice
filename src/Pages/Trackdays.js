import React, { useEffect } from "react";
import TrackdayItem from "../Components/TrackdayItem";
import TrackdaysForm from "../Components/TrackdaysForm";
import { getTrackdays } from "../Data/TrackdaysData";
import { useStateValue } from "../StateProvider";

export default function Trackdays() {
  const [{ trackdays }, dispatch] = useStateValue();

  useEffect(() => {
    getTrackdays().then((res) => {
      dispatch({ type: "SET_TRACKDAYS", list: res });
    });
  }, [dispatch]);

  return (
    <div className="m-4 space-y-7 divide-y-2 md:flex md:w-full md:divide-y-0 md:divide-x-2 md:space-y-0 md:space-x-4">
      <TrackdaysForm />
      <div className="py-4 md:w-1/2 md:px-4 space-y-4">
        <h1 className="font-semibold text-xl mb-3 md:text-2xl">Alle Trackdays</h1>
        {trackdays.length > 0 ? (
          trackdays.map((item, index) => <TrackdayItem key={index} trackday={item} />)
        ) : (
          <p>No trackdays yet. Fill in the form to add one.</p>
        )}
      </div>
    </div>
  );
}
