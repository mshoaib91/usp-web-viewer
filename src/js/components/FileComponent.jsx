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
              renderItem={item => (<List.Item actions={[<Icon type="eye" style={{color: "#43a047"}}/>, <Icon type="close" />]}>{item}</List.Item>)}  
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

FileComponent.propTypes = {
  fileList : PropTypes.array
}