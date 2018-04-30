import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';

// css import
import 'antd/dist/antd.css';
import './sass/app.scss'

// js import
import ThreeMain from './ThreeMain'

class App extends React.Component {
  constructor() {
    super();
    this.threeRootElement = null; // will contain the root element for the threejs canvas
  }

  componentDidMount() {
    // leaving react world
    ThreeMain(this.threeRootElement)
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={18}>
            <div className='usp-model' ref={element => this.threeRootElement = element} height={window.height}>
            </div>
          </Col>
          <Col span={6} className='settings-panel'>
            settings panel
          </Col>
        </Row>
      </div>
    );
  }
}

export default App; // this is just to stop the eslint 'not in use' error
ReactDOM.render(<App />, document.getElementById('app'));