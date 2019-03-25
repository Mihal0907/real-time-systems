import * as Complex from 'complex.js'

export default class SignalService {

    constructor(harmonicsNum,
                division,
                discreteSamples,
                accuracy,
                power) {
        this.harmonicsNum = harmonicsNum;
        this.division = division;
        this.discreteSamples = discreteSamples;
        this.accuracy = accuracy;
        this.power = power;

    };

    generateSingleHarmonic = (division) => {
        const chart = [];
        const amplitude = Math.random();
        const phase = Math.random() * Math.PI * 2;

        for (let i = 0; i <= this.discreteSamples * 2; i = i + this.accuracy) {
            chart[i * (1 / this.accuracy)] = amplitude * Math.sin(division * i + phase);
        }
        // console.log(division);
        return chart;
    };

    generateHarmonics = () => {
        let harmonicCharts = [];
        for (let i = 1; i <= this.harmonicsNum; i++) {
            harmonicCharts[i - 1] = this.generateSingleHarmonic(this.division * (i))
        }
        return harmonicCharts;
    };

    generateSignal = (harmonicCharts) => {
        let signalChart = [];
        for (let i = 0; i < harmonicCharts[1].length; i++) {
            let sum = 0;
            for (let j = 0; j < harmonicCharts.length; j++) {
                sum += harmonicCharts[j][i];
            }
            signalChart[i] = sum;
        }
        return signalChart;
    };

    arrToObjects = (arr, division) => {
        let newArr = [];
        for (let i = 0; i <= arr.length / division; i++) {
            newArr[i] = {y: arr[i], label: i / (1 / this.accuracy)}
        }
        return newArr

    };

    autoCorrelation = (arr, exp) => {
        let newArr = [];
        let sum;
        for (let i = 0; i <= this.discreteSamples; i++) {
            sum = 0;
            for (let j = 0; j <= this.discreteSamples; j++) {
                sum = sum + (arr[j] - exp) * (arr[i + j] - exp);
            }
            newArr[i] = sum / (this.discreteSamples - 1);
        }
        return newArr;
    };

    mutualCorrelation = (arrX, arrY, expX, expY) => {
        let newArr = [];
        let sum;
        for (let i = 0; i <= this.discreteSamples; i++) {
            sum = 0;
            for (let j = 0; j <= this.discreteSamples; j++) {
                sum = sum + (arrX[j] - expX) * (arrY[i + j] - expY);
            }
            newArr[i] = sum / (this.discreteSamples - 1);
        }
        return newArr;
    };

    checkCorrelation = (arrX, arrY) => {
        for (let i = 0; i <= this.discreteSamples; i++) {
            if ((arrX[i] > 0 && arrY[i] > 0) || (arrX[i] < 0 && arrY[i] < 0)) {
                console.log(`x: ${arrX[i].toFixed(3)}, y: ${arrY[i].toFixed(3)} - correlation > 0`);
            } else {
                console.log(`x: ${arrX[i].toFixed(3)}, y: ${arrY[i].toFixed(3)} - correlation < 0`);
            }
        }
    };

    fourierTransform = (signal) => {
        let fourierChart = [];
        for (let i = 0; i < signal.length; i++) {
            let real = 0;
            let imaginary = 0;
            for (let j = 0; j < signal.length; j++) {
                real += signal[j] * Math.cos((2 * Math.PI * i * j) / signal.length);
                imaginary += signal[j] * Math.sin((2 * Math.PI * i * j) / signal.length);
            }
            fourierChart[i] = Math.sqrt(Math.pow(real, 2) + Math.pow(imaginary, 2));
        }
        return fourierChart;
    };

    fastFourierTransform = (signal) => this.fastFourierTransformComplex(signal.map(s => new Complex(s, 0))).map(x => this.myMod(x))


    fastFourierTransformComplex = (signalComplex) => {

        let N = signalComplex.length;

        if (N === 1)
            return [...signalComplex];

        let even = [];
        let odd = [];

        for (let i = 0; i < N / 2; i++) {
            even.push(signalComplex[2 * i]);
            odd.push(signalComplex[2 * i + 1])
        }
        let evenFFT = this.fastFourierTransformComplex(even);
        let oddFFT = this.fastFourierTransformComplex(odd);
        let res1 = [];
        let res2 = [];

        for (let i = 0; i < N / 2; i++) {
            let k = -2 * i * Math.PI / 2;
            let w = Complex(Math.cos(k), Math.sin(k));
            res1.push(this.myAdd(evenFFT[i], this.myMul(oddFFT[i], w)));
            res2.push(this.mySub(evenFFT[i], this.myMul(oddFFT[i], w)));
        }
        res2.forEach(element => {
            res1.push(element)
        });
        return res1;

    };

    myAdd = (left, right) => {
        return new Complex(left.re + right.re, left.im + right.im)
    };
    myMul = (left, right) => {
        return new Complex(left.re * right.re - left.im * right.im, left.re * right.im + left.im * right.re)
    };
    mySub = (left, right) => {
        return new Complex(left.re - right.re, left.im - right.im)
    };
    myMod = (compl) => {
        return Math.sqrt(compl.re * compl.re + compl.im * compl.im)
    };

    signalOptions = (signalChart, text) => {
        return {
            animationEnabled: false,
            title: {
                text: text
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
                color: "red",
                showInLegend: true,
                dataPoints: this.arrToObjects(signalChart, 2)
            }]
        }
    };

    fourierOptions = (fourierChart, text) => {
        return {
            animationEnabled: false,
            title: {
                text: text
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
                color: "#3333CC",
                showInLegend: true,
                dataPoints: this.arrToObjects(fourierChart, 2)
            }]
        }
    };


    correlationOptions = (chart, text) => {
        return {
            animationEnabled: false,
            title: {
                text: text
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
                name: "",
                color: "green",
                showInLegend: true,
                dataPoints: this.arrToObjects(chart, 1)
            }]
        }
    };

    harmonicsOptions = (harmonicCharts, text) => {
        let harmonicOptions = {

            animationEnabled: false,
            title: {
                text: text
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
            data: []
        };

        for (let i = 0; i < harmonicCharts.length; i++) {
            harmonicOptions.data[i] = {
                type: "spline",
                name: `${i + 1}`,
                showInLegend: true,
                dataPoints: this.arrToObjects(harmonicCharts[i], 2)
            }
        }

        return harmonicOptions;
    };

    timeOptions = (timeCharts) => {
        return {
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
                dataPoints: this.arrToObjects(timeCharts[0], 1)
            },
                {
                    type: "spline",
                    name: "FFT",
                    color: "black",
                    showInLegend: true,
                    dataPoints: this.arrToObjects(timeCharts[1], 1)
                }]
        }
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

    generateSignalTrue = (samples) => {
        let chart = [];
        for (let i = 0; i <= samples; i++) {
            let sum = 0;
            let amplitude = Math.random();
            let phase = Math.random() * 2 * Math.PI;
            for (let j = 1; j <= this.harmonicsNum; j++) {
                sum += amplitude * Math.sin(this.division * (j) + phase);
            }
            chart[i - 1] = sum;
        }
        return chart;
    };

    buildCharts = () => {
        let charts = [];
        let samples = 2;

        for (let i = 0; i <= this.power; i++) {
            charts[i] = this.generateSignalTrue(samples);
            samples = samples * 2;
        }
        return charts;
    };

    buildTimeFourierChart = () => {
        let charts = this.buildCharts();

        let discreteTimeChart = [];
        let fastTimeChart = [];

        let start;
        let end;

        for (let i = 0; i < charts.length; i++) {
            start = window.performance.now();
            this.fourierTransform(charts[i]);
            end = window.performance.now();
            discreteTimeChart[i] = (end - start);

            start = window.performance.now();
            this.fastFourierTransform(charts[i]);
            end = window.performance.now();
            fastTimeChart[i] = (end - start);
        }
        return [discreteTimeChart, fastTimeChart];
    }
}