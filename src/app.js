import SceneCreator from './SceneCreator';
import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';

// var sc = new SceneCreator();
// sc.setCamera();
// sc.setLighting();
// sc.addCameraToscene();
// sc.LoadModel('../sample.obj')
//   .then((obj) => {
//     sc.addObjToScene(obj);
//   })
//   .catch((err) => {
//     console.log('failed to load object', err);
//   });
// sc.addControls();
// sc.initRender();

// const animate = () => {
//   requestAnimationFrame(animate);
//   sc._render();
// };
// animate();

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={18}>
            model
          </Col>
          <Col span={6}>
            settings panel
          </Col>
        </Row>
      </div>
    );
  }
}

export default App; // this is just to stop the eslint 'not in use' error
ReactDOM.render(<App />, document.getElementById('app'));