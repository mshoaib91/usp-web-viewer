/** Created by Shoaib khan on 28.07.2018 */

export default class ReactActions {
  constructor(ReactClassRef) {
    this.reactClass = ReactClassRef;
    this.removeFileFromList = this.removeFileFromList.bind(this);
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
  addFileToList(fileObj) {
    let fileList = this.reactClass.state.fileList.slice();
    fileList.push(fileObj)
    let newState = {...this.reactClass.state, fileList}
    this.reactClass.setState(newState)
  }

  removeFileFromList(fileObj) {
    let fileList = this.reactClass.state.fileList;
    fileObj.removeModelFromScene();
    const index = fileList.indexOf(fileObj);
    const newList =  fileList.splice(index, 1).slice();
    let newState = {...this.reactClass.state, fileList : newList, activeModel : null};
    this.reactClass.setState(newState);
  }

  setActiveModel (obj3d) {
    let newState = {...this.reactClass.state, activeModel : obj3d};
    this.reactClass.setState(newState);
  }
}