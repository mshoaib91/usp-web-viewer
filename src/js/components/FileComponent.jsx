import React from 'react';
import { Col, Row } from 'antd';
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
        <Row>
          <Col>
            {props.fileList.map(file => (<li>{file}</li>))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

FileComponent.propTypes = {
  fileList : PropTypes.array
}