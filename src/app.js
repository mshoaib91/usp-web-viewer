/** created by Shoaib Khan */
import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';
import SidePane from './js/components/SidePane.jsx';
import ModalWindow from './js/components/ModalWindow.jsx';
import LayerBox from './js/components/LayerBox.jsx';
import config from '../config.json';

// css import
import 'antd/dist/antd.css';
import './sass/app.scss';

// js import
import ThreeMain from './js/ThreeMain';
import ModalWinOptions from './js/ModalWinOptions';
import ReactActions from './js/ReactActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.threeRootElement = null; // will contain the root element for the threejs canvas
    this.state = {
      dimensions : [0,0],
      modalWindow : new ModalWinOptions(),
      fileList : [],
      activeModel: null,    // contains threejs `Object3D` object
    };
    // React actions
    this.reactActions = new ReactActions(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    /** LEAVING REACT WORLD */
    // injecting html element for threejs and react actions object
    ThreeMain(this.threeRootElement, this.reactActions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  render() {
    return (
      <div style={{height: window.innerHeight}}>
        <Row style={{height: '100%'}}>
          <Col span={24} style={{height: '100%'}}>
            <div className='usp-model' ref={element => this.threeRootElement = element}>
            </div>
          </Col>
        </Row>
        <div className='settings-panel'style={{backgroundColor: config.colors.sidepanel_background, width: '350px', position: 'absolute', top: '0', right:'0', opacity:'0.7'}}>
            <SidePane fileList={this.state.fileList} 
            removeFile={this.reactActions.removeFileFromList} 
            switchModel={this.reactActions.switchModel}
            switchSubModel={this.reactActions.switchSubModel}
            />
          </div>
        {/* this modal window has absolute position css property */}
        <ModalWindow modalOptions={this.state.modalWindow}/>
        {/* Layerbox is also position absolute on the top left corner */}
        <LayerBox fileList={this.state.fileList} switchSubModel={this.reactActions.switchSubModel}/>
      </div>
    );
  }
  
  updateWindowDimensions() {
    this.setState({dimensions : [window.innerWidth, window.innerHeight]});
  }
}

App.propTypes = {};

export default App; // this is just to stop the eslint 'not in use' error
ReactDOM.render(<App />, document.getElementById('app'));