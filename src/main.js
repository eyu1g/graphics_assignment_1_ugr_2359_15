import { scene, camera, renderer, controls } from './scripts/initScene.js';
import { createProduct } from './scripts/createProduct.js';
import { addLighting } from './scripts/addLighting.js';
import { setupInteraction } from './scripts/interaction.js';
import { animateCamera } from './scripts/cameraAnimation.js';
import { animateProduct } from './scripts/animations.js';

const product = createProduct(scene);
addLighting(scene);
setupInteraction(scene, camera);

let lastTime = performance.now();
function animate(currentTime) {
  requestAnimationFrame(animate);
  
  // Calculate delta time in seconds
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Update animations
  animateCamera(currentTime, camera);
  animateProduct(product, deltaTime);
  
  controls.update();
  renderer.render(scene, camera);
}

animate(performance.now());
