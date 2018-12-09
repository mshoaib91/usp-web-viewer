/** created by shoaib khan on 30.4.2018 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Collapse, Checkbox } from 'antd';

const Panel = Collapse.Panel;

import '../../sass/layerBox.scss';

class LayerBox extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    console.log('modal component mounted');
  }
  
  render() {
    let activeModel = this.getActiveModel();
    if(!activeModel.length) return <div />;
    activeModel = activeModel[0];
    return (
      <div className="layer-box">
        <Collapse>
          <Panel header={activeModel.name} key="1">
          {
            (activeModel.submodels.length ? 
            (
              <div>
              {
                activeModel.submodels.map((model) => (
                  <p>
                    <Row>
                      <Col span={4}>
                      <Checkbox checked={model.active} onChange={this.switchModelHandler(model)}/>
                      </Col>
                      <Col span ={20}>
                        {model.name}
                      </Col>
                    </Row>
                  </p>
                ))
              }
            </div>
            )
            : '') 
          }
          </Panel>
        </Collapse>
      </div>
    ); 
  }

  switchModelHandler (model) {
    return (evt) => {
      this.props.switchSubModel(model);
    }
    
  }

  getActiveModel () {
    return this.props.fileList.filter(element => element.active);
  }
}

LayerBox.propTypes = {
  fileList : PropTypes.array,
  switchSubModel: PropTypes.func
};

export default LayerBox;