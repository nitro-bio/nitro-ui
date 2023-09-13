export const Paginator = ({
  currentPage,
  nextPage,
  prevPage,
  totalPages,
  resultsPerPage,
  totalResults,
}: {
  resultsPerPage: number;
  totalResults: number;
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number;
}) => {
  const resultStartIdx = (currentPage - 1) * resultsPerPage + 1;
  const resultEndIdx = Math.min(currentPage * resultsPerPage, totalResults);
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden text-sm text-gray-700 sm:block">
        Showing <span className="font-medium">{resultStartIdx}</span> to{" "}
        <span className="font-medium">{resultEndIdx}</span> of{" "}
        <span className="font-medium">{totalResults}</span> results
      </div>
      <div className="flex flex-1 justify-between gap-4 sm:justify-end">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={
            "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          }
        >
          Previous
        </button>
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </nav>
  );
};
