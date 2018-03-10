import ObjLoader from "./ObjLoader";

/**
* Author: Shoaib Khan
* Date: 10/03/2018
*/

class MapObjLoader extends ObjLoader {
  
  /** Pass the scene */
  constructor() {
    super();
  }
  
  /**
  * @override
  */
  onLoad() {
    return (obj) => {
      this.scene.add(obj);
    };
  }

  /**
   * @override
   */
  onError(e) {
    throw e;
  }

}

export default MapObjLoader;