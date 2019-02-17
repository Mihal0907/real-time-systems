import React, {Component} from 'react';
import './appLab1.css';
import Form from '../form'
import Result from '../result'
import CanvasJSReact from '../../canvasjs/canvasjs.react'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

export default class AppLab1 extends Component {

    state = {
        optionsHarmonic: {
            animationEnabled: false,
            title: {
                text: "Harmonics timeChart"
            },
            axisY: {
                title: "Y",
                includeZero: false
            },
            axisX: {
                title: "X",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "line",
                name: "",
                showInLegend: true,
                dataPoints: [
                    {y: 0, x: 0},
                ]
            }]
        },
        optionsFull: {
            animationEnabled: false,
            title: {
                text: "Generated signal timeChart"
            },
            axisY: {
                title: "Y",
                includeZero: false
            },
            axisX: {
                title: "X",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "line",
                name: "",
                showInLegend: true,
                dataPoints: [
                    {y: 0, x: 0},
                ]
            }]
        },
        optionsTime: {
            animationEnabled: false,
            title: {
                text: "Dependence of time on the number of discrete samples"
            },
            axisY: {
                title: "Y",
                includeZero: false
            },
            axisX: {
                title: "X",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: [{
                type: "spline",
                name: "Number of discrete samples is 2^X",
                showInLegend: true,
                dataPoints: [
                    {x: 0, y: 0.2549999999246211},
                    {x: 1, y: 0.045000000227446435},
                    {x: 2, y: 0.06499999972220394},
                    {x: 3, y: 0.105000000075961},
                    {x: 4, y: 0.20500000027823262},
                    {x: 5, y: 0.37500000007639755},
                    {x: 6, y: 0.7800000003044261},
                    {x: 7, y: 4.380000000310247},
                    {x: 8, y: 1.4449999998760177},
                    {x: 9, y: 9.299999999711872},
                    {x: 10, y: 1.6550000000279397},
                    {x: 11, y: 3.23000000025786},
                    {x: 12, y: 6.530000000111613},
                    {x: 13, y: 13.669999999819993},
                    {x: 14, y: 27.61000000009517},
                    {x: 15, y: 52.16500000005908},
                    {x: 16, y: 107.05000000007203},
                    {x: 17, y: 209.19000000003507},
                    {x: 18, y: 425.2549999996518},
                    {x: 19, y: 834.8650000002635},
                    {x: 20, y: 1687.7549999999246},
                    {x: 21, y: 3263.1200000000717}
                ]
            }]
        },
        results: {
            expectation: 0,
            dispersion: 0,
            time: 0
        }

    };

    update = (values) => {

        const harmonicsNum = values.harmonicsNum;
        const frequency = values.frequency;
        const division = frequency / harmonicsNum + frequency % harmonicsNum;
        const discreteSamples = values.discreteNum;

        let signalChart = [];
        let harmonicCharts = [];

        const start = window.performance.now();
        this.generateHarmonics(harmonicsNum, harmonicCharts, division, discreteSamples);
        this.generateSignal(harmonicCharts, signalChart);
        const end = window.performance.now();

        //console.log(harmonicCharts);
        //console.log(signalChart);

        const expectation = this.mathExpectation(signalChart);
        const dispersion = this.mathDispersion(signalChart, expectation);

        /*//Uncomment this code if you want to rebuild the timeChart!!
        let timeChart = this.buildTimeChart(harmonicsNum, division, 24);*/


        this.setState(({optionsHarmonic, optionsFull, optionsTime}) => {

            let newOptionsHarmonic = JSON.parse(JSON.stringify(optionsHarmonic));
            let newOptionsFull = JSON.parse(JSON.stringify(optionsFull));
            let newOptionsTime = JSON.parse(JSON.stringify(optionsTime));

            newOptionsFull.data[0] = {
                type: "line",
                name: `Harmonics number: ${harmonicsNum};  Frequency ${frequency};  Discrete samples number ${discreteSamples};`,
                showInLegend: true,
                dataPoints: this.arrToObjects(signalChart)
            };

            console.log(harmonicCharts);

            for (let i = 0; i < harmonicsNum; i++) {
                newOptionsHarmonic.data[i] = {
                    type: "spline",
                    name: `${i + 1}`,
                    showInLegend: true,
                    dataPoints: this.arrToObjects(harmonicCharts[i])
                }
            }

            newOptionsHarmonic.data.splice(harmonicsNum, newOptionsHarmonic.data.length);

            let newResults = {
                expectation: expectation,
                dispersion: dispersion,
                time: (end - start)
            };

            /*newOptionsTime.data[0] = {
                type: "spline",
                name: "Number of discrete samples is 2^X",
                showInLegend: true,
                dataPoints: timeChart
            };*/


            return {
                optionsHarmonic: newOptionsHarmonic,
                optionsFull: newOptionsFull,
                optionsTime: newOptionsTime,
                results: newResults,
            };
        })
    };

    generateSingleHarmonic = (division, discreteSamples) => {
        const chart = [];
        const amplitude = Math.random();
        const phase = Math.random() * Math.PI * 2;

        for (let i = 0; i <= discreteSamples; i++) {
            chart[i] = amplitude * Math.sin(division * i + phase);
        }
        return chart;
    };

    generateHarmonics = (harmonicsNum, harmonicCharts, division, discreteSamples) => {
        for (let i = 0; i < harmonicsNum; i++) {
            harmonicCharts[i] = this.generateSingleHarmonic(division * (i + 1), discreteSamples)
        }
    };

    generateSignal = (harmonicCharts, signalChart) => {
        for (let i = 0; i < harmonicCharts[1].length; i++) {
            let sum = 0;
            for (let j = 0; j < harmonicCharts.length; j++) {
                sum += harmonicCharts[j][i];
            }
            signalChart[i] = sum;
        }
    };


    arrToObjects = (arr) => {
        let newArr = [];
        for (let i = 0; i <= arr.length; i++) {
            newArr[i] = {y: arr[i], x: i}
        }
        return newArr

    };


    mathExpectation = (arr) => {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return (sum / arr.length);
    };

    mathDispersion = (arr, exp) => {
        let sum = 0;
        let num = 0;
        for (let i = 0; i < arr.length; i++) {
            num = (exp - arr[i]);
            sum += Math.pow(num, 2);
        }

        return sum / (arr.length - 1);
    };

    generateSignalTrue = (harmonicsNum, division, discreteSamples) => {
        let chart = [];
        for (let i = 0; i < discreteSamples; i++) {
            let sum = 0;
            let amplitude = Math.random();
            let phase = Math.random() * 2 * Math.PI;
            for (let j = 0; j < harmonicsNum; j++) {
                sum += amplitude * Math.sin(division * (j + 1) + phase);
            }
            chart[i] = sum;
        }
    };

    buildTimeChart = (harmonicsNum, division, power) => {
        let theoreticStart = 0;
        let theoreticEnd = 0;
        let timeChart = [];
        let sample = 2;

        for (let i = 0; i <= power; i++) {
            theoreticStart = window.performance.now();
            this.generateSignalTrue(harmonicsNum, division, sample);
            theoreticEnd = window.performance.now();
            timeChart[i] = {x: i, y: (theoreticEnd - theoreticStart)};
            sample = sample * 2;
        }
        console.log(timeChart);
        return timeChart;
    };


    render() {
        return (
            <div className={'main'}>
                <div className={"d-flex"}>
                    <Form onValuesPushed={this.update}/>
                    <Result results={this.state.results}/>
                </div>
                <CanvasJSChart options={this.state.optionsFull}/>
                <CanvasJSChart options={this.state.optionsHarmonic}/>
                <CanvasJSChart options={this.state.optionsTime}/>
            </div>
        );
    }
}

