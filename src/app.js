/** created by Shoaib Khan */
import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';
import SidePane from './js/components/SidePane';

// css import
import 'antd/dist/antd.css';
import './sass/app.scss';

// js import
import ThreeMain from './js/ThreeMain';
import ModalWindow from './js/components/ModalWindow';
import ModalWinOptions from './js/ModalWinOptions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.threeRootElement = null; // will contain the root element for the threejs canvas
    this.state = {
      dimensions : [0,0],
      modalWindow : new ModalWinOptions(),
      fileList : []
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.modalStateSetter = this.modalStateSetter.bind(this);
    this.objFilesReferenceAdder = this.objFilesReferenceAdder.bind(this);
  }
  
  /**
   * set the modal window state i.e visibility, position and text to display
   * Modal window is the window that shows mesh information when hovered
   */
  modalStateSetter(modalObj) {
    if(!(this.state.modalWindow.visible === false && modalObj.visible === false)) {
      let modalState = {...this.state, modalWindow : modalObj};
      this.setState(modalState);
    }
  }

  /**
   * Maintains the list of files that are in the scene
   * @param {Object[]} fileList
   */
  objFilesReferenceAdder(fileList) {
    let newState = {...this.state, fileList}
    this.setState(newState)
  }
  

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    /** LEAVING REACT WORLD */
    // React actions
    const reactActions = {
      modalStateSetter : this.modalStateSetter,
      objFilesReferenceAdder : this.objFilesReferenceAdder
    }
    // injecting html element for threejs and react actions object
    ThreeMain(this.threeRootElement, reactActions);
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
            <SidePane />
          </Col>
        </Row>
        <ModalWindow modalOptions={this.state.modalWindow}/>
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