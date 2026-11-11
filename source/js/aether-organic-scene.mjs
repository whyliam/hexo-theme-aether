import * as THREE from './vendor/three.module.min.js';

// A family of folded leaves: closed geometry, shaded as celadon glass, not a globe.
export function createFolio(host, { unfold = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
  camera.position.set(0, 0.1, 6.15);
  scene.add(new THREE.HemisphereLight(0xfffcf0, 0x577565, 0.8));
  const key = new THREE.DirectionalLight(0xfff8e4, 1.5);
  key.position.set(-3, 5, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xe0efe8, 3);
  rim.position.set(4, 1, -2);
  scene.add(rim);
  const glint = new THREE.DirectionalLight(0xf0fffa, 2.5);
  glint.position.set(-3, -2, 5);
  scene.add(glint);
  const group = new THREE.Group();
  group.position.set(0.12, 0.12, 0);
  scene.add(group);
  // A small local studio map gives glass a legible rim without remote assets.
  const studio = document.createElement('canvas');
  studio.width = 512;
  studio.height = 256;
  const context = studio.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, '#f5fff9');
  gradient.addColorStop(0.45, '#7eafa6');
  gradient.addColorStop(1, '#193f3b');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 256);
  context.fillStyle = '#ffffff';
  context.fillRect(50, 12, 30, 190);
  context.fillRect(350, 25, 100, 90);
  context.fillStyle = '#d9f8ff';
  context.fillRect(250, 30, 12, 210);
  const environment = new THREE.CanvasTexture(studio);
  environment.mapping = THREE.EquirectangularReflectionMapping;
  environment.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environmentTarget = pmrem.fromEquirectangular(environment);
  scene.environment = environmentTarget.texture;
  environment.dispose();
  pmrem.dispose();
  const leaves = [];
  const colors = [0x65a69b, 0x8fc5b5, 0xb2ded0, 0xc9e7d6, 0xe3f3e6];
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
      color              : colors[i], metalness          : 0, roughness          : 0.055,
      transparent        : true, opacity            : 0.88, depthWrite         : false,
      transmission       : 0.55, thickness          : 0.85, ior                : 1.5,
      attenuationColor   : new THREE.Color(0x79baa7), attenuationDistance: 1.8,
      clearcoat          : 1, clearcoatRoughness : 0.035, envMapIntensity    : 3.2,
      sheen              : 0, sheenColor         : new THREE.Color(0xe5edd7)
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
  function render(openingTime = Infinity, pointer = { x: 0, y: 0 }, elapsed = 0) {
    // A six-second breath opens the folio and moves highlights across its curved edges.
    const phase = elapsed * Math.PI * 2 / 6;
    const breath = (1 - Math.cos(phase)) / 2;
    group.scale.setScalar(1 + (breath * 0.045));
    group.position.y = 0.12 + (breath * 0.07);
    group.rotation.y = -0.35 + (Math.sin(phase) * 0.055);
    // Observe a fixed sculpture. Pointer movement never spins the object itself.
    camera.position.x = pointer.x * 0.085;
    camera.position.y = 0.1 + (pointer.y * 0.05);
    camera.lookAt(0, 0.1, 0);
    leaves.forEach((leaf, i) => {
      const progress = Math.max(0, Math.min(1, (openingTime - (i * 0.18)) / 1.6));
      const ease = progress * progress * (3 - (2 * progress));
      // Successive sheets settle into their own positions, like layers of writing.
      leaf.rotation.z = leaf.userData.base.z - ((1 - ease) * i * 0.045) + (breath * (i - 2) * 0.035);
      leaf.rotation.y = leaf.userData.base.y - ((1 - ease) * 0.08) + (breath * (i - 2) * 0.025);
      leaf.position.x = (i - 2) * (0.16 + (breath * 0.025));
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
      environmentTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    }
  };
}
