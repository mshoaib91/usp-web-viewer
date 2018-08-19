import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

import Barchart from './Barchart.jsx';


export const Dashboard = (props) => {
  let histogramData = props.modelData ? props.modelData.GraphData : null;
  histogramData = histogramData ? histogramData.Histogram : [];
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <Barchart data={histogramData}/>
          </Col>
        </Row>
        <Row style={{marginTop:"20px"}}>
          <Col>
            
          </Col>
        </Row>
      </Col>
    </Row>
  );
}


Dashboard.propTypes = {
  histogramData : PropTypes.array,
  modelData : PropTypes.object
}