import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { GraphPane } from './GraphPane.jsx';

export const Dashboard = (props) => {
  const noModels = props.fileList.length;
  const colSpan = Math.floor(24/Number(noModels));
  
  return (
    <Row>
      {/* {createPanes(props.fileList, colSpan, props.switchModel)} */}
      <Panes fileList={props.fileList} colSpan={colSpan} switchModel={props.switchModel}/>
    </Row>
  );
}

// function createPanes (modelList, colSpan, switchModelHandler) {
//   return modelList.map((modelContainer, index) => {
//     return (
//       <Col key={index} span={colSpan}>
//         <GraphPane modelContainer={modelContainer} ident={'m'+index} switchModel={switchModelHandler} />
//       </Col>
//     );
//   });
// }

const Panes = (props) => {
  return props.fileList.map((modelContainer, index) => {
    return (
      <Col key={index} span={props.colSpan}>
        <GraphPane modelContainer={modelContainer} ident={'m'+index} switchModel={props.switchModel} parentColSpan={props.colSpan} />
      </Col>
    );
  });
}

Dashboard.propTypes = {
  fileList : PropTypes.array,
  switchModel : PropTypes.func
}

Panes.propTypes = {
  fileList: PropTypes.array,
  colSpan: PropTypes.number,
  switchModel: PropTypes.func
}
