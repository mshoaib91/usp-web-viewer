import SceneCreator from './SceneCreator';
import * as THREE from 'three';

/**
 * Extract the file contents from the object and load it to the scene
 * 
 * @param {ModelLoaderStructure[]} fileContents - looks like `[{name: name, content: {obj: blob, mtl: blob, info: string}}, {name:name, content:{obj: blob, mtl: blob, info: string}}]`
 */
export async function loadModels (fileContents) {
  // first load Main model and then load sub models
  const mainFileObj = fileContents.filter(fileObj => fileObj.name.indexOf('main') > -1);
  const subFilesObj = fileContents.filter(fileObj => fileObj.name.indexOf('main') < 0);
  console.log(fileContents);
  if (!mainFileObj.length) {
    throw new Error('Main file not defined. Please include "main" in the name of main .obj file');
  }

  let mainObj = mainFileObj[0].content.obj;
  let mainMtl = mainFileObj[0].content.mtl;
  let info = mainFileObj[0].content.info;
  let name = mainFileObj[0].name;
  // loading main Object3D file and its information
  let mainModelContainer = await loadFileToScene(mainObj, mainMtl, name, info, null);
  // loading sub Object3S files that belongs to main file
  await Promise.all(
    subFilesObj.map(async (element) => {
      let subObj = element.content.obj;
      let subMtl = element.content.mtl;
      let info = element.content.info;
      let name = element.name;
      await loadFileToScene(subObj, subMtl, name, null, mainModelContainer)
    })
  )
  console.log('models loaded');
}

/**
 * @public
 * Load `.obj` files as a THREE.Object3D model and add it to the scene
 * as either main model or sub model of the main model.
 * If the mainModelContainer is provided then the model will be added as a submodel to that model container
 *  
 * @param {File} objFile - file referencing `.obj` file 
 * @param {File} mtlFile - file referencing `.mtl` file 
 * @param {string} name - name of the obj
 * @param {Object} infoObj - Object containing information related to polygons and graphs 
 * @param {ModelContainer|null} mainModelContainer - ModelContainer object containing the main Object3D model 
 * @returns {ModelContainer|null} - returns the `ModelContainer` object of main model or `null` in case of submodel is added
 */
async function loadFileToScene(objFile, mtlFile, name, infoObj, mainModelContainer) {
  const sc = new SceneCreator();    // get instance of SceneCreator Object
  let mainModelContainerObj = null;
  if (mtlFile === null || mtlFile === undefined) {
    let obj3D = await sc.LoadModel(objFile);
    obj3D.name = name;
    if(!mainModelContainer) {
      mainModelContainerObj = sc.addObjToScene(obj3D, infoObj);
    } else {
      sc.addSubObjectToScene(obj3D, mainModelContainer);
    }
  } else {
    let obj3D = await sc.LoadModelAndMtl(objFile, mtlFile);
    obj3D = setNameAndMtls(obj3D, name);
    if(!mainModelContainer) {
      mainModelContainerObj = sc.addObjToScene(obj3D, infoObj);
    } else {
      sc.addSubObjectToScene(obj3D, mainModelContainer);
    }
  }
  return mainModelContainerObj;
}

/**
 * Set name of the object and create the mtl of each object
 * as a separate object so that on raytracing each mtl will 
 * be considered separately and not as a sigle entity.
 */
function setNameAndMtls (obj, name) {
  obj.name = name;
  obj.children.forEach(el => {
    if (Array.isArray(el.material)) {
      el.material = el.material.map(mtl => {
        return new THREE.MeshPhongMaterial(mtl);
      });
    } else {
      el.material = new THREE.MeshPhongMaterial(el.material);
    }
  });
  return obj;
}

export class ModelLoaderStructure {
  /**
   * This class is the structure that is required by `ModelLoader.loadModels` method
   * 
   * @param {string} name 
   * @param {string|blob} obj - File path or blob of obj file 
   * @param {string|blob} mtl - File path or blob of mtl file
   * @param {object} info - JSON object
   */
  constructor(name, obj, mtl=null, info=null) {
    this.name = name,
    this.content = {
      obj: obj,
      mtl: mtl,
      info: info
    }
  }
}
