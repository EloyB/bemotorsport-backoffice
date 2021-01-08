export const initialState = {
  circuits: [],
  trackdays: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CIRCUIT":
      return {
        ...state,
        circuits: [...state.circuits, action.item],
      };

    case "ADD_TRACKDAY":
      return {
        ...state,
        trackdays: [...state.trackdays, action.item],
      };

    case "SET_CIRCUITS":
      return {
        ...state,
        circuits: action.list,
      };

    case "SET_TRACKDAYS":
      return {
        ...state,
        trackdays: action.list,
      };

    case "DELETE_CIRCUIT":
      const circuitIndex = state.circuits.findIndex((x) => x.id === action.id);
      const updatedCircuits = [...state.circuits];
      updatedCircuits.splice(circuitIndex, 1);
      return { ...state, circuits: updatedCircuits };

    case "DELETE_TRACKDAY":
      const trackdayIndex = state.trackdays.findIndex((x) => x.id === action.id);
      const updatedTrackdays = [...state.trackdays];
      updatedTrackdays.splice(trackdayIndex, 1);
      return { ...state, trackdays: updatedTrackdays };

    default:
      return { ...state };
  }
};

export default reducer;
