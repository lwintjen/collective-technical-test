export const formatNumber = (number: string): string => {
  if (number[0] === "-")
    return "-" + String(Number(number.slice(1)).toFixed(2)) + "%";
  return +String(Number(number).toFixed(2)) + "%";
};
