/** created by shoaib khan on 01.07.2018 */
import React from 'react';
import { Row, Col, Button } from 'antd';
import { FileComponent } from './FileComponent.jsx';
import { Dashboard } from './Dashboard.jsx';
import config from '../../../config.json';
import PropTypes from 'prop-types';


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
    console.log('check this in sidepane', props.removeFile.prototype)
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
      <Row type="flex" justify="center" className="side-pane" style={{backgroundColor: config.colors.sidepanel_background}}>
        <Col span={23}>
          <Row type="flex" justify="center" className="gap">
            <Col span={24}>
            <ButtonGroup style={{float: 'right'}}>
              <Button size="large" icon="dashboard" onClick={(event)=>{this.onMenuClick(MenuTypes.dashboard)}}/>
              <Button size="large" icon="file-add" onClick={(event)=>{this.onMenuClick(MenuTypes.upload)}}/>
            </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
  {this.state.menu.upload ? 
    (<FileComponent fileList={this.props.fileList} 
    removeFile={this.props.removeFile} 
    switchModel={this.props.switchModel}
    switchSubModel={this.props.switchSubModel}/>)
      : <Dashboard modelData={this.props.modelData} />}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

SidePane.propTypes = {
  fileList : PropTypes.array,
  removeFile : PropTypes.func,
  switchModel : PropTypes.func,
  switchSubModel: PropTypes.func,
  modelData : PropTypes.object
}

export default SidePane;
