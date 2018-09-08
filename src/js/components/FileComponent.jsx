import React from 'react';
import { Col, Row, List, Icon } from 'antd';
import PropTypes from 'prop-types';
import { UploadComponent } from './UploadComponent.jsx';


export const FileComponent = (props) => {
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <UploadComponent />
          </Col>
        </Row>
        <Row style={{marginTop:"20px"}}>
          <Col>
            <List
              header={<h3>Loaded Models</h3>}
              size="small"
              bordered={false}
              dataSource={props.fileList}
              renderItem={
                modelContainer => (
                <List.Item 
                  actions={[
                    <Icon type="eye" onClick={() => {props.switchModel(modelContainer)}} style={modelContainer.getActiveState() === true ? {color: "#43a047", fontSize: 18} : {}}/>,
                    <Icon type="close" onClick={() => {props.removeFile(modelContainer)}}/>
                  ]}>
                  <List.Item.Meta title={modelContainer.name} description={subList(modelContainer.submodels)}/>
                  {/* {subList(modelContainer.submodels)} */}
                </List.Item>
              )
              }  
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

function subList(fileList) {
  return (
    <Row>
      <Col>
        <List 
          size="small"
          bordered={false}
          dataSource={fileList}
          renderItem={
            modelContainer => (
            <List.Item 
              actions={[
                <Icon type="eye" onClick={() => {props.switchModel(modelContainer)}} style={modelContainer.getActiveState() === true ? {color: "#43a047", fontSize: 18} : {}}/>,
                <Icon type="close" onClick={() => {props.removeFile(modelContainer)}}/>
              ]}>
              {modelContainer.name}
            </List.Item>
          )
          }
        />
      </Col>
    </Row>
  )
}


FileComponent.propTypes = {
  fileList : PropTypes.array,
  removeFile : PropTypes.func,
  switchModel : PropTypes.func
}