export const generateChatData = (n: number) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({ x: Math.random(), y: Math.random() });
  }
  return data;
};
