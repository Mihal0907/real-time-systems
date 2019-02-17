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
                    {y: 155, x: 0},
                    {y: 150, x: 1},
                    {y: 152, x: 2},
                    {y: 148, x: 3},
                    {y: 142, x: 4},
                    {y: 150, x: 5},
                    {y: 146, x: 6},
                    {y: 149, x: 7},
                    {y: 153, x: 8},
                    {y: 158, x: 9},
                    {y: 154, x: 10},
                    {y: 150, x: 11}
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
                    {y: 155, x: 0},
                    {y: 150, x: 1},
                    {y: 152, x: 2},
                    {y: 148, x: 3},
                    {y: 142, x: 4},
                    {y: 150, x: 5},
                    {y: 146, x: 6},
                    {y: 149, x: 7},
                    {y: 153, x: 8},
                    {y: 158, x: 9},
                    {y: 154, x: 10},
                    {y: 150, x: 11}
                ]
            }]
        },
        optionsTime: {
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
                    {y: 155, x: 0},
                    {y: 150, x: 1},
                    {y: 152, x: 2},
                    {y: 148, x: 3},
                    {y: 142, x: 4},
                    {y: 150, x: 5},
                    {y: 146, x: 6},
                    {y: 149, x: 7},
                    {y: 153, x: 8},
                    {y: 158, x: 9},
                    {y: 154, x: 10},
                    {y: 150, x: 11}
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


        const start = new Date().getMilliseconds();
        this.generateHarmonics(harmonicsNum, harmonicCharts, division, discreteSamples);
        this.generateSignal(harmonicCharts, signalChart);
        const end = new Date().getMilliseconds();

        console.log(harmonicCharts);
        console.log(signalChart);

        const expectation = this.mathExpectation(signalChart);
        const dispersion = this.mathDispersion(signalChart, expectation);

       /* let theoreticStart = 0;
        let theoreticEnd = 0;
        let timeChart = [];
        let count = 0;

        while ((theoreticEnd - theoreticStart) < 150){
            theoreticStart = new Date().getMilliseconds();
            this.generateSignalTrue(harmonicsNum, division, discreteSamples);
            theoreticEnd = new Date().getMilliseconds();
            timeChart[count] = (theoreticEnd - theoreticStart);
            count++;
        }

        console.log(timeChart);*/

        this.setState(({optionsHarmonic, optionsFull, optionsTime}) => {

            let newOptionsHarmonic = JSON.parse(JSON.stringify(optionsHarmonic));
            let newOptionsFull = JSON.parse(JSON.stringify(optionsFull));
           // let newOptionsTime = JSON.parse(JSON.stringify(optionsTime));

            newOptionsFull.data[0] = {
                type: "line",
                name: `Harmonics number: ${harmonicsNum};  Frequency ${frequency};  Discrete samples number ${discreteSamples};`,
                showInLegend: true,
                dataPoints: this.arrToObjects(signalChart)
            };

            for (let i = 0; i < harmonicsNum; i++){
                newOptionsHarmonic.data[i] = {
                    type: "spline",
                    name: `${i+1}`,
                    showInLegend: true,
                    dataPoints: this.arrToObjects(harmonicCharts[i])
                }
            }

            let newResults = {
                expectation: expectation,
                dispersion: dispersion,
                time: (end - start)
            };


            return {
                optionsHarmonic: newOptionsHarmonic,
                optionsFull: newOptionsFull,
                //optionsTime: newOptionsTime,
                results: newResults,
            };
        })
    };

    /*generateSignalTrue = (harmonicsNum, division, discreteSamples) => {
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
    };*/


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

    render() {
        return (
            <div className={'main'}>
                <div className={"d-flex top"}>
                    <Form onValuesPushed={this.update}/>
                    <Result results={this.state.results}/>
                </div>
                <CanvasJSChart options={this.state.optionsFull}/>
                <CanvasJSChart options={this.state.optionsHarmonic}/>
            </div>
        );
    }
}

