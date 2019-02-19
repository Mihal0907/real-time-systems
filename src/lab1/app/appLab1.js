import React, {Component} from 'react';
import './appLab1.css';
import Form from '../form'
import Result from '../result'
import CanvasJSReact from '../../canvasjs/canvasjs.react'
import SignalService from '../signalServise'

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
                title: "Y: time",
                includeZero: false
            },
            axisX: {
                title: "X: discrete samples",
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
        const division = frequency / harmonicsNum;
        const discreteSamples = values.discreteNum;
        const accuracy = +0.5; // work only for +1 and +0.5 (I don't know why), otherwise charts are crash

        let signalService = new SignalService();

        const start = window.performance.now();
        let harmonicCharts = signalService.generateHarmonics(harmonicsNum, division, discreteSamples, accuracy);
        let signalChart = signalService.generateSignal(harmonicCharts);
        const end = window.performance.now();

        //console.log(harmonicCharts);
        //console.log(signalChart);

        const expectation = signalService.mathExpectation(signalChart);
        const dispersion = signalService.mathDispersion(signalChart, expectation);

        /*//Uncomment this code if you want to rebuild the timeChart!!
        let timeChart = this.buildTimeChart(harmonicsNum, division, 24);*/

        this.setState(({optionsHarmonic, optionsFull, optionsTime}) => {

            let newOptionsHarmonic = signalService.harmonicsOptions(harmonicCharts);
            let newOptionsFull = signalService.siganalOptions(signalChart);
            let newOptionsTime = JSON.parse(JSON.stringify(optionsTime));

            //console.log(harmonicCharts);

            //console.log(newOptionsHarmonic.data);

            newOptionsHarmonic.data.splice(harmonicsNum, newOptionsHarmonic.data.length);

            let newResults = {
                expectation: expectation,
                dispersion: dispersion,
                time: (end - start)
            };

            /*//Uncomment this code if you want to rebuild the timeChart!!
                newOptionsTime.data[0] = {
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


//<CanvasJSChart options={this.state.optionsHarmonic}/>
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

