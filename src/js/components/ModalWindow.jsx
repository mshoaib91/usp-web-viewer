/** created by shoaib khan on 30.4.2018 */
import React from 'react';
import PropTypes from 'prop-types';

import '../../sass/modalWindow.scss';

class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    console.log('modal component mounted');
  }
  
  render() {
    let options = this.props.modalOptions;
    if(options.position.x > window.innerWidth - 200) {
      options.position.x = options.position.x - 200;
    }
    if(options.position.y > window.innerHeight - 150) {
      options.position.y = options.position.y - 150;
    }
    return (
      <div className='modal-window' style={{
        display : (options.visible ? 'block' : 'none'),
        top : options.position.y,
        right : options.position.x
      }}>
        <h4>Details:</h4>
        <h6>{options.text}</h6>
        <p>length : {options.details.len}</p>
        <p>width : {options.details.width}</p>
        <p>height : {options.details.height}</p>
        <p>area : {options.details.area}</p>


      </div>
    )
  }
}

ModalWindow.propTypes = {
  modalOptions : PropTypes.shape({
    text : PropTypes.string,
    details : PropTypes.object,
    position : PropTypes.object,
    visible : PropTypes.bool
  })
};

export default ModalWindow;