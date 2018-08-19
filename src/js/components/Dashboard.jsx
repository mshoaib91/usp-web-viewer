import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

import Barchart from './Barchart.jsx';


export const Dashboard = (props) => {
  const graphData = props.modelData ? props.modelData.GraphData : null;
  const barchart = graphData ? graphData.barchart : [];
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <Barchart data={barchart}/>
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