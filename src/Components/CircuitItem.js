import React from "react";
import { ReactComponent as DeleteIcon } from "../Assets/delete.svg";
import { removeCircuit } from "../Data/CircuitsData";
import { useStateValue } from "../StateProvider";

export default function CircuitItem({ id, name, city, country }) {
  const [{ circuits }, dispatch] = useStateValue();
  const handleDeleteCircuit = () => {
    removeCircuit(id).then(() => dispatch({ type: "DELETE_CIRCUIT", id: id }));
  };

  return (
    <div className="shadow-md bg-white rounded p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-sm">
            {city} | {country}
          </p>
        </div>
        <div className="pl-3 cursor-pointer" onClick={handleDeleteCircuit}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}
