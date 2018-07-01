/** created by Shoaib Khan */
import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';

// css import
import 'antd/dist/antd.css';
import './sass/app.scss'

// js import
import ThreeMain from './js/ThreeMain'
import ModalWindow from './js/ModalWindow'
import ModalWinOptions from './js/ModalWinOptions'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.threeRootElement = null; // will contain the root element for the threejs canvas
    this.state = {
      dimensions : [0,0],
      modalWindow : new ModalWinOptions()
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.modalStateSetter = this.modalStateSetter.bind(this);
  }
  
  modalStateSetter(obj) {
    if(!(this.state.modalWindow.visible === false && obj.visible === false)) {
      let nmodalState = {...this.state, modalWindow : obj};
      this.setState(nmodalState);
    }
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    // leaving react world
    ThreeMain(this.threeRootElement, this.modalStateSetter)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUpdate() { }
  
  render() {
    return (
      <div style={{height: window.innerHeight}}>
      <Row style={{height: '100%'}}>
      <Col span={18} style={{height: '100%'}}>
      <div className='usp-model' ref={element => this.threeRootElement = element}>
      </div>
      </Col>
      <Col span={6} className='settings-panel'>
      <p>Details Panel</p>

      <ModalWindow modalOptions={this.state.modalWindow}/>
      </Col>
      </Row>
      </div>
    );
  }
  
  updateWindowDimensions() {
    this.setState({dimensions : [window.innerWidth, window.innerHeight]})
  }
}

App.propTypes = {};

export default App; // this is just to stop the eslint 'not in use' error
ReactDOM.render(<App />, document.getElementById('app'));