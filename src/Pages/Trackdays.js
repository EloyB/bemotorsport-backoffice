import React from "react";
import TrackdaysForm from "../Components/TrackdaysForm";

export default function Trackdays() {
  return (
    <div className="space-y-7 divide-y-2 md:flex md:w-full md:divide-y-0 md:divide-x-2 md:space-y-0 md:space-x-4">
      <TrackdaysForm />
      <div className="py-4 md:w-1/2 md:pl-4">
        <h1 className="font-semibold text-xl mb-3 md:text-2xl">
          Alle Trackdays
        </h1>
      </div>
    </div>
  );
}
