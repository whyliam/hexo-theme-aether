import * as THREE from './vendor/three.module.min.js';

// A family of folded leaves: closed geometry, shaded as satin jade, not a globe.
export function createFolio(host, { unfold = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  host.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
  camera.position.set(0, 0.1, 6.15);
  scene.add(new THREE.HemisphereLight(0xfffcf0, 0x577565, 2.0));
  const key = new THREE.DirectionalLight(0xfff8e4, 3.2);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xe0efe8, 3);
  rim.position.set(4, 1, -2);
  scene.add(rim);
  const group = new THREE.Group();
  group.position.set(0.12, 0.12, 0);
  scene.add(group);
  const leaves = [];
  const colors = [0x829e8d, 0x95af99, 0xa9bda4, 0xb9c9af, 0xb8c9ae];
  for (let i = 0; i < 5; i++) {
    const geometry = new THREE.SphereGeometry(1, 64, 40);
    const positions = geometry.attributes.position;
    const scale = 1 - (i * 0.095);
    for (let j = 0; j < positions.count; j++) {
      const x = positions.getX(j); const y = positions.getY(j); const z = positions.getZ(j);
      const width = 0.78 * (0.9 + (0.15 * y));
      positions.setXYZ(j,
        ((x * width) + (0.35 * y * y)) * scale,
        ((y * 1.65) + (0.12 * x)) * scale,
        ((z * 0.14) + (0.48 * x * x) + (0.3 * y * y) + (0.24 * x * y)) * scale);
    }
    geometry.computeVertexNormals();
    const material = new THREE.MeshPhysicalMaterial({
      color             : colors[i], metalness         : 0.06, roughness         : 0.3,
      clearcoat         : 0.65, clearcoatRoughness: 0.35,
      sheen             : 0.4, sheenColor        : new THREE.Color(0xe5edd7)
    });
    const leaf = new THREE.Mesh(geometry, material);
    leaf.position.set((i - 2) * 0.16, -i * 0.06, i * 0.23);
    leaf.rotation.set(0.08 * i, -0.45 + (i * 0.2), -0.58 + (i * 0.27));
    leaf.userData.base = leaf.rotation.clone();
    leaves.push(leaf);
    group.add(leaf);
  }
  group.rotation.set(0.13, -0.35, -0.16);
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  function render(openingTime = Infinity, pointer = { x: 0, y: 0 }) {
    // Observe a fixed sculpture. Pointer movement never spins the object itself.
    camera.position.x = pointer.x * 0.085;
    camera.position.y = 0.1 + (pointer.y * 0.05);
    camera.lookAt(0, 0.1, 0);
    leaves.forEach((leaf, i) => {
      const progress = Math.max(0, Math.min(1, (openingTime - (i * 0.18)) / 1.6));
      const ease = progress * progress * (3 - (2 * progress));
      // Successive sheets settle into their own positions, like layers of writing.
      leaf.rotation.z = leaf.userData.base.z - ((1 - ease) * i * 0.045);
      leaf.rotation.y = leaf.userData.base.y - ((1 - ease) * 0.08);
      leaf.position.y = (-i * 0.06) - ((1 - ease) * 0.035);
    });
    renderer.render(scene, camera);
  }
  resize();
  render(unfold ? 0 : Infinity);
  return {
    canvas: renderer.domElement, resize, render,
    destroy() {
      leaves.forEach(leaf => { leaf.geometry.dispose(); leaf.material.dispose(); });
      renderer.dispose();
      renderer.domElement.remove();
    }
  };
}
