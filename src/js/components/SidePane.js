/** created by shoaib khan on 01.07.2018 */
import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Icon, Button} from 'antd';
import {UploadComponent} from './UploadComponent';
import {RunningScene} from '../ThreeMain';

import '../../sass/sidePane.scss';

const ButtonGroup = Button.Group

const MenuTypes = {
  dashboard : 1,
  upload : 2
}

class SidePane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu : {
        dashboard : true,
        upload : false
      }
    };
  }

  onMenuClick (menuType) {
    let changedMenu = {
      dashboard : (menuType === MenuTypes.dashboard ? true : false),
      upload : (menuType === MenuTypes.upload ? true : false)
    }
    this.setState({...this.state, menu : changedMenu})
  }  

  render() {
    return (
      <Row className="side-pane">
        <Col span={24}>
          <Row type="flex" justify="center" className="gap">
            <Col span={24}>
            <ButtonGroup style={{float: 'right'}}>
              <Button size="large" icon="dashboard" onClick={(event)=>{this.onMenuClick(MenuTypes.dashboard)}}/>
              <Button size="large" icon="file-add" onClick={(event)=>{this.onMenuClick(MenuTypes.upload)}}/>
            </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.state.menu.upload ? <UploadComponent /> : <h3>Dashboard</h3>}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default SidePane;
