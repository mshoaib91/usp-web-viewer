import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { GraphPane } from './GraphPane.jsx';



export const Dashboard = (props) => {
  const graphData = props.modelData ? props.modelData.GraphData : null;
  const modelInfo = props.modelData && props.modelData.ModelInformation ? props.modelData.ModelInformation : {};
  const barchart = graphData ? graphData.barchart : [];
  return (
    <Row>
      <Col span={12}>
        <GraphPane barchartData={barchart} piechartData={barchart} modelInfo={modelInfo} ident={'1'}/>
      </Col>

      <Col span={12}>
        <GraphPane barchartData={barchart} piechartData={barchart} modelInfo={modelInfo} ident={'2'}/>
      </Col>
    </Row>
  );
}


Dashboard.propTypes = {
  modelData : PropTypes.object
}