import { useEffect } from "react";
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
function paginatorReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "NEXT_PAGE":
      return {
        ...state,
        currentPage:
          state.currentPage >= state.totalPages
            ? state.totalPages
            : state.currentPage + 1,
      };
    case "PREV_PAGE":
      return {
        ...state,
        currentPage: state.currentPage <= 1 ? 1 : state.currentPage - 1,
      };
    case "RESET_PAGE":
      return { ...state, currentPage: 1 };
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

  const [state, dispatch] = useReducer(paginatorReducer, {
    currentPage: 1,
    totalPages,
  });

  useEffect(() => {
    dispatch({ type: "RESET_PAGE" });
  }, [data.length, resultsPerPage]);

  const currentDataSlice = data.slice(
    (state.currentPage - 1) * resultsPerPage,
    state.currentPage * resultsPerPage,
  );

  return {
    currentPage: state.currentPage,
    setCurrentPage: (page: number) =>
      dispatch({ type: "SET_PAGE", payload: page }),
    nextPage: () => dispatch({ type: "NEXT_PAGE" }),
    prevPage: () => dispatch({ type: "PREV_PAGE" }),
    totalPages,
    currentDataSlice,
  };
};
