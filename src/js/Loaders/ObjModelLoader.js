import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);
const MTLLoader = require('three-mtl-loader');
let mtlLoader = new MTLLoader();

import ModelLoader from "./ModelLoader";

/**
* Author: Shoaib Khan
* Date: 10/03/2018
*/

class ObjModelLoader extends ModelLoader {

  /** Pass the scene */
  constructor() {
    super();
    this.loader = new THREE.OBJLoader(this.getLoadManager());
  }

  load(objFile, mtlFile='') {
    return new Promise((resolve, reject)=>{
      mtlLoader.load(mtlFile, (material) => {
        console.log('this is material', material);
        this.loader.setMaterials(material);
        this.loader.load(objFile, (obj)=> {resolve(obj);}, ()=>{}, (err)=>{reject(err);});
      });
      mtlLoader.setMaterialOptions({
        side : THREE.DoubleSide
      });
    });
  }

  loadObj(objFile) {
    return new Promise((resolve, reject) => {
      this.loader.load(objFile, (obj)=> {resolve(obj);}, ()=>{}, (err)=>{reject(err);});
    });
  }
  
  getLoadManager() {
    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      console.log(item, loaded, total);
    };
    return manager;
  }

}

export default ObjModelLoader;