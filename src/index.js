import * as THREE from 'three'

import vertex from './assets/shaders/vertex.glsl'
import fragment from './assets/shaders/fragment.glsl'

const canvasEl = document.getElementById('webgl-canvas');
const canvasSize = {
  w: window.innerWidth,
  h: window.innerHeight,
};

const renderer = new THREE.WebGLRenderer({ canvas: canvasEl });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasSize.w, canvasSize.h);

const fov = 60;
const fovRad = (fov / 2) * (Math.PI / 180);
const dist = canvasSize.h / 2 / Math.tan(fovRad);
const camera = new THREE.PerspectiveCamera(
  fov,
  canvasSize.w / canvasSize.h,
  0.1,
  2000
);
camera.position.z = dist;

const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();

class ImagePlane {
  constructor(mesh, img) {
    this.refImage = img;
    this.mesh = mesh;
  }

  setParams() {
    const rect = this.refImage.getBoundingClientRect();

    this.mesh.scale.x = rect.width;
    this.mesh.scale.y = rect.height;

    const x = rect.left - canvasSize.w / 2 + rect.width / 2;
    const y = -rect.top + canvasSize.h / 2 - rect.height / 2;
    // const x = 0;
    this.mesh.position.set(x, y, this.mesh.position.z);
  }

  update(offset) {
    this.setParams();

    this.mesh.material.uniforms.uTime.value = offset;
  }
}

const createMesh = (img) => {
  const texture = loader.load(img.src);
  const disp = loader.load('/assets/images/disp.png')

  const uniforms = {
    uTexture: { type: 'sampler2D', value: texture },
    uDisp: { type: 'sampler2D', value: disp },
    uImageAspect: { type: 'f', value: img.naturalWidth / img.naturalHeight },
    uPlaneAspect: { type: 'f', value: img.clientWidth / img.clientHeight },
    uTime: { type: 'f', value: 0 },

  };
  const geo = new THREE.PlaneGeometry(1, 1, 100, 100); 
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment
  });

  const mesh = new THREE.Mesh(geo, mat);

  return mesh;
};

let targetScrollY = 0;
let currentScrollY = 0;
let scrollOffset = 0;

const lerp = (start, end, multiplier) => {
  return (1 - multiplier) * start + multiplier * end;
};

const updateScroll = () => {

  targetScrollY = document.documentElement.scrollTop;

  currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

  scrollOffset = targetScrollY - currentScrollY;
};

const imagePlaneArray = [];

const loop = () => {
  updateScroll();
  for (const plane of imagePlaneArray) {
    plane.update(scrollOffset);
  }
  renderer.render(scene, camera);

  requestAnimationFrame(loop);
};

const resize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvasSize.w = width;
  canvasSize.h = height;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const fov = 60;
  const fovRad = (fov / 2) * (Math.PI / 180);
  const dist = canvasSize.h / 2 / Math.tan(fovRad);
  camera.position.z = dist;

  const imageArray = [...document.querySelectorAll('img')];
  imagePlaneArray.forEach( (plane, i) => {
    plane.mesh.material.uniforms.uImageAspect.value = imageArray[i].naturalWidth / imageArray[i].naturalHeight
    plane.mesh.material.uniforms.uPlaneAspect.value = imageArray[i].clientWidth / imageArray[i].clientHeight
  })
};

const main = () => {
  window.addEventListener('load', () => {
    const imageArray = [...document.querySelectorAll('img')];
    for (const img of imageArray) {
      const mesh = createMesh(img);
      scene.add(mesh);

      const imagePlane = new ImagePlane(mesh, img);
      imagePlane.setParams();

      imagePlaneArray.push(imagePlane);
    }
    loop();
  });

  window.addEventListener('resize', resize, {passive: true})
};

main();