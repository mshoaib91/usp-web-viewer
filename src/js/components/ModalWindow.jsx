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
        {this.detailsWindow(options.details)}
      </div>
    )
  }

  detailsWindow (detailsObj) {
    let dom = [];
    for (var key in detailsObj) {
      dom.push(<p key={key}>{key} : {detailsObj[key]}</p>);
    }
    return dom;
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