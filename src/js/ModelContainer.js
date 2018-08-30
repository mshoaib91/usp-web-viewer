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
  }

  /**
   * Removes the model from the scene
   */
  removeModelFromScene() {
    this.model.parent.remove(this.model);
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
}