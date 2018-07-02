/** created by shoaib khan on 30.4.2018 */
import SceneCreator from './SceneCreator';
import configs from '../../config.json';

export default function (threeElement, modalStateSetter) {
  let sc = new SceneCreator(threeElement);
  sc.setModalStateSetter(modalStateSetter);
  sc.setCamera();
  sc.setLighting();
  sc.addCameraToscene();
  //sc.LoadModelAndMtl('/obj_examples/sample_rot.obj', '/obj_examples/Demo.mtl')
  //.then(obj => sc.addObjToScene(obj))
  sc.LoadModel(configs.paths.defaultObj)
  .then((obj) => {
    obj.children.forEach(el => {
      el.material.forEach(mt => {
        console.log(mt);
        mt.side = 2;          // 2 is equal to THREE.BothSide
      });
    });
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
