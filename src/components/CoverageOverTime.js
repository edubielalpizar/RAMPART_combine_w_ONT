import React from 'react';
import { select } from "d3-selection";
import { line, curveBasis } from "d3-shape";
import {calcXScale, calcYScale, drawAxes} from "../utils/commonFunctions";
import {chartTitleCSS} from "../utils/commonStyles";
import {color as d3color} from "d3-color";

/* given the DOM dimensions of the chart container, calculate the chart geometry (used by the SVG & D3) */
const calcChartGeom = (DOMRect) => ({
  width: DOMRect.width,
  height: DOMRect.height - 20, // title line
  spaceLeft: 50,
  spaceRight: 10,
  spaceBottom: 60,
  spaceTop: 10
});

const strokeDashFunction = (i) => { /* i = 0, 1 or 2 */
  if (i === 1) {
    return "5, 5";
  } else if (i === 2) {
    return "2, 8"
  }
  return null;
}

const drawLines = (svg, scales, data, colour) => {
  svg.selectAll(".coverageLine").remove();
  svg.selectAll(".coverageLine")
    .data(["over1000x", "over100x", "over10x"])
    .enter().append("path")
      .attr("class", "coverageLine")
      .attr("fill", "none")
      .attr("stroke", colour)
      .attr("stroke-width", 5)
      .style("stroke-dasharray", (_, i) => strokeDashFunction(i))
      .attr('d', (coverageKey) => {
        const generator = line()
          .x((d) => scales.x(d.time)) // d here is the individual time point, {time: ..., over100x: ...}
          .y((d) => scales.y(d[coverageKey]))
          .curve(curveBasis);
        return generator(data)
      });
}

const drawLegend = (svg, chartGeom, colour) => {
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${chartGeom.spaceLeft}, ${chartGeom.spaceTop + 5})`)

  const labels = ["1000x", "100x", "10x"];

  legend.selectAll("line")
    .data([1, 2, 3])
    .enter()
    .append("path")
      .attr("d", (d, i) => `M10,${20*i} H50`)
      .attr("stroke-width", 5)
      .attr("stroke", colour)
      .style("stroke-dasharray", (_, i) => strokeDashFunction(i))

  legend.selectAll("line")
    .data([1, 2, 3])
    .enter()
    .append("text")
      .attr("x", 55)
      .attr("y", (_, i) => 20*i + 4)
      .text((n) => labels[n-1]);

}
class CoverageOverTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chartGeom: {}};
  }
  componentDidMount() {
    const svg = select(this.DOMref);
    const chartGeom = calcChartGeom(this.boundingDOMref.getBoundingClientRect());
    const yScale = calcYScale(chartGeom, 100);
    const colour = d3color(this.props.colour);
    drawLegend(svg, chartGeom, colour)
    this.setState({svg, chartGeom, yScale, colour});
  }
  componentDidUpdate(prevProps) {
    if (!this.props.temporalData.length) return;
    const finalDataPt = this.props.temporalData[this.props.temporalData.length-1];
    const timeMax = (parseInt(finalDataPt.time/30, 10) +1) * 30;
    const scales = {x: calcXScale(this.state.chartGeom, timeMax), y: this.state.yScale};
    drawAxes(this.state.svg, this.state.chartGeom, scales, {xTicks: 4, yTicks:5, isTime: true, ySuffix: "%"});
    drawLines(this.state.svg, scales, this.props.temporalData, this.state.colour);
  }
  render() {
    return (
      <div className={this.props.className} style={{width: this.props.width}} ref={(r) => {this.boundingDOMref = r}}>
      <div className="chartTitle">
        {this.props.title}
      </div>
        <svg
          ref={(r) => {this.DOMref = r}}
          height={this.state.chartGeom.height || 0}
          width={this.state.chartGeom.width || 0}
        />
      </div>
    )
  }
}

export default CoverageOverTime;
