//Chạy file này bằng cách thay vào page3.js trong FinalProject của bố Hải

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Khởi tạo scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc5f5e7); // màu nền xanh mint

// Tính tỉ lệ và thiết lập OrthographicCamera mở rộng vùng nhìn
const frustumSize = 20;
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
  frustumSize * aspect / -2, frustumSize * aspect / 2,
  frustumSize / 2, frustumSize / -2,
  0.1, 1000
);

// Đặt vị trí camera và hướng nhìn
camera.position.set(0, 10, 30);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;       // bật shadow map
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // shadow mượt hơn
document.body.appendChild(renderer.domElement);


// Ánh sáng
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
const landlight = new THREE.DirectionalLight(0xffffff, 1);
landlight.position.set(5, -30, 5);
landlight.castShadow = true;
scene.add(landlight);

// Cấu hình vùng shadow camera (giúp shadow rõ hơn và không bị cắt)
directionalLight.shadow.camera.left = -15;
directionalLight.shadow.camera.right = 15;
directionalLight.shadow.camera.top = 15;
directionalLight.shadow.camera.bottom = -15;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;

directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;

scene.add(directionalLight);

// Load model GLB
const loader = new GLTFLoader();

loader.load(
  'public/island.glb',
  (gltf) => {
    const island = gltf.scene;

    // Đặt vị trí và scale hợp lý
    island.position.set(0, -9, 0);
    island.scale.set(1.5, 1.5, 1.5);

    // Bật shadow cho các mesh trong model
    island.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(island);
    console.log('Island model loaded and added to scene.');
  },
  (xhr) => {
    console.log(`Island model loading: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
  },
  (error) => {
    console.error('Error loading island model:', error);
  }
);

loader.load(
  'public/tree3.glb',
  (gltf) => {
    const tree3 = gltf.scene;

    // Đặt vị trí và scale hợp lý
    tree3.position.set(0, 0, 0);
    tree3.scale.set(0.5,0.5, 0.5);

    // Bật shadow cho các mesh trong model
    tree3.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(tree3);

    const treeB = tree3.clone(true);
    treeB.position.set(0, 0, -3); // đổi vị trí tùy ý
    treeB.scale.set(0.25, 0.25, 0.25); // nhỏ hơn
    treeB.rotation.y = Math.PI / 3;
    treeB.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(treeB);

    const treeA = tree3.clone(true);
    treeA.position.set(1, 0, 3); // đổi vị trí tùy ý
    treeA.scale.set(0.35, 0.35, 0.35); // nhỏ hơn
    treeA.rotation.y = Math.PI / (-6);
    treeA.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(treeA);

    console.log('Tree model loaded and added to scene.');
  },
  (xhr) => {
    console.log(`Tree model loading: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
  },
  (error) => {
    console.error('Error loading tree model:', error);
  }
);

loader.load(
  'public/tree.glb', // Đường dẫn tới mô hình cay
  (gltf) => {
      const tree = gltf.scene;
      tree.position.set(-5, 0, -5); // Điều chỉnh nếu cần
      tree.scale.set(1.5, 1.5, 1.5); // Có thể chỉnh scale tùy model
      tree.traverse((child) => {
          if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });
      scene.add(tree);
      console.log('Tree model loaded and added to scene.');
  },
  (xhr) => {
      console.log(`Treee model loading: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
  },
  (error) => {
      console.error('Error loading tree model:', error);
  }
);

loader.load(
  'public/tree5.glb',
  (gltf) => {
    const tree5 = gltf.scene;

    // Đặt vị trí và scale hợp lý
    tree5.position.set(5, 0, 5);
    tree5.scale.set(1.5, 1.5, 1.5);

    // Bật shadow cho các mesh trong model
    tree5.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(tree5);
    console.log('Island model loaded and added to scene.');
  },
  (xhr) => {
    console.log(`Island model loading: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
  },
  (error) => {
    console.error('Error loading island model:', error);
  }
);

const fruit = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xff00ff })
);

// Đặt quả trên cây
fruit.position.set(1, 4.5, 1);  // tùy vị trí cây
fruit.castShadow = true;
fruit.receiveShadow = true;
scene.add(fruit);

const velocity = { y: 0 };
const gravity = -0.005;
const initialY = 4.5;  // chiều cao ban đầu của quả
let lastDropTime = Date.now();

function dropFruit() {
  velocity.y = 0;

  // Random một chút vị trí X và Z để quả rơi lệch
  const randomOffsetX = (Math.random() - 0.5) * 4; // từ -2 đến 2
  const randomOffsetZ = (Math.random() - 0.5) * 4;

  fruit.position.set(randomOffsetX, initialY, randomOffsetZ);
}

// Controls cho phép xoay, phóng to, kéo scene
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Resize window
window.addEventListener('resize', () => {
  const aspect = window.innerWidth / window.innerHeight;

  camera.left = -frustumSize * aspect / 2;
  camera.right = frustumSize * aspect / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  const now = Date.now();

  if (fruit) {
    if (fruit.position.y > 0.1 || velocity.y > 0) {
      velocity.y += gravity;
      fruit.position.y += velocity.y;
  
      if (fruit.position.y < 0.1) {
        fruit.position.y = 0.1;
  
        // Nếu vận tốc nhỏ (gần như dừng) thì giữ y = 0.1
        if (Math.abs(velocity.y) < 0.02) {
          velocity.y = 0;
        } else {
          velocity.y *= -0.4; // Nảy lên với độ cao thấp hơn
        }
      }
    } else {
      // Nếu đứng yên và đã chạm đất => chờ 5s rồi reset
      if (now - lastDropTime > 5000) {
        dropFruit();
        lastDropTime = now;
      }
    }
  }


  controls.update();
  renderer.render(scene, camera);
}

animate();

