import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';


export const Dashboard = (props) => {
  const graphData = props.modelData ? props.modelData.GraphData : null;
  const barchart = graphData ? graphData.barchart : [];
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <BarChart data={barchart} />
          </Col>
        </Row>
        <Row style={{marginTop:"20px"}}>
          <Col>
            <PieChart data={barchart} />
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