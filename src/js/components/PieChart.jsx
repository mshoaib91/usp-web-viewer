import React from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import * as d3 from "d3";

import "../../sass/piechart.scss"

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    console.log("PieChart data", props.data);
  }
  
  shouldComponentUpdate({data}) {
    return (data.length !== this.props.data.length);
  }
  
  componentDidUpdate() {
    this.updateGraph(this.props.data);
  }
  
  componentDidMount() {
    this.drawGraph(this.props.data);
  }
  
  drawGraph(data) {
    var svg = d3.select("#piechart").append("svg").attr("class", "pie-svg"),
    width = Number(svg.style("width").split("px")[0]),
    height = Number(svg.style("height").split("px")[0]),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var color = d3.scaleOrdinal(["#F23F54", "#AA8B39", "#3E4BAD", "#448F30", "#297A4A", "#9C33C5", "#2D882D"]);
    
    var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.frequency; });
    
    var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
    
    var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);
    
    data = data.map(d => {
      d.frequency = +d.frequency;
      return d;
    });
    
    var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");
    
    arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.letter); });
    
    arc.append("text")
    .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
    .attr("dy", "0.35em")
    .text(function(d) { return d.data.letter; });
  }
  
  updateGraph(data) {
    d3.select("#piechart").select("svg").remove().exit();
    this.drawGraph(data);
    
  }
  
  render () {
    return (
      <Row>
      <Col>
      <div id="piechart" className="piechart"></div>
      </Col>
      </Row>
    );
  }
}

PieChart.propTypes = {
  data : PropTypes.array
};

export default PieChart;