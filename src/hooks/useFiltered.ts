import { useState, useEffect } from "react";

export type Filter<T> = {
  key: keyof T;
  filterString: string | null;
};

export function useFiltered<T extends object>(data: T[]) {
  if (data.length === 0) {
    throw new Error("Must pass at least one object in list");
  }

  const [filters, setFilters] = useState<Filter<T>[]>(
    Object.keys(data[0]).map((key) => ({
      key: key as keyof T,
      filterString: null,
    }))
  );

  const [filteredData, setFilteredData] = useState<T[]>(data);

  const updateFilter = (key: keyof T, filterString: string | null) => {
    setFilters((currentFilters) => {
      // Find and update the existing filter, or add a new one
      const existingFilterIndex = currentFilters.findIndex(
        (f) => f.key === key
      );
      if (existingFilterIndex > -1) {
        const newFilters = [...currentFilters];
        newFilters[existingFilterIndex] = { key, filterString };
        return newFilters;
      }
      return [...currentFilters, { key, filterString }];
    });
  };

  useEffect(
    function applyFilters() {
      let newFilteredData = data;
      for (const filter of filters) {
        if (filter.filterString === null) {
          // No filter, do nothing
        } else {
          newFilteredData = newFilteredData.filter((item) =>
            JSON.stringify(item[filter.key])
              .toLowerCase()
              .includes(filter.filterString?.toLowerCase() ?? "")
          );
        }
      }
      setFilteredData(newFilteredData);
    },
    [data, filters]
  );
  return { filteredData, filters, updateFilter };
}
