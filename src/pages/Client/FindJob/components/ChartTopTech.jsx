/* App.js */
import React, { Component } from "react";
import PropTypes from "prop-types";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const ChartTopTech = ({ data }) => {
    const dataChart = data
        .map((item) => ({
            y: item.total,
            label: item.name,
        }))
        .reverse();
    const options = {
        animationEnabled: true,
        height: 160,
        backgroundColor: "#193C61",

        theme: "dark2",
        data: [
            {
                type: "bar",
                dataPoints: dataChart,
            },
        ],
    };
    return (
        <div style={{ width: "90%" }}>
            <CanvasJSChart
                options={options}
                /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    );
};

ChartTopTech.propTypes = {
    data: PropTypes.array,
};

export default ChartTopTech;
