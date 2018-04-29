import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import OrbitControls from 'three-orbit-controls';
OBJLoader(THREE);
var OC = OrbitControls(THREE);

import ObjModelLoader from './Loaders/ObjModelLoader';


class SceneCreator {
  constructor() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.scene = new THREE.Scene();
    window.myscene = this.scene; //todo :test
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 250;
  }

  setLighting() {
    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    var pointLight = new THREE.PointLight(0xffffff, 0.2);
    this.scene.add(ambientLight);
    //this.scene.add(pointLight);
    this.camera.add(pointLight);  // point light is attached to camera
  }

  addCameraToscene() {
    this.scene.add(this.camera);
  }

  addObjToScene(obj) {
    this.scene.add(obj);
  }

  addControls() {
    var oc = new OC(this.camera, this.container);
    oc.minAzimuthAngle = 0 - (Math.PI / 2);
    oc.maxAzimuthAngle = 0 + (Math.PI / 2);
  }

  LoadModel(fileName) {
    var objLoader = new ObjModelLoader();
    return objLoader.load(fileName);
  }

  initRender() {
    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.container.appendChild(this.renderer.domElement);
  }

  /**
   * @private
   */
  _render() {
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }
}

export default SceneCreator;