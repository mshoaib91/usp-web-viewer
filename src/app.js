import SceneCreator from './SceneCreator';

var sc = new SceneCreator();
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