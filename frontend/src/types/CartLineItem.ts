export type CartLineItem = {
  bookId: number
  title: string
  unitPrice: number
  quantity: number
}

export function lineSubtotal(line: CartLineItem): number {
  return line.unitPrice * line.quantity
}

export function cartTotal(lines: CartLineItem[]): number {
  return lines.reduce((sum, line) => sum + lineSubtotal(line), 0)
}
