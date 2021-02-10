import React from "react";
import { ReactComponent as DeleteIcon } from "../Assets/delete.svg";
import { ReactComponent as EditIcon } from "../Assets/edit.svg";
import { removeCircuit } from "../Data/CircuitsData";
import { useStateValue } from "../StateProvider";

export default function CircuitItem({ id, circuit }) {
  const [{ circuits }, dispatch] = useStateValue();
  const handleDeleteCircuit = () => {
    removeCircuit(id).then(() => {
      dispatch({ type: "DELETE_CIRCUIT", id: id });
    });
  };

  const handleEditCircuit = () => {
    dispatch({
      type: "EDIT_CIRCUIT",
      circuit,
    });
  };

  return (
    <div className="shadow-md bg-white rounded p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{circuit.name}</h1>
          <p className="text-sm">
            {circuit.city} | {circuit.country}
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="cursor-pointer" onClick={handleEditCircuit}>
            <EditIcon />
          </div>
          <div className="cursor-pointer" onClick={handleDeleteCircuit}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
