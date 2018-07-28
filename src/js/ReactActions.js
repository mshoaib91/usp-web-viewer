/** Created by Shoaib khan on 28.07.2018 */

export default class ReactActions {
  constructor(ReactClassRef) {
    this.reactClass = ReactClassRef
  }

  /**
   * set the modal window state i.e visibility, position and text to display
   * Modal window is the window that shows mesh information when hovered
   */
  modalStateSetter(modalObj) {
    if(!(this.reactClass.state.modalWindow.visible === false && modalObj.visible === false)) {
      let modalState = {...this.reactClass.state, modalWindow : modalObj};
      this.reactClass.setState(modalState);
    }
  }

  /**
   * Maintains the list of files that are in the scene
   * @param {Object[]} fileList
   * @param {string} flag two possible flags `add` and `remove`
   */
  objFilesReferenceAdder(fileName, flag) {
    let fileList = this.reactClass.state.fileList.slice();
    if(flag === 'add') {
      fileList.push(fileName)
    } else if(flag === 'remove') {
      fileList = fileList.filter(item => item !== fileName)
    }
    let newState = {...this.reactClass.state, fileList}
    this.reactClass.setState(newState)
  }

  setActiveModel (obj3d) {
    let newState = {...this.reactClass.state, activeModel : obj3d};
    this.reactClass.setState(newState);
  }
}