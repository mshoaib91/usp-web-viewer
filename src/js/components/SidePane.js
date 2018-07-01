/** created by shoaib khan on 01.07.2018 */
import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Icon, Switch} from 'antd';
import {UploadComponent} from './UploadComponent';

import '../../sass/SidePane.scss';

class SidePane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpload : false
    };

    this.onUploadChange = this.onUploadChange.bind(this);
  }

  onUploadChange (value) {
    this.setState({...this.state, showUpload: value});
  }

  render() {
    return (
      <Row className="side-pane">
        <Col span={24}>
          <Row type="flex" justify="end" className="gap">
            <Col span={4}>
              <Switch checkedChildren={<Icon type="upload" />} unCheckedChildren={<Icon type="upload" />} onChange={this.onUploadChange} />
            </Col>
          </Row>
          <Row>
            <Col>
              {this.state.showUpload ? <UploadComponent /> : ''}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default SidePane;
