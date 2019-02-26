import React, {Component} from 'react';
import './app.css';
import Form from '../form'
import Result from '../result'
import CanvasJSReact from '../../canvasjs/canvasjs.react'
import SignalService from '../signalServise'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

export default class App extends Component {

    state = {
        optionsHarmonicsX: {
            animationEnabled: false,
            title: {
                text: " "
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
        optionsFullX: {
            animationEnabled: false,
            title: {
                text: " "
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
        optionsAutoCorrelationX: {
            animationEnabled: false,
            title: {
                text: ""
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
        optionsHarmonicsY: {
            animationEnabled: false,
            title: {
                text: " "
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
        optionsFullY: {
            animationEnabled: false,
            title: {
                text: " "
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
        optionsAutoCorrelationY: {
            animationEnabled: false,
            title: {
                text: ""
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
        optionsMutualCorrelation: {
            animationEnabled: false,
            title: {
                text: ""
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
                color: "black",
                showInLegend: true,
                dataPoints: [
                    {x: 0, y: 0.19999999858555384},
                    {x: 1, y: 0.03999999898951501},
                    {x: 2, y: 0.045000000682193786},
                    {x: 3, y: 0.07999999979801942},
                    {x: 4, y: 0.1649999994697282},
                    {x: 5, y: 0.3150000011373777},
                    {x: 6, y: 0.630000000455766},
                    {x: 7, y: 1.2799999985873},
                    {x: 8, y: 3.284999998868443},
                    {x: 9, y: 10.100000001330045},
                    {x: 10, y: 3.224999998565181},
                    {x: 11, y: 8.739999999306747},
                    {x: 12, y: 12.575000000651926},
                    {x: 13, y: 26.06999999989057},
                    {x: 14, y: 52.610000000640866},
                    {x: 15, y: 101.95500000008906},
                    {x: 16, y: 198.725000000195},
                    {x: 17, y: 396.7549999997573},
                    {x: 18, y: 789.135000000897},
                    {x: 19, y: 1579.1000000008353},
                    {x: 20, y: 3148.9849999998114},
                    {x: 21, y: 6277.970000001005},
                    {x: 22, y: 12536.089999999604},

                ]
            }]
        },
        resultsX: {
            name: "X signal",
            expectation: 0,
            dispersion: 0,
            time: 0
        },
        resultsY: {
            name: "Y signal",
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
        const accuracy = +1; // work only for +1 and +0.5 (I don't know why), otherwise charts are crash
        const power = 22;

        let signalService = new SignalService(
            harmonicsNum,
            division,
            discreteSamples,
            accuracy,
            power);

        const startX = window.performance.now();
        let harmonicChartsX = signalService.generateHarmonics();
        let signalChartX = signalService.generateSignal(harmonicChartsX);
        const endX = window.performance.now();

        const expectationX = signalService.mathExpectation(signalChartX);
        const dispersionX = signalService.mathDispersion(signalChartX, expectationX);

        let correlationX = signalService.autoCorrelation(signalChartX, expectationX);

        //-------------------------------------------------------------------------

        const startY = window.performance.now();
        let harmonicChartsY = signalService.generateHarmonics();
        let signalChartY = signalService.generateSignal(harmonicChartsY);
        const endY = window.performance.now();

        const expectationY = signalService.mathExpectation(signalChartY);
        const dispersionY = signalService.mathDispersion(signalChartY, expectationY);

        let correlationY = signalService.autoCorrelation(signalChartY, expectationY);

        signalService.checkCorrelation(signalChartX, signalChartY);

        //-------------------------------------------------------------------------

        this.setState(({optionsTime}) => {

            let newOptionsHarmonicX = signalService.harmonicsOptions(harmonicChartsX,
                "Harmonics chart for X signal");
            let newOptionsFullX = signalService.signalOptions(signalChartX,
                "Generated X signal chart");
            let newOptionsAutoCorrelationX = signalService.correlationOptions(correlationX,
                "Auto correlation function for X signal chart");
            let newResultsX = {
                name: "X signal",
                expectation: expectationX,
                dispersion: dispersionX,
                time: (endX - startX)
            };

            //-------------------------------------------------------------------------

            let newOptionsHarmonicY = signalService.harmonicsOptions(harmonicChartsY,
                "Harmonics chart for X signal");
            let newOptionsFullY = signalService.signalOptions(signalChartY,
                "Generated Y signal chart");
            let newOptionsAutoCorrelationY = signalService.correlationOptions(correlationY,
                "Auto correlation function for Y signal chart");
            let newResultsY = {
                name: "Y signal",
                expectation: expectationY,
                dispersion: dispersionY,
                time: (endY - startY)
            };

            //-------------------------------------------------------------------------

            let newOptionsMutualCorrelation = signalService.correlationOptions(
                signalService.mutualCorrelation(
                    signalChartX,
                    signalChartY,
                    expectationX,
                    expectationY),
                "Mutual correlation of X and Y charts")

            newOptionsHarmonicX.data.splice(harmonicsNum, newOptionsHarmonicX.data.length);
            newOptionsHarmonicY.data.splice(harmonicsNum, newOptionsHarmonicY.data.length);

            let newOptionsTime = JSON.parse(JSON.stringify(optionsTime));
           /* //Uncomment this part of code if you want to rebuild chart
            newOptionsTime = signalService.timeOptions(signalService.buildTimeChart());
            console.log(newOptionsTime);*/

            return {
                optionsHarmonicsX: newOptionsHarmonicX,
                optionsFullX: newOptionsFullX,
                optionsAutoCorrelationX: newOptionsAutoCorrelationX,
                optionsHarmonicsY: newOptionsHarmonicY,
                optionsFullY: newOptionsFullY,
                optionsAutoCorrelationY: newOptionsAutoCorrelationY,
                optionsMutualCorrelation: newOptionsMutualCorrelation,
                optionsTime: newOptionsTime,
                resultsX: newResultsX,
                resultsY: newResultsY
            };
        })
    };

    render() {
        return (
            <div className={'main'}>
                <div className={"d-flex"}>
                    <Form onValuesPushed={this.update}/>
                    <Result results={this.state.resultsX}/>
                    <Result results={this.state.resultsY}/>
                </div>
                <CanvasJSChart options={this.state.optionsFullX}/>
                <CanvasJSChart options={this.state.optionsAutoCorrelationX}/>
                <CanvasJSChart options={this.state.optionsHarmonicsX}/>
                <CanvasJSChart options={this.state.optionsFullY}/>
                <CanvasJSChart options={this.state.optionsAutoCorrelationY}/>
                <CanvasJSChart options={this.state.optionsHarmonicsY}/>
                <CanvasJSChart options={this.state.optionsMutualCorrelation}/>
                <CanvasJSChart options={this.state.optionsTime}/>
            </div>
        );
    }
}

