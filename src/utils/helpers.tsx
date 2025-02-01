/**
 * Formats a number into a percentage string.
 * Example: 2.456 -> "2.46%"
 */
export const formatPriceChange = (priceChange: number): string => {
  return `${priceChange.toFixed(2)}%`
}
