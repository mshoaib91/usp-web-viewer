/** created by shoaib khan on 05.05.2018 */

class ModalWinOptions {
  constructor(){ 
    this.id = '',
    this.text = '';
    this.details = {};
    this.position = {
      x: 0,
      y : 0
    };
    this.visible= false
  }

  setId (id) {
    this.id = id;
    return this;
  }

  setText(text) {
    this.text = text;
    return this;
  }

  setDetails(obj) {
    if(obj !== undefined && obj !== null) {
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