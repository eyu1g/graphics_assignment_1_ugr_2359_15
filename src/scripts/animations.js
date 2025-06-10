/**
 * Animates the product meshes
 * @param {THREE.Group} product - The product group to animate
 * @param {number} deltaTime - Time elapsed since last frame
 */
export function animateProduct(product, deltaTime) {
  if (!product) return;

  // Update animation time
  product.userData.animation.time += deltaTime * product.userData.animation.speed;

  // Animate product components
  product.traverse((child) => {
    if (child.userData.name?.includes('Teddy Bear')) {
      
      // Store initial position if not already stored
      if (!child.userData.basePosition) {
        child.userData.basePosition = {
          y: child.position.y,
        };
      }

      const time = product.userData.animation.time;
      const amplitude = product.userData.animation.amplitude;
      
      // Add floating motion to teddy bear
      const floatOffset = Math.sin(time * 2) * amplitude * 0.5;
      child.position.y = child.userData.basePosition.y + floatOffset;
    }
  });
} 