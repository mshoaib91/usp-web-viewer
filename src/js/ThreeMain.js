/** created by shoaib khan on 30.4.2018 */
import SceneCreator from './SceneCreator';
import configs from '../../config.json';
import * as THREE from 'three';

export default function (threeElement, reactStateActions) {
  let sc = new SceneCreator(threeElement, reactStateActions);
  sc.setCamera();
  sc.setLighting();
  sc.addCameraToscene();
  
  /** Loading model with materials */
  sc.LoadModelAndMtl(configs.paths.defaultObj, configs.paths.defaultMtl)
  .then(obj => {
    obj.name = configs.paths.defaultObj.split('/').pop();
    obj.children.forEach(el => {
      el.material = el.material.map(mtl => {
        return new THREE.MeshPhongMaterial(mtl);
      })
    })
    sc.addObjToScene(obj);
  })
  .catch((err) => {
    console.log('failed to load object', err);
  });
 
  /** Loading model without mtl */
  // sc.LoadModel(configs.paths.defaultObj)
  // .then(obj => {
  //   sc.addObjToScene(obj)
  // })
   // .catch((err) => {
  //   console.log('failed to load object', err);
  // });
 
  /** Loading model with backface culling enabled */
  // sc.LoadModel(configs.paths.defaultObj)
  // .then((obj) => {
  //   obj.children.forEach(el => {
  //     el.material.forEach(mt => {
  //       console.log(mt);
  //       mt.side = 2;          // 2 is equal to THREE.BothSide
  //     });
  //   });
  //   sc.addObjToScene(obj);
  // })
  // .catch((err) => {
  //   console.log('failed to load object', err);
  // });

  /** Loading second model with materials */
  sc.LoadModelAndMtl("/objexamples/key.obj", "/objexamples/key.mtl")
  .then(obj => {
    obj.name = "/objexamples/key.obj".split('/').pop();
    obj.children.forEach(el => {
      if (Array.isArray(el.material)) {
        el.material = el.material.map(mtl => {
          return new THREE.MeshPhongMaterial(mtl);
        });
      }
    })
    sc.addObjToScene(obj);
  })
  .catch((err) => {
    console.log('failed to load object', err);
  });
  
  sc.addControls();
  sc.initRender();
  
  const animate = () => {
    requestAnimationFrame(animate);
    sc._render();
  };
  animate();
}
