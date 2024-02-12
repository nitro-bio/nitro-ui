import { useState, useEffect } from "react";

type SortOrder = "asc" | "dsc";

export function useSorted<T extends object>(data: T[]) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [sortedData, setSortedData] = useState<T[]>(data);

  useEffect(
    function sortData() {
      if (!sortKey) {
        setSortedData(data);
        return;
      }

      const sorted = [...data].sort((a, b) => {
        if (a[sortKey] === null) return sortOrder === "asc" ? 1 : -1;
        if (b[sortKey] === null) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      setSortedData(sorted);
    },
    [data, sortKey, sortOrder],
  );

  return { sortedData, sortKey, setSortKey, sortOrder, setSortOrder };
}
