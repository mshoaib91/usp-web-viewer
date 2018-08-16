/** created by shoaib khan on 05.05.2018 */

class ModalWinOptions {
  constructor(){ 
    this.text = '';
    this.details = {};
    this.position = {
      x: 0,
      y : 0
    };
    this.visible= false
  }

  setText(text) {
    this.text = text;
    return this;
  }

  setDetails(obj) {
    if(obj !== undefined) {
      this.details = obj;
    }
    return this;
  }

  setPosition (x, y) {
    this.position.x = x;
    this.position.y = y;
    return this;
  }

  setVisibility (visible) {
    this.visible = visible
    return this;
  }
}

export default ModalWinOptions;