import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Initializes the Three.js scene, camera, renderer, and controls
 * @returns {Object} Object containing scene, camera, renderer, and controls
 */

// Get the canvas element
const canvas = document.querySelector('#viewerCanvas');
console.log(canvas)

// Create the scene with a starry background
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xF0F8FF); // Alice Blue - a light, calming color (commented out)

// Add starry background
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 5000; // Number of stars
const positions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount; i++) {
  // Random positions within a sphere
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;
  const z = (Math.random() - 0.5) * 200;
  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 }); // White stars
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Set up the perspective camera
const camera = new THREE.PerspectiveCamera(
  60, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.set(5, 5, 5); // Position the camera
camera.lookAt(scene.position); // Look at the center of the scene

// Initialize the WebGL renderer
const renderer = new THREE.WebGLRenderer({ 
  canvas, 
  antialias: true // Enable antialiasing
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; // Enable shadow mapping

// Add the renderer to the DOM
document.body.appendChild(renderer.domElement);

// Set up orbit controls for camera manipulation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.enablePan = true; // Allow panning
controls.enableZoom = true; // Allow zooming

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

export { scene, camera, renderer, controls };
