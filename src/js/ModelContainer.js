/** created by Shoaib khan on 28.07.2018 */

/**
 * this class holds the reference of the Object3D models
 * that are added to the scene and their active states.
 */
export default class ModelContainer {
  /**
   * @param {string} name - name of the Object3D object 
   * @param {object} modelReference - Object3D object 
   */
  constructor(name, modelReference) {
    this.name = name;
    this.model = modelReference;
    this.active = true;
    this.submodels = [];
    this.parent = null;
  }

  /**
   * Removes the model from the scene
   */
  removeModelFromScene() {
    this.removeAllSubModels()
    this.model.parent.remove(this.model);
  }

  removeSubModel(name) {
    let filtered = this.submodels.filter(model => {
      return model.name === name;
    });
    for(var i = 0 ; i < filtered.length ; i ++) {
      let indx = this.submodels.indexOf(filtered[i]);
      let modelToRemove = this.submodels.splice(indx, 1);
      modelToRemove.removeAllSubModels();
    }
  }

  removeAllSubModels() {
    while (this.submodels.length > 0) {
      let submodel = this.submodels.pop();
      submodel.removeModelFromScene();
    }
  }

  /**
   * set the active state of the model
   * @param {boolean} flag 
   */
  setActiveState(flag) {
    this.active = flag;
    this.model.visible = flag;
  }

  /**
   * getter 
   * return the active state of the model
   */
  getActiveState() {
    return this.active;
  }

  /**
   * child models associated with the main model
   * @param {<ModelContainer>} subModel 
   */
  addSubModel (subModel) {
    this.setParent(subModel);
    this.submodels.push(subModel);
  }

  /**
   * @private
   * @param {ModelContainer} subModel 
   */
  setParent (subModel) {
    subModel.parent = this;
  }

  getParent () {
    return this.parent;
  }
}