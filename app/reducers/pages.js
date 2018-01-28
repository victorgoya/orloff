import objectFromEntries from "object-from-entries";

export default function (state = {}, action) {
    switch (action.type) {
    case "SET_PAGES":
      return action.pages;
    case "CLEAR_PAGES":
      return {};
    default:
      return state;
    }
}
