/**
 * Format a number as Ugandan Shillings
 * Example: 175000 → "UGX 175,000"
 */
export const formatUGX = (amount: number): string => {
    return `UGX ${amount.toLocaleString('en-UG')}`
}

/**
 * Short format for tight spaces
 * Example: 175000 → "175K"
 */
export const formatUGXShort = (amount: number): string => {
    if (amount >= 1_000_000) return `UGX ${(amount / 1_000_000).toFixed(1)}M`
    if (amount >= 1_000) return `UGX ${(amount / 1_000).toFixed(0)}K`
    return `UGX ${amount}`
}