/**
 * Author: Shoaib Khan
 * Date: 10/03/2018
 */

import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

/**
* @abstract
*/
class ObjLoader {
	
	constructor() {
    if (new.target === ObjLoader) {
      throw new TypeError("Cannot construct Abstract instances directly");
    } else {
      this.loader = new THREE.OBJLoader();
      this.scene = null;
    }
  }
  
  load(file, scene) {
    this.scene = scene;
    this.loader.load(file, this.onLoad(), this.onProgress, this.onError);
  }

  onLoad() {}

  onProgress() {}

  onError() {}
}

export default ObjLoader;