/** created by shoaib khan on 30.4.2018 */
import SceneCreator from './SceneCreator';

export default function (threeElement, modalStateSetter) {
  var sc = new SceneCreator(threeElement);
  sc.setModalStateSetter(modalStateSetter);
  sc.setCamera();
  sc.setLighting();
  sc.addCameraToscene();
  sc.LoadModel('../sample_rot.obj')
  .then((obj) => {
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