import "./style.css";
import * as THREE from "./three";
import { OrbitControls } from "./three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);
const geometry = new THREE.TorusGeometry(15, 5, 100, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6346,
});
const geometry1 = new THREE.BoxGeometry(6, 6, 6);
const material1 = new THREE.MeshBasicMaterial({
  color: 0x47f3fd,
});
const cube = new THREE.Mesh(geometry1, material1);
cube.rotateX(90);
cube.rotateY(90);
const geometry2 = new THREE.BoxGeometry(6, 6, 6);
const material2 = new THREE.MeshBasicMaterial({
  color: 0x47f3fd,
});
const cube1 = new THREE.Mesh(geometry2, material2);
cube1.rotateX(90);
cube1.rotateY(90);
scene.add(cube, cube1);
let loader = new GLTFLoader();
loader.load("./scene.gltf", function (gltf) {
  scene.add(gltf.scene);
});
const controls = new OrbitControls(camera, renderer.domElement);
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add();
pointLight.position.set(10, 10, 0);
scene.add(pointLight, ambientLight);
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.05;
  // torus.rotation.z += 0.005;
  // torus.rotation.y = +0.01;
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  cube.rotation.z += 0.02;
  cube1.rotation.x += -0.1;
  cube1.rotation.y += -0.1;
  cube1.rotation.z += -0.02;
  controls.update;
  renderer.render(scene, camera);
}
animate();
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);
