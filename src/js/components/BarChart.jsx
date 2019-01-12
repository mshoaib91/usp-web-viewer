import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import * as d3 from "d3";

import "../../sass/barchart.scss"

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    console.log("barchart data", props.data);
  }
  
  shouldComponentUpdate({data, ident, rand}) {
    return (data.length !== this.props.data.length || (ident === this.props.ident && rand !== this.props.rand));
  }
  
  componentDidUpdate() {
    this.updateGraph(this.props.data);
  }
  
  componentDidMount() {
    this.drawGraph(this.props.data);
  }
  
  drawGraph(data) {
    var svg = d3.select("#barchart"+this.props.ident).append("svg").attr("class", "bar-svg");
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = Number(svg.style("width").split("px")[0]) - margin.left - margin.right,
    height = Number(svg.style("height").split("px")[0]) - margin.top - margin.bottom;
    
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);
    
    var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    x.domain(data.map(function(d) { return d.label; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);
    
    g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    
    g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("value");
    
    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.label); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); });
  }
  
  updateGraph(data) {
    d3.select("#barchart"+this.props.ident).select("svg").remove().exit();
    this.drawGraph(data);
    
  }
  
  render () {
    return (
      <Row>
        <Col>
          <div id={"barchart"+this.props.ident} className="barchart"></div>
        </Col>
      </Row>
    );
  }
}

BarChart.propTypes = {
  data : PropTypes.array,
  ident : PropTypes.string,
  rand : PropTypes.number
};

export default BarChart;