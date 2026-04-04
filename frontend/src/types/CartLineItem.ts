/** One line in the session cart (denormalized title/price for display). */
export type CartLineItem = {
  bookId: number
  title: string
  unitPrice: number
  quantity: number
}

/** Unit price times quantity for one cart line. */
export function lineSubtotal(line: CartLineItem): number {
  return line.unitPrice * line.quantity
}

/** Sum of line subtotals for the cart total display. */
export function cartTotal(lines: CartLineItem[]): number {
  return lines.reduce((sum, line) => sum + lineSubtotal(line), 0)
}
