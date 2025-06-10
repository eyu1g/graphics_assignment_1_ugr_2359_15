import * as THREE from 'three';
import { handleUserInteraction, handleUserInteractionEnd } from './cameraAnimation.js';

let lastTime = 0;

export function setupInteraction(scene, camera) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  // Create info panel
  const infoPanel = document.createElement('div');
  infoPanel.style.position = 'absolute';
  infoPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  infoPanel.style.color = 'white';
  infoPanel.style.padding = '10px';
  infoPanel.style.borderRadius = '5px';
  infoPanel.style.display = 'none';
  infoPanel.style.zIndex = '1000';
  document.body.appendChild(infoPanel);

  // Store original materials for hover effect
  const originalMaterials = new Map();
  let hoveredObject = null;

  function updateMousePosition(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function showPartInfo(object, event) {
    let currentObject = object;
    let partName = 'Unknown Part';

    // Traverse up the hierarchy to find a named parent
    while (currentObject) {
      if (currentObject.userData && currentObject.userData.name) {
        partName = currentObject.userData.name;
        break;
      }
      currentObject = currentObject.parent;
    }
    
    infoPanel.textContent = partName;
    infoPanel.style.display = 'block';
    infoPanel.style.left = `${event.clientX + 10}px`;
    infoPanel.style.top = `${event.clientY + 10}px`;
  }

  function handleHover(object) {
    if (hoveredObject === object) return;
    
    // Reset previous hover
    if (hoveredObject && originalMaterials.has(hoveredObject)) {
      hoveredObject.material = originalMaterials.get(hoveredObject);
    }

    // Set new hover
    if (object) {
      originalMaterials.set(object, object.material.clone());
      const hoverMaterial = object.material.clone();
      hoverMaterial.emissive = new THREE.Color(0x666666);
      object.material = hoverMaterial;
    }

    hoveredObject = object;
  }

  // Mouse move handler
  window.addEventListener('mousemove', event => {
    lastTime = performance.now();
    handleUserInteraction(lastTime);
    updateMousePosition(event);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
      handleHover(intersects[0].object);
    } else {
      handleHover(null);
    }
  });

  // Mouse click handler
  window.addEventListener('click', event => {
    lastTime = performance.now();
    handleUserInteraction(lastTime);
    updateMousePosition(event);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      const originalColor = object.material.color.getHex();
      
      // Click effect
      object.material.color.set('#edaab0');
      showPartInfo(object, event);

      setTimeout(() => {
        object.material.color.set(originalColor);
        infoPanel.style.display = 'none';
      }, 1000);
    }
  });

  // Mouse up handler to end interaction
  window.addEventListener('mouseup', () => {
    handleUserInteractionEnd();
  });

  // Hide panel when clicking outside
  window.addEventListener('click', event => {
    if (!event.target.closest('#viewerCanvas')) {
      infoPanel.style.display = 'none';
    }
  });
}
