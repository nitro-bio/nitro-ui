import { getRndInteger } from "@utils/mathUtils";

export const generateRandomVolcanoData = (n: number) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({ x: getRndInteger(0, 100), y: getRndInteger(0, 100) });
  }
  return data;
};
