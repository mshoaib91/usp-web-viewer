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
      <Col span={8}>
        <Row>
          <Col span={24}>
            <BarChart data={barchart} ident={"1"}/>
          </Col>
        </Row>
        <Row style={{marginTop:"20px"}}>
          <Col span={24}>
            <PieChart data={barchart} ident={"1"}/>
          </Col>
        </Row>
      </Col>

      <Col span={8}>
        <Row>
          <Col span={24}>
            <BarChart data={barchart} ident={"2"}/>
          </Col>
        </Row>
        <Row style={{marginTop:"20px"}}>
          <Col span={24}>
            <PieChart data={barchart} ident={"2"}/>
          </Col>
        </Row>
      </Col>

      <Col span={8}>
        <Row>
          <Col span={24}>
            <BarChart data={barchart} ident={"3"}/>
          </Col>
        </Row>
        <Row style={{marginTop:"20px"}}>
          <Col span={24}>
            <PieChart data={barchart} ident={"3"}/>
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