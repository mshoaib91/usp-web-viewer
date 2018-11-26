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
  const modelInfo = modelData && modelData.ModelInformation ? modelData.ModelInformation : {};
  modelInfo['name'] = modelContainer.name
  const active = modelContainer.getActiveState();
  return (
    <Row className='graphpane'>
      <Col span={24}>
      <Row type='flex' justify='center' >
        <Col span={3}>
          <Tooltip placement='top' title={modelInfo.name}>
            <span><Icon className='tagicon' type="down-circle" theme="twoTone" twoToneColor={active ? '' : '#acacac'}  onClick={() => props.switchModel(modelContainer)}/></span>
          </Tooltip>
        </Col>
      </Row>
      {listGraphs(graphData, props.ident)}
      </Col>
    </Row>
  )
}

function listGraphs (graphData, ident) {
  if (graphData && graphData.length) {
    let graphsJSX = graphData.map((e, index) => {
      if (Object.keys(e)[0] === 'piechart') {
        return (
          <Row key={index}>
            <Col span={24}>
              <BarChart data={e.piechart} ident={ident + index}/>
              <h6>{e.label ? e.label : ''}</h6>
            </Col>
          </Row>
        )
      } else if (Object.keys(e)[0] === 'barchart') {
        return (
          <Row key={index} style={{marginTop:"20px"}}>
          <Col span={24}>
            <PieChart data={e.barchart} ident={ident + index}/>
            <h6>{e.label ? e.label : ''}</h6>
          </Col>
        </Row>
        )
      }
    });
    return graphsJSX;
  }
}

GraphPane.propTypes = {
  modelContainer : PropTypes.object,
  ident : PropTypes.string,
  switchModel : PropTypes.func
}