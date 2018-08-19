/** Created by Shoaib khan on 28.07.2018 */

export default class ReactActions {
  constructor(ReactClassRef) {
    this.reactClass = ReactClassRef;
    this.removeFileFromList = this.removeFileFromList.bind(this);
    this.switchModel = this.switchModel.bind(this);
  }

  /**
   * set the modal window state i.e visibility, position and text to display
   * Modal window is the window that shows mesh information when hovered
   * 
   * @param {object} modalObj - Object of type ModalWinOptions.js
   */
  modalStateSetter(modalObj) {
    if(!(this.reactClass.state.modalWindow.visible === false && modalObj.visible === false)) {
      let modalState = {...this.reactClass.state, modalWindow : modalObj};
      this.reactClass.setState(modalState);
    }
  }

  /**
   * Add object to the list of files and set it to active
   * 
   * @param {Object} object of type `ModelFile`
   */
  addFileToList(fileObj) {    
    let fileList = this.reactClass.state.fileList.slice();      // reactClass.state.fileList contains list of ModelFile objects
    fileList.forEach(modelFile => modelFile.setActiveState(false));
    fileList.push(fileObj)
    let newState = {...this.reactClass.state, fileList, activeModel : fileObj.model}
    this.reactClass.setState(newState)
  }

  /**
   * Remove the provided model and activate 
   * another model if already in the scene
   * 
   * @param {object:ModelFile} fileObj
   */
  removeFileFromList(fileObj) {
    let fileList = this.reactClass.state.fileList;
    fileObj.removeModelFromScene();
    const index = fileList.indexOf(fileObj);
    fileList.splice(index, 1)
    let newState = {}, activeModel = null;
    if (fileObj.getActiveState() === true) {
      if(fileList.length && fileList.length - 1 >= index) {
        activeModel = fileList[index].model;
        fileList[index].setActiveState(true);
      } else if(fileList.length) {
        activeModel = fileList[0].model;
        fileList[0].setActiveState(true);
      }
      newState = {...this.reactClass.state, fileList, activeModel};
    } else {
      newState = {...this.reactClass.state, fileList};
    }
    this.reactClass.setState(newState);
  }

    /**
   * Remove the provided model and activate 
   * another model if already in the scene
   * 
   * @param {object:ModelFile} fileObj
   */
  switchModel (modelFileObj) {
    let fileList = this.reactClass.state.fileList.slice();      // reactClass.state.fileList contains list of ModelFile objects
    fileList.forEach(modelFile => {
      if (modelFileObj.name !== modelFile.name) {
        modelFile.setActiveState(false);
      } else {
        modelFile.setActiveState(true);
      }
    });
    let newState = {...this.reactClass.state, fileList, activeModel : modelFileObj.model}
    this.reactClass.setState(newState)
  }
}
