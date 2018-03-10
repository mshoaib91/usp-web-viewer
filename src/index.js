import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

import MapObjLoader from './MapObjLoader';

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10,-10,-10);

var renderer = new THREE.WebGLRenderer({
	alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// loading object
const mapObjLoader = new MapObjLoader();
mapObjLoader.load('sample.obj', scene);