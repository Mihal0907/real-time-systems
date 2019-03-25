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
        optionsFourierX: {
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
        optionsFFX: {
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
        optionsFourierTime: {
            animationEnabled: false,
            title: {
                text: "Complexity chart"
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
                name: "DFT",
                color: "green",
                showInLegend: true,
                dataPoints: [
                    {x: 0, y: 4.005000000004657},
                    {x: 1, y: 0.030000000027939677},
                    {x: 2, y: 0.0650000000023283},
                    {x: 3, y: 0.27499999999417923},
                    {x: 4, y: 0.9049999999842839},
                    {x: 5, y: 6.345000000001164},
                    {x: 6, y: 6.264999999984866},
                    {x: 7, y: 9.695000000021537},
                    {x: 8, y: 38.760000000023865},
                    {x: 9, y: 155.5900000000256},
                    {x: 10, y: 626.6950000000361},
                    {x: 11, y: 2538.634999999951},
                    {x: 12, y: 10318.354999999996},
                    {x: 13, y: 42489.46500000001}]
            },
                {
                    type: "spline",
                    name: "FFT",
                    color: "black",
                    showInLegend: true,
                    dataPoints: [
                        {x: 0, y: 0.14500000008956704},
                        {x: 1, y: 0.14999999996143742},
                        {x: 2, y: 0.3649999999870488},
                        {x: 3, y: 0.9049999999897409},
                        {x: 4, y: 2.290000000017244},
                        {x: 5, y: 5.290000000059081},
                        {x: 6, y: 13.935000000059517},
                        {x: 7, y: 20.63999999995758},
                        {x: 8, y: 36.500000000045475},
                        {x: 9, y: 59.15500000003158},
                        {x: 10, y: 130.53000000002248},
                        {x: 11, y: 283.3500000000404},
                        {x: 12, y: 621.5050000000701},
                        {x: 13, y: 1323.4549999999672},
                        {x: 14, y: 2834.71499999996},
                        {x: 15, y: 5973.309999999969},
                        {x: 16, y: 12780.475000000024},
                        {x: 17, y: 27361.16000000004},
                        {x: 18, y: 57805.384999999995}
                    ]
                }]
        },
        resultsX: {
            name: "X signal",
            expectation: 0,
            dispersion: 0,
            timeX: 0,
            timeFx: 0,
            timeFfx: 0
        },
        resultsY: {
            name: "Y signal",
            expectation: 0,
            dispersion: 0,
            timeY: 0,
            timeFy: 0
        }

    };

    update = (values) => {

        const harmonicsNum = values.harmonicsNum;
        const frequency = values.frequency;
        const division = frequency / harmonicsNum;
        const discreteSamples = values.discreteNum;
        const accuracy = +1; // work only for +1 and +0.5 (I don't know why), otherwise charts are crash
        const power = 10;

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

        let startFx = window.performance.now();
        let fourierTransformX = signalService.fourierTransform(signalChartX);
        let endFx = window.performance.now();

        let newSignal = signalChartX.slice(0, signalChartX.length - 1);

        let startFfx = window.performance.now();
        let fft = signalService.fastFourierTransform(newSignal);
        let endFfx = window.performance.now();

        console.log(fft);

        /*let timeCharts = signalService.buildTimeFourierChart();
        console.log(timeCharts);*/


        //-------------------------------------------------------------------------

        this.setState(({optionsTime}) => {

            let newOptionsHarmonicX = signalService.harmonicsOptions(harmonicChartsX,
                "Harmonics chart for X signal");
            let newOptionsFullX = signalService.signalOptions(signalChartX,
                "Generated X signal chart");
            let newOptionsAutoCorrelationX = signalService.correlationOptions(correlationX,
                "Auto correlation function for X signal chart");
            let newOptionsFourierX = signalService.fourierOptions(fourierTransformX,
                "Discreet fourier transformation");
            let newOptionsFFourierX = signalService.fourierOptions(fourierTransformX,
                "Fast fourier transformation");
            //   let newComplexityChart = signalService.timeOptions(timeCharts);
            let newResultsX = {
                name: "X signal",
                expectation: expectationX,
                dispersion: dispersionX,
                timeX: (endX - startX),
                timeFx: (endFx - startFx),
                timeFfx: (endFfx - startFfx)
            };

            //-------------------------------------------------------------------------

            newOptionsHarmonicX.data.splice(harmonicsNum, newOptionsHarmonicX.data.length);

            let newOptionsTime = JSON.parse(JSON.stringify(optionsTime));
            return {
                optionsHarmonicsX: newOptionsHarmonicX,
                optionsFullX: newOptionsFullX,
                optionsAutoCorrelationX: newOptionsAutoCorrelationX,
                optionsFourierX: newOptionsFourierX,
                optionsFFX: newOptionsFFourierX,
                optionsTime: newOptionsTime,
                // optionsFourierTime: newComplexityChart,
                resultsX: newResultsX,
            };
        })
    };

    render() {
        return (
            <div className={'main'}>
                <div className={"d-flex"}>
                    <Form onValuesPushed={this.update}/>
                    <Result results={this.state.resultsX}/>
                </div>
                <CanvasJSChart options={this.state.optionsFullX}/>
                <CanvasJSChart options={this.state.optionsHarmonicsX}/>
                <CanvasJSChart options={this.state.optionsFourierX}/>
                <CanvasJSChart options={this.state.optionsFFX}/>
                <CanvasJSChart options={this.state.optionsFourierTime}/>
            </div>
        );
    }
}

