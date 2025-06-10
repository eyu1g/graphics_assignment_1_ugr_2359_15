import * as THREE from 'three';

/**
 * Sets up the lighting for the scene
 * @param {THREE.Scene} scene - The Three.js scene to add lighting to
 */
export function addLighting(scene) {
  // Add ambient light for general illumination
  const ambientLight = new THREE.AmbientLight(0xaaaeea, 0.4);
  scene.add(ambientLight);

  // Add directional light for shadows and highlights
  const dirLight = new THREE.DirectionalLight(0xaaedba, 0.8);
  dirLight.position.set(5, 10, 7.5);
  dirLight.castShadow = true;

  // Configure shadow properties
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 20;

  scene.add(dirLight);

  // Create ground plane for shadows
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0xaafeed })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
}
