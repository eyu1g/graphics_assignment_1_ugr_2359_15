/**
 * Utility functions for the 3D Product Viewer
 */

/**
 * Converts degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} Angle in radians
 */
export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Calculates polar coordinates from cartesian coordinates
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {Object} Polar coordinates {radius, theta}
 */
export function cartesianToPolar(x, y) {
    const radius = Math.sqrt(x * x + y * y);
    const theta = Math.atan2(y, x);
    return { radius, theta };
}

/**
 * Calculates cartesian coordinates from polar coordinates
 * @param {number} radius - Distance from origin
 * @param {number} theta - Angle in radians
 * @returns {Object} Cartesian coordinates {x, y}
 */
export function polarToCartesian(radius, theta) {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return { x, y };
}

/**
 * Clamps a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
export function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

/**
 * Generates a random color in hex format
 * @returns {number} Random color as hex number
 */
export function getRandomColor() {
    return Math.floor(Math.random() * 16777215);
}

/**
 * Formats a number to a specific number of decimal places
 * @param {number} value - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {number} Formatted number
 */
export function formatNumber(value, decimals = 2) {
    return Number(value.toFixed(decimals));
} 