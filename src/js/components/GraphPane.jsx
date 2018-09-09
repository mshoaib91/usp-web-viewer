import React from 'react';
import { Col, Row, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';

import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';

import '../../sass/graphPane.scss';

export const GraphPane = (props) => {
  const name = props.modelInfo.name ? props.modelInfo.name : '';
  return (
    <Row className='graphpane'>
      <Col span={24}>
      <Row type='flex' justify='center' >
        <Col span={12} className='tag'>
          <Tooltip placement='top' title={name}>
            <span><Icon type={'home'} className='tagicon'/></span>
          </Tooltip>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <BarChart data={props.barchartData} ident={props.ident}/>
        </Col>
      </Row>
      <Row style={{marginTop:"20px"}}>
        <Col span={24}>
          <PieChart data={props.piechartData} ident={props.ident}/>
        </Col>
      </Row>
      </Col>
    </Row>
  )
}

GraphPane.propTypes = {
  barchartData : PropTypes.array,
  piechartData : PropTypes.array,
  modelInfo :   PropTypes.object, 
  ident : PropTypes.string
}