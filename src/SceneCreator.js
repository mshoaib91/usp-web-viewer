/** created by shoaib khan on 30.4.2018 */
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import OrbitControls from 'three-orbit-controls';
OBJLoader(THREE);
var OC = OrbitControls(THREE);

import ObjModelLoader from './Loaders/ObjModelLoader';
import ModalWinOptions from './ModalWinOptions'


class SceneCreator {
  constructor(threeElement) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.container = threeElement;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd6d6d6);
    this.viewerWidth = threeElement.clientWidth;
    this.viewerHeight = threeElement.clientHeight;
    
    // Event Listeners
    document.addEventListener('click', (e)=>{this.onMouseBtnClick(e);}, false);
    window.addEventListener( 'resize', (e)=>{this.onWindowResize(e);}, false );

    window.myscene = this.scene;  //todo : remove this
    window.myclass = this;        // todo : remove this
  }

  onMouseBtnClick(event) {
    this.mouse.x = (event.clientX / this.viewerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / this.viewerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObject(this.scene.children[2], true);
    if (this.intersects.length) {
      this.intersects[0].object.material.forEach(element => {
        element.color.set(0xff0000);        
      });
      this.modalStateSetter(
        new ModalWinOptions()
        .setText(this.intersects[0].object.name)
        .setPosition(window.innerWidth - event.clientX, event.clientY)
        .setVisibility(true)
      );
    } else {
      this.modalStateSetter(new ModalWinOptions().setVisibility(false));
    }
  }

  onWindowResize (event) {
    this.viewerWidth = this.container.clientWidth;
    this.viewerHeight = this.container.clientHeight;
    this.camera.aspect = this.viewerWidth / this.viewerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.viewerWidth, this.viewerHeight);
    this.modalStateSetter(new ModalWinOptions().setVisibility(false))
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(45, this.viewerWidth / this.viewerHeight, 1, 2000);
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
		this.renderer.setSize(this.viewerWidth, this.viewerHeight);
		this.container.appendChild(this.renderer.domElement);
  }

  /**
   * @private
   */
  _render() {
    this.camera.lookAt(this.scene.position);
    //this.raycaster.setFromCamera(this.mouse, this.camera);
    this.renderer.render(this.scene, this.camera);
  }

  setModalStateSetter(callback){
    this.modalStateSetter = callback
  }
}

export default SceneCreator;