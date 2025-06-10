import * as THREE from 'three';

/**
 * Creates the 3D product (chair with flower) using basic geometries
 * @param {THREE.Scene} scene - The Three.js scene to add the product to
 * @returns {THREE.Group} The product group containing all meshes
 */
export function createProduct(scene) {
  const group = new THREE.Group();

  // === Chair Components ===
  const chairMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513', roughness: 0.7, metalness: 0.1 }); // Brown wood color
  const cushionMaterial = new THREE.MeshStandardMaterial({ color: '#FF69B4', roughness: 0.5, metalness: 0.1 }); // Pink cushion

  // Chair Seat
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 2), chairMaterial);
  seat.position.y = 0.5;
  seat.userData.name = 'Chair Seat';
  group.add(seat);

  // Chair Back
  const back = new THREE.Mesh(new THREE.BoxGeometry(2, 1.5, 0.2), chairMaterial);
  back.position.set(0, 1.25, -0.9);
  back.userData.name = 'Chair Back';
  group.add(back);

  // Chair Legs
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
  const legPositions = [
    [-0.8, 0, -0.8],
    [0.8, 0, -0.8],
    [-0.8, 0, 0.8],
    [0.8, 0, 0.8]
  ];

  legPositions.forEach((pos, index) => {
    const leg = new THREE.Mesh(legGeometry, chairMaterial);
    leg.position.set(...pos);
    leg.userData.name = `Chair Leg ${index + 1}`;
    group.add(leg);
  });

  // Chair Cushion
  const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 1.8), cushionMaterial);
  cushion.position.y = 0.6;
  cushion.userData.name = 'Chair Cushion';
  group.add(cushion);

  // === Flower on Chair ===
  const flowerGroup = new THREE.Group();
  
  // Flower Stem
  const stemMaterial = new THREE.MeshStandardMaterial({ color: '#228B22', roughness: 0.5, metalness: 0.1 }); // Forest green
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 8), stemMaterial);
  stem.position.y = 0.5;
  stem.userData.name = 'Flower Stem';
  flowerGroup.add(stem);

  // Flower Center
  const centerMaterial = new THREE.MeshStandardMaterial({ color: '#FFD700', roughness: 0.3, metalness: 0.2 }); // Gold
  const center = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), centerMaterial);
  center.position.y = 1;
  center.userData.name = 'Flower Center';
  flowerGroup.add(center);

  // Flower Petals
  const petalMaterial = new THREE.MeshStandardMaterial({ color: '#FF69B4', roughness: 0.4, metalness: 0.1 }); // Hot pink
  const petalGeometry = new THREE.ConeGeometry(0.2, 0.4, 4);
  
  for (let i = 0; i < 8; i++) {
    const petal = new THREE.Mesh(petalGeometry, petalMaterial);
    const angle = (i / 8) * Math.PI * 2;
    petal.position.set(
      Math.cos(angle) * 0.3,
      1,
      Math.sin(angle) * 0.3
    );
    petal.rotation.x = Math.PI / 2;
    petal.rotation.z = angle;
    petal.userData.name = `Flower Petal ${i + 1}`;
    flowerGroup.add(petal);
  }

  // Position the flower on the chair
  flowerGroup.position.set(0, 0.5, 0);
  flowerGroup.userData.name = 'Flower';
  group.add(flowerGroup);

  // Enable shadows for all meshes
  group.traverse(obj => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  // Add animation properties
  group.userData.animation = {
    time: 0,
    speed: 1.0,
    amplitude: 0.05
  };

  scene.add(group);
  return group;
}


