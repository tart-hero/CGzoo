import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Khởi tạo scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -100, window.innerWidth / 100,
    window.innerHeight / 100, window.innerHeight / -100,
    0.1, 1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Bật bóng đổ
renderer.shadowMap.enabled = true;

// Thiết lập camera isometric
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// Ánh sáng
const light1 = new THREE.AmbientLight(0xffffff, 1);
scene.add(light1);
const light2 = new THREE.DirectionalLight(0xffffff, 0.4);
light2.position.set(5, 10, 5);
light2.castShadow = true;
scene.add(light2);
const treeLight = new THREE.PointLight(0xffffff, 1, 10); // Ánh sáng điểm, cường độ 1, khoảng cách 10
treeLight.position.set(2, 2, -2); // Đặt gần cây (cây ở 2, 0, -2, ánh sáng ở trên cao một chút)
treeLight.castShadow = true;
scene.add(treeLight);

// Màu nền xanh mint
scene.background = new THREE.Color(0xc5f5e7);

// Tạo nền đất
/*const groundGeometry = new THREE.BoxGeometry(12, 0.4, 12);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x97ab48 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = 0;
ground.receiveShadow = true;
ground.castShadow = true;
scene.add(ground);*/

// Hàm thêm cây vuông
function addTreeSquare(x, z) {
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 1);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 0.5, z);
    trunk.castShadow = true;
    scene.add(trunk);

    const leavesGeometry = new THREE.BoxGeometry(1, 1, 1);
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(x, 1.3, z);
    leaves.castShadow = true;
    scene.add(leaves);
}

// Hàm thêm cây hình nón
function addTreeCone(x, z) {
    const tree = new THREE.Group();
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 2);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(0, 1, 0);
    trunk.castShadow = true;

    const leaves1Geometry = new THREE.ConeGeometry(1, 2);
    const leaves1Material = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const leaves1 = new THREE.Mesh(leaves1Geometry, leaves1Material);
    leaves1.position.set(0, 2, 0);
    leaves1.castShadow = true;

    const leaves2Geometry = new THREE.ConeGeometry(0.8, 1.8);
    const leaves2Material = new THREE.MeshStandardMaterial({ color: 0x228A10 });
    const leaves2 = new THREE.Mesh(leaves2Geometry, leaves2Material);
    leaves2.position.set(0, 3, 0);
    leaves2.castShadow = true;

    tree.add(trunk);
    tree.add(leaves1);
    tree.add(leaves2);
    tree.position.set(x, 0, z);
    scene.add(tree);
}

// Hàm thêm mèo
function AddCat(x, z) {
    const bodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff9900 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(x, 0.7, z);
    body.castShadow = true;
    body.receiveShadow = true;
    scene.add(body);

    const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xff9900 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(x, 1.3, z);
    head.castShadow = true;
    head.receiveShadow = true;
    scene.add(head);

    const earGeometry = new THREE.ConeGeometry(0.1, 0.3, 32);
    const earMaterial = new THREE.MeshStandardMaterial({ color: 0xff9900 });
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(x - 0.15, 1.6, z);
    leftEar.castShadow = true;
    leftEar.receiveShadow = true;
    scene.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(x + 0.15, 1.6, z);
    rightEar.castShadow = true;
    rightEar.receiveShadow = true;
    scene.add(rightEar);

    return { body, head, leftEar, rightEar };
}

// Hàm thêm cây tròn
function addTreeSphere(x, z) {
    const trunkGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 0.5, z);
    trunk.castShadow = true;

    const leavesGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(x, 2, z);
    leaves.castShadow = true;

    scene.add(trunk);
    scene.add(leaves);
}

// Hàm thêm bụi cây
function addBush(x, z) {
    const bushGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x90ee90 }); // Xanh lá nhạt
    const bush = new THREE.Mesh(bushGeometry, bushMaterial);
    bush.position.set(x, 0.3, z); // Đặt sát mặt đất
    bush.scale.set(1, 0.7, 1); // Ép dẹt một chút
    bush.castShadow = true;
    bush.receiveShadow = true;
    scene.add(bush);
}
// Thêm bụi cây
addBush(1, 3);

function addRock(x, z) {
    const rockGeometry = new THREE.DodecahedronGeometry(0.4); // Hình đa diện
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x696969, roughness: 0.8 });
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    rock.position.set(x, 0.2, z); // Đặt sát mặt đất
    rock.castShadow = true;
    rock.receiveShadow = true;
    scene.add(rock);
}
// Thêm đá
addRock(-2, -2);

// Tải texture cho nước
const textureLoader = new THREE.TextureLoader();
const waterTexture = textureLoader.load(
    'public/water_texture.jpeg' // Đường dẫn đến texture nước
);
waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
waterTexture.repeat.set(2, 2);

// Vùng nước
function addWater(x, z, width, depth) {
    const waterGeometry = new THREE.BoxGeometry(width, 0.2, depth); //dộ dày của nươc
    const waterMaterial = new THREE.MeshStandardMaterial({
        map: waterTexture,
        transparent: true,
        opacity: 0.8,
        metalness: 0.3,
        roughness: 0.1
    });

    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.position.set(x, 0.025, z);
    water.receiveShadow = true;
    water.castShadow = true;
    scene.add(water);

    console.log(`Water box added at (${x}, 0.025, ${z}) with size ${width}x0.05x${depth}`);
    return water;
}

// Tải mô hình cây bằng GLTFLoader
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    'public/tree.glb', // Đường dẫn đến mô hình cây
    (gltf) => {
        const treeModel = gltf.scene;
        treeModel.position.set(2, 1, -2); // Đặt vị trí cho cây
        treeModel.scale.set(0.8, 0.8, 0.8); // Điều chỉnh tỷ lệ nếu cần
        treeModel.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        scene.add(treeModel);
        console.log('Tree model loaded at (2, -2, -2)');
    },
    (xhr) => {
        console.log(`Tree model loading: ${(xhr.loaded / xhr.total * 100)}%`);
    },
    (error) => {
        console.error('Error loading tree model:', error);
    }
);

gltfLoader.load(
    'public/island.glb', // Đường dẫn tới mô hình đảo
    (gltf) => {
        const island = gltf.scene;
        island.position.set(0, -9, 0); // Điều chỉnh nếu cần
        island.scale.set(1.5, 1.5, 1.5); // Có thể chỉnh scale tùy model
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

// Thêm đối tượng vào scene
addTreeSquare(3, 3);
addTreeCone(-1, -1);
addTreeSphere(5, -5);
const cat = AddCat(4, 2);

// Thêm các vùng nước
const water1 = addWater(-3, -3, 2, 2);
const water2 = addWater(0, 2, 3, 1.5);

// Điều khiển xoay bằng chuột
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Xử lý resize cửa sổ
window.addEventListener('resize', () => {
    camera.left = window.innerWidth / -100;
    camera.right = window.innerWidth / 100;
    camera.top = window.innerHeight / 100;
    camera.bottom = window.innerHeight / -100;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Thêm trục tọa độ
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

// Biến để theo dõi thời gian cho animation
let clock = new THREE.Clock();

//Mưa
const rainCount = 1000;
const rainGeometry = new THREE.BufferGeometry();
const rainPositions = new Float32Array(rainCount * 6);

const angle = Math.PI / 6; // 30 độ
const xShift = Math.tan(angle) * 0.2; // Độ lệch ngang tương ứng với mỗi bước rơi
const offsetX = 5; // Dịch sang phải 5 đơn vị

for (let i = 0; i < rainCount; i++) {
    let x = (Math.random() - 0.5) * 20 + offsetX; // Thêm offsetX để dịch phải
    let y = Math.random() * 15 + 10;
    let z = (Math.random() - 0.5) * 20;
    let length = Math.random() * 0.5 + 0.2;

    rainPositions.set([x, y, z, x - Math.tan(angle) * length, y - length, z], i * 6);
}

rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
const rainMaterial = new THREE.LineBasicMaterial({
    color: 0x82caff,
    transparent: true,
    opacity: 0.5,
});

const rain = new THREE.LineSegments(rainGeometry, rainMaterial);
scene.add(rain);

// Animate mưa xiên
function animateRain() {
    let positions = rain.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 6) {
        positions[i] -= xShift;   // Điểm đầu lệch trái
        positions[i + 1] -= 0.2;  // Điểm đầu rơi xuống
        positions[i + 3] -= xShift; // Điểm cuối lệch trái
        positions[i + 4] -= 0.2;  // Điểm cuối rơi xuống

        // Khi giọt mưa chạm đất, reset vị trí
        if (positions[i + 1] < 0) {
            let x = (Math.random() - 0.5) * 20 + offsetX; // Reset với offsetX
            let y = Math.random() * 15 + 10;
            let z = (Math.random() - 0.5) * 20;
            let length = Math.random() * 0.5 + 0.2;

            positions.set([x, y, z, x - Math.tan(angle) * length, y - length, z], i);
        }
    }
    rain.geometry.attributes.position.needsUpdate = true;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    animateRain();

    const elapsedTime = clock.getElapsedTime();

    // Animation nhảy lên nhảy xuống cho mèo
    const jumpHeight = 0.3;
    const jumpSpeed = 2;
    const jumpOffset = Math.abs(Math.sin(elapsedTime * jumpSpeed)) * jumpHeight;

    const baseY = 0.7;
    cat.body.position.y = baseY + jumpOffset;
    cat.head.position.y = baseY + 0.6 + jumpOffset;
    cat.leftEar.position.y = baseY + 0.9 + jumpOffset;
    cat.rightEar.position.y = baseY + 0.9 + jumpOffset;

    // Animation sóng nước (dùng vị trí y của box)
    const waveSpeed = 1.5;
    const waveHeight = 0.05;
    [water1, water2].forEach(water => {
        water.position.y = 0.25 + Math.sin(elapsedTime * waveSpeed) * waveHeight;
    });

    renderer.render(scene, camera);
}

animate();