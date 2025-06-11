import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Tạo scene và camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc5f5e7); // xanh baby bfd1e5bfd1e5

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 30);

// Renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Ánh sáng
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 100, 75);
directionalLight.castShadow = true;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.castShadow = true;
scene.add(ambientLight);

const landlight = new THREE.DirectionalLight(0xffffff, 1);
landlight.position.set(0, -30,0);
landlight.castShadow = true;
scene.add(landlight);

// Helper
const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Tải mô hình đảo
const loader = new GLTFLoader();
loader.load(
  '/model/island.glb',
  (gltf) => {
    const model = gltf.scene;

    // Căn giữa mặt đảo về (0, 0, 0)
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const yOffset = box.max.y; // Mặt trên đảo sẽ trùng Y = 0
    model.position.set(-center.x, -yOffset, -center.z);

    // Scale đảo về 20x20 đơn vị
    const scaleFactor = 20 / Math.max(size.x, size.z);
    model.scale.setScalar(scaleFactor);
    
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(model);

// Tải thêm mô hình hoa sen (lotus)
loader.load(
  '/model/lotus.glb',
  (gltf) => {
    const lotus = gltf.scene;

    // Tuỳ chỉnh scale, vị trí
    lotus.scale.set(1.2, 1.2, 1.2); // Scale hoa
    lotus.position.set(3.75, -0.125, 4.7); // Đặt gần mặt hồ chẳng hạn

    scene.add(lotus);
  },
  undefined,
  (error) => {
    console.error('Lỗi khi tải lotus.glb:', error);
  }
);
scene.add(model);

// Tải thêm mô hình duck
loader.load(
  '/model/lowpoly_duck.glb',
  (gltf) => {
    duck = gltf.scene;
    duck.scale.set(0.5, 0.5, 0.5);
    duck.position.set(4.5, 0.2, 3); // Giá trị ban đầu, sẽ cập nhật trong renderloop
    scene.add(duck);
  },
  undefined,
  (error) => {
    console.error('Lỗi khi tải lowpoly_duck.glb:', error);
  }
);
scene.add(model);

    // mặt nước 
const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.bezierCurveTo(3.5, 1, 5, 3.5, 4.5, 5);     
shape.bezierCurveTo(4, 6.5, 0.5, 6, -1, 4);      
shape.bezierCurveTo(-3.5, 2.5, -2, 0.8, 0, 0);   //khép kín hình

const sparkleLight = new THREE.PointLight(0x88ccff, 1.2, 10);
sparkleLight.position.set(4, 2.5, 5.7); // phía trên hồ
scene.add(sparkleLight);


const geometry = new THREE.ShapeGeometry(shape);
const material = new THREE.MeshPhongMaterial({
  color: 0x3355aa,
  transparent: true,
  opacity: 0.7,
  shininess: 100, // Độ bóng
  specular: new THREE.Color(0x88ccff), // Màu phản chiếu ánh sáng
  side: THREE.DoubleSide,
});


const pond = new THREE.Mesh(geometry, material);
pond.rotation.x = -Math.PI / 2;
pond.position.set(4, 0.18, 5.7); // Dời nhẹ để canh giữa cái hồ lớn
scene.add(pond);


const clock = new THREE.Clock();
function renderloop() {
  const t = clock.getElapsedTime();

  // Animate mặt hồ (sóng nhẹ)
  const pos = pond.geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i);
  const y = pos.getY(i);
  const wave =
    Math.sin(x * 2 + t * 3) * 0.05 +
    Math.cos(y * 3 + t * 1.5) * 0.03; // sóng mềm 2 chiều
  pos.setZ(i, wave);
}
pos.needsUpdate = true;

// animate vit quay
  if (duck) {
  const radius = 1.2;              // bán kính vòng tròn
  const speed = 0.5;               // tốc độ quay
  duck.position.x = 5.5 + Math.cos(t * speed) * radius;
  duck.position.z = 2 + Math.sin(t * speed) * radius;
  duck.position.y = 0.2 + Math.sin(t * 2) * 0.03;  // lên xuống nhẹ

  duck.rotation.y = t * speed + Math.PI; // xoay theo hướng bơi
}


  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderloop);
}
renderloop();



    console.log("Kích thước đảo:", size);
    console.log("Tâm đảo:", center);
  },
  undefined,
  (error) => {
    console.error('Lỗi khi tải GLB:', error);
  }
);

// OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
let duck;

// Xử lý thay đổi kích thước cửa sổ
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
