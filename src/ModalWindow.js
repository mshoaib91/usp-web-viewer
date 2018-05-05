/** created by shoaib khan on 30.4.2018 */
import React from 'react';
import PropTypes from 'prop-types';

class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    console.log('modal component mounted');
  }
  
  render() {
    let options = this.props.modalOptions;
    return (
      <div style={{
        display : (options.visible ? 'block' : 'none'),
        width : '100px',
        height : '100px',
        position : 'absolute',
        top : options.position.y,
        right : options.position.x
      }}>
        <h3>{options.text}</h3>
      </div>
    )
  }
}

ModalWindow.propTypes = {
  modalOptions : PropTypes.shape({
    text : PropTypes.string,
    position : PropTypes.object,
    visible : PropTypes.bool
  })
};

export default ModalWindow;