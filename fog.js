const canvas = document.getElementById("fog-canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Fog
scene.fog = new THREE.FogExp2(0x0b0b0b, 0.015);

// Geometry
const geometry = new THREE.PlaneGeometry(500, 500, 64, 64);

const material = new THREE.MeshLambertMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.9
});

const fogPlane = new THREE.Mesh(geometry, material);
fogPlane.rotation.x = -Math.PI / 2;
scene.add(fogPlane);

// Light
const light = new THREE.DirectionalLight(0xffffff, 0.4);
light.position.set(0, 1, 1);
scene.add(light);

// Noise displacement
const pos = geometry.attributes.position;

function animate(){
    for(let i = 0; i < pos.count; i++){
        const y = Math.sin(i * 0.1 + Date.now() * 0.0003) * 3;
        pos.setY(i, y);
    }
    pos.needsUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
