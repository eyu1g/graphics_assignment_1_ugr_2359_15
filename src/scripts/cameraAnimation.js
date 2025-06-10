/**
 * Camera animation and interaction state variables
 */
let autoRotate = true;
let userInteracting = false;
let lastInteractionTime = 0;
const INTERACTION_TIMEOUT = 2000; // 2 seconds

/**
 * Animates the camera to orbit around the scene
 * @param {number} time - Current time in milliseconds
 * @param {THREE.Camera} camera - The camera to animate
 */
export function animateCamera(time, camera) {
  // Always keep rotating
  if (!autoRotate) {
    autoRotate = true;
  }

  // Calculate camera position using polar coordinates
  const t = time * 0.0002; // Slow rotation speed
  const radius = 8; // Orbit radius
  const y = 5; // Fixed height

  // Update camera position
  camera.position.x = radius * Math.cos(t);
  camera.position.z = radius * Math.sin(t);
  camera.position.y = y;

  // Keep camera looking at center
  camera.lookAt(0, 0, 0);
}

/**
 * Handles user interaction start
 * @param {number} time - Current time in milliseconds
 */
export function handleUserInteraction(time) {
  userInteracting = true;
  lastInteractionTime = time;
}

/**
 * Handles user interaction end
 */
export function handleUserInteractionEnd() {
  userInteracting = false;
}
