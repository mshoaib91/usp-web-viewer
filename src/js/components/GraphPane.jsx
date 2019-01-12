import React from 'react';
import { Col, Row, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';
import Tag from './Tag.jsx'

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
            <span><Icon className='tagicon' type="bank" theme="twoTone" twoToneColor={active ? '' : '#acacac'}  onClick={() => props.switchModel(modelContainer)}/></span>
          </Tooltip>
        </Col>
      </Row>
      {listGraphs(graphData, props.ident, props.parentColSpan)}
      </Col>
    </Row>
  )
}

/**
 * ParentColSpan is introduced so that d3 graph only updates when parent column span changes
 */
function listGraphs (graphData, ident, parentColSpan) {
  if (graphData && graphData.length) {
    let graphsJSX = graphData.map((e, index) => {
      if (Object.keys(e).includes('piechart')) {
        return (
          <Row key={index}>
            <Col span={24}>
              <BarChart data={e.piechart} ident={ident + index} rand={parentColSpan}/>
              <h6 className="graph-label">{e.label ? e.label : ''}</h6>
            </Col>
          </Row>
        )
      } else if (Object.keys(e).includes('barchart')) {
        return (
          <Row key={index} style={{marginTop:"20px"}}>
            <Col span={24}>
              <PieChart data={e.barchart} ident={ident + index} rand={parentColSpan}/>
              <h6 className="graph-label">{e.label ? e.label : ''}</h6>
            </Col>
          </Row>
        )
      } else if (Object.keys(e).includes('tag')) {
        return (
          <Row key={index} style={{marginTop:"20px"}}>
            <Col span={24}>
              <Tag data={e.tag}/>
              <h6 className="graph-label">{e.label ? e.label : ''}</h6>
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
  switchModel : PropTypes.func,
  parentColSpan : PropTypes.number 
}