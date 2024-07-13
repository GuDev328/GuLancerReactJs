/* App.js */
import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class ChartTopTech extends Component {
    render() {
        const options = {
            animationEnabled: true,
            height: 160,
            backgroundColor: "#193C61",

            theme: "dark2",
            data: [
                {
                    type: "bar",
                    dataPoints: [
                        { y: 1000, label: "ReactJs" },
                        { y: 1300, label: "Ruby" },
                        { y: 4500, label: "NodeJS" },
                        { y: 3400, label: "Java" },
                        { y: 4000, label: "Khác" },
                    ],
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
    }
    addSymbols(e) {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(
            Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)),
            0
        );
        if (order > suffixes.length - 1) order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
}
export default ChartTopTech;
