import * as THREE from "three";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
const canvas = document.querySelector("canvas.webgl");

const gui = new GUI();

const scene = new THREE.Scene();

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);

pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// textures

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
// const doorAlphaTexture = textureLoader.load(".textures/door/alpha.jpg");
// const doorAmbientOcclusionTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg");
// const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
// const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
// const doorMetalnessTexture = textureLoader.load("./textures/door/metalness.jpg");
const matCapTexture = textureLoader.load("./textures/matcaps/8.png");
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matCapTexture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.SphereGeometry(0.5, 16, 16);

// Basic Material
// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });

// Normal Material
// const material = new THREE.MeshNormalMaterial({ flatShading: true });

// MeshDepth Material
//const material = new THREE.MeshDepthMaterial({ flatShading: true });

// Matcap Material
//const material = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });

// Lambert Material
// const material = new THREE.MeshLambertMaterial({ matcap: matCapTexture });

// Phong
// const material = new THREE.MeshPhongMaterial();

// MeshToon
// const material = new THREE.MeshToonMaterial();

// material.shininess = 1000;
// material.specular - new THREE.Color(0x1188ff);

// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// gradientTexture.magFilter = THREE.NearestFilter;

// Mesh Standard ( PBR algorithm)
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.45;
material.roughness = 0.65;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

material.gradientMap = gradientTexture;

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const sizes = {
	width: 800,
	height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	sphere.rotation.y = 0.1 * elapsedTime;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
