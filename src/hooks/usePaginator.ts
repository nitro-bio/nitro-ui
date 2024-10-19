import { useReducer } from "react";

type State = {
  currentPage: number;
  totalPages: number;
};

type Action =
  | { type: "SET_PAGE"; payload: number }
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" }
  | { type: "RESET_PAGE" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        currentPage: Math.max(1, Math.min(action.payload, state.totalPages)),
      };
    case "NEXT_PAGE":
      return {
        ...state,
        currentPage: Math.min(state.currentPage + 1, state.totalPages),
      };
    case "PREV_PAGE":
      return {
        ...state,
        currentPage: Math.max(state.currentPage - 1, 1),
      };
    case "RESET_PAGE":
      return {
        ...state,
        currentPage: 1,
      };
    default:
      return state;
  }
}

export const usePaginator = <T>({
  data,
  resultsPerPage,
}: {
  data: T[];
  resultsPerPage: number;
}) => {
  const totalPages = Math.ceil(data.length / resultsPerPage);

  const initialState: State = {
    currentPage: 1,
    totalPages,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setPage = (page: number) =>
    dispatch({ type: "SET_PAGE", payload: page });
  const nextPage = () => dispatch({ type: "NEXT_PAGE" });
  const prevPage = () => dispatch({ type: "PREV_PAGE" });
  const resetPage = () => dispatch({ type: "RESET_PAGE" });

  const startIndex = (state.currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentDataSlice = data.slice(startIndex, endIndex);

  return {
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    currentDataSlice,
    setPage,
    nextPage,
    prevPage,
    resetPage,
  };
};
