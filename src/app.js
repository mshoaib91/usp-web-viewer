import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';

// css import
import 'antd/dist/antd.css';
import './sass/app.scss'

// js import
import ThreeMain from './ThreeMain'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.threeRootElement = null; // will contain the root element for the threejs canvas
    this.state = { dimensions : [0,0] };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    // leaving react world
    ThreeMain(this.threeRootElement)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return (
      <div style={{height: window.innerHeight}}>
        <Row style={{height: '100%'}}>
          <Col span={18} style={{height: '100%'}}>
            <div className='usp-model' ref={element => this.threeRootElement = element}>
            </div>
          </Col>
          <Col span={6} className='settings-panel'>
            settings panel
          </Col>
        </Row>
      </div>
    );
  }

  updateWindowDimensions() {
    this.setState({dimensions : [window.innerWidth, window.innerHeight]})
  }
}

export default App; // this is just to stop the eslint 'not in use' error
ReactDOM.render(<App />, document.getElementById('app'));