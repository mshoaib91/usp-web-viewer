/** created by Shoaib khan on 28.07.2018 */

export default class ModelFile {
  /**
   * 
   * @param {string} name - name of the Object3D object 
   * @param {object} modelReference - Object3D object 
   */
  constructor(name, modelReference) {
    this.name = name;
    this.model = modelReference;
    this.active = true;
  }

  removeModelFromScene() {
    this.model.parent.remove(this.model);
  }
}