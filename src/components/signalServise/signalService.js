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

    /*fourierTransform = (signal) => {
        let fourierChart = [];
        for (let i = 0; i < ((signal.length - 1)/2); i++) {
            let real = 0;
            let imaginary = 0;
            for (let j = 0; j < ((signal.length - 1)/2); j++) {
                real += signal[j] * Math.cos((2 * Math.PI * i * j) / ((signal.length - 1)/2));
                imaginary += signal[j] * Math.sin((2 * Math.PI * i * j) / ((signal.length - 1)/2));
            }
            fourierChart[i] = Math.sqrt(Math.pow(real, 2) + Math.pow(imaginary, 2));
        }
        return fourierChart;
    };*/

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

    timeOptions = (timeChart) => {
        return {
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
                dataPoints: this.arrToObjects(timeChart, 1)
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
        for (let i = 0; i < samples; i++) {
            let sum = 0;
            let amplitude = Math.random();
            let phase = Math.random() * 2 * Math.PI;
            for (let j = 1; j <= this.harmonicsNum; j++) {
                sum += amplitude * Math.sin(this.division * (j) + phase);
            }
            chart[i - 1] = sum;
        }
    };

    buildTimeChart = () => {
        let theoreticStart = 0;
        let theoreticEnd = 0;
        let timeChart = [];
        let samples = 2;

        for (let i = 0; i <= this.power; i++) {
            theoreticStart = window.performance.now();
            this.generateSignalTrue(samples);
            theoreticEnd = window.performance.now();
            timeChart[i] = (theoreticEnd - theoreticStart);
            samples = samples * 2;
        }
        return timeChart;
    };
}