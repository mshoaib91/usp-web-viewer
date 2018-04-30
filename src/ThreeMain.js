import SceneCreator from './SceneCreator';

export default function (threeElement) {
  var sc = new SceneCreator(threeElement);
  sc.setCamera();
  sc.setLighting();
  sc.addCameraToscene();
  sc.LoadModel('../sample.obj')
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