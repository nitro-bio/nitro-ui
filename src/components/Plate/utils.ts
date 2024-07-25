export const wellsToRowsCols = (wells: 24 | 96 | 48 | 384) => {
    switch (wells) {
      case 24:
        return { rows: 4, cols: 6 };
      case 48:
        return { rows: 6, cols: 8 };
      case 96:
        return { rows: 8, cols: 12 };
      case 384:
        return { rows: 16, cols: 24 };
      default:
        throw new Error("Invalid number of wells");
    }
  };

export const indexToExcelCell = (index: number, wells: 24 | 96 | 48 | 384) => {
    const { cols } = wellsToRowsCols(wells);
    const row = Math.floor(index / cols);
    const col = index % cols;
    return `${String.fromCharCode(65 + col)}${row + 1}`;
};
