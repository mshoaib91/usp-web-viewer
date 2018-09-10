import React from 'react';
import { Col, Row, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';

import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';

import '../../sass/graphPane.scss';

export const GraphPane = (props) => {
  const modelContainer = props.modelContainer;
  const modelData = modelContainer.model.ModelData;
  const graphData = modelData ? modelData.GraphData : null;
  const barchartData = graphData ? graphData.barchart : [];
  const piechartData = graphData ? graphData.piechart : [];
  const modelInfo = modelData && modelData.ModelInformation ? modelData.ModelInformation : {};
  modelInfo['name'] = modelContainer.name
  const active = modelContainer.getActiveState();
  return (
    <Row className='graphpane'>
      <Col span={24}>
      <Row type='flex' justify='center' >
        <Col span={12} className='tag' style={active ? {backgroundColor: '#6494c1'} : {}} onClick={() => props.switchModel(modelContainer)}>
          <Tooltip placement='top' title={name}>
            <span><Icon type={'home'} className='tagicon'/></span>
          </Tooltip>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <BarChart data={barchartData} ident={props.ident}/>
        </Col>
      </Row>
      <Row style={{marginTop:"20px"}}>
        <Col span={24}>
          <PieChart data={barchartData} ident={props.ident}/>
        </Col>
      </Row>
      </Col>
    </Row>
  )
}

GraphPane.propTypes = {
  modelContainer : PropTypes.object,
  ident : PropTypes.string,
  switchModel : PropTypes.func
}