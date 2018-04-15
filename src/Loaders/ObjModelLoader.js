import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

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

  load(objFile) {
    return new Promise((resolve, reject)=>{
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