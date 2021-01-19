import React from "react";
import CircuitItem from "../Components/CircuitItem";
import CircuitForm from "../Components/CircuitForm";
import { useStateValue } from "../StateProvider";

export default function Circuits() {
  const [{ circuits }, dispatch] = useStateValue();
  return (
    <div className="m-4 space-y-7 divide-y-2 md:flex md:w-full md:divide-y-0 md:divide-x-2 md:space-y-0 md:space-x-4">
      <CircuitForm />
      <div className="py-4 md:w-1/2 md:pl-4 space-y-4">
        <h1 className="font-semibold text-xl mb-3 md:text-2xl">Alle Circuits</h1>
        <div className="space-y-2">
          {circuits.length > 0 ? (
            circuits.map((item, index) => (
              <CircuitItem
                key={index}
                id={item.id}
                name={item.name}
                country={item.country}
                city={item.city}
              />
            ))
          ) : (
            <p>No circuits yet. Fill in the form to add one.</p>
          )}
        </div>
      </div>
    </div>
  );
}
