/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _assets_shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/shaders/vertex.glsl */ \"./src/assets/shaders/vertex.glsl\");\n/* harmony import */ var _assets_shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/shaders/fragment.glsl */ \"./src/assets/shaders/fragment.glsl\");\n/* harmony import */ var _assets_shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst canvasEl = document.getElementById('webgl-canvas');\nconst canvasSize = {\n  w: window.innerWidth,\n  h: window.innerHeight\n};\nconst renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer({\n  canvas: canvasEl\n});\nrenderer.setPixelRatio(window.devicePixelRatio);\nrenderer.setSize(canvasSize.w, canvasSize.h);\nconst fov = 60;\nconst fovRad = fov / 2 * (Math.PI / 180);\nconst dist = canvasSize.h / 2 / Math.tan(fovRad);\nconst camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(fov, canvasSize.w / canvasSize.h, 0.1, 2000);\ncamera.position.z = dist;\nconst scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();\nconst loader = new three__WEBPACK_IMPORTED_MODULE_2__.TextureLoader();\nclass ImagePlane {\n  constructor(mesh, img) {\n    this.refImage = img;\n    this.mesh = mesh;\n  }\n  setParams() {\n    const rect = this.refImage.getBoundingClientRect();\n    this.mesh.scale.x = rect.width;\n    this.mesh.scale.y = rect.height;\n    const x = rect.left - canvasSize.w / 2 + rect.width / 2;\n    const y = -rect.top + canvasSize.h / 2 - rect.height / 2;\n    // const x = 0;\n    this.mesh.position.set(x, y, this.mesh.position.z);\n  }\n  update(offset) {\n    this.setParams();\n    this.mesh.material.uniforms.uTime.value = offset;\n  }\n}\nconst createMesh = img => {\n  const texture = loader.load(img.src);\n  const disp = loader.load('/assets/images/disp.png');\n  const uniforms = {\n    uTexture: {\n      type: 'sampler2D',\n      value: texture\n    },\n    uDisp: {\n      type: 'sampler2D',\n      value: disp\n    },\n    uImageAspect: {\n      type: 'f',\n      value: img.naturalWidth / img.naturalHeight\n    },\n    uPlaneAspect: {\n      type: 'f',\n      value: img.clientWidth / img.clientHeight\n    },\n    uTime: {\n      type: 'f',\n      value: 0\n    }\n  };\n  const geo = new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(1, 1, 100, 100);\n  const mat = new three__WEBPACK_IMPORTED_MODULE_2__.ShaderMaterial({\n    uniforms,\n    vertexShader: (_assets_shaders_vertex_glsl__WEBPACK_IMPORTED_MODULE_0___default()),\n    fragmentShader: (_assets_shaders_fragment_glsl__WEBPACK_IMPORTED_MODULE_1___default())\n  });\n  const mesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(geo, mat);\n  return mesh;\n};\nlet targetScrollY = 0;\nlet currentScrollY = 0;\nlet scrollOffset = 0;\nconst lerp = (start, end, multiplier) => {\n  return (1 - multiplier) * start + multiplier * end;\n};\nconst updateScroll = () => {\n  targetScrollY = document.documentElement.scrollTop;\n  currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);\n  scrollOffset = targetScrollY - currentScrollY;\n};\nconst imagePlaneArray = [];\nconst loop = () => {\n  updateScroll();\n  for (const plane of imagePlaneArray) {\n    plane.update(scrollOffset);\n  }\n  renderer.render(scene, camera);\n  requestAnimationFrame(loop);\n};\nconst resize = () => {\n  const width = window.innerWidth;\n  const height = window.innerHeight;\n  canvasSize.w = width;\n  canvasSize.h = height;\n  renderer.setPixelRatio(window.devicePixelRatio);\n  renderer.setSize(width, height);\n  camera.aspect = width / height;\n  camera.updateProjectionMatrix();\n  const fov = 60;\n  const fovRad = fov / 2 * (Math.PI / 180);\n  const dist = canvasSize.h / 2 / Math.tan(fovRad);\n  camera.position.z = dist;\n  const imageArray = [...document.querySelectorAll('img')];\n  imagePlaneArray.forEach((plane, i) => {\n    plane.mesh.material.uniforms.uImageAspect.value = imageArray[i].naturalWidth / imageArray[i].naturalHeight;\n    plane.mesh.material.uniforms.uPlaneAspect.value = imageArray[i].clientWidth / imageArray[i].clientHeight;\n  });\n};\nconst main = () => {\n  window.addEventListener('load', () => {\n    const imageArray = [...document.querySelectorAll('img')];\n    for (const img of imageArray) {\n      const mesh = createMesh(img);\n      scene.add(mesh);\n      const imagePlane = new ImagePlane(mesh, img);\n      imagePlane.setParams();\n      imagePlaneArray.push(imagePlane);\n    }\n    loop();\n  });\n  window.addEventListener('resize', resize, {\n    passive: true\n  });\n};\nmain();\n\n//# sourceURL=webpack://three-shader-env01/./src/index.js?");

/***/ }),

/***/ "./src/assets/shaders/fragment.glsl":
/*!******************************************!*\
  !*** ./src/assets/shaders/fragment.glsl ***!
  \******************************************/
/***/ ((module) => {

eval("module.exports = \"#define GLSLIFY 1\\nvarying vec2 vUv;\\nuniform sampler2D uTexture;\\nuniform sampler2D uDisp;\\nuniform float uImageAspect;\\nuniform float uPlaneAspect;\\nuniform float uTime;\\n\\nvoid main(){\\n\\n  vec2 ratio = vec2(\\n    min(uPlaneAspect / uImageAspect, 1.0),\\n    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)\\n  );\\n\\n  vec2 fixedUv = vec2(\\n    (vUv.x - 0.5) * ratio.x + 0.5,\\n    (vUv.y - 0.5) * ratio.y + 0.5\\n  );\\n\\n  vec4 disp = texture2D(uDisp, vUv);\\n  vec2 dispVec = vec2(0., sin(disp.y * .8) * 2.);\\n  \\n  vec2 distPos = fixedUv + (dispVec * uTime * .0005);\\n\\n  vec2 offset = vec2(0.0, uTime * 0.0005);\\n  float r = texture2D(uTexture, fixedUv + offset).r;\\n  float g = texture2D(uTexture, fixedUv + offset * 0.5).g;\\n  float b = texture2D(uTexture, fixedUv).b;\\n\\n  gl_FragColor = texture2D(uTexture, distPos);\\n}\";\n\n//# sourceURL=webpack://three-shader-env01/./src/assets/shaders/fragment.glsl?");

/***/ }),

/***/ "./src/assets/shaders/vertex.glsl":
/*!****************************************!*\
  !*** ./src/assets/shaders/vertex.glsl ***!
  \****************************************/
/***/ ((module) => {

eval("module.exports = \"#define GLSLIFY 1\\nvarying vec2 vUv;\\nuniform float uTime;\\n\\nfloat PI = 3.1415926535897932384626433832795;\\n\\nvoid main(){\\n    vUv = uv;\\n    vec3 pos = position;\\n\\n    float tension = -0.001 * uTime;\\n\\n    pos.y = pos.y + cos(pos.x * PI) * tension;\\n    pos.z = pos.z - sin(pos.y * clamp(uTime * .1, -1., 1.) * PI * 2./3. + PI/3.) * min(abs(uTime * .2), 100.);\\n\\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\\n}\";\n\n//# sourceURL=webpack://three-shader-env01/./src/assets/shaders/vertex.glsl?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;