import { initialCircuit } from "./Data/CircuitsData";
import { initialTrackday } from "./Data/TrackdaysData";

export const initialState = {
  circuit: { ...initialCircuit },
  trackday: { ...initialTrackday },
  circuits: [],
  trackdays: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    // CIRCUITS
    case "ADD_CIRCUIT":
      return {
        ...state,
        circuits: [...state.circuits, action.item],
      };

    case "SET_CIRCUITS":
      return {
        ...state,
        circuits: action.list,
      };

    case "UPDATE_CIRCUITS":
      const index = state.circuits.findIndex((x) => x.id === action.circuit.id);
      const currentCircuits = [...state.circuits];
      currentCircuits[index] = { ...action.circuit };
      return {
        ...state,
        circuits: currentCircuits,
      };

    case "EDIT_CIRCUIT":
      return {
        ...state,
        circuit: { ...action.circuit },
      };

    case "UPDATE_CIRCUIT":
      return {
        ...state,
        circuit: { ...state.circuit, [action.prop]: action.value },
      };

    case "RESET_CIRCUIT":
      return {
        ...state,
        circuit: { ...initialCircuit },
      };

    case "DELETE_CIRCUIT":
      const circuitIndex = state.circuits.findIndex((x) => x.id === action.id);
      const updatedCircuits = [...state.circuits];
      updatedCircuits.splice(circuitIndex, 1);
      return { ...state, circuits: updatedCircuits };

    // TRACKDAYS
    case "ADD_TRACKDAY":
      return {
        ...state,
        trackdays: [...state.trackdays, action.item],
      };

    case "SET_TRACKDAYS":
      return {
        ...state,
        trackdays: action.list,
      };

    case "UPDATE_TRACKDAYS":
      const updatedTrackdayIndex = state.trackdays.findIndex((x) => x.id === action.trackday.id);
      const currentTrackdays = [...state.trackdays];
      currentTrackdays[updatedTrackdayIndex] = { ...action.trackday };
      return {
        ...state,
        trackdays: currentTrackdays,
      };

    case "DELETE_TRACKDAY":
      const trackdayIndex = state.trackdays.findIndex((x) => x.id === action.id);
      const updatedTrackdays = [...state.trackdays];
      updatedTrackdays.splice(trackdayIndex, 1);
      return { ...state, trackdays: updatedTrackdays };

    case "EDIT_TRACKDAY":
      return {
        ...state,
        trackday: { ...action.trackday },
      };

    case "UPDATE_TRACKDAY":
      return {
        ...state,
        trackday: { ...state.trackday, [action.prop]: action.value },
      };

    case "RESET_TRACKDAY":
      return {
        ...state,
        trackday: { ...initialTrackday },
      };

    default:
      return { ...state };
  }
};

export default reducer;
