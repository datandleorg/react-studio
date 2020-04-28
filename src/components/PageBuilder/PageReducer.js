export const pageReducer = (state, action) => {
  switch (action.type) {
    case "addElement":
      return { ...state, elements: { [action.payload.id]: action.payload } };
    case "updateElements":
      return { ...state, elements: action.payload };
    default:
      throw new Error("Unexpected action");
  }
};
