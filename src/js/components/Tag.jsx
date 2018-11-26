import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

import "../../sass/tag.scss"

const Tag = (props) => (
  <Row className="tag">
    <Col>
      <h1 className="label">
        {props.data}
      </h1>
    </Col>
  </Row>
);

Tag.propTypes = {
  data : PropTypes.string
};

export default Tag;
