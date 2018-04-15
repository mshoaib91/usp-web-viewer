import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

import ObjModelLoader from './ObjModelLoader';

var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();
animate();

function init() {
	container = document.createElement('div');
	document.body.appendChild(container);
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.z = 250;
	// scene
	scene = new THREE.Scene();
	var ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
	scene.add(ambientLight);
	var pointLight = new THREE.PointLight(0xffffff, 0.2);
	camera.add(pointLight);
	scene.add(camera);
	scene.frustumCulled = false;
	scene.castShadow = true;
	// texture
	var manager = new THREE.LoadingManager();
	manager.onProgress = function (item, loaded, total) {
		console.log(item, loaded, total);
	};
	//var textureLoader = new THREE.TextureLoader(manager);
	//var texture = textureLoader.load('textures/UV_Grid_Sm.jpg');
	// model
	var onProgress = function (xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};
	var onError = function (xhr) {
	};
	
	var objloader = new ObjModelLoader();
	//objloader.load('../obj example/key.obj', scene);
	objloader.load('../sample.obj')
		.then((obj)=>{
			scene.add(obj);
		})
		.catch((err)=>{
			console.log(err);
		});
	
	//
	renderer = new THREE.WebGLRenderer({alpha:true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearAlpha(0.0);
	container.appendChild(renderer.domElement);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	//
	window.addEventListener('resize', onWindowResize, false);
	console.log("scene is at");
	console.log(scene.position);
}
function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseMove(event) {
	mouseX = (event.clientX - windowHalfX) / 2;
	mouseY = (event.clientY - windowHalfY) / 2;
}
//
function animate() {
	requestAnimationFrame(animate);
	render();
}
function render() {
	camera.position.x += (mouseX - camera.position.x) * .05;
	camera.position.y += (- mouseY - camera.position.y) * .05;
	camera.lookAt(scene.position);
	renderer.render(scene, camera);
}
