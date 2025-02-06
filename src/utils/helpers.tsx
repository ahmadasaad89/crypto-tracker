//Formats a number into a percentage string.
export const formatPriceChange = (priceChange: number): string => {
  return `${priceChange.toFixed(2)}%`
}
