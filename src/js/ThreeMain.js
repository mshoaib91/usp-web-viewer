/** created by shoaib khan on 30.4.2018 */
import SceneCreator from './SceneCreator';
import APIService from './APIService';
import configs from '../../config.json';
import objDetails from '../../objexamples/sample_rot_main.info.json';
import { loadModels, ModelLoaderStructure } from './ModelLoader';

export default function (threeElement, reactStateActions) {
  /**
   * Initializing the SceneCreator singleton istance for the first time and 
   * injecting react Actions instance to sceneCreator
   */
  let sc = new SceneCreator(threeElement, reactStateActions);
  let apiService = new APIService();
  sc.setCamera();
  sc.setLighting();
  sc.addCameraToscene();
  let name = 'default_main';
  const modelPromise = apiService.getModelFromServer();
  if(modelPromise) {
    modelPromise
    .then((blob) => {
      console.log(blob);
    }).catch(e => {
      console.error(e);
    });
  } else {
    let modelLoaderStructure = new ModelLoaderStructure(name, configs.paths.defaultObj, configs.paths.defaultMtl, objDetails);
    loadModels([modelLoaderStructure]);
  }
  sc.addControls();
  sc.initRender();
  
  const animate = () => {
    requestAnimationFrame(animate);
    sc._render();
  };
  animate();
}
