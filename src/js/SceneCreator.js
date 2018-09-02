/** created by shoaib khan on 30.4.2018 */
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import OrbitControls from 'three-orbit-controls';
OBJLoader(THREE);
var OC = OrbitControls(THREE);

// js imports
import ObjModelLoader from './Loaders/ObjModelLoader';
import ModalWinOptions from './ModalWinOptions';
import ModelContainer from './ModelContainer';
import config from '../../config.json';

let sceneCreatorInstance = null;

/**
 * Singleton class
 * create a scene and initialize all the required components.
 * Contains methods related to the scene
 */
class SceneCreator {
  constructor(threeElement, ReactActionsObject) {
    if (sceneCreatorInstance === null) {
      sceneCreatorInstance = this;
    } else {
      return sceneCreatorInstance;
    }

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouseClient = new THREE.Vector2;
    this.container = threeElement;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(Number(config.colors.scene_background));
    this.viewerWidth = threeElement.clientWidth;
    this.viewerHeight = threeElement.clientHeight;
    this.ReactActions = ReactActionsObject    // injected react actions
    
    // Event Listeners
    document.addEventListener('mousemove', (e)=>{this.onDocumentMouseMove(e);}, false);
    window.addEventListener( 'resize', (e)=>{this.onWindowResize(e);}, false );
    
    window.myscene = this.scene;  //todo : remove this
    window.myclass = this;        // todo : remove this
  }
  
  onDocumentMouseMove(event) {
    this.mouse.x = (event.clientX / this.viewerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / this.viewerHeight) * 2 + 1;
    this.mouseClient.x = event.clientX;
    this.mouseClient.y = event.clientY;
  }
  
  onWindowResize (event) {
    this.viewerWidth = this.container.clientWidth;
    this.viewerHeight = this.container.clientHeight;
    this.camera.aspect = this.viewerWidth / this.viewerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.viewerWidth, this.viewerHeight);
    this.ReactActions.modalStateSetter(new ModalWinOptions().setVisibility(false))
  }
  
  setCamera() {
    this.camera = new THREE.PerspectiveCamera(Number(config.camera.fov), this.viewerWidth / this.viewerHeight, Number(config.camera.near), Number(config.camera.far));
    this.camera.position.z = 250;
  }
  
  setLighting() {
    var ambientLight = new THREE.AmbientLight(Number(config.light.ambient.color), Number(config.light.ambient.intensity));
    var pointLight = new THREE.PointLight(Number(config.light.point.color), Number(config.light.point.intensity));
    this.scene.add(ambientLight);
    this.camera.add(pointLight);  // point light is attached to camera
  }
  
  addCameraToscene() {
    this.scene.add(this.camera);
  }
  
  /**
   * Add the main object to the scene
   * 
   * @param {object} obj - Object3D object
   * @param {object} details - object containing the details of the polygons and graph informaiton
   * @returns {<ModelContainer>} mainModel - ModelContainer object of the main model
   */
  addObjToScene(obj, details = null) {
    obj['ModelData'] = details;
    let mainModel = new ModelContainer(obj.name, obj)
    this.ReactActions.addFileToList(mainModel);
    this.scene.add(obj);
    return mainModel;
  }

  /**
   * Add the sub ojbect to the scene. and also maintaining the 
   * reference in the main object which is of type ModelContainer
   * 
   * @param {object} subObj - object of type Object3D 
   * @param {object} mainModelContainer - object of type ModelContainer of the main object in the combined objects scene
   */
  addSubObjectToScene(subObj, mainModelContainer) {
    let subModelContainer = new ModelContainer(subObj.name, obj);
    // this.ReactActions.addFileToList(subModelContainer);
    mainModelContainer.addSubModel(subModelContainer);
    // refresh react state if it does not.
  }

  
  addControls() {
    var oc = new OC(this.camera, this.container);
    oc.minPolarAngle = 0 - (Math.PI/2);
    oc.maxPolarAngle = 0 + (Math.PI/2);
  }
  
  LoadModel(fileName) {
    var objLoader = new ObjModelLoader();
    return objLoader.loadObj(fileName)
  }
  
  LoadModelAndMtl(objFile, mtlFile) {
    var objLoader = new ObjModelLoader();
    return objLoader.load(objFile, mtlFile)
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
    /** Ray caster for selection highlighting */
    this.raycaster.setFromCamera(this.mouse, this.camera);
    var activeModel = this.ReactActions.reactClass.state.activeModel;
    if(activeModel !== undefined && activeModel !== null) {
      let intersects = this.raycaster.intersectObject(activeModel, true);
      if (intersects.length) {
        if (this.intersected != intersects[0].object) {
          if (this.intersected) {
            if (Array.isArray(this.intersected.material)) {
              this.intersected.material.forEach(e => e.emissive.setHex(this.intersected.currentHex));
            } else {
              this.intersected.material.emissive.setHex(this.intersected.currentHex);
            }
          }
          this.intersected = intersects[0].object;
          if (Array.isArray(this.intersected.material)) {       // some models materials are array and some are object. this condition handle respectively
            this.intersected.currentHex = this.intersected.material[0].emissive.getHex();
            this.intersected.material.forEach(e => e.emissive.setHex(0xff0000));
          } else {
            this.intersected.currentHex = this.intersected.material.emissive.getHex();
            this.intersected.material.emissive.setHex(0xff0000);
          }
        } 
        // get model details defined in *.info.json
        let modelDetails = activeModel.ModelData !== null ? activeModel.ModelData.ModelDetails[this.intersected.name] : null;
        // if mouse hovers on the new Object3Dmodel object which is differenciated by id which is object's name
        if(this.ReactActions.reactClass.state.modalWindow.id !== this.intersected.name) {
          const newWinOpions = new ModalWinOptions()
          .setId(this.intersected.name)
          .setText(this.intersected.name)
          .setDetails(modelDetails)
          .setPosition(window.innerWidth - this.mouseClient.x, this.mouseClient.y)
          .setVisibility(true);
          this.ReactActions.modalStateSetter(newWinOpions);
        }

      } else { // turn back color to default
        if (this.intersected) {
          if (Array.isArray(this.intersected.material)) {
            this.intersected.material.forEach(e => e.emissive.setHex(this.intersected.currentHex));
          }else {
            this.intersected.material.emissive.setHex(this.intersected.currentHex);
          }
        }
        this.intersected = null;
        this.ReactActions.modalStateSetter(new ModalWinOptions().setVisibility(false));
      } 
    }
     /** render scene */
     this.renderer.render(this.scene, this.camera);
  }
  
}

export default SceneCreator;