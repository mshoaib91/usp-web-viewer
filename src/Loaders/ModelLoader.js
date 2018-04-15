/**
 * Author: Shoaib Khan
 * Date: 10/03/2018
 */

/**
* @abstract
*/
class ModelLoader {
	
	constructor() {
    if (new.target === ModelLoader) {
      throw new TypeError("Cannot construct Abstract instances directly");
    } 
  }
  
  load(file, scene) {
    file, scene;
  }

  onLoad() {}

  onProgress() {}

  onError() {}
}

export default ModelLoader;
